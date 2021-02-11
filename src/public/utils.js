import {
  getApodImageForDate,
  getApodImagesForDateRange,
  getLatestEpicImages,
  getRoverManifest,
  getRoverImages,
} from "./api-calls.js";
import { store } from "./store.js";
import { updateStore } from "./client.js";

/**
 * @description Returns a string representing a date in format YYYY-MM-DD
 * @param {Date} date - A Date object
 * @return {string} date - A string representing a date
 */
const apodDateToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
};

/**
 * @description Returns a Date from a string in format YYYY-MM-DD
 * @param {string} date - A string representing a date
 * @return {Date} date - A Date object
 */
const apodStringToDate = (date) => {
  return new Date(
    getDateWithTimeString(date !== "" ? date : apodDateToString(new Date()))
  );
};

/**
 * @description Adds the current APOD image to the cache
 * @param {object} image - An object representing an image
 * @param {object} state - The application's current state
 * @return {object} newState - The application's updated state
 */
const cacheImage = (image, state) => {
  const newCachedImgs = [...state.apod.cachedImgs, image];
  const newApod = Object.assign(state.apod, {
    cachedImgs: newCachedImgs,
    currentImg: image,
  });

  return updateStore(store, {
    menu: state.menu,
    apod: newApod,
    epic: state.epic,
    rovers: state.rovers,
  });
};

/**
 * @description Returns a an array of disabled dates
 * @param {object} apod - An object with information for the APOD API
 * @return {array} disabledDates - An array with disabled dates
 */
const getApodDisabledDates = (apod) => {
  return apod.disabledDates.map((date) => apodStringToDate(date));
};

/**
 * @description Returns a string representing a date with time information
 * @param {string} date - A string representing a date
 * @return {string} dateString - A string representing a date with time information
 */
const getDateWithTimeString = (date) => {
  const timeZoneOffset = new Date().getTimezoneOffset() / 60;

  if (timeZoneOffset > 0) {
    return date + "T" + String(timeZoneOffset).padStart(2, "0") + ":00:00";
  } else if (timeZoneOffset < 0) {
    return (
      date.substring(0, 8) +
      String(parseInt(date.substring(8, 10)) - 1).padStart(2, "0") +
      "T" +
      String(24 + timeZoneOffset).padStart(2, "0") +
      ":00:00"
    );
  } else {
    return date + "T00:00:00";
  }
};

/**
 * @description Returns the aspect ratio for the image
 * @param {object} image - An object representing and APOD image
 * @param {object} state - The application state
 * @return {float} aspectRatio - The image aspect ratio
 */
const getImageAspectRatio = async (image, state) => {
  const img = new Image();
  img.src = image.url;
  img.onload = () => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    return (height / width) * 100;
  };
};

/**
 * @description Updates the blockedDates array for the APOD API
 * @param {object} state - The application's current state
 * @return {object} newState - The application's updated state
 */
const getDisabledDates = async (state) => {
  const apod = state.apod;
  const startDate = apod.checkedUntil;
  const endDate = apodDateToString(new Date());
  const apodImages = await getApodImagesForDateRange(startDate, endDate);
  const newDisabledDates = apodImages
    .filter((image) => image["media_type"] !== "image")
    .map((image) => image.date);
  const updatedDates = [...apod.disabledDates, ...newDisabledDates];
  const newApod = Object.assign(apod, {
    disabledDates: updatedDates,
    checkedUntil: endDate,
  });
  const newState = updateStore(store, {
    menu: state.menu,
    apod: newApod,
    epic: state.epic,
    rovers: state.rovers,
  });
  return updatedDates;
};

/**
 * @description Gets the APOD image information from the backend
 * @param {string} date - A string representing a date in the format YYYY-MM-DD
 * @param {object} state - The application's state
 * @return {object} response - An object with the APOD image information
 */
const getApodImage = async (date, state) => {
  const cachedImgsDates = state.apod.cachedImgs.map((image) => image.date);
  const disabledDates = await getDisabledDates(state);

  // The requested image is the current image.
  if (state.apod.currentImg && state.apod.currentImg.date === date) {
    return state.apod.currentImg;
    // The requested image is in the cache.
  } else if (cachedImgsDates.includes(date)) {
    return state.apod.cachedImgs.filter((image) => image.date === date)[0];
    // Get the new image from the API
  } else {
    const image = await getApodImageForDate(date);
    const newState = cacheImage(image, state);

    return image;
  }
};

/**
 * @description Gets the date information for the EPIC images to be shown
 * @param {object} image - An object representing the EPIC image
 * @return {object} dateInfo - An object with the year, month, day, and date information
 */
const getEpicDate = (image) => {
  return {
    year: image.date.substring(0, 4),
    month: image.date.substring(5, 7),
    day: image.date.substring(8, 10),
    date:
      image.date.substring(0, 4) +
      "-" +
      image.date.substring(5, 7) +
      "-" +
      image.date.substring(8, 10),
  };
};

/**
 * @description Gets the EPIC information from the backend
 * @param {object} state - The application's state
 * @return {object} newEpic - An object with the EPIC information
 */
const getEpicInfo = async (state) => {
  const images = await getLatestEpicImages();
  const { year, month, day, date } = getEpicDate(images[0]);
  const epicImages = images.map((image) => {
    return {
      date: image.date,
      url: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image.image}.png`,
    };
  });
  const newEpic = Object.assign(state.epic, {
    date: date,
    images: epicImages,
  });
  const newState = updateStore(store, {
    menu: state.menu,
    apod: state.apod,
    epic: newEpic,
    rovers: state.rovers,
  });
  return newEpic;
};

/**
 * @description Returns an array with the sols when no photos were sent to Earth
 * @param {array} photos - An array of photos sent by the rover to Earth
 * @return {array} missingSols - An array of sols
 */
const getMissingSols = (photos) => {
  return Array(photos.slice(-1)[0].sol)
    .fill()
    .map((x, i) => i)
    .filter((sol) => !photos.map((photo) => photo.sol).includes(sol));
};

/**
 * @description Returns an array with the sols when no photos were sent to Earth
 * @param {array} photos - An array of photos sent by the rover to Earth
 * @param {string} minDate - A string representing the date for the first photo sent by the rover to Earth
 * @return {array} disabledDates - An array of dates that should be disabled on the rover's calendar
 */
const getRoverDisabledDates = (photos, minDate) => {
  const missingSols = getMissingSols(photos);
  return missingSols.map((sol) => {
    const baseDate = apodStringToDate(minDate);
    return new Date(
      baseDate.setDate(
        baseDate.getDate() + sol + Math.floor(sol / 37) + Math.floor(sol / 1493)
      )
    );
  });
};

/**
 * @description Updates the selected rover metadata from the manifest
 * @param {object} state - The application's current state
 * @return {object} newState - The application's updated state
 */
const getRoverInfo = async (state) => {
  const manifest = await getRoverManifest(state.rovers.selectedRover);
  const cutOff = name === "Curiosity" ? -1 : name === "Spirit" ? -17 : -5;
  const photos = manifest.photo_manifest.photos;
  const roverPhotos = await getRoverPhotos(state);
  const newRover = Object.assign(state.rovers, {
    selectedRover: state.rovers.selectedRover,
    selectedRoverInfo: {
      name: manifest.photo_manifest.name,
      minDate: apodStringToDate(photos[0].earth_date),
      maxDate: apodStringToDate(photos.slice(cutOff)[0].earth_date),
      disabledDates: getRoverDisabledDates(photos, photos[0].earth_date),
      startDate: apodStringToDate(photos.slice(cutOff)[0].earth_date),
      launchDate: manifest.photo_manifest.launch_date,
      landingDate: manifest.photo_manifest.landing_date,
      totalPhotos: manifest.photo_manifest.total_photos,
      completedDate: apodStringToDate(photos.slice(-1)[0].earth_date),
      status: manifest.photo_manifest.status,
    },
    photos: roverPhotos,
  });
  const newState = updateStore(store, {
    menu: state.menu,
    apod: state.apod,
    epic: state.epic,
    rovers: newRover,
  });
  return newRover;
};

/**
 * @description Returns an array with 25 randomly selected photos
 * @param {array} photos - An array with all the photos sent by the rover on the selected date
 * @return {array} selectedPhotos - An array with 25 randomly selected photos
 */
const getSelectedPhotos = (photos) => {
  const images = photos.photos
    .filter((photo) =>
      ["FHAZ", "NAVCAM", "PANCAM", "RHAZ"].includes(photo.camera.name)
    )
    .map((photo) => photo.img_src);
  return [...images].sort(() => 0.5 - Math.random()).slice(0, 25);
};

/**
 * @description Updates the list of photos for a rover on a given date
 * @param {object} state - The application's current state
 * @return {object} newState - The application's updated state
 */
const getRoverPhotos = async (state) => {
  const photos = await getRoverImages(
    state.rovers.selectedRover,
    state.rovers.photos.reqDate
  );
  const selectedPhotos = getSelectedPhotos(photos);
  const newRover = Object.assign(state.rovers, {
    selectedRover: state.rovers.selectedRover,
    selectedRoverInfo: state.rovers.selectedRoverInfo,
    photos: {
      reqDate: state.rovers.photos.reqDate,
      date: state.rovers.photos.reqDate,
      images: selectedPhotos,
    },
  });
  const newState = updateStore(store, {
    menu: state.menu,
    apod: state.apod,
    epic: state.epic,
    rovers: newRover,
  });
  return newRover.photos;
};

export {
  apodDateToString,
  apodStringToDate,
  cacheImage,
  getApodDisabledDates,
  getDateWithTimeString,
  getDisabledDates,
  getImageAspectRatio,
  getApodImage,
  getEpicInfo,
  getRoverInfo,
  getRoverPhotos,
};
