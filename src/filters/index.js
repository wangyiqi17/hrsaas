import dayjs from "dayjs"

export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}