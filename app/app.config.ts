export default defineAppConfig({
    ui: {
        colors: {
            primary: 'slatePrimary',
            secondary: 'slateSecondary',
            success: 'slateSuccess',
            info: 'slateInfo',
            warning: 'slateWarning',
            error: 'slateError',
            neutral: 'slateNeutral'
        },
        slideover: {
            slots: {
                content: '!w-fit !min-w-1/2',
            }
        },
    }
})
