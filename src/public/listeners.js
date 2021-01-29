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
        const $navbarBurgers = document.getElementById('burgers');
        const $menuItems = Array.prototype.slice.call(document.querySelectorAll('.menu-item'), 0);
        const $apodCalendar = document.querySelector('#apod-calendar');
        const $marsCalendar = document.querySelector('#mars-calendar');
        const $apodCalendars = bulmaCalendar.attach('#apod-calendar', {
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
        const $marsCalendars = bulmaCalendar.attach('#mars-calendar', {
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
        const $carousel = document.querySelector('#carousel');

        // Adds event listener for navigation burgers
        if ($navbarBurgers) {
            $navbarBurgers.addEventListener('click', () => {
                const target = $navbarBurgers.dataset.target;
                const $target = document.getElementById(target);

                $navbarBurgers.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        }

        // Adds event listener for tabs
        if ($menuItems.length > 0) {
            $menuItems.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const rover = el.dataset.rover;
                    //const $burger = document.querySelector('.navbar-burger');
                    //const $menu = document.getElementById('collapsed-menu');

                    //$burger.classList.remove('is-active');
                    //$menu.classList.remove('is-active');

                    updateAndRender(store, {
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

        // Loop on each calendar initialized
        /*$calendars.forEach(calendar => {
            // Add listener to select event
            calendar.on('select', date => {
                //console.log(date);
            });
        });*/

        // Accesses the APOD calendar and adds a select event listener
        if ($apodCalendar) {
            $apodCalendar.bulmaCalendar.datePicker.on('select', datepicker => {
                const selectedDate = datepicker.data.value();

                if (selectedDate !== state.apod.reqDate) {
                    const newApod = Object.assign(state.apod, {reqDate: selectedDate});
                    return updateAndRender(store, {apod: newApod});
                }
            });
        }

        // Accesses the Mars calendar and adds a select event listener
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

        if ($carousel) {
            const glider = new Glider(document.querySelector('.glider'), {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: '.dots',
                arrows: {
                    prev: '.glider-prev',
                    next: '.glider-next'
                }
            });
        }

    }, 1000);
};

export {setListeners};