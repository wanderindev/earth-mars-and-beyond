import {getImageForDate, getImagesForDateRange} from './api-calls.js';
import {store} from "./store.js";
import {updateAndRender, updateStore} from "./client.js";


/**
 * @description Returns a string representing a date in format YYYY-MM-DD
 * @param {Date} date - A Date object
 * @return {string} date - A string representing a date
 */
const apodDateToString = (date) => {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
};


/**
 * @description Returns a Date from a string in format YYYY-MM-DD
 * @param {string} date - A string representing a date
 * @return {Date} date - A Date object
 */
const apodStringToDate = (date) => {
    date = date !== '' ? date : apodDateToString(new Date());
    return new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(5, 7)) - 1,
        parseInt(date.substring(8, 10))
    );
};

/**
 * @description Returns a string representing a date in format YYYY-MM-DD
 * @param {string} date - A string representing a date in format YYYY-MM-DD
 * @param {object} image - An object representing an image
 * @param {object} apod - An object with information for the APOD API
 * @return {object} store - The updated store object
 */
const cacheImage = (date, image, apod) => {
    const newCachedImgs = [...apod.cachedImgs, image];
    const newApod = Object.assign(apod, {cachedImgs: newCachedImgs, currentImg: image});

    return updateAndRender(store, {apod: newApod});
};

/**
 * @description Returns a an array of disabled dates
 * @param {object} apod - An object with information for the APOD API
 * @return {array} disabledDates - An array with disabled dates
 */
const getApodDisabledDates = (apod) => {
    return apod.disabledDates.map(date => apodStringToDate(date));
}

const getImageAspectRatio = (date, image, state) => {
    const img = new Image();

    img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const aspectRatio = height / width * 100;
        const newImage = Object.assign(image, {aspectRatio: aspectRatio});

        if (!state.apod.cachedImgs.map(image => image.date).includes(date)) {
            cacheImage(date, newImage, state.apod);
        }

        return aspectRatio;
    }

    img.src = image.url;
}

/**
 * @description Updates the blockedDates array for the APOD API
 * @param {object} apod - An object with information for the APOD API
 * @return {object} store - The updated store object
 */
const updateApodDisabledDates = (apod) => {
    const startDate = apod.checkedUntil;
    const endDate = apodDateToString(new Date());

    getImagesForDateRange(startDate, endDate).then(images => {
        const newDisabledDates = images.filter(image => image.media_type !== 'image').map(image => image.date);

        if (newDisabledDates.length > 0) {
            const updatedDates = [...apod.disabledDates, ...newDisabledDates];
            const newApod = Object.assign(apod, {disabledDates: updatedDates, checkedUntil: apod.today});

            return updateStore(store, {
                apod: newApod
            });
        }
    });
};

/**
 * @description Gets the APOD image information from the backend
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @param {object} state - The application's state
 * @return {object} response - An object with the APOD image information
 */
const updateApodImage = (date, state) => {
    const cachedImgsDates = state.apod.cachedImgs.map(image => image.date);

    // The requested image is the current image.
    if (state.apod.currentImg && state.apod.currentImg.date === date) {
        return state.apod.currentImg;
    // The requested image is in the cache.
    } else if (cachedImgsDates.includes(date)) {
        return state.apod.cachedImgs.filter(image => image.date === date).map(image => {
            return {
                date: image.date,
                title: image.title,
                explanation: image.explanation,
                copyright: image.copyright,
                url: image.url
            }
        })[0];
    // Get the new image from the API
    } else {
        getImageForDate(date).then(images => {
            const image = images.map(image => {
                getImageAspectRatio(date, image, state);
                return {
                    date: image.date,
                    title: image.title,
                    explanation: image.explanation,
                    copyright: image.copyright,
                    url: image.url,
                    aspectRatio: ''
                }
            })[0];

            /*if (!state.apod.cachedImgs.map(image => image.date).includes(date)) {
                cacheImage(date, image, state.apod);
            }*/

            return image;
        });
    }
};

export {apodDateToString, apodStringToDate, cacheImage, getApodDisabledDates, updateApodDisabledDates, updateApodImage};