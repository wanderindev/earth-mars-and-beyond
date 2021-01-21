import {Footer, NavBar, TabPanel} from './components.js';
import {setListeners} from "./listeners.js";
import {store} from './store.js';
import {updateApodBlockedDates} from "./utils.js";


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
const updateAndRender = (store, newState) => {
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
};

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
};

/**
 * @description Calls the render() function on window.load.
 */
window.addEventListener('load', () => {
    render(root, store);


    updateApodBlockedDates(store.apod);
});

export {updateAndRender, updateStore};