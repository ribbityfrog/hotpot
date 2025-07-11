export function getNuxtUIVariables() {
    const rootStyles = getComputedStyle(document.documentElement)
    const nuxtUIVariables: Record<string, string> = {}

    // Get all CSS custom properties from the root element
    for (let i = 0; i < rootStyles.length; i++) {
        const property = rootStyles[i]

        // Filter for UI-related variables
        if (property && (property.startsWith('--ui-') || property.startsWith('--color-'))) {
            const value = rootStyles.getPropertyValue(property).trim()
            nuxtUIVariables[property] = value
        }
    }

    return nuxtUIVariables
}

export function categorizeVariables(variables: Record<string, string>) {
    const categories = {
        uiCore: [] as Array<[string, string]>,
        uiColors: [] as Array<[string, string]>,
        slateColors: [] as Array<[string, string]>,
        otherColors: [] as Array<[string, string]>
    }

    Object.entries(variables).forEach(([property, value]) => {
        if (property.startsWith('--ui-') && !property.startsWith('--ui-color-')) {
            categories.uiCore.push([property, value])
        } else if (property.startsWith('--ui-color-')) {
            categories.uiColors.push([property, value])
        } else if (property.startsWith('--color-slate')) {
            categories.slateColors.push([property, value])
        } else if (property.startsWith('--color-')) {
            categories.otherColors.push([property, value])
        }
    })

    // Sort each category alphabetically
    categories.uiCore.sort(([a], [b]) => a.localeCompare(b))
    categories.uiColors.sort(([a], [b]) => a.localeCompare(b))
    categories.slateColors.sort(([a], [b]) => a.localeCompare(b))
    categories.otherColors.sort(([a], [b]) => a.localeCompare(b))

    return categories
}

export function groupColorsByShade(colorEntries: Array<[string, string]>) {
    const groups: Record<string, Array<[string, string]>> = {}

    colorEntries.forEach(([property, value]) => {
        // Extract the base color name (e.g., "primary", "secondary", "success")
        const match = property.match(/--ui-color-([a-z]+)-\d+/) || property.match(/--color-slate([A-Z][a-z]+)-\d+/)
        const baseColor = match && match[1] ? match[1].toLowerCase() : 'other'

        if (!groups[baseColor]) {
            groups[baseColor] = []
        }
        groups[baseColor].push([property, value])
    })

    return groups
}

export function exportThemeAsCSS() {
    const variables = getNuxtUIVariables()
    const categories = categorizeVariables(variables)

    let cssContent = ':root {\n'

    // UI Core Variables
    if (categories.uiCore.length > 0) {
        cssContent += '  /* UI Core Variables */\n'
        categories.uiCore.forEach(([property, value]) => {
            cssContent += `  ${property}: ${value};\n`
        })
        cssContent += '\n'
    }

    // UI Color Variables (grouped by color shade)
    if (categories.uiColors.length > 0) {
        cssContent += '  /* UI Color Variables */\n'
        const uiColorGroups = groupColorsByShade(categories.uiColors)
        const sortedGroupNames = Object.keys(uiColorGroups).sort()

        sortedGroupNames.forEach((groupName, index) => {
            const group = uiColorGroups[groupName]
            if (group) {
                group.forEach(([property, value]) => {
                    cssContent += `  ${property}: ${value};\n`
                })
                // Add line break between groups (except for the last group)
                if (index < sortedGroupNames.length - 1) {
                    cssContent += '\n'
                }
            }
        })
        cssContent += '\n'
    }

    // Slate Color Variables (grouped by color shade)
    if (categories.slateColors.length > 0) {
        cssContent += '  /* Slate Color Variables */\n'
        const slateColorGroups = groupColorsByShade(categories.slateColors)
        const sortedGroupNames = Object.keys(slateColorGroups).sort()

        sortedGroupNames.forEach((groupName, index) => {
            const group = slateColorGroups[groupName]
            if (group) {
                group.forEach(([property, value]) => {
                    cssContent += `  ${property}: ${value};\n`
                })
                // Add line break between groups (except for the last group)
                if (index < sortedGroupNames.length - 1) {
                    cssContent += '\n'
                }
            }
        })
        cssContent += '\n'
    }

    // Other Color Variables
    if (categories.otherColors.length > 0) {
        cssContent += '  /* Other Color Variables */\n'
        categories.otherColors.forEach(([property, value]) => {
            cssContent += `  ${property}: ${value};\n`
        })
    }

    cssContent += '}\n'

    return cssContent
}

// Export for Nuxt UI v3 (Tailwind v4) using @theme directive
export function exportThemeAsTailwindV4CSS() {
    const variables = getNuxtUIVariables()
    const categories = categorizeVariables(variables)

    let cssContent = '@import "tailwindcss";\n@import "@nuxt/ui";\n\n@theme {\n'

    // UI Core Variables
    if (categories.uiCore.length > 0) {
        cssContent += '  /* UI Core Variables */\n'
        categories.uiCore.forEach(([property, value]) => {
            cssContent += `  ${property}: ${value};\n`
        })
        cssContent += '\n'
    }

    // Convert UI color variables to Tailwind format
    if (categories.uiColors.length > 0) {
        cssContent += '  /* Color Variables */\n'
        const uiColorGroups = groupColorsByShade(categories.uiColors)
        const sortedGroupNames = Object.keys(uiColorGroups).sort()

        sortedGroupNames.forEach((groupName, index) => {
            const group = uiColorGroups[groupName]
            if (group) {
                group.forEach(([property, value]) => {
                    // Convert --ui-color-primary-500 to --color-primary-500
                    const tailwindProperty = property.replace('--ui-color-', '--color-')
                    cssContent += `  ${tailwindProperty}: ${value};\n`
                })
                // Add line break between groups (except for the last group)
                if (index < sortedGroupNames.length - 1) {
                    cssContent += '\n'
                }
            }
        })
        cssContent += '\n'
    }

    // Convert slate colors
    if (categories.slateColors.length > 0) {
        cssContent += '  /* Slate Color Variables */\n'
        const slateColorGroups = groupColorsByShade(categories.slateColors)
        const sortedGroupNames = Object.keys(slateColorGroups).sort()

        sortedGroupNames.forEach((groupName, index) => {
            const group = slateColorGroups[groupName]
            if (group) {
                group.forEach(([property, value]) => {
                    cssContent += `  ${property}: ${value};\n`
                })
                // Add line break between groups (except for the last group)
                if (index < sortedGroupNames.length - 1) {
                    cssContent += '\n'
                }
            }
        })
        cssContent += '\n'
    }

    // Other Color Variables
    if (categories.otherColors.length > 0) {
        cssContent += '  /* Other Color Variables */\n'
        categories.otherColors.forEach(([property, value]) => {
            cssContent += `  ${property}: ${value};\n`
        })
    }

    cssContent += '}\n'

    return cssContent
}


export function exportThemeAsNuxtUIV2Config() {
    const variables = getNuxtUIVariables()

    // Try to determine color names from the theme
    const primaryColorName = determinePrimaryColorName(variables)
    const grayColorName = determineGrayColorName(variables)

    const config = {
        ui: {
            primary: primaryColorName,
            gray: grayColorName
        }
    }

    return `export default defineAppConfig(${JSON.stringify(config, null, 2)})`
}

export function exportThemeAsNuxtUIV3Config() {
    const variables = getNuxtUIVariables()

    // Try to determine color names from the theme
    const primaryColorName = determinePrimaryColorName(variables)
    const neutralColorName = determineNeutralColorName(variables)

    const config = {
        ui: {
            colors: {
                primary: primaryColorName,
                neutral: neutralColorName
            }
        }
    }

    return `export default defineAppConfig(${JSON.stringify(config, null, 2)})`
}

export function exportThemeAsTailwindConfig() {
    const variables = getNuxtUIVariables()
    const colorPalettes = extractColorPalettes(variables)

    return `import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: ${JSON.stringify(colorPalettes, null, 8).replace(/"/g, "'")}
    }
  }
}`
}

function determinePrimaryColorName(variables: Record<string, string>): string {
    // Try to match common color names based on hue
    const primaryHex = variables['--ui-primary'] || variables['--ui-color-primary-500']
    if (!primaryHex) return 'green'

    // Simple hue-based color detection (this could be enhanced)
    const hex = primaryHex.replace('#', '')
    if (hex.length === 6) {
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        // Simple color name detection based on RGB values
        if (g > r && g > b) return 'green'
        if (b > r && b > g) return 'blue'
        if (r > g && r > b) return 'red'
        if (r > 200 && g > 200 && b < 100) return 'yellow'
        if (r > 150 && g < 100 && b > 150) return 'purple'
    }

    return 'green'
}

function determineGrayColorName(_variables: Record<string, string>): string {
    // Default to 'cool' for most themes
    return 'cool'
}

function determineNeutralColorName(_variables: Record<string, string>): string {
    // Default to 'slate' for Nuxt UI v3
    return 'slate'
}

function extractColorPalettes(variables: Record<string, string>): Record<string, Record<string, string>> {
    const palettes: Record<string, Record<string, string>> = {}

    // Extract color palettes from UI color variables
    Object.entries(variables).forEach(([property, value]) => {
        const match = property.match(/--ui-color-([a-z]+)-(\d+)/)
        if (match && match[1] && match[2]) {
            const colorName = match[1]
            const shade = match[2]

            if (!palettes[colorName]) {
                palettes[colorName] = {}
            }
            palettes[colorName][shade] = value
        }
    })

    // Also extract from slate colors
    Object.entries(variables).forEach(([property, value]) => {
        const match = property.match(/--color-slate([A-Z][a-z]+)-(\d+)/)
        if (match && match[1] && match[2]) {
            const colorName = match[1].toLowerCase()
            const shade = match[2]

            if (!palettes[colorName]) {
                palettes[colorName] = {}
            }
            palettes[colorName][shade] = value
        }
    })

    return palettes
}

export function downloadTheme(content: string, filename: string, type: 'css' | 'json' | 'ts') {
    let mimeType: string

    switch (type) {
        case 'css':
            mimeType = 'text/css'
            break
        case 'json':
            mimeType = 'application/json'
            break
        case 'ts':
            mimeType = 'text/typescript'
            break
        default:
            mimeType = 'text/plain'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
