import { DateTime } from 'luxon'

export default (date: string) => {
    return DateTime.fromISO(date).valueOf()
}
