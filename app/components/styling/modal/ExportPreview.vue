<template>
  <UModal v-model:open="isOpen" class="w-full max-w-6xl">
    <template #content>
      <UCard class="divide-y divide-gray-100 dark:divide-gray-800">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Export Theme</h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <div class="max-h-[70vh] overflow-auto px-4">
          <div class="flex flex-col gap-8 p-4">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Export your theme for different Nuxt UI versions. Choose the format that matches your project setup.
              </p>
            </div>

            <!-- Nuxt UI v3 (Tailwind v4) -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Nuxt UI v3 (Tailwind v4)</h4>
                <UBadge color="success" variant="soft">Latest</UBadge>
              </div>

              <!-- V3 CSS (@theme directive) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h5 class="text-sm font-medium text-gray-900 dark:text-white">main.css</h5>
                  <div class="flex gap-2">
                    <UButton icon="i-heroicons-clipboard-document" size="sm" variant="outline" @click="copyToClipboard(v3CssContent)">
                      Copy
                    </UButton>
                    <UButton icon="i-heroicons-arrow-down-tray" size="sm" @click="downloadFile(v3CssContent, 'main.css', 'css')">
                      Download
                    </UButton>
                  </div>
                </div>
                <div class="max-h-[60vh] overflow-auto">
                  <ShikiBox :code="v3CssContent" lang="css" file="main.css" />
                </div>
              </div>

              <!-- V3 App Config -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h5 class="text-sm font-medium text-gray-900 dark:text-white">app.config.ts</h5>
                  <div class="flex gap-2">
                    <UButton icon="i-heroicons-clipboard-document" size="sm" variant="outline" @click="copyToClipboard(v3AppConfigContent)">
                      Copy
                    </UButton>
                    <UButton icon="i-heroicons-arrow-down-tray" size="sm" @click="downloadFile(v3AppConfigContent, 'app.config.ts', 'ts')">
                      Download
                    </UButton>
                  </div>
                </div>
                <div class="max-h-[60vh] overflow-auto">
                  <ShikiBox :code="v3AppConfigContent" lang="ts" file="app.config.ts" />
                </div>
              </div>
            </div>

            <!-- Nuxt UI v2 (Tailwind v3) -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Nuxt UI v2 (Tailwind v3)</h4>
                <UBadge color="info" variant="soft">Legacy</UBadge>
              </div>

              <!-- V2 CSS Variables -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h5 class="text-sm font-medium text-gray-900 dark:text-white">CSS Variables</h5>
                  <div class="flex gap-2">
                    <UButton icon="i-heroicons-clipboard-document" size="sm" variant="outline" @click="copyToClipboard(v2CssContent)">
                      Copy
                    </UButton>
                    <UButton icon="i-heroicons-arrow-down-tray" size="sm" @click="downloadFile(v2CssContent, 'theme.css', 'css')">
                      Download
                    </UButton>
                  </div>
                </div>
                <div class="max-h-[60vh] overflow-auto">
                  <ShikiBox :code="v2CssContent" lang="css" file="theme.css" />
                </div>
              </div>

              <!-- V2 App Config -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h5 class="text-sm font-medium text-gray-900 dark:text-white">app.config.ts</h5>
                  <div class="flex gap-2">
                    <UButton icon="i-heroicons-clipboard-document" size="sm" variant="outline" @click="copyToClipboard(v2AppConfigContent)">
                      Copy
                    </UButton>
                    <UButton icon="i-heroicons-arrow-down-tray" size="sm" @click="downloadFile(v2AppConfigContent, 'app.config.ts', 'ts')">
                      Download
                    </UButton>
                  </div>
                </div>
                <div class="max-h-[60vh] overflow-auto">
                  <ShikiBox :code="v2AppConfigContent" lang="ts" file="app.config.ts" />
                </div>
              </div>

              <!-- V2 Tailwind Config -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h5 class="text-sm font-medium text-gray-900 dark:text-white">tailwind.config.ts</h5>
                  <div class="flex gap-2">
                    <UButton icon="i-heroicons-clipboard-document" size="sm" variant="outline" @click="copyToClipboard(tailwindContent)">
                      Copy
                    </UButton>
                    <UButton
                      icon="i-heroicons-arrow-down-tray"
                      size="sm"
                      @click="downloadFile(tailwindContent, 'tailwind.config.ts', 'ts')">
                      Download
                    </UButton>
                  </div>
                </div>
                <div class="max-h-[60vh] overflow-auto">
                  <ShikiBox :code="tailwindContent" lang="ts" file="tailwind.config.ts" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton color="neutral" variant="ghost" @click="isOpen = false"> Close </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { downloadTheme } from '~/utils/exportThemeFromCssVariables';
import {
  exportThemeFromStorageAsCSS,
  exportThemeFromStorageAsNuxtUIV2Config,
  exportThemeFromStorageAsNuxtUIV3Config,
  exportThemeFromStorageAsTailwindConfig,
  exportThemeFromStorageAsTailwindV4CSS
} from '~/utils/exportThemeFromLocalStorage';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
});

// Generate export formats for Nuxt UI v3 (Tailwind v4)
const v3CssContent = computed(() => exportThemeFromStorageAsTailwindV4CSS());
const v3AppConfigContent = computed(() => exportThemeFromStorageAsNuxtUIV3Config());

// Generate export formats for Nuxt UI v2 (Tailwind v3)
const v2CssContent = computed(() => exportThemeFromStorageAsCSS());
const v2AppConfigContent = computed(() => exportThemeFromStorageAsNuxtUIV2Config());
const tailwindContent = computed(() => exportThemeFromStorageAsTailwindConfig());

const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    useToast().add({
      title: 'Copied!',
      description: 'Code has been copied to clipboard.',
      color: 'success'
    });
  } catch {
    useToast().add({
      title: 'Copy failed',
      description: 'Failed to copy code to clipboard.',
      color: 'error'
    });
  }
};

const downloadFile = (content: string, filename: string, fileType: 'css' | 'json' | 'ts') => {
  downloadTheme(content, filename, fileType);
  useToast().add({
    title: 'Downloaded!',
    description: `${filename} has been downloaded.`,
    color: 'success'
  });
};
</script>
