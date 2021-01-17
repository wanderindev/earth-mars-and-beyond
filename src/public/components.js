import {getImageOfTheDay} from './apiCalls.js';

const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
};

const ImageOfTheDay = (state) => {
    console.log(state);
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(state.apod.date)

    if (!state.apod || state.apod.date === today.getDate() ) {
        getImageOfTheDay(state)
    }

    // check if the photo of the day is actually type video!
    if (state.apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${state.apod.url}">here</a></p>
            <p>${state.apod.title}</p>
            <p>${state.apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${state.apod.image.url}" height="312px" width="312px" />
            <p>${state.apod.image.explanation}</p>
        `)
    }
}

export {Greeting, ImageOfTheDay};
