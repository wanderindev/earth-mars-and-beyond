/**
 * @description Gets the APOD image information from the backend
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @return {object} response - An object with the APOD image information
 */
const getApodImageForDate = (date) => {
    return fetch(`http://localhost:3000/apod/get_image?date=${date}`)
        .then(res => res.json());
};

/**
 * @description Gets APOD images for a date range from the backend
 * @param {string} startDate - A string representing a date in the format YYYY-MM-DD
 * @param {string} endDate - A string representing a date in the format YYYY-MM-DD
 * @return {array} response - An array of APOD images information
 */
const getApodImagesForDateRange = (startDate, endDate) => {
    return fetch(`http://localhost:3000/apod/get_images?start_date=${startDate}&end_date=${endDate}`)
        .then(res => res.json());
};

/**
 * @description Gets the EPIC images information from the most recent date
 * @return {array} response - An array with the EPIC images information
 */
const getLatestEpicImages = () => {
    return fetch(`http://localhost:3000/epic/get_latest`)
        .then(res => res.json());
};

/**
 * @description Gets the manifest for a Mars rover
 * @param {string} rover - The name of the rover
 * @return {object} response - An object with the rovers manifest
 */
const getRoverManifest = (rover) => {
    return fetch(`http://localhost:3000/mars-photos/manifest/${rover}`)
        .then(res => res.json());
};

export {getApodImageForDate, getApodImagesForDateRange, getLatestEpicImages, getRoverManifest};