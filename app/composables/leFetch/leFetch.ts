import type { LeFetchCall, LeFetchRequest, LeFetchCallbacks, PayloadOptions, MethodType, BodyContent } from './types'
import { exceptIntelsSchema } from './types'
import { LeFetchPayload } from './leFetchPayload'
import { LeSSRFetchPayload } from './leSSRFetchPayload'

const defaultOptions: Record<'GET' | 'OTHER', PayloadOptions> = {
    GET: {
        memory: 'MEMORIZED',
        defaultData: [],
        isAbortable: true,
    },
    OTHER: {
        memory: 'ONCE',
        defaultData: {},
        isAbortable: false
    },
}

function initPayloadOptions(methodType: MethodType = 'GET', payloadOptions?: Partial<PayloadOptions> | (Partial<PayloadOptions> | undefined)[]): PayloadOptions {
    const methodOption = methodType === 'GET' ? 'GET' : 'OTHER'
    const options: PayloadOptions = { ...(defaultOptions[methodOption]) }

    if (payloadOptions === undefined)
        return options
  
    if (Array.isArray(payloadOptions))
        Object.assign(options, ...payloadOptions)
    else
        Object.assign(options, payloadOptions)

    if (options.memory === 'PERSISTENT')
    {
        if (options.expiry === undefined)
            options.expiry = 8
        if (options.refresh === undefined)
            options.refresh = false
    }
    if (options.refresh === undefined)
        options.refresh = true

    return options
}

class LeFetch {
    private _fetches: Map<string, LeFetchPayload> = new Map<string, LeFetchPayload>

    lang: LanguageCode = 'fr'

    isMemorized(key: string | { route: string, url?: string }): boolean {
        const gkey = typeof key === 'string' ? key : (key?.url ? key.url + key.route : this.buildApiUrl() + key.route)

        return this._fetches.has(gkey)
    }

    getInMemory(key: string | { route: string, url?: string }): LeFetchPayload | undefined {
        const gkey = typeof key === 'string' ? key : (key?.url ? key.url + key.route : this.buildApiUrl() + key.route)

        return this._fetches.get(gkey)
    }

    api(method: MethodType, call: string | LeFetchCall, params?: BodyContent, callbacks?: LeFetchCallbacks): LeFetchPayload {
        switch (method) {
        case 'GET':
            return this.get(call, callbacks)
        case 'POST':
            return this.post(call, params, callbacks)
        case 'PATCH':
            return this.patch(call, params, callbacks)
        case 'PUT':
            return this.patch(call, params, callbacks)
        case 'DELETE':
            return this.delete(call, callbacks)
        }
    }

    get(call: string | LeFetchCall, callbacks?: LeFetchCallbacks, options?: Partial<PayloadOptions>): LeFetchPayload {
        const fetchRequest: LeFetchRequest = this.buildFetchRequest(call, { method: 'GET' })

        const payloadOptions = initPayloadOptions('GET', options)

        const [payload, isSaved] = this._preparePayload(fetchRequest, payloadOptions, callbacks)

        if (isSaved === false || payloadOptions.refresh === true)
            this._rawFetch(payload)

        return payload
    }

    async getSSR(call: string | LeFetchCall) {
        const fetchRequest: LeFetchRequest = this.buildFetchRequest(call, { method: 'GET' })

        const ssrPayload = new LeSSRFetchPayload(fetchRequest)
        await ssrPayload.launch()

        return ssrPayload
    }

    getOnce(call: string | LeFetchCall, callbacks?: LeFetchCallbacks , options?: Partial<PayloadOptions>): LeFetchPayload {
        const payloadOptions = initPayloadOptions('GET', [options, { memory: 'ONCE' }])

        return this.get(call, callbacks, payloadOptions)
    }

    post(call: string | LeFetchCall, params?: BodyContent, callbacks?: LeFetchCallbacks): LeFetchPayload {
        const fetchRequest: LeFetchRequest = this.buildFetchRequest(call, { method: 'POST', body: params })

        const payloadOptions = initPayloadOptions('POST')

        const [payload] = this._preparePayload(fetchRequest, payloadOptions, callbacks)

        this._rawFetch(payload)

        return payload
    }

    patch(call: string | LeFetchCall, params?: BodyContent, callbacks?: LeFetchCallbacks): LeFetchPayload {
        const fetchRequest: LeFetchRequest = this.buildFetchRequest(call, { method: 'PATCH', body: params })

        const payloadOptions = initPayloadOptions('POST')

        const [payload] = this._preparePayload(fetchRequest, payloadOptions, callbacks)

        this._rawFetch(payload)

        return payload
    }

    put(call: string | LeFetchCall, params?: BodyContent, callbacks?: LeFetchCallbacks): LeFetchPayload {
        const fetchRequest: LeFetchRequest = this.buildFetchRequest(call, { method: 'PUT', body: params })

        const payloadOptions = initPayloadOptions('POST')

        const [payload] = this._preparePayload(fetchRequest, payloadOptions, callbacks)

        this._rawFetch(payload)

        return payload
    }

    delete(call: string | LeFetchCall, callbacks?: LeFetchCallbacks): LeFetchPayload {
        const fetchRequest: LeFetchRequest = this.buildFetchRequest(call, { method: 'DELETE' })

        const payloadOptions = initPayloadOptions('POST')

        const [payload] = this._preparePayload(fetchRequest, payloadOptions, callbacks)

        this._rawFetch(payload)

        return payload
    }

    buildFetchRequest(call: string | LeFetchCall, { method, body = undefined, headers = {} }: { method: MethodType, body?: BodyContent, headers?: Record<string, string> }, apiURL?: string): LeFetchRequest {
        const gCall = typeof call === 'string' ? { route: call } : call

        if (apiURL === undefined) {
            apiURL = this.buildApiUrl()

            if (leAuth?.isAuthenticated)
                headers.Authorization = leAuth.bearer!
        }

        if (body !== undefined && !(body instanceof FormData))
            headers['Content-Type'] = 'application/json'

        headers['Accept-Language'] = this.lang

        const buildRequest: LeFetchRequest = {
            key: gCall.key ?? apiURL + gCall.route,
            route: gCall.route,
            url: apiURL,
            endpoint: apiURL + gCall.route,
            qs: gCall.qs,
            content: {
                method,
                headers,
                body,
                signal: undefined,
            }
        }

        if (gCall.qs !== undefined)
            buildRequest.endpoint += '?' + Object.entries(gCall.qs).map(([key, value]) => `${key}=${value}`).join('&')

        return buildRequest
    }

    buildApiUrl(): string {
        const env = useRuntimeConfig().public

        let apiURL = env.apiScheme + '://' + env.apiHost
        if (env.apiPort.toString().length > 0)
            apiURL += ':' + env.apiPort

        return apiURL
    }

    private _preparePayload(fetchRequest: LeFetchRequest, payloadOptions: PayloadOptions, callbacks?: LeFetchCallbacks ): [LeFetchPayload, boolean] {

        const isSaved: boolean = payloadOptions.memory === 'ONCE' ? false : this._fetches.has(fetchRequest.key)

        const payload: LeFetchPayload = isSaved ? this._fetches.get(fetchRequest.key) as LeFetchPayload : new LeFetchPayload(fetchRequest, payloadOptions, callbacks)

        if (!isSaved && payloadOptions.memory !== 'ONCE')
            this._fetches.set(fetchRequest.key, payload)

        if (isSaved) {
            payload.pushCallbacks(callbacks)

            if (payload.isExpired || payload.options.refresh)
                payload.refresh()
            else {
                if (payload.isSuccessful)
                    payload.consumeCallbacks('success')
                else if (payload.isFailed)
                    payload.consumeCallbacks('fail')
            }
        }

        return [payload, isSaved]
    }

    _rawFetch(Payload: LeFetchPayload) {
        $fetch(Payload.fetchRequest.endpoint, Payload.fetchRequest.content)
            .then((resp) => {
                Payload.success(resp)
            })
            .catch((error) => {
                const except = exceptIntelsSchema.safeParse(error?.response?._data).data

                Payload.fail(except, error)
            })
    }

    clean(currentPath: string, clearPersistent: boolean = false) {
        const keysToDelete: string[] = []

        this._fetches.forEach((value: LeFetchPayload, key: string) => {
            if ((value.isExpired || value.pageRoute.path !== currentPath) &&
                (value.options.memory !== 'PERSISTENT' || clearPersistent))
                keysToDelete.push(key)
        })
        keysToDelete.forEach((key: string) => {
            this._fetches.delete(key)
        })
    }

    cleanDeep() {
        this._fetches.clear()
        clearNuxtData()
    }
}

export const leFetch: LeFetch = new LeFetch()
