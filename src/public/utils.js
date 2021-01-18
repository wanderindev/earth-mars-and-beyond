/**
 * @description Returns a string representing a date in format YYYY-MM-DD
 * @param {Date} date - A Date object
 * @return {string} date - A string representing a date
 */
const apodFormatDate = (date) => {
    date = new Date(2021,0,4);
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
}

export {apodFormatDate};