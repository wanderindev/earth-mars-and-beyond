import {getImageOfTheDay} from './apiCalls.js';

// Returns the page's main navigation
const NavBar = () => {
    return `
        <div class="navbar-brand">
            <a class="navbar-item has-text-black is-uppercase has-text-weight-semibold" href="#">
                <img src="" alt="" width="112" height="28">
                Earth, Mars, and Beyond
            </a>
            
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="mainMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="mainMenu" class="navbar-menu">
            <div class="navbar-end">    
                <a class="navbar-item">Explore</a>
                <a class="navbar-item">About</a>
                <a class="navbar-item">Contact</a>
            </div>
        </div>
    `
}

//Returns the tab panel
const TabPanel = (active) => {
    return `
        <div class="tabs is-boxed is-centered">
            <ul>
                <li class="tab-item is-active" data-target="earth"><a>Earth</a></li>
                <li class="tab-item" data-target="mars"><a>Mars</a></li>
                <li class="tab-item" data-target="beyond"><a>And Beyond...</a></li>
            </ul>
        </div>
        <div id="earth" class="tab-content">earth goes here</div>
        <div id="mars" class="tab-content">mars goes here</div>
        <div id="beyond" class="tab-content">beyond goes here</div>
    `
}

const ImageOfTheDay = (state) => {
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

// Returns the page's footer
const Footer = () => {
    return `
        <div class="columns is-vcentered">
            <div class="content column has-text-centered">
                <p>
                    Crafted with <span class="icon"><i class="fas fa-heart has-text-danger"></i></span> by an Earthling near you.
                </p>
                <br>
                <p>
                    <a class="icon" href="https://github.com/wanderindev" target="blank"><i class="fab fa-github fa-lg"></i></i></a> 
                    <a class="icon" href="https://www.linkedin.com/in/javierfeliu/" target="blank"><i class="fab fa-linkedin fa-lg"></i></i></a>
                    <a class="icon" href="https://twitter.com/JavierFeliuA" target="blank"><i class="fab fa-twitter fa-lg"></i></i></a>
                </p>
            </div>
        </div>
    `
}

export {NavBar, TabPanel, Footer, ImageOfTheDay};
