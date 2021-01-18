import {NavBar, TabPanel, Footer} from './components.js';
import {apodFormatDate} from './utils.js'

const store = {
    tabs: {active: 'earth'},
    apod: {reqDate: apodFormatDate(new Date())},
    rovers: ['Curiosity', 'Opportunity', 'Spirit']
};

const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
}

const render = async (root, state) => {
    root.innerHTML = App(state);
    setListeners();
}

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

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
});

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