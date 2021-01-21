import {apodFormatDate, updateApodImage} from './utils.js';
import {store} from './store.js';


/**
 * @description Returns the NavBar component
 * @return {string} html - The HTML for the NavBar
 */
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
};

/**
 * @description Returns the TabPanel component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the TabPanel
 */
const TabPanel = (state) => {
    const active = state.tabs.active;

    return `
        <div class="tabs is-boxed is-centered">
            <ul>
                <li class="tab-item ${active === 'earth' ? 'is-active' : ''}" data-target="earth">
                    <a>Earth</a>
                </li>
                <li class="tab-item ${active === 'mars' ? 'is-active' : ''}" data-target="mars">
                    <a>Mars</a>
                </li>
                <li class="tab-item ${active === 'beyond' ? 'is-active' : ''}" data-target="beyond">
                    <a>And Beyond...</a>
                </li>
            </ul>
        </div>
        <div id="earth" class="tab-content ${active === 'earth' ? 'is-active' : ''}">
            ${active === 'earth' ? EarthTabContent(store) : ''}
        </div>
        <div id="mars" class="tab-content ${active === 'mars' ? 'is-active' : ''}">
            ${active === 'mars' ? MarsTabContent(store) : ''}
        </div>
        <div id="beyond" class="tab-content ${active === 'beyond' ? 'is-active' : ''}">
            ${active === 'beyond' ? BeyondTabContent(store) : ''}
        </div>
    `
};

/**
 * @description Returns the EarthTabContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the EarthTabContent
 */
const EarthTabContent = (state) => {
    return `${state}`;
};

/**
 * @description Returns the MarsTabContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the MarsTabContent
 */
const MarsTabContent = (state) => {
    return `${state}`;
};

/**
 * @description Returns the BeyondTabContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the BeyondTabContent
 */
const BeyondTabContent = (state) => {
    const date = state.apod.reqDate || apodFormatDate(new Date());
    const image = updateApodImage(date, state);

    if (image) {
        return `
            <div class="columns">
                <div class="column has-text-centered">
                    <img class="apod-img" src="${image.url}" alt="Astronomy picture of the day for ${image.date}" />
                </div>
                <div class="column is-narrow">
                    <div class="apod-info">
                        <div class="block">
                            <p class="has-text-weight-semibold">Date:</p>
                            <input id="apod-calendar" type="date">
                        </div>  
                        <div class="block">
                            <p class="has-text-weight-semibold">Title:</p>
                            ${image.title}
                        </div>
                        <div class="block has-text-justified">
                            <p class="has-text-weight-semibold">Image Details:</p>
                            ${image.explanation}
                        </div>
                        <div class="block">
                            <p class="has-text-weight-semibold">Copyright:</p>
                            ${image.copyright}
                        </div>                                                                      
                    </div>
                </div>
            </div>
        `
    }
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

export {NavBar, TabPanel, Footer};
