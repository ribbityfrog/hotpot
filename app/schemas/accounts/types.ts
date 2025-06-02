export const operationTypes = ['connect', 'update-email'] as const
export type OperationType = (typeof operationTypes)[number]

export function isOperationType(value: string): value is OperationType {
    return operationTypes.includes(value as OperationType)
}
