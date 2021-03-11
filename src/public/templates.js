/**
 * @description This module contains template literals representing the HTML markup for the components
 * @module ./templates.js
 */

/**
 * @description Returns the HTML for the NavBar component
 * @param {string} active - The name of the active page
 * @return {string} html - The HTML for the NavBar component
 */
const navbarTemplate = (active) => {
  return `
    <div class="navbar-brand">
        <a class="navbar-item has-text-black is-uppercase has-text-weight-semibold" href="index.html">
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
            <a class="navbar-item menu-item" data-target="mars" data-rover="perseverance">Mars > Perseverance Rover</a>
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
            <div id="mars-dropdown" class="navbar-item has-dropdown mars">
                <a class="navbar-link" data-target="mars">Mars</a>
                <div class="navbar-dropdown">
                    <a class="navbar-item menu-item perseverance" data-target="mars" 
                       data-rover="perseverance">Perseverance Rover</a>
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
 * @description Returns the HTML for the EarthPage component
 * @param {string} date - A string representing the date of the EPIC photos to be shown
 * @param {string} slides - The HTML for the EPIC photo slides
 * @return {string} html - The HTML for the EarthPage component
 */
const earthPageTemplate = (date, slides) => {
  return `
    <div id="earth">
        <div class="columns">
            <div class="column has-text-centered">
                <h1 class="title is-size-1-desktop is-size-2-mobile">Planet Earth <br>
                <span class="subtitle is-4">on ${date}</span></h1>
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
                    took the pictures on this page on <strong>${date}</strong>, from a distance 
                    of roughly one million miles.</p>
                </div>
            </div>
        </div>
    </div>
  `;
};

/**
 * @description Returns the HTML for the EarthPage component
 * @param {string} name - The name of the rover
 * @param {string} date - A string representing the date of the rover photos to be shown
 * @param {string} launchDate - A string representing the rover's launch date
 * @param {string} landingDate - A string representing the rover's landing date
 * @param {string} completedDate - A string representing the rover's mission complete date
 * @param {string} status - The mission status
 * @param {number} totalPhotos - The total number of photos sent by the rover
 * @param {string} slides - The HTML for the rover photo slides
 * @return {string} html - The HTML for the MarsPage component
 */
const marsPageTemplate = (
  name,
  date,
  launchDate,
  landingDate,
  completedDate,
  status,
  totalPhotos,
  slides
) => {
  return `
    <div id="mars">
        <div class="columns">
            <div class="column has-text-centered">
                <h1 class="title is-size-1-desktop is-size-2-mobile">
                    Photos from the ${name} Rover<br>
                    <span class="subtitle is-4">on ${date}</span>
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
                    The <strong>${name}</strong> rover was launched from Cape Canaveral 
                    on <strong>${launchDate}</strong>, and landed on Mars on 
                    <strong>${landingDate}</strong>.   
                    ${
                      status === "complete"
                        ? "The rover completed its mission on <strong>" +
                          completedDate +
                          "</strong>. While it was active, it sent "
                        : "The rover is still active in Mars, and has sent "
                    } 
                    a total of <strong>${totalPhotos}</strong> photos to Earth.
                </div>
            </div>
        </div>
    </div>
  `;
};

/**
 * @description Returns the HTML for the BeyondPage component
 * @param {object} image - An object with the image information to display
 * @return {string} html - The HTML for the BeyondPage component
 */
const beyondPageTemplate = (image) => {
  console.log("template", image);
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
            padding-bottom: 100%;
        }            
    </style>
  `;
};

/**
 * @description Returns the HTML for the AboutPage component
 * @return {string} html - The HTML for the AboutPage component
 */
const aboutPageTemplate = () => {
  return `
    <div id="about">
        <div class="columns">
            <div class="column has-text-centered">
                <h1 class="title is-size-1-desktop is-size-2-mobile">
                  About Earth, Mars and Beyond...<br>
                </h1>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="block about-exp has-text-justified">
                    <p>
                    Humans, in general, are fascinated by astronomy.  I certainly am.  In fact, among all sciences, 
                    astronomy proves to be one of the most popular fields.                            
                    </p>
                    <p>
                    NASA caters to astronomy's hold on human imagination by exposing to the general public a series of 
                    interesting APIs.                            
                    </p>
                    <p>
                    This website consumes information from those APIs and presents it in a way that renders 
                    tribute to our universe and the outstanding human achievements in space exploration.                            
                    </p>
                    <h2 class="title is-size-3-desktop is-size-4-mobile">
                      The Big Picture
                    </h2>
                    <p>
                    This is an experimental website.  My goal for the site was to use functional style JavaScript, 
                    to consume and render information from complex APIs.  Some features of the project are:
                    </p>
                    <ul>
                        <li>It was coded using pure functions</li>
                        <li>Supports immutability with Immutable JS</li>
                        <li>Accesses, iterates over and reshapes information from complex API responses</li>
                        <li>Uses ES6 constructs like <em>const</em>, <em>let</em>, <em>arrow functions</em>, 
                        and <em>the new Array methods</em></li>
                    </ul>
                    <p>
                    The site makes frequent calls to external APIs.  I used Promises and the async / await
                    keywords wherever it made sense, to escape <em>callback hell</em> and make my code more readable.
                    </p>
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
                </div>
            </div>
        </div>
    </div>
  `;
};

const footerTemplate = () => {
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

export {
  navbarTemplate,
  earthPageTemplate,
  marsPageTemplate,
  beyondPageTemplate,
  aboutPageTemplate,
  footerTemplate,
};
