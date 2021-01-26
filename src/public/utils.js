import {getApodImageForDate, getApodImagesForDateRange, getLatestEpicImages, getRoverManifest} from './api-calls.js';
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
    return new Date(getDateWithTimeString(date !== '' ? date : apodDateToString(new Date())));
};

/**
 * @description Returns a string representing a date in format YYYY-MM-DD
 * @param {object} image - An object representing an image
 * @param {object} apod - An object with information for the APOD API
 * @return {object} store - The updated store object
 */
const cacheImage = (image, apod) => {
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


/**
 * @description Returns a string representing a date with time information
 * @param {string} date - A string representing a date
 * @return {string} dateString - A string representing a date with time information
 */
const getDateWithTimeString = (date) => {
    const timeZoneOffset = new Date().getTimezoneOffset() / 60;

    if (timeZoneOffset > 0) {
        return date + 'T' + String(timeZoneOffset).padStart(2, '0') + ':00:00';
    } else if (timeZoneOffset < 0) {
        return date.substring(0,8) + String(parseInt(date.substring(8,10)) - 1).padStart(2, '0') + 'T' + String(24 + timeZoneOffset).padStart(2, '0') + ':00:00';
    } else {
        return date + 'T00:00:00'
    }
}

/**
 * @description Returns the aspect ratio for the image
 * @param {object} image - An object representing and APOD image
 * @param {object} state - The application state
 * @return {float} aspectRatio - The image aspect ratio
 */
const getImageAspectRatio = (image, state) => {
    const img = new Image();

    img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const aspectRatio = height / width * 100;
        const newImage = Object.assign(image, {aspectRatio: aspectRatio});

        if (!state.apod.cachedImgs.map(image => image.date).includes(image.date)) {
            cacheImage(newImage, state.apod);
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

    if (startDate !== endDate) {
        getApodImagesForDateRange(startDate, endDate).then(images => {
            const newDisabledDates = images.filter(image => image['media_type'] !== 'image').map(image => image.date);

            if (newDisabledDates.length > 0) {
                const updatedDates = [...apod.disabledDates, ...newDisabledDates];
                const newApod = Object.assign(apod, {disabledDates: updatedDates, checkedUntil: endDate});

                return updateStore(store, {
                    apod: newApod
                });
            }
        });
    }
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
        //console.log('currentImg', state.apod.currentImg);
        return state.apod.currentImg;
    // The requested image is in the cache.
    } else if (cachedImgsDates.includes(date)) {
        //console.log('cache', state.apod.cachedImgs.filter(image => image.date === date)[0]);
        return state.apod.cachedImgs.filter(image => image.date === date)[0];
    // Get the new image from the API
    } else {
        getApodImageForDate(date).then(image => {
            getImageAspectRatio(image, state);
            return {
                date: image.date,
                title: image.title,
                explanation: image.explanation,
                copyright: image.copyright,
                url: image.url,
                aspectRatio: ''
            }
        });
    }
};

/**
 * @description Gets the EPIC images information from the backend
 * @param {object} state - The application's state
 * @return {array} response - An array of EPIC images
 */
const updateEpicImages = (state) => {
    return getLatestEpicImages().then(images =>  {
        const year = images[0].date.substring(0, 4);
        const month = images[0].date.substring(5, 7);
        const day = images[0].date.substring(8, 10);
        const date = year + '-' + month + '-' + day;
        const latestImages = images.map(image => {
            return {
                date: image.date,
                url: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image.image}.png`
            }
        });
        const newEpic = Object.assign(state.epic, {date: date, images: latestImages});

        return updateAndRender(store, {
            epic: newEpic
        });
    });
}

/**
 * @description Updates the selected rover metadata from the manifest
 * @param {object} state - The application's state
 * @return {object} store - The updated store
 */
const updateCurrentRover = (state) => {
    getRoverManifest(state.rovers.currentRover.name).then(manifest => {
        const photos = manifest.photo_manifest.photos;
        const minDate = apodStringToDate(photos[0].earth_date);
        const maxDate = apodStringToDate(photos.slice(-1)[0].earth_date);
        const lastSol = photos.slice(-1)[0].sol;
        const allSols = Array(lastSol).fill().map((x, i) => i);
        const validSols = photos.map(photo => photo.sol);
        const missingSols = allSols.filter(sol => !validSols.includes(sol));
        const disabledDates = missingSols.map(sol => {
            const baseDate = apodStringToDate(photos[0].earth_date);

            return new Date(baseDate.setDate(baseDate.getDate() + sol + Math.floor(sol / 37) + Math.floor(sol / 1493)));
        });
        console.log(minDate, maxDate);
        console.log(disabledDates);
    });
}

export {apodDateToString, apodStringToDate, cacheImage, getApodDisabledDates, getDateWithTimeString, updateApodDisabledDates, updateApodImage, updateEpicImages, updateCurrentRover};