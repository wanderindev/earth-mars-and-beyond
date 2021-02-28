import { apodDateToString, apodStringToDate, getApodDisabledDates } from "./utils.js";
import { store } from "./store.js";
import { updateAndRender } from "./client.js";

const setupClickHandlers = (state) => {
  document.addEventListener("click", (event) => {
    const el = event.target;
    const $collapsedMenu = document.getElementById("collapsed-menu");
    const $burgers = document.getElementById("burgers");

    // Handles click on the navbar and menu items
    if (el.matches(".navbar-item.menu-item")) {
      const target = el.dataset.target;
      const rover = el.dataset.rover;
      const today = new Date();
      let threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 6)
      const date =
        rover === "curiosity" || rover === "perseverance"
          ? apodDateToString(threeDaysAgo)
          : rover === "opportunity"
          ? "2018-06-05"
          : "2010-03-03";

      if (
        target !== state.menu.active ||
        rover !== state.rovers.selectedRover
      ) {
        return updateAndRender(store, {
          menu: { active: target },
          apod: state.apod,
          epic: state.epic,
          rovers: {
            selectedRover: rover,
            selectedRoverInfo: state.rovers.selectedRoverInfo,
            photos: {
              reqDate: date,
              date: "",
              images: state.rovers.images,
            },
          },
        });
      }
    }

    // Handles click on the navbar dropdowns
    if (el.parentNode.matches("#mars-dropdown")) {
      el.parentNode.classList.add("is-active");
    }

    // Handles click on the navbar burgers
    if (
      (el.parentNode.matches("#burgers") || el.matches("#burgers")) &&
      !$burgers.getAttribute("clickListenerAdded")
    ) {
      $burgers.setAttribute("clickListenerAdded", true);
      $burgers.classList.toggle("is-active");
      $collapsedMenu.classList.toggle("is-active");
    }
  });
};

/**
 * @description Initializes the calendar and glider components after DOM is ready
 * @param {object} state - The application's state
 */
const initComponents = (state) => {
  setTimeout(() => {
    // Inits the APOD calendar
    const $apodCalendar = document.querySelector("#apod-calendar");
    // noinspection JSUnresolvedVariable
    bulmaCalendar.attach("#apod-calendar", {
      type: "date",
      color: "black",
      isRange: false,
      lang: "en",
      dateFormat: "YYYY-MM-DD",
      showHeader: false,
      showClearButton: false,
      startDate: apodStringToDate(state.apod.reqDate),
      displayMode: "inline",
      minDate: new Date(1995, 5, 16),
      maxDate: new Date(),
      disabledDates: getApodDisabledDates(state.apod),
    });
    if ($apodCalendar) {
      $apodCalendar.bulmaCalendar.datePicker.on("select", (datepicker) => {
        const selectedDate = datepicker.data.value();

        if (selectedDate !== state.apod.reqDate) {
          const newApod = Object.assign(state.apod, { reqDate: selectedDate });
          return updateAndRender(store, {
            menu: state.menu,
            apod: newApod,
            epic: state.epic,
            rovers: state.rovers,
          });
        }
      });
    }

    // Inits the Mars rovers calendar
    const $marsCalendar = document.querySelector("#mars-calendar");
    // noinspection JSUnresolvedVariable
    bulmaCalendar.attach("#mars-calendar", {
      type: "date",
      color: "black",
      isRange: false,
      lang: "en",
      dateFormat: "YYYY-MM-DD",
      showHeader: false,
      showClearButton: false,
      startDate: apodStringToDate(state.rovers.photos.reqDate),
      displayMode: "inline",
      minDate: new Date(state.rovers.selectedRoverInfo.minDate),
      maxDate: new Date(state.rovers.selectedRoverInfo.maxDate),
      disabledDates: state.rovers.selectedRoverInfo.disabledDates,
    });
    if ($marsCalendar) {
      $marsCalendar.bulmaCalendar.datePicker.on("select", (datepicker) => {
        const selectedDate = datepicker.data.value();

        if (selectedDate !== state.rovers.photos.reqDate) {
          const newRover = Object.assign(state.rovers, {
            selectedRover: state.rovers.selectedRover,
            selectedRoverInfo: state.rovers.selectedRoverInfo,
            photos: {
              reqDate: selectedDate,
              date: state.rovers.photos.reqDate,
              images: state.rovers.photos.images,
            },
          });
          return updateAndRender(store, {
            menu: state.menu,
            apod: state.apod,
            epic: state.epic,
            rovers: newRover,
          });
        }
      });
    }

    // Inits the photo carousels
    const $carousel = document.querySelector("#carousel");
    if ($carousel) {
      // noinspection JSUnresolvedFunction
      new Glider(document.querySelector(".glider"), {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next",
        },
      });
    }
  }, 500);
};

export { setupClickHandlers, initComponents };
