import {apodFormatDate} from "./utils.js";

const store = {
    tabs: {active: 'earth'},
    apod: {reqDate: apodFormatDate(new Date())},
    rovers: ['Curiosity', 'Opportunity', 'Spirit']
};

export {store};