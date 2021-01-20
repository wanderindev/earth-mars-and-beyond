/**
 * @description Gets the APOD image information from the backend
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @return {object} response - An object with the APOD image information
 */
const getImageOfTheDay = (date) => {
    return fetch(`http://localhost:3000/apod/${date}`)
        .then(res => res.json())
}

/**
 * @description Gets APOD images for a date range from the backend
 * @param {string} startDate - A string representing a date in the format YYYY-MM-DD
 * @param {string} endDate - A string representing a date in the format YYYY-MM-DD
 * @return {object} response - An object with an array of APOD images information
 */
const getImagesForDateRange = (startDate, endDate) => {
    return fetch(`http://localhost:3000/apod/${startDate}/${endDate}`)
        .then(res => res.json())
}

export {getImageOfTheDay, getImagesForDateRange};