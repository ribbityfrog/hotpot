export type ToasterContent = {
    title: string,
    description: string
}

export const toasterContents = {
    internalError: {
        title: 'Unexpected error',
        description: 'Try again, if the problem persists please contact support.'
    },
    loginFailed: {
        title: 'Login failed',
        description: 'Verify that your password matches your account.'
    },
    passwordUpdated: {
        title: 'Password updated',
        description: 'Your password has been updated.'
    },
    emailUpdated: {
        title: 'Email update',
        description: 'An email has been sent to confirm'
    }
} as const satisfies Record<string, ToasterContent>

class Toaster {
    private _toaster: any

    init() {
        if (!import.meta.client)
            return

        this._toaster = useToast()
    }

    error(content: ToasterContent) {
        if (!import.meta.client)
            return

        this._toaster?.add({ ...content, color: 'error', timeout: 8000 })
    }

    success(content: ToasterContent) {
        if (!import.meta.client)
            return

        this._toaster?.add({ ...content, color: 'primary', timeout: 8000 })
    }
}

const toaster: Toaster = new Toaster()
export default toaster
