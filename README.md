# CPSC332 Web Project Final

## Description
This repository contains the code for my CPSC332 Web Project Final- a kahoot like game with questions derived from the Dog CEO API. This project's goal is to provide simple web-based fun for people aiming to expand their knowkedge on dogs in a exciting, and slightly compeitive way. 

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Credits](#credits)
5. [License](#license)

## Installation
To install locally on Mac OS: 
1. Clone this repository  
`git clone https://github.com/GUWebDevelopment/cpsc-332-web-development-final-project-mootqns.git`
2. Start MongoDB (see [here](https://www.mongodb.com/docs/manual/administration/install-community/) to install)  
`brew services start mongodb-community`   
3. Once cloned with MongoDB running, navigate to wpd/index.js (start point) and run  
`node index.js`
4. Navigate to localhost:8080

## Usage
This simple dog quiz game can be easily played by clicking the "start-game" button. Once there, you will be prompted with an
image of a dog and different choices for the breed. Your goal is to guess the correct breed based on this image. If you get a 
correct answer, 50 points will be added to your score; there are no points losses for answering incorrectly. While in-game, you have 
the option to start a timer to time how long it takes you to answer the questions. Further, in the top-right, your progress 
throughout the quiz will be shown. Once completed, you can enter a username to store your score on the leaderboard! 

## Contributing
As this project serves as the final for my CPSC332 course contributions are not being accepted to avoid academic integrity policy issues

## Credits
Author: Matt Nguyen  
Additional Credits: [Dog CEO API](https://dog.ceo/dog-api/)

## License 
MIT License  

Copyright (c) [2022] [Matthew Nguyen]  

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.  