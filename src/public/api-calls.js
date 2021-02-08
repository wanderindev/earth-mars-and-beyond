const backendUrl = "http://localhost:3000";

/**
 * @description Gets the APOD image information from the backend
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @return {Promise} response - A Promise which value is an object with the APOD image information
 */
const getApodImageForDate = (date) => {
  return fetch(`${backendUrl}/apod/get_image?date=${date}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error retrieving the APOD image information");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @description Gets APOD images for a date range from the backend
 * @param {string} startDate - A string representing a date in the format YYYY-MM-DD
 * @param {string} endDate - A string representing a date in the format YYYY-MM-DD
 * @return {Promise} response - A Promise which value is an array of APOD images information
 */
const getApodImagesForDateRange = (startDate, endDate) => {
  return fetch(
    `${backendUrl}/apod/get_images?start_date=${startDate}&end_date=${endDate}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error retrieving the APOD images information");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @description Gets the EPIC images information from the most recent date
 * @return {Promise} response - A Promise which value is an array with the EPIC images information
 */
const getLatestEpicImages = () => {
  return fetch(`${backendUrl}/epic/get_latest`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error retrieving the latest EPIC images information");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @description Gets the manifest for a Mars rover
 * @param {string} rover - The name of the rover
 * @return {Promise} response - A Promise which value is an object with the rovers manifest
 */
const getRoverManifest = (rover) => {
  return fetch(`${backendUrl}/mars-photos/manifest/${rover}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error retrieving the Mars rover's manifest");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @description Gets the photos from a Mars rover in a given date
 * @param {string} rover - The name of the rover
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @return {Promise} response - A Promise which value is an object with the rover's photos for the chosen date
 */
const getRoverImages = (rover, date) => {
  return fetch(`${backendUrl}/mars-photos/rovers/${rover}/${date}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error retrieving the Mars rover's images information");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  getApodImageForDate,
  getApodImagesForDateRange,
  getLatestEpicImages,
  getRoverManifest,
  getRoverImages,
};
