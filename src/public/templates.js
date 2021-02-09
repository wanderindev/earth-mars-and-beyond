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

export { navbarTemplate, earthPageTemplate };
