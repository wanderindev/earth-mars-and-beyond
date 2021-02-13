import { Footer, NavBar, PageContent } from "./components.js";
import { setupClickHandlers, initComponents } from "./listeners.js";
import { store } from "./store.js";

const root = document.getElementById("root");

/**
 * @description Updates the store
 * @param {object} state - The application's current state
 * @param {object} newState - The application's new state
 */
const updateStore = (state, newState) => {
  return state.merge(newState);
};

/**
 * @description Updates the store and renders the page
 * @param {object} state - The application's current state
 * @param {object} newState - The application's new state
 */
const updateAndRender = (state, newState) => {
  state = updateStore(state, newState);
  render(root, state);
};

/**
 * @description Renders the entire page
 * @param {object} root - The DOM element where the page will be rendered
 * @param {object} state - The application's state
 */
const render = async (root, state) => {
  root.innerHTML = await App(state.toJS());
  setupClickHandlers(state.toJS());
  initComponents(state.toJS());
};

/**
 * @description Returns the HTML for the entire page
 * @param {object} state - The application's state
 * @return {string} html - The HTML for the entire page
 */
const App = async (state) => {
  return `
        <header></header>
        <main>
            <nav class="navbar" role="navigation" aria-label="main navigation">
                ${NavBar(state)}
            </nav>
            <div>${await PageContent(state)}</div>
        </main>
        <footer class="footer">${Footer()}</footer>
    `;
};

/**
 * @description Calls the render() function on window.load.
 */
window.addEventListener("load", () => {
  render(root, store);
});

export { updateAndRender, updateStore };
