import {updateStore} from './client.js';

/**
 * @description Gets the APOD image information from the backend
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @return {object} response - An object with the APOD image information
 */
const getImageOfTheDay = (date) => {
    return fetch(`http://localhost:3000/apod/` + date)
        .then(res => res.json());
}

export {getImageOfTheDay};
