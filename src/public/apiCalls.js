import {updateStore} from './client.js';

const getImageOfTheDay = (state) => {
    fetch(`http://localhost:3000/apod/` + '2020-12-08')
        .then(res => res.json())
        .then(apod => updateStore(state, { apod }))

    return true
}

export {getImageOfTheDay};
