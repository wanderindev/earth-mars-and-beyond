import {
  apodDateToString,
  updateApodDisabledDates,
  updateApodImage,
  updateEpicImages,
  updateSelectedRoverInfo,
  updateRoverPhotos,
} from "./utils.js";

/**
 * @description Returns the NavBar component
 * @return {string} html - The HTML for the NavBar
 */
const NavBar = (state) => {
  const active = state.menu.active;
  return `
        <div class="navbar-brand">
            <a class="navbar-item has-text-black is-uppercase has-text-weight-semibold" href="#">
                <img src="./assets/images/logo.png" alt="">
            </a>
            
            <a id="burgers" role="button" class="navbar-burger" aria-label="menu" 
               aria-expanded="false" data-target="collapsed-menu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="collapsed-menu" class="navbar-menu">
            <div class="navbar-end">  
                <a class="navbar-item menu-item" data-target="earth">Earth</a>  
                <a class="navbar-item menu-item" data-target="mars" data-rover="curiosity">Mars > Curiosity Rover</a>
                <a class="navbar-item menu-item" data-target="mars" 
                   data-rover="opportunity">Mars > Opportunity Rover</a>
                <a class="navbar-item menu-item" data-target="mars" data-rover="spirit">Mars > Spirit Rover</a>
                <a class="navbar-item menu-item" data-target="beyond">And Beyond...</a>
                <a class="navbar-item menu-item" data-target="about">About</a>
            </div>
        </div>        
        <div id="menu" class="navbar-menu">
            <div class="navbar-end">  
                <a class="navbar-item menu-item earth ${
                  active === "earth" ? "is-active" : ""
                }" data-target="earth">Earth</a>  
                <div class="navbar-item has-dropdown is-hoverable mars">
                    <a class="navbar-link" data-target="mars">Mars</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item menu-item curiosity" data-target="mars" 
                           data-rover="curiosity">Curiosity Rover</a>
                        <a class="navbar-item menu-item opportunity" data-target="mars" 
                           data-rover="opportunity">Opportunity Rover</a>
                        <a class="navbar-item menu-item spirit" data-target="mars" 
                           data-rover="spirit">Spirit Rover</a>
                    </div>
                </div>
                <a class="navbar-item menu-item beyond ${
                  active === "beyond" ? "is-active" : ""
                }" data-target="beyond">And Beyond...</a>
                <a class="navbar-item menu-item about ${
                  active === "about" ? "is-active" : ""
                }" data-target="about">About</a>
            </div>
        </div>
    `;
};

/**
 * @description Returns the PageContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the PageContent
 */
const PageContent = (state) => {
  const active = state.menu.active;

  return `
        ${active === "earth" ? EarthPage(state) : ""}
        ${active === "mars" ? MarsPage(state) : ""}
        ${active === "beyond" ? BeyondPage(state) : ""}
        ${active === "about" ? AboutPage(state) : ""}
    `;
};

/**
 * @description Returns the EarthPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the EarthPage
 */
const EarthPage = (state) => {
  if (!state.epic.date) {
    // noinspection JSUnusedLocalSymbols
    const newState = updateEpicImages(state);
    return ``;
  } else {
    const slides = state.epic.images
      .map((image) => {
        return '<div><img src="' + image.url + '" width="90%" alt=""/></div>';
      })
      .reduce((acc, slide) => acc + slide, "");

    return `
            <div id="earth" class="${
              state.menu.active === "earth" ? "is-active" : ""
            }">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title is-size-1-desktop is-size-2-mobile">Planet Earth <br>
                        <span class="subtitle is-4">on ${
                          state.epic.date
                        }</span></h1>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-half-tablet is-offset-one-quarter-tablet has-text-centered">
                        <div id="carousel" class="glider-contain">
                            <div class="glider">
                                ${slides}
                            </div>
                            <button aria-label="Previous" class="glider-prev">«</button>
                            <button aria-label="Next" class="glider-next">»</button>
                            <div role="tablist" class="dots"></div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="block epic-exp has-text-justified">
                            <p><strong>The Deep Space Climate Observatory (DSCOVR)</strong> is an NOAA space weather, 
                            space climate, and Earth observation satellite.  SpaceX launched it on <strong>February 11, 
                            2015</strong>, from Cape Canaveral, and became NOAA's first operational deep-space 
                            satellite.  DSCOVR is Earth's primary warning system in the event of solar magnetic 
                            storms.</p>
                            <p>Onboard the satellite, there's the <strong>Earth Polychromatic Imaging Camera 
                            (EPIC)</strong>, which takes images of Earth's sunlit side for monitoring purposes. EPIC 
                            took the pictures on this page on <strong>${
                              state.epic.date
                            }</strong>, from a distance 
                            of roughly one million miles.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
};

/**
 * @description Returns the MarsPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the MarsPage
 */
const MarsPage = (state) => {
  const roverInfo = state.rovers.selectedRoverInfo;
  if (state.rovers.selectedRover !== roverInfo.name.toLowerCase()) {
    // noinspection JSUnusedLocalSymbols
    const newState = updateSelectedRoverInfo(state);
    return ``;
  }else if (state.rovers.photos.date !== state.rovers.photos.reqDate) {
    // noinspection JSUnusedLocalSymbols
    const newState = updateRoverPhotos(state);
    return ``;
  } else {
    const slides = state.rovers.photos.images
      .map((image) => {
        return '<div><img src="' + image + '" width="90%" alt="" /></div>';
      })
      .reduce((acc, slide) => acc + slide, "");
    return `
            <div id="mars">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title is-size-1-desktop is-size-2-mobile">
                            Photos From The ${roverInfo.name} Rover<br>
                            <span class="subtitle is-4">on ${
                              state.rovers.photos.date
                            }</span>
                        </h1>
                    </div>
                </div>
                <div class="columns">
                    <div class="column carousel-column has-text-centered">
                        <div id="carousel" class="glider-contain">
                            <div class="glider">
                                ${slides}
                            </div>
                            <button aria-label="Previous" class="glider-prev">«</button>
                            <button aria-label="Next" class="glider-next">»</button>
                            <div role="tablist" class="dots"></div>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="mars-info">
                            <div class="block">
                                <input class="input is-hidden" id="mars-calendar" type="date">
                            </div>                                                                
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="block mars-exp has-text-justified">
                            The <strong>${
                              roverInfo.name
                            }</strong> rover was launched from Cape Canaveral 
                            on <strong>${
                              roverInfo.launchDate
                            }</strong>, and landed on Mars on 
                            <strong>${roverInfo.landingDate}</strong>.   
                            ${
                              roverInfo.status === "complete"
                                ? "The rover completed its mission on <strong>" +
                                  apodDateToString(
                                    state.rovers.selectedRoverInfo.completedDate
                                  ) +
                                  "</strong>. While it was active, it sent "
                                : "The rover is still active in Mars, and has sent "
                            } 
                            a total of <strong>198439</strong> photos to Earth.
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
};

/**
 * @description Returns the BeyondPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the BeyondPage
 */
const BeyondPage = (state) => {
  const date = state.apod.reqDate || apodDateToString(new Date());
  // noinspection JSUnusedLocalSymbols
  const newStore = updateApodDisabledDates(state.apod);
  const image = updateApodImage(date, state);

  if (!image) {
    return ``;
  } else {
    return `
            <div id="beyond" class="${
              state.menu.active === "beyond" ? "is-active" : ""
            }">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title is-size-1-desktop is-size-2-mobile">
                          ${image.title}<br>
                          <span class="subtitle is-4">
                            ${image.copyright ? " by " + image.copyright : ""}
                          </span>
                        </h1>
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
        `;
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
                    Crafted with <span class="icon"><i class="fas fa-heart has-text-danger"></i></span> 
                    by an Earthling near you.
                </p>
                <br>
                <p>
                    <a class="icon" href="https://github.com/wanderindev" target="blank">
                        <i class="fab fa-github fa-lg"></i>
                    </a> 
                    <a class="icon" href="https://www.linkedin.com/in/javierfeliu/" target="blank">
                        <i class="fab fa-linkedin fa-lg"></i>
                    </a>
                    <a class="icon" href="https://twitter.com/JavierFeliuA" target="blank">
                        <i class="fab fa-twitter fa-lg"></i>
                    </a>
                </p>
            </div>
        </div>
    `;
};

export { NavBar, PageContent, Footer };
