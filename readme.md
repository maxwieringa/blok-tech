# Bamboos

## Table of content

* [Description](https://github.com/maxwieringa/blok-tech#description)
* [Data model](https://github.com/maxwieringa/blok-tech#data-model)
* [Installation](https://github.com/maxwieringa/blok-tech#installation) 
* [Usage](https://github.com/maxwieringa/blok-tech#usage)
* [Documentation](https://github.com/maxwieringa/blok-tech#documentation)
* [License](https://github.com/maxwieringa/blok-tech#license)

## Description

Bamboos is a dating application I made for project tech. The functionality of the application is looking at your matches, making a profile, unmatching other users and updating your profile. I used nodejs, express js, EJS and CSS to code the application. The database runs on MongoDB and I used mongoose to model the data in the database. The database is hosted with MongoDb Atlas, this means that the database is accessed virtually. The data that is stored in the database is data about a user's profile. The data includes name, profile picture, age and bio. 

## Data model

<img width="276" alt="Screenshot 2021-03-10 at 17 21 47" src="https://user-images.githubusercontent.com/51541543/110661782-2db04800-81c5-11eb-8b1f-90f7dcc736d7.png"> <img width="295" alt="Screenshot 2021-03-09 at 23 18 52" src="https://user-images.githubusercontent.com/51541543/110546056-4c173480-812e-11eb-8067-847047325ef0.png">

The id, name, picture and bio are string values and the age is a number value. The mongoose schema of the profile doesn't include an ID because I use the ID mongoose automatically gives it. 

## Installation 

Clone the repository via the terminal:

`$ git clone https://github.com/maxwieringa/blok-tech`

navigate to the repository in the terminal:

`$ cd blok-tech/`

Add the .env file to the clone of the repository.

Execute the command npm install in the terminal to download the packages.

`$ npm install`

To start running the server, execute the following command in the terminal.

`$ node server.js`

## Usage

<img width="328" alt="Screenshot 2021-03-10 at 18 22 48" src="https://user-images.githubusercontent.com/51541543/110670445-b0d59c00-81cd-11eb-9612-02b032a53403.png">

The terminal should display this after you typed in `$ node server.js`

<img width="270" alt="Screenshot 2021-03-09 at 15 46 59" src="https://user-images.githubusercontent.com/51541543/110488530-d93a9900-80ee-11eb-90ed-1eace5a95668.png">

To use the application go to your browser and type localhost:3000.

<img width="1439" alt="Screenshot 2021-03-10 at 18 22 00" src="https://user-images.githubusercontent.com/51541543/110670341-94d1fa80-81cd-11eb-9c2f-36dd883bbeda.png">

Once it is loaded you should see all the matches.

## Documentation

For all the documentation and research of the project go to the following link: https://github.com/maxwieringa/blok-tech/wiki

## License 

This project is licensed under an ICS license. You can use, copy, modify and/or distribute this code as long as the following license appears in all copies: https://github.com/maxwieringa/blok-tech/blob/master/license.md.
