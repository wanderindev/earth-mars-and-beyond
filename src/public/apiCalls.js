import {updateStore} from './client.js';

const getImageOfTheDay = (date) => {
    return fetch(`http://localhost:3000/apod/` + date)
        .then(res => res.json());
}

export {getImageOfTheDay};
