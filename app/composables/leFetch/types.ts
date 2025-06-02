// import { PayloadMemoized } from "./enums";
import type { AsyncDataRequestStatus } from '#app'
import type { AsyncDataExecuteOptions } from '#app/composables/asyncData'
import type { LocationQuery } from 'vue-router'
import type { FetchError } from 'ofetch'
import type { LeFetchPayload } from './leFetchPayload'

import { z } from 'zod'

export type MethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

// const payloadMemoryOptions = ['ONCE', 'MEMOIZED', 'PERSISTENT'] as const
// export type PayloadMemoryOptions = typeof payloadMemoryOptions[number]
export type PayloadMemoryOption = 'ONCE' | 'MEMORIZED' | 'PERSISTENT'

// const payloadStatuses = ['PENDING', 'REFRESHING', 'ABORTED', 'SUCCESSFUL', 'FAILED', 'ERROR', 'CLEARED'] as const
// export type PayloadStatus = typeof payloadStatuses[number]
export type PayloadStatus = 'PENDING' | 'REFRESHING' | 'ABORTED' | 'SUCCESSFUL' | 'FAILED' | 'ERROR' | 'CLEARED'

export type PayloadOptions = {
    memory: PayloadMemoryOption; //ONCE, MEMOIZED, PERSISTENT
    defaultData: any; //[], {}
    isAbortable: boolean;
    expiry?: number;
    refresh?: boolean;
}
// ONCE : N'est pas ajouté à la map, si appelé plusieurs fois sur une même page ça fetch plusieurs fois
// MEMOIZED : Ajouté à la map, vidé en changeant de page, relaunch en revenant
// PERSISTENT : Ajouté à la map, jamais vidé, refresh en revenant

// ONCE : Force refetch even if it exists
// MEMOIZED : Ajouté à la map, supprimé en changeant de page
// PERSISTENT : Ajouté à la map, conservé, refresh (optional) en revenant

// Refresh (refreshing true, pending false)
// Relaunch (refreshing false, pending true)

export type BodyContent = Record<string, unknown> | FormData

export type LeFetchCall = {
    key?: string
    route: string
    qs?: Record<string, string>
}

export type LeFetchRequest = {
    key: string
    route: string
    url: string
    params?: Record<string, string>
    qs?: Record<string, string>
    endpoint: string
    content: {
        method: MethodType,
        headers: Record<string, string>,
        body?: BodyContent,
        signal?: any
    }
}

export type LeSSRFetch = {
    data: Ref<any>
    status: Ref<AsyncDataRequestStatus, AsyncDataRequestStatus>
    error: Ref<FetchError<any> | undefined, FetchError<any> | undefined>
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
    clear: () => void
}

export type PageRoute = {
    path: string
    fullPath: string
    query: LocationQuery
}

export type ExceptIntels = {
    status: number
    code: string
    message?: string
    critical: boolean
  }

export const exceptIntelsSchema = z.object({
    status: z.number(),
    code: z.string(),
    message: z.string().optional(),
    critical: z.boolean(),
})

export type LeFethCBPayload = (payload: LeFetchPayload) => void
export type LeFethCBNoParam = () => void
export type LeFetchCBHandler = LeFethCBPayload | LeFethCBNoParam
export type LeFetchCallbacks = {
    success?: (LeFetchCBHandler)[]
    fail?: (LeFetchCBHandler)[]
    anyway?: (LeFetchCBHandler)[]
    name?: string
}

export type AutoPatchConfig = {
    id: Alphanum
    key: string
    ep: string
}
