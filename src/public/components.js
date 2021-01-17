import {getImageOfTheDay} from './apiCalls.js';

// Returns the page title
const PageTitle = (location) => {
    return `
        <h1>Welcome to ${location}!</h1>
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

// Returns the page footer
const Footer = () => {
    return `
        <div class="columns is-vcentered">
            <div class="content column has-text-centered">
                <p class="my-5">
                    Crafted with <i class="fas fa-heart has-text-danger"></i> by an Earthling near you.
                </p>
                <p class="my-5">
                    <a href="https://github.com/wanderindev" target="blank"><i class="fab fa-github fa-lg"></i></i></a> 
                    <a href="https://www.linkedin.com/in/javierfeliu/" target="blank"><i class="fab fa-linkedin fa-lg"></i></i></a>
                    <a href="https://twitter.com/JavierFeliuA" target="blank"><i class="fab fa-twitter fa-lg"></i></i></a>
                </p>
            </div>
        </div>
    `
}

export {PageTitle, Footer, ImageOfTheDay};
