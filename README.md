## About this app

This is a very simple react app that I made to demonstrate to my team the possibilities of looking up the business names associated with an ABN

It checks that the query string is a valid ABN on the client side, then does an API call to retrieve the business names associated with that ABN and displays them in a dropdown field

The api key and the api URL are loaded from a .env file so that they are kept secret

I used introJs to make a tour feature for the page as another demo to my team of the possibilities for the app we are building. There is a button the page that triggers the tour


## To run the app:

run ```npm i``` to install dependencies

run ```npm start``` to build the app and start the development server

There are playwright tests for the app. To run those, run ```npx playwright test slow``` to see the tests in slow-mo, or ```npx playwright test headless``` to run them quickly in a headless browser
