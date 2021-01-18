const apodFormatDate = (date) => {
    date = new Date(2021,0,4);
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
}

export {apodFormatDate};