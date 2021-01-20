import {getImagesForDateRange} from './api-calls.js'
import {store} from "./store.js";
import {updateStore} from "./client.js";


/**
 * @description Returns a string representing a date in format YYYY-MM-DD
 * @param {Date} date - A Date object
 * @return {string} date - A string representing a date
 */
const apodFormatDate = (date) => {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

/**
 * @description Updates the blockedDates array for the APOD API
 * @param {object} apod - An object with information for the APOD API
 * @return {object} store - The updated store object
 */
const updateApodBlockedDates = (apod) => {
    const startDate = apod.checkedUntil;
    const endDate = apod.today;

    getImagesForDateRange(startDate, endDate).then(images => {
        const newBlockedDates = images.filter(image => image.media_type === 'image').map(image => image.date);

        if (newBlockedDates.length > 0) {
            const updatedDates = [...apod.blockedDates, ...newBlockedDates];
            const newApod = Object.assign(apod, {blockedDates: updatedDates, checkedUntil: apod.today});

            return updateStore(store, {
                apod: newApod
            });
        }
    });

}

export {apodFormatDate, updateApodBlockedDates};