import {NavBar, PageTitle, Footer, ImageOfTheDay} from './components.js';

const store = {
    location: 'Earth',
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit']
};

const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store).then();
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const App = (state) => {
    return `
        <header></header>
        <main>
            <nav class="navbar" role="navigation" aria-label="main navigation">${NavBar()}</nav>
            ${PageTitle(state.location)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(state)}
            </section>
        </main>
        <footer class="footer">${Footer()}</footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);

    // Adds event listerners after the page is rendered
    setTimeout(() => {
        // Adds event listener for navigation burgers
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach( el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }
    }, 3000);
});

export {updateStore};