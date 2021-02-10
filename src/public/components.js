import {
  navbarTemplate,
  earthPageTemplate,
  marsPageTemplate,
} from "./templates.js";

import {
  apodDateToString,
  dateToStringConverter,
  getDisabledDates,
  getApodImage,
  getEpicInfo,
  getRoverInfo,
  getRoverPhotos,
} from "./utils.js";

/**
 * @description Returns the NavBar component
 * @return {string} html - The HTML for the NavBar
 */
const NavBar = (state) => {
  return navbarTemplate(state.menu.active);
};

/**
 * @description Returns the PageContent component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the PageContent
 */
const PageContent = async (state) => {
  const active = state.menu.active;
  return `
    ${active === "earth" ? await EarthPage(state) : ""}
    ${active === "mars" ? await MarsPage(state) : ""}
    ${active === "beyond" ? BeyondPage(state) : ""}
    ${active === "about" ? AboutPage() : ""}
  `;
};

/**
 * @description Returns the EarthPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the EarthPage
 */
const EarthPage = (state) => {
  return getEpicInfo(state).then((epic) => {
    const date = epic.date;
    const slides = epic.images
      .map((image) => {
        return '<div><img src="' + image.url + '" width="90%" alt=""/></div>';
      })
      .reduce((acc, slide) => acc + slide, "");
    return earthPageTemplate(date, slides);
  });
};

/**
 * @description Returns the MarsPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the MarsPage
 */
const MarsPage = (state) => {
  return getRoverInfo(state).then((roverInfo) => {
    const name = roverInfo.selectedRoverInfo.name;
    const launchDate = roverInfo.selectedRoverInfo.launchDate;
    const landingDate = roverInfo.selectedRoverInfo.landingDate;
    const completeDate = roverInfo.selectedRoverInfo.completeDate;
    const status = roverInfo.selectedRoverInfo.status;
    const totalPhotos = roverInfo.selectedRoverInfo.totalPhotos;
    const date = roverInfo.photos.date;
    const slides = roverInfo.photos.images
      .map((image) => {
        return '<div><img src="' + image + '" width="90%" alt="" /></div>';
      })
      .reduce((acc, slide) => acc + slide, "");
    return marsPageTemplate(
      name,
      date,
      launchDate,
      landingDate,
      completeDate,
      status,
      totalPhotos,
      slides
    );
  });
};

/**
 * @description Returns the BeyondPage component
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the BeyondPage
 */
const BeyondPage = (state) => {
  const date =
    state.apod.reqDate || apodDateToString(new Date(), dateToStringConverter);
  const newStore = getDisabledDates(state);
  const image = getApodImage(date, state);
  if (!image) {
    return ``;
  }
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
};

/**
 * @description Returns the AboutPage component
 * @return {string} html - The HTML for the AboutPage
 */
const AboutPage = () => {
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
