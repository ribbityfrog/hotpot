import { DateTime } from 'luxon'

export default (date: string, format: string = 'dd/MM/yyyy') => {
    return DateTime.fromISO(date).toFormat(format)
}
