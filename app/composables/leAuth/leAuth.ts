import type { AuthToken } from './types'

class LeAuth {
    private _CookieKey: string = 'token'

    private _authToken: Ref<AuthToken | null> = ref(null)
    private _bearer: string | null = null

    // private _testingConnection: boolean = false
    errorForLoginPage?: string = undefined

    // lastURL: string = '/'

    get authToken(): AuthToken | null {
        if (this._authToken === null || this.isExpired)
            this._getAuth()
        return this._authToken.value
    }

    get isAuthenticated(): boolean {
        if (this._authToken === null || this.isExpired)
            this._getAuth()
        return !this.isExpired
    }

    get bearer(): string | null { return this._bearer }

    get isExpired(): boolean {
        if (this._authToken.value?.expiresAt !== undefined)
            return (this._authToken.value?.expiresAt <= new Date())
        return true
    }

    isAuthenticatedOrLogin(checkHasAdmin: boolean = false): boolean {
        if (this.isAuthenticated)
        {
            if (checkHasAdmin && !this._authToken.value?.abilities.includes('admin'))
                this.logout()
            return true
        }

        this.loginThenRedirect()
        return false
    }

    loginThenRedirect() {
        this.determineLastURL()
        this.navigateToLogin()
    }

    // private _notConnected(route?: string, message?: string) {
    //     this.errorForLoginPage = message;

    //     if (route === undefined)
    //         this.determineLastURL();
    //     else
    //         this.lastURL = route;
    //     this.logout(false);
    // }

    // checkConnection(route?: string) {
    //     if (this.isAuthenticated === false) {
    //         this._notConnected(route, 'The page you tried to access required to be connected');
    //         return;
    //     }

    //     if (this.isExpired) {
    //         this._notConnected(route, 'Connection expired or has been reinitialized');
    //         return;
    //     }

    //     this._testingConnection = true;
    //     leFetch.getOnce('/checkConnection', { fail: [() => this._notConnected(route)], anyway: [() => this._testingConnection = false] })
    // }

    login(authToken: AuthToken, navigateToLastURL: boolean = true) {
        this._delAuthCookie()

        authToken.expiresAt = new Date(authToken.expiresAt)
        this._setAuth(authToken)

        leFetch.cleanDeep()

        if (navigateToLastURL)
            this.navigateToLastURL()
    }

    logout(navToConnection: boolean = true) {
        if (this.isAuthenticated === true)
            this._delAuthCookie()

        leFetch.cleanDeep()

        if (navToConnection)
            this.navigateToRoot()
    }

    reload() {
        this._getAuth()
    }

    private _setAuth(authToken: AuthToken) {
        const token = useCookie(this._CookieKey, {
            sameSite: 'lax',
            secure: true,
        })
        token.value = JSON.stringify(authToken)

        this._authToken.value = authToken
        this._bearer = 'Bearer ' + authToken.token
    }

    private _getAuth() {
        const rawCookie: AuthToken = toRaw(unref(useCookie<AuthToken>(this._CookieKey).value))
        if (!rawCookie?.token)
            return

        if (!rawCookie.expiresAt || rawCookie.expiresAt <= new Date())
            this._delAuthCookie()
        // const authToken = rawCookie as AuthToken

        // authToken.expiresAt = new Date(authToken.expiresAt)

        this._authToken.value = rawCookie
        this._bearer = 'Bearer ' + rawCookie.token

        if (this.isExpired) this.logout()
    }

    private _delAuthCookie() {
        useCookie(this._CookieKey).value = null

        this._authToken.value = null
        this._bearer = null
    }

    determineLastURL() {
        if (!import.meta.client)
            return
        
        localStorage.setItem('loginRedirect', useRoute().path)
    }

    navigateToLastURL(defaultNav: string = '/') {
        if (!import.meta.client)
            return

        let navTo = localStorage.getItem('loginRedirect')
        localStorage.removeItem('loginRedirect')

        if (!navTo || navTo.length === 0)
            navTo = defaultNav

        if (navTo !== useRoute().path)
            navigateTo(navTo)
    }

    navigateToRoot() {
        // const localePath = useLocalePath()

        navigateTo('/')
    }

    navigateToLogin() {
        // const localePath = useLocalePath()

        navigateTo('/')
    }
}

export const leAuth: LeAuth = new LeAuth()
