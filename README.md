# ParkCell

# Description
A web application that displays all state parks in Texas on a map with pins.
This project is built with Node.js, React, and utilizes Google Maps API.

# Start this Application
First, update the mapConfig.js file in client/src/config with the Google Maps API Key.
Then open the public/index.html in the browser.

I've already included the webpack bundle, but if you want to create it yourself, follow the instructions below before opening the index.html file.

Run the following commands in the root directory of this project.
```sh
npm install
npm start
```

Note: I am running Node v6.11.2.

# Functionality 
- Search functionality with an input string.
- Filters for different location types.
- Info window popups at each location displaying preview image, park website, contacat information, address, and busy seasons.

# Some Notes
- I got the data about all the state parks by webscraping from the Texas Parks & Wildlife Website: https://tpwd.texas.gov/state-parks/nearby. The data included not only state parks but a few other points of interest, so I created a filter to accomadate for that. 
- In the future, I would consider putting the map markers themselves in a separate React component.

