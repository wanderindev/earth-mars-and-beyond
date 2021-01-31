<h1 align="center">Earth, Mars, and Beyond :rocket:</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/wanderindev/earth-mars-and-beyond/blob/master/README.md">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/wanderindev/earth-mars-and-beyond/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/wanderindev/earth-mars-and-beyond/blob/master/LICENSE.md">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://twitter.com/JavierFeliuA">
    <img alt="Twitter: JavierFeliuA" src="https://img.shields.io/twitter/follow/JavierFeliuA.svg?style=social" target="_blank" />
  </a>
</p>

This website is my second project submission for the Udacity Intermediate JavaScript Nanodegree.  In this project,
I applied the lessons learned in the Functional Programming in JavaScript course.

## The Big Picture
For this project, I had to create a website that consumes from various NASA APIs.  The goal is to apply the concepts and practices learned in the Functional Programming course, such as:
- Using pure functions
- Supporting immutability with Immutable JS
- Iterating over, reshaping, and accessing information from complex API responses
- Using ES6 constructs like `const`, `let`, arrow functions, and new Array methods.

### Live Website
Check out the live website [here](https://earth-mars-and-beyond.com/).

### The APIs
- The Earth section consumes from NASA's EPIC API.  EPIC stands for Earth Polychromatic Imaging Camera.  The camera is onboard a deep-space weather satellite located roughly one million miles from Earth.

- The Mars section consumes from NASA's Mars Rover Photos API.  We can retrieve photos sent by the Spirit, Opportunity, and Curiosity rovers from the Red Planet from this API, as well as general information about each rover's mission.

- The Beyond section consumes from NASA's APOD API.  APOD stands for Astronomy Picture of the Day.  In this section, you will find beautiful pictures from the cosmos and exciting information about them.

### Project instructions
You can find the starter code for the project [here](https://github.com/udacity/nd032-c2-functional-programming-with-javascript-starter/tree/project/project).  The repository's README
contains the project instructions.  

Check out the project's grading rubric [here](https://review.udacity.com/#!/rubrics/2708/view).

## How to use

### Prerequisites
This project requires Node and Yarn for development.  If needed, follow the installation instructions:
- [Node installation instructions](https://nodejs.org/en/).
- [Yarn installation instructions](https://classic.yarnpkg.com/en/docs/install#windows-stable).

### Clone the repository
Once the prerequisites are met, clone the repository and `cd` into the project's root:
```sh
git clone https://github.com/wanderindev/earth-mars-and-beyond.git
cd earth-mars-and-beyond
``` 

### Install the dependencies
To install the project's dependencies run:
```sh
yarn install
``` 

### Add your NASA API key
To access the NASA endpoints, you will need an API key.  You can get the key from the [NASA API site](https://api.nasa.gov/).

To use your key, rename the file `.env-sample` located in the project's root to `.env` and add your key there.

The API key should be secret so make sure to keep the `.env` file out of version control by adding the appropriate entry in your `.gitignore` file.

### Start the server
Now you can start the server with:
```sh
yarn start
``` 

Open `http://localhost:3000` in a browser to see the development site.

## Author

👤 **Javier Feliu**

* Twitter: [@JavierFeliuA](https://twitter.com/JavierFeliuA)
* Github: [@wanderindev](https://github.com/wanderindev)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Javier Feliu](https://github.com/wanderindev).<br />

This project is [MIT](https://github.com/wanderindev/earth-mars-and-beyond/blob/master/LICENSE.md) licensed.

***
_I based this README on a template generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_