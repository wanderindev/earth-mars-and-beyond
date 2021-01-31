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
            <div id="earth">
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
  } else if (state.rovers.photos.date !== state.rovers.photos.reqDate) {
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
  const newStore = updateApodDisabledDates(state);
  const image = updateApodImage(date, state);

  if (!image) {
    return ``;
  } else {
    return `
            <div id="beyond">
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
  return `
            <div id="about">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title is-size-1-desktop is-size-2-mobile">
                          About Earth, Mars, and Beyond...<br>
                        </h1>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="block about-exp has-text-justified">
                            <p>
                            This website is my second project submission for the <em>Udacity Intermediate 
                            JavaScript Nanodegree</em>.  In this project, I applied the lessons learned in 
                            the <em>Functional Programming in JavaScript</em> course.                            
                            </p>
                            <h2 class="title is-size-3-desktop is-size-4-mobile">
                              The Big Picture
                            </h2>
                            <p>
                            For this project, I had to create a website that consumes from various 
                            NASA APIs.  The goal is to apply the concepts and practices learned in 
                            the functional programming course, such as:
                            </p>
                            <ul>
                                <li>Using pure functions</li>
                                <li>Supporting immutability with Immutable JS</li>
                                <li>Iterating over, reshaping, and accessing information from complex API responses</li>
                                <li>Using ES6 constructs like <em>const</em>, <em>let</em>, <em>arrow functions</em>, 
                                and <em>the new Array methods</em></li>
                            </ul>
                            <h2 class="title is-size-3-desktop is-size-4-mobile">
                              The APIs
                            </h2>
                            <ul>
                                <li>
                                  The <em>Earth</em> section consumes from NASA's EPIC API.  EPIC stands for <em>Earth 
                                  Polychromatic Imaging Camera</em>.  The camera is onboard a deep-space weather satellite 
                                  located roughly one million miles from Earth.
                                </li>
                                <li>
                                  The <em>Mars</em> section consumes from NASA's Mars Rover Photos API.  We can 
                                  retrieve photos sent by the <em>Spirit</em>, <em>Opportunity</em>, and <em>Curiosity</em> 
                                  rovers from the Red Planet from this API, as well as general information about each 
                                  rover's mission.
                                </li>
                                <li>
                                  The <em>Beyond</em> section consumes from NASA's APOD API.  APOD stands for 
                                  <em>Astronomy Picture of the Day</em>.  In this section, you will find beautiful 
                                  pictures from the cosmos and exciting information about them.
                                </li>
                            </ul>
                            <h2 class="title is-size-3-desktop is-size-4-mobile">
                              Useful Links
                            </h2>
                            <p>
                            <ul>
                                <li>You can find my code in <a href="https://github.com/wanderindev/earth-mars-and-beyond" 
                                target="_blank">this GitHub repository</a></li>
                                <li>For the starter code from Udacity, visit <a href="https://github.com/udacity/nd032-c2-functional-programming-with-javascript-starter/tree/project" 
                                target="_blank">this repository</a></li>
                                <li>The nanodegree home page is <a href="https://www.udacity.com/course/intermediate-javascript-nanodegree--nd032" 
                                target="_blank">here</a></li>
                                <li>Find more information about these and other NASA APIs <a href="https://api.nasa.gov/" 
                                target="_blank">here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
