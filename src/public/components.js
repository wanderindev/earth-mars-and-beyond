import {
  navbarTemplate,
  earthPageTemplate,
  marsPageTemplate,
  beyondPageTemplate,
  aboutPageTemplate
} from "./templates.js";

import {
  apodDateToString,
  getApodImage,
  getEpicInfo,
  getRoverInfo,
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
    ${active === "beyond" ? await BeyondPage(state) : ""}
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
  const date = state.apod.reqDate || apodDateToString(new Date());
  return getApodImage(date, state).then((image) => {
    return beyondPageTemplate(image);
  });
};

/**
 * @description Returns the AboutPage component
 * @return {string} html - The HTML for the AboutPage
 */
const AboutPage = () => {
  return aboutPageTemplate();
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
