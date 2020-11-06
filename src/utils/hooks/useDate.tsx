const a_monthsEn = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]
const a_monthsRu = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
]
const a_monthsEnFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const a_monthsRuFull = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

export const useDate = (date: Date) => {
    const monthNum = date.getMonth() + 1
    const monthEn = a_monthsEn[date.getMonth()]
    const monthEnFull = a_monthsRu[date.getMonth()]
    const monthRu = a_monthsEnFull[date.getMonth()]
    const monthRuFull = a_monthsRuFull[date.getMonth()]
    const day = date.getDay()
    const year = date.getFullYear()
    return {
        monthNum,
        monthEn,
        monthEnFull,
        monthRu,
        monthRuFull,
        day,
        year,
    }
}
