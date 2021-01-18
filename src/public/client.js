import {NavBar, TabPanel, Footer} from './components.js';
import {apodFormatDate} from './utils.js'

const store = {
    tabs: {active: 'earth'},
    apod: {reqDate: apodFormatDate(new Date())},
    rovers: ['Curiosity', 'Opportunity', 'Spirit']
};

const root = document.getElementById('root');

/**
 * @description Updates the store
 * @param {object} store - The DOM element where the page will be rendered
 * @param {object} newState - The application's state
 */
const updateStore = (store, newState) => {
    return Object.assign(store, newState);
}

/**
 * @description Updates the store and renders the page
 * @param {object} store - The DOM element where the page will be rendered
 * @param {object} newState - The application's state
 */
const updateStoreAndRender = (store, newState) => {
    store = updateStore(store, newState);
    render(root, store);
}

/**
 * @description Renders the entire page
 * @param {object} root - The DOM element where the page will be rendered
 * @param {object} state - The application's state
 */
const render = async (root, state) => {
    root.innerHTML = App(state);
    setListeners();
}

/**
 * @description Returns the HTML for the entire page
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the entire page
 */
const App = (state) => {
    return `
        <header></header>
        <main>
            <nav class="navbar" role="navigation" aria-label="main navigation">${NavBar()}</nav>
            <div>${TabPanel(state)}</div>
        </main>
        <footer class="footer">${Footer()}</footer>
    `
}

/**
 * @description Calls the render() function on window.load.
 */
window.addEventListener('load', () => {
    render(root, store);
});


/**
 * @description Attaches event listeners to various DOM elements.  This function is called in the render() function.
 */
const setListeners = () => {
    // Adds event listerners after the page is rendered
    setTimeout(() => {
        // Gets reference to DOM elements for event listeners
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        const $tabItems = Array.prototype.slice.call(document.querySelectorAll('.tab-item'), 0);
        const $calendars = bulmaCalendar.attach('[type="date"]', {});
        const $apodCalendar = document.querySelector('#apod-calendar');

        // Adds event listener for navigation burgers
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }

        // Adds event listener for tabs
        if ($tabItems.length > 0) {
            $tabItems.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;

                    updateStore(store, {tabs: {active: target}});
                });
            });
        }

        // Initializes all Bulma calendars
        $calendars.forEach(calendar => {
            // Add listener to select event
            calendar.on('select', date => {
                console.log(date);
            });
        });

        // Accesses the APOD calendar
        if ($apodCalendar) {
            $apodCalendar.bulmaCalendar.on('select', datepicker => {
                console.log(datepicker.data.value());
            });
        }

    }, 1000);
}

export {store, updateStore};