import {apodDateToString, getDateWithTimeString, updateApodImage} from './utils.js';
import {store} from './store.js';
import {updateStore} from "./client.js";


/**
 * @description Returns the NavBar component
 * @return {string} html - The HTML for the NavBar
 */
const NavBar = (state) => {
    const active = state.menu.active;
    return `
        <div class="navbar-brand">
            <a class="navbar-item has-text-black is-uppercase has-text-weight-semibold" href="#">
                <img src="./assets/images/logo.png" alt="" width="463" height="150">
            </a>
            
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="mainMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="mainMenu" class="navbar-menu">
            <div class="navbar-end">  
                <a class="navbar-item menu-item earth ${active === 'earth' ? 'is-active' : ''}" data-target="earth">Earth</a>  
                <a class="navbar-item menu-item mars ${active === 'mars' ? 'is-active' : ''}" data-target="mars">Mars</a>
                <a class="navbar-item menu-item beyond ${active === 'beyond' ? 'is-active' : ''}" data-target="beyond">And Beyond...</a>
                <a class="navbar-item menu-item about ${active === 'about' ? 'is-active' : ''}" data-target="about">About</a>
            </div>
        </div>
    `
};

/**
 * @description Returns the PageContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the PageContent
 */
const PageContent = (state) => {
    const active = state.menu.active;

    return `
        ${active === 'earth' ? EarthPage(state) : ''}
        ${active === 'mars' ? MarsPage(state) : ''}
        ${active === 'beyond' ? BeyondPage(state) : ''}
        ${active === 'about' ? AboutPage(state) : ''}
    `
};

/**
 * @description Returns the EarthPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the EarthPage
 */
const EarthPage = (state) => {
    return ``;
};

/**
 * @description Returns the MarsPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the MarsPage
 */
const MarsPage = (state) => {
    return ``;
};

/**
 * @description Returns the BeyondPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the BeyondPage
 */
const BeyondPage = (state) => {
    const date = state.apod.reqDate || apodDateToString(new Date());
    const image = updateApodImage(date, state);

    if (image) {
        return `
            <div id="beyond" class="${state.menu.active === 'beyond' ? 'is-active' : ''}">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title is-1">${image.title}<span class="subtitle is-4">${image.copyright ? ' by ' + image.copyright : ''}</span></h1>
                    </div>
                </div>
                <div class="columns">
                    <div class="column has-text-centered">
                        <div class="apod-img-wrapper">
                            <img class="apod-img" src="${image.url}" alt="" />
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="apod-info">
                            <div class="block">
                                <input class="input is-hidden" id="apod-calendar" type="date">
                            </div>                                                                
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="block apod-exp has-text-justified">
                            ${image.explanation}
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .apod-img-wrapper:after {
                    padding-bottom: ${image.aspectRatio}%;
                }            
            </style>
        `
    } else {
        return ``;
    }
};

/**
 * @description Returns the AboutPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the AboutPage
 */
const AboutPage = (state) => {
    return ``;
};

/**
 * @description Returns the Footer component
 * @return {string} html - The HTML for the Footer
 */
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
};

export {NavBar, PageContent, Footer};