// import type { FetchError } from 'ofetch'
import type { LeFetchRequest, LeSSRFetch } from './types'

export class LeSSRFetchPayload {
    private _ssrFetch!: LeSSRFetch
    private _fetchRequest: LeFetchRequest

    get data() { return this._ssrFetch.data.value }
    get dataRef() { return this._ssrFetch.data }

    get status() { return this._ssrFetch.status.value }
    get isRefreshing() { return this._ssrFetch.status.value === 'idle' }
    get isPending() { return this._ssrFetch.status.value === 'pending' }
    get isSuccessful() { return this._ssrFetch.status.value === 'success' }
    get isFailed() { return this._ssrFetch.status.value === 'error' }
    get isFetching() { return this._ssrFetch.status.value === 'pending' || this._ssrFetch.status.value === 'idle' }

    get payload(): LeSSRFetch { return this._ssrFetch }

    constructor(fetchRequest: LeFetchRequest) {
        this._fetchRequest = fetchRequest
    }

    refresh() {
        this._ssrFetch?.refresh()
    }

    async launch() {
        this._ssrFetch = await useFetch(this._fetchRequest.endpoint, {
            onRequest: ({ options }) => {
                Object.entries(this._fetchRequest.content.headers).forEach(([key, value]: [string, string]) => {
                    options.headers.set(key, value)
                    options.cache = 'no-store'
                })
            },
            onRequestError: () => {
            },
            onResponse: () => {
            },
            onResponseError: () => {
            }
        })
    }
}
