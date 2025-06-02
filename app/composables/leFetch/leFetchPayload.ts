import type { LeFetchRequest, PageRoute, LeFetchCallbacks, PayloadOptions, LeFetchCall, PayloadStatus, ExceptIntels } from './types'

function dateInXHours(x: number): Date {
    return new Date(new Date().getTime() + (x * 60 * 60 * 1000))
}

export class LeFetchPayload {
    private _data: Ref<any>
    private _status: Ref<PayloadStatus> = ref('PENDING')
    protected _abortController: AbortController | undefined

    readonly options: PayloadOptions
    readonly key: string
    readonly fetchRequest: LeFetchRequest

    private _fetchedDate: Date
    private _expirationDate?: Date
    private _pageRoute: PageRoute
    private _callbacks: LeFetchCallbacks[] = []
    protected _fetchError: { raw: any, parsed: ExceptIntels | undefined } | undefined

    get status(): PayloadStatus { return this._status.value }
    get RefStatus(): Ref<PayloadStatus> { return this._status }
    get data(): any { return this._data.value }
    get isPending(): boolean { return this.status == 'PENDING' }
    get isRefreshing(): boolean { return this.status == 'REFRESHING' }
    get isSuccessful(): boolean { return this.status == 'SUCCESSFUL' }
    get isFilled(): boolean { return this.status == 'SUCCESSFUL' || this.status == 'REFRESHING' }
    get isFailed(): boolean { return this.status == 'FAILED' || this.status == 'ERROR' }
    get isFetching(): boolean { return this.status == 'PENDING' || this.status == 'REFRESHING' }
    get isExpired(): boolean { return this._expirationDate !== undefined ? new Date() > this._expirationDate : false }
    get abortController(): AbortController | undefined { return this._abortController }

    get fetchedDate(): Date { return this._fetchedDate }
    get expirationDate(): Date | undefined { return this._expirationDate }
    get pageRoute(): PageRoute { return this._pageRoute }

    get error(): any { return this._fetchError?.raw }
    get except(): ExceptIntels | undefined { return this._fetchError?.parsed }

    constructor(fetchRequest: LeFetchRequest, options: PayloadOptions, callbacks?: LeFetchCallbacks) {

        const uRoute = useRoute()
        this._pageRoute = {
            path: uRoute.path,
            fullPath: uRoute.fullPath,
            query: uRoute.query
        }

        this.options = options
        // this._data = ref((typeof defaultData === 'object' && !Array.isArray(defaultData)) ? defaultData : { value: defaultData })
        this._data = ref(options.defaultData)

        if (options.isAbortable) {
            this._abortController = new AbortController()
            fetchRequest.content.signal = this._abortController?.signal
        }

        this.key = fetchRequest.key
        this.fetchRequest = fetchRequest

        this.pushCallbacks(callbacks)

        this._fetchedDate = new Date()

        if (options.expiry !== undefined)
            this._expirationDate = dateInXHours(options.expiry)
    }

    private _resetInit(resetData: boolean = true, resetCall?: Omit<LeFetchCall, 'key'>) {
        const uRoute = useRoute()

        this._pageRoute = {
            path: uRoute.path,
            fullPath: uRoute.fullPath,
            query: uRoute.query
        }

        this._fetchedDate = new Date()
        if (this.options.expiry !== undefined)
            this._expirationDate = dateInXHours(this.options.expiry)

        this._fetchError = undefined

        if (resetData)
            this._data.value = this.options.defaultData

        if (resetCall)
        {
            this.fetchRequest.qs = resetCall.qs
            this.fetchRequest.route = resetCall.route
            this.fetchRequest.endpoint = this.fetchRequest.url + resetCall.route
            if (resetCall.qs)
                this.fetchRequest.endpoint += '?' + Object.entries(resetCall.qs).map(([key, value]) => `${key}=${value}`).join('&')
        }
        
    }

    private _changeStatus(newStatus: PayloadStatus) {
        if (newStatus == 'CLEARED')
            this._data.value = this.options.defaultData
        this._status.value = newStatus
    }

    success(response: unknown) {
        this._changeStatus('SUCCESSFUL')
        this._data.value = response
        this.consumeCallbacks('success')

        // this._callbacks?.success?.forEach(cb => cb(this));
        // this._callbacks?.anyway?.forEach(cb => cb(this));
    }

    fail(except: ExceptIntels | undefined, error: any) {
        this._changeStatus('FAILED')
        if (except)
            this._fetchError = {
                raw: error,
                parsed: except
            }
        this.consumeCallbacks('fail')

        // this._callbacks?.fail?.forEach(cb => cb(this));
        // this._callbacks?.anyway?.forEach(cb => cb(this));

        if (except?.status === 401)
            leAuth.logout()
    }

    pushCallbacks(callbacks?: LeFetchCallbacks) {
        if (callbacks)
            this._callbacks.push(callbacks)
    }

    consumeCallbacks(fetchState: 'success' | 'fail') {
        this._callbacks.forEach((callbacks: LeFetchCallbacks) => {
            callbacks[fetchState]?.forEach(cb => cb(this))
            callbacks.anyway?.forEach(cb => cb(this))
        })
        this._callbacks = []
    }

    clear() {
        this._changeStatus('CLEARED')
    }

    refresh(callbacks?: LeFetchCallbacks): boolean {
        this.pushCallbacks(callbacks)

        if (this.status == 'PENDING' || this.status == 'REFRESHING')
            return false

        this._resetInit(false)
        this._changeStatus('REFRESHING')
        leFetch._rawFetch(this)

        return true
    }

    relaunch(callbacks?: LeFetchCallbacks ): boolean {
        this.pushCallbacks(callbacks)

        if (this.status == 'PENDING' || this.status == 'REFRESHING')
            return false

        this._resetInit()
        this._changeStatus('PENDING')
        leFetch._rawFetch(this)

        return true
    }

    editAndRelaunch(call: Omit<LeFetchCall, 'key'> | string, callbacks?: LeFetchCallbacks): boolean {
        const gCall = typeof call === 'string' ? { route: call } : call

        this.pushCallbacks(callbacks)

        if (this.status == 'PENDING' || this.status == 'REFRESHING')
            return false

        this._resetInit(true, gCall)
        this._changeStatus('PENDING')
        leFetch._rawFetch(this)

        return true
    }

    abort(reason: string = 'Sometimes it happens'): boolean {
        if (this._abortController === undefined ||
            (this.status != 'PENDING' && this.status != 'REFRESHING'))
            return false

        this._changeStatus('ABORTED')
        this._abortController?.abort('Aborted by client: ' + reason)

        this._abortController = new AbortController()
        this.fetchRequest.content.signal = this._abortController?.signal

        return true
    }

}
