class Theme {
    #colors!: Ref<Record<ThemeColor, Color>>
    // #defaults!: Ref<Record<DefaultColor, string>>
    // #defaultsDark!: Ref<Record<DefaultColor, string>>
    #originalColors!: Record<ThemeColor, Color>
    // #originalDefaults!: Record<DefaultColor, string>
    // #originalDefaultsDark!: Record<DefaultColor, string>
    #isReloadable!: Ref<boolean>

    get colors() {
        return this.#colors.value
    }

    get colorsRef() {
        return this.#colors
    }

    get isReloadable() {
        return this.#isReloadable.value
    }

    init() {
        const storage = localStorage.getItem('colors')
        const colors: Record<ThemeColor, string> | null = storage ? JSON.parse(storage) : null

        this.#originalColors = themeOriginalColors

        // this.#originalDefaults = { ...themeOriginalDefaults }
        // this.#originalDefaultsDark = { ...themeOriginalDefaultsDark }

        // this.applyDefaults()

        if (colors)
        {
            this.#isReloadable = ref(true)
            this.#colors = ref(this.copyStorage(colors))
        }
        else 
        {
            this.#isReloadable = ref(false)
            this.#colors = ref(this.copyOriginals())
        }

        this.shadeAll()
    }

    shadeAll() {
        for (const entry of themeColorEntries) {
            const color = this.#colors.value[entry]
            color.shadeGen()
            color.shadeStyle(entry)
        }
    }

    // applyDefaults() {
    //     for (const [key, value] of Object.entries(this.#originalDefaults))
    //         console.log(`--ui-${key}`, `var(--ui-color-${value})`)
    // }

    copyOriginals(): Record<ThemeColor, Color> {
        return { 
            primary: new Color(this.#originalColors.primary.hex3),
            secondary: new Color(this.#originalColors.secondary.hex3),
            success: new Color(this.#originalColors.success.hex3),
            info: new Color(this.#originalColors.info.hex3), 
            warning: new Color(this.#originalColors.warning.hex3),
            error: new Color(this.#originalColors.error.hex3),
            neutral: new Color(this.#originalColors.neutral.hex3)
        }
    }

    copyStorage(storage: Record<ThemeColor, string>): Record<ThemeColor, Color> {
        return {
            primary: new Color(storage.primary),
            secondary: new Color(storage.secondary),
            success: new Color(storage.success),
            info: new Color(storage.info),
            warning: new Color(storage.warning),
            error: new Color(storage.error),
            neutral: new Color(storage.neutral)
        }
    }

    save() {
        const colors: Record<ThemeColor, string> = {
            primary: this.#colors.value.primary.hex3,
            secondary: this.#colors.value.secondary.hex3,
            success: this.#colors.value.success.hex3,
            info: this.#colors.value.info.hex3,
            warning: this.#colors.value.warning.hex3,
            error: this.#colors.value.error.hex3,
            neutral: this.#colors.value.neutral.hex3
        }

        localStorage.setItem('colors', JSON.stringify(colors))

        this.#isReloadable.value = true

        const toaster = useToast()
        toaster.add({ title: 'Saved!', description: 'Theme colors saved to local storage.', color: 'success' })
    }

    reset() {
        this.#colors.value = this.copyOriginals()
        this.shadeAll()

        const toaster = useToast()
        toaster.add({ title: 'Reset!', description: 'Theme colors reset.', color: 'success' })
    }

    reload() {
        const storage = localStorage.getItem('colors')

        if (storage)
        {
            this.#colors.value = this.copyStorage(JSON.parse(storage))

            const toaster = useToast()
            toaster.add({ title: 'Reload!', description: 'Theme colors reloaded from last save.', color: 'success' })
        }
    }
}

const theme = new Theme()
export { theme }
