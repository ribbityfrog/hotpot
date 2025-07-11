import { Color } from './color'
import { Slate } from './slate'
import { downloadTheme } from './exportThemeFromCssVariables'
import type { ThemeShade, ThemeTint } from './theme'

interface HotpotColors {
  light: Record<string, string>
  dark: Record<string, string>
}

interface HotpotOthers {
  radius: number
  spacing: number
}

interface HotpotSlates {
  [key: string]: {
    shade: string
    light: string
    dark: string
  }
}

export function getHotpotStorageData() {
  const colors = JSON.parse(localStorage.getItem('hotpot-colors') || '{}') as HotpotColors
  const others = JSON.parse(localStorage.getItem('hotpot-others') || '{}') as HotpotOthers
  const slates = JSON.parse(localStorage.getItem('hotpot-slates') || '{}') as HotpotSlates

  return { colors, others, slates }
}

export function generateSlateColors(slates: HotpotSlates): Record<string, Record<string, string>> {
  const slateColors: Record<string, Record<string, string>> = {}

  Object.entries(slates).forEach(([name, config]) => {
    const color = new Color(config.shade)
    const slate = new Slate(color, name as ThemeShade, config.light as ThemeTint, config.dark as ThemeTint)

    slateColors[name] = {}
    Object.entries(slate.shades).forEach(([tint, shade]) => {
      if (shade && shade.hex3) {
        slateColors[name]![tint] = shade.hex3
      }
    })
  })

  return slateColors
}

export function exportThemeFromStorageAsCSS(): string {
  const { colors, others, slates } = getHotpotStorageData()
  const slateColors = generateSlateColors(slates)

  let cssContent = ':root {\n'

  // UI Core Variables
  cssContent += '  /* UI Core Variables */\n'
  cssContent += `  --ui-radius: ${others.radius}rem;\n`
  cssContent += `  --ui-spacing: ${others.spacing}rem;\n`
  cssContent += '\n'

  // Light theme variables
  cssContent += '  /* Light Theme Variables */\n'
  Object.entries(colors.light).forEach(([key, value]) => {
    const cssVar = key.replace(/-/g, '-')
    cssContent += `  --ui-${cssVar}: var(--ui-color-${value.replace('-', '-')});\n`
  })
  cssContent += '\n'

  // Slate color variables
  cssContent += '  /* Slate Color Variables */\n'
  Object.entries(slateColors).forEach(([slateName, shades]) => {
    Object.entries(shades).forEach(([tint, color]) => {
      cssContent += `  --ui-color-${slateName}-${tint}: ${color};\n`
    })
    cssContent += '\n'
  })

  cssContent += '}\n\n'

  // Dark theme
  cssContent += '.dark {\n'
  cssContent += '  /* Dark Theme Variables */\n'
  Object.entries(colors.dark).forEach(([key, value]) => {
    const cssVar = key.replace(/-/g, '-')
    cssContent += `  --ui-${cssVar}: var(--ui-color-${value.replace('-', '-')});\n`
  })
  cssContent += '}\n'

  return cssContent
}

export function exportThemeFromStorageAsNuxtUIConfig(): string {
  const { slates } = getHotpotStorageData()

  // Extract primary color name (primary is required, neutral is used as gray if available)
  const primaryColorName = slates.primary ? 'primary' : Object.keys(slates)[0] || 'primary'
  const grayColorName = slates.neutral ? 'neutral' : 'cool'

  const config = {
    ui: {
      primary: primaryColorName,
      gray: grayColorName
    }
  }

  return `export default defineAppConfig(${JSON.stringify(config, null, 2)})`
}

export function exportThemeFromStorageAsNuxtUIV2Config(): string {
  const { slates } = getHotpotStorageData()

  // Extract primary color name (primary is required, gray is used for v2)
  const primaryColorName = slates.primary ? 'primary' : Object.keys(slates)[0] || 'primary'
  const grayColorName = slates.neutral ? 'neutral' : 'cool'

  const config = {
    ui: {
      primary: primaryColorName,
      gray: grayColorName
    }
  }

  return `export default defineAppConfig(${JSON.stringify(config, null, 2)})`
}

export function exportThemeFromStorageAsNuxtUIV3Config(): string {
  const { slates } = getHotpotStorageData()

  // Extract primary color name (primary is required, neutral is used for v3)
  const primaryColorName = slates.primary ? 'primary' : Object.keys(slates)[0] || 'primary'
  const neutralColorName = slates.neutral ? 'neutral' : 'slate'

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

export function exportThemeFromStorageAsTailwindV4CSS(): string {
  const { colors, others, slates } = getHotpotStorageData()
  const slateColors = generateSlateColors(slates)

  let cssContent = '@import "tailwindcss";\n@import "@nuxt/ui";\n\n@theme {\n'

  // UI Core Variables
  cssContent += '  /* UI Core Variables */\n'
  cssContent += `  --ui-radius: ${others.radius}rem;\n`
  cssContent += `  --ui-spacing: ${others.spacing}rem;\n`
  cssContent += '\n'

  // Color variables for Tailwind v4
  cssContent += '  /* Color Variables */\n'
  Object.entries(slateColors).forEach(([slateName, shades]) => {
    Object.entries(shades).forEach(([tint, color]) => {
      cssContent += `  --color-${slateName}-${tint}: ${color};\n`
    })
    cssContent += '\n'
  })

  // Light theme variables
  cssContent += '  /* Light Theme Variables */\n'
  Object.entries(colors.light).forEach(([key, value]) => {
    const cssVar = key.replace(/-/g, '-')
    cssContent += `  --ui-${cssVar}: var(--ui-color-${value.replace('-', '-')});\n`
  })
  cssContent += '\n'

  cssContent += '}\n\n'

  // Dark theme
  cssContent += '.dark {\n'
  cssContent += '  /* Dark Theme Variables */\n'
  Object.entries(colors.dark).forEach(([key, value]) => {
    const cssVar = key.replace(/-/g, '-')
    cssContent += `  --ui-${cssVar}: var(--ui-color-${value.replace('-', '-')});\n`
  })
  cssContent += '}\n'

  return cssContent
}

export function exportThemeFromStorageAsTailwindConfig(): string {
  const { slates } = getHotpotStorageData()
  const slateColors = generateSlateColors(slates)

  return `export default {
  theme: {
    extend: {
      colors: ${JSON.stringify(slateColors, null, 8).replace(/"/g, "'")}
    }
  }
}`
}

// Download functions
export function downloadThemeFromStorage(format: 'css' | 'json' | 'nuxt-ui' | 'tailwind') {
  let content: string
  let filename: string
  let fileType: 'css' | 'json' | 'ts'

  switch (format) {
    case 'css':
      content = exportThemeFromStorageAsCSS()
      filename = 'theme.css'
      fileType = 'css'
      break
    case 'nuxt-ui':
      content = exportThemeFromStorageAsNuxtUIConfig()
      filename = 'app.config.ts'
      fileType = 'ts'
      break
    case 'tailwind':
      content = exportThemeFromStorageAsTailwindConfig()
      filename = 'tailwind.config.ts'
      fileType = 'ts'
      break
    default:
      throw new Error(`Unsupported format: ${format}`)
  }

  downloadTheme(content, filename, fileType)

  return { content, filename, fileType }
}
