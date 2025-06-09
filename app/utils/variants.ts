export const variantSizes = [ 'xs', 'sm', 'md', 'lg', 'xl'] as const
export const variantSizesExtended = [...variantSizes, '2xl', '3xl', '4xl'] as const
export type VariantSize = typeof variantSizes[number]
export type VariantSizeExtended = typeof variantSizesExtended[number]
