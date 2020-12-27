import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const parseUglyDate = (date: string) => {
  // August 17, 2020 at 02:07AM
  return dayjs(date, 'MMMM D, YYYY at mm:ssA').toString()
}
