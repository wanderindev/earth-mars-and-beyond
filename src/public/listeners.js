import {apodStringToDate, getApodDisabledDates} from './utils.js'
import {store} from "./store.js";
import {updateAndRender} from "./client.js";


/**
 * @description Attaches event listeners to various DOM elements.  This function is called in the render() function.
 */
const setListeners = (state) => {
    // Adds event listerners after the page is rendered
    setTimeout(() => {
        // Gets reference to DOM elements for event listeners
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        const $menuItems = Array.prototype.slice.call(document.querySelectorAll('.menu-item'), 0);
        const $apodCalendar = document.querySelector('#apod-calendar');
        const $calendars = bulmaCalendar.attach('[type="date"]', {
            type: 'date',
            color: 'info',
            lang: 'en',
            dateFormat: 'YYYY-MM-DD',
            showHeader: false,
            showClearButton: false,
            // startDate: apodStringToDate(state.apod.reqDate),
            displayMode: 'inline',
            minDate: new Date(1995, 5, 16),
            maxDate: new Date(),
            disabledDates: getApodDisabledDates(state.apod)
        });

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
        if ($menuItems.length > 0) {
            $menuItems.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;

                    updateAndRender(store, {menu: {active: target}});
                });
            });
        }

        // Loop on each calendar initialized
        $calendars.forEach(calendar => {
            // Add listener to select event
            calendar.on('select', date => {
                //console.log(date);
            });
        });

        // Accesses the APOD calendar and adds a select event listener
        if ($apodCalendar) {
            $apodCalendar.bulmaCalendar.on('select', datepicker => {
                const selectedDate = datepicker.data.value();

                if (selectedDate !== state.apod.reqDate) {
                    const newApod = Object.assign(state.apod, {reqDate: selectedDate});
                    return updateAndRender(store, {apod: newApod});
                }
            });
        }

    }, 1000);
};

export {setListeners};