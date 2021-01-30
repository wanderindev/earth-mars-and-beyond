import {apodStringToDate, getApodDisabledDates} from './utils.js'
import {store} from "./store.js";
import {updateAndRender} from "./client.js";


/**
 * @description Attaches event listeners to various DOM elements.  This function is called from the render() function.
 * @param {object} state - The application's state
 */
const setListeners = (state) => {
    // Adds event listeners after the page is rendered
    setTimeout(() => {
        // Adds listeners for the navbar and menu items
        const $navbarBurgers = document.getElementById('burgers');
        const $menuItems = Array.prototype.slice.call(document.querySelectorAll('.menu-item'), 0);
        if ($navbarBurgers && !$navbarBurgers.getAttribute('clickListenerAdded')) {
            $navbarBurgers.setAttribute('clickListenerAdded', true);
            $navbarBurgers.addEventListener('click', () => {
                const $target = document.getElementById($navbarBurgers.dataset.target);

                $navbarBurgers.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        }
        if ($menuItems.length > 0) {
            $menuItems.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const rover = el.dataset.rover;

                    return updateAndRender(store, {
                        menu: {active: target},
                        rovers: {
                            selectedRover: rover,
                            selectedRoverInfo: state.rovers.selectedRoverInfo,
                            photos: state.rovers.photos
                        }
                    });
                });
            });
        }

        // Adds listener for the APOD calendar
        const $apodCalendar = document.querySelector('#apod-calendar');
        bulmaCalendar.attach('#apod-calendar', {
            type: 'date',
            color: 'black',
            isRange: false,
            lang: 'en',
            dateFormat: 'YYYY-MM-DD',
            showHeader: false,
            showClearButton: false,
            startDate: apodStringToDate(state.apod.reqDate),
            displayMode: 'inline',
            minDate: new Date(1995, 5, 16),
            maxDate: new Date(),
            disabledDates: getApodDisabledDates(state.apod)
        });
        if ($apodCalendar) {
            $apodCalendar.bulmaCalendar.datePicker.on('select', datepicker => {
                const selectedDate = datepicker.data.value();

                if (selectedDate !== state.apod.reqDate) {
                    const newApod = Object.assign(state.apod, {reqDate: selectedDate});
                    return updateAndRender(store, {apod: newApod});
                }
            });
        }

        // Adds listener for the Mars rovers calendar
        const $marsCalendar = document.querySelector('#mars-calendar');
        bulmaCalendar.attach('#mars-calendar', {
            type: 'date',
            color: 'black',
            isRange: false,
            lang: 'en',
            dateFormat: 'YYYY-MM-DD',
            showHeader: false,
            showClearButton: false,
            startDate: apodStringToDate(state.rovers.photos.reqDate),
            displayMode: 'inline',
            minDate: new Date(state.rovers.selectedRoverInfo.minDate),
            maxDate: new Date(state.rovers.selectedRoverInfo.maxDate),
            disabledDates: state.rovers.selectedRoverInfo.disabledDates
        });
        if ($marsCalendar) {
            $marsCalendar.bulmaCalendar.datePicker.on('select', datepicker => {
                const selectedDate = datepicker.data.value();

                if (selectedDate !== state.rovers.photos.reqDate) {
                    const newRover = Object.assign(state.rovers, {
                        selectedRover: state.rovers.selectedRover,
                        selectedRoverInfo: state.rovers.selectedRoverInfo,
                        photos: {
                            reqDate: selectedDate,
                            date: state.rovers.photos.reqDate,
                            images: state.rovers.photos.images
                        }
                    });
                    return updateAndRender(store, {rovers: newRover});
                }
            });
        }

        // Adds listener for the photo carousels
        const $carousel = document.querySelector('#carousel');
        if ($carousel) {
            new Glider(document.querySelector('.glider'), {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: {
                    prev: '.glider-prev',
                    next: '.glider-next'
                }
            });
        }
    }, 500);
};

export {setListeners};