import {getImageOfTheDay} from './apiCalls.js';
import {store, updateStore} from './client.js'


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
}

/**
 * @description Returns the TabPanel component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the TabPanel
 */
const TabPanel = (state) => {
    const active = state.tabs.active;

    if (active === 'earth') {
        return `
            <div class="tabs is-boxed is-centered">
                <ul>
                    <li class="tab-item is-active" data-target="earth"><a>Earth</a></li>
                    <li class="tab-item" data-target="mars"><a>Mars</a></li>
                    <li class="tab-item" data-target="beyond"><a>And Beyond...</a></li>
                </ul>
            </div>
            <div id="earth" class="tab-content is-active">${EarthTabContent(store)}</div>
        `
    } else if (active === 'mars') {
        return `
            <div class="tabs is-boxed is-centered">
                <ul>
                    <li class="tab-item" data-target="earth"><a>Earth</a></li>
                    <li class="tab-item is-active" data-target="mars"><a>Mars</a></li>
                    <li class="tab-item" data-target="beyond"><a>And Beyond...</a></li>
                </ul>
            </div>
            <div id="mars" class="tab-content is-active">${MarsTabContent(store)}</div>
        `
    } else {
        return `
            <div class="tabs is-boxed is-centered">
                <ul>
                    <li class="tab-item" data-target="earth"><a>Earth</a></li>
                    <li class="tab-item" data-target="mars"><a>Mars</a></li>
                    <li class="tab-item is-active" data-target="beyond"><a>And Beyond...</a></li>
                </ul>
            </div>
            <div id="beyond" class="tab-content is-active">${BeyondTabContent(store)}</div>
        `
    }
}

/**
 * @description Returns the EarthTabContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the EarthTabContent
 */
const EarthTabContent = (state) => {
    return `earth content goes here`;
}

/**
 * @description Returns the MarsTabContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the MarsTabContent
 */
const MarsTabContent = (state) => {
    return `mars content goes here`;
}

/**
 * @description Returns the BeyondTabContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the BeyondTabContent
 */
const BeyondTabContent = (state) => {
    const imgDate = state.apod.date;
    const imgUrl = state.apod.url;
    let reqDate = state.apod.reqDate;

    if (imgDate === reqDate && state.apod.media_type === "video") {
        const sStart = reqDate.substring(0, 8);
        const sEnd = String(parseInt(reqDate.substring(8, 10)) - 1).padStart(2, '0');
        reqDate = sStart + sEnd;
    }

    if (!imgUrl || imgDate !== reqDate) {
        getImageOfTheDay(reqDate).then(resp => {
            resp.image.reqDate = reqDate;
            updateStore(store, {apod: resp.image});
        });
    }

    return `
        <div class="columns">
            <div class="column has-text-centered">
                <img class="apod-img" src="${state.apod.url}" alt="Astronomy picture of the day for ${imgDate}" />
            </div>
            <div class="column is-narrow">
                <div class="apod-info">
                    <div class="block">
                        <p class="has-text-weight-semibold">Date:</p>
                        <input id="apod-calendar" type="date">
                    </div>  
                    <div class="block">
                        <p class="has-text-weight-semibold">Title:</p>
                        ${state.apod.title}
                    </div>
                    <div class="block has-text-justified">
                        <p class="has-text-weight-semibold">Image Details:</p>
                        ${state.apod.explanation}
                    </div>
                    <div class="block">
                    
                    </div>
                    <div class="block">
                    
                    </div>                                                                         
                </div>
            </div>
        </div>
    `
}

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
}

export {NavBar, TabPanel, Footer};
