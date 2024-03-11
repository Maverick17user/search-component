# Exercise 02

This task is about making a front-end do an autocompletion search.

## What does this application do?

This application has an index of street addresses and postal numbers in Norway. One can search for street names in this index through an endpoint at http://localhost:8080/search. The search is optimized so it will yield a result for every character given to the search phrase. In other words: it can be used for autocompletion.

The search endpoint takes `GET` requests and returns a JSON `Array` of `Objects`. It looks like this:

```json
[{
    "postNumber": 686,
    "city": "OSLO",
    "street": "Østensjø terrasse",
    "typeCode": 6,
    "type": "Gate-/veg-adresse",
    "district": "Østensjø",
    "municipalityNumber": 301,
    "municipality": "Oslo",
    "county":" Oslo"
},
{
    "postNumber": 661,
    "city": "OSLO",
    "street": "Østensjøveien 1-29, 2-18",
    "typeCode": 6,
    "type": "Gate-/veg-adresse",
    "district": "Gamle Oslo",
    "municipalityNumber": 301,
    "municipality": "Oslo",
    "county": "Oslo"
}]
```

Example URIs:

 * [http://localhost:8080/search/trond](http://localhost:8080/search/trond)
 * [http://localhost:8080/search/%C3%B8sten](http://localhost:8080/search/%C3%B8sten)

This application has no front-end code. There is just a search endpoint and an empty HTML document (with an empty CSS and JS) served at the [root](http://localhost:8080/) of the application.

## What is the task?

In this task you shall:

 * Implement a search field for finding street addresses.
 * Make the search so when a user types in it, it displays and updates the results as the user types.
 * Make the result display the street name, the post number and city.
 * Implement this 100 % browser-side. You shall enrich the existing document served at [root](http://localhost:8080/).
 * Make sure it works in latest Chrome, Firefox and Edge on desktop.

You may:

 * Use any library or framework of your choice.
 * Use vanilla JS.
 * Add any dependencies and script commands etc. you need to `package.json`
 * Add a front-end build tool to assemble code into `/static/assets/script.js` and `/static/assets/styles.css`.

You shall __not__:

 * Alter the search endpoint or any of the server-side code in the `/bin` directory.
 * Add any server-side rendering.
 * Alter `/static/assets/index.html`.
 * Think about mobile.

## How to run

Assuming you have Node.js installed, install the dependencies:

```sh
npm install
```

Then run the application:

```sh
npm start
```

## How to return the exercise

Please make changes to the exercise in a way so we can just run `npm install` followed by `npm start` or `npm test` to see the exercise running.

Before returning the exercise, remove the `node_modules` folder and any other temporary files. Pack the whole exercise folder in a `.zip` or `.tar` file and mail it back to your contact.

__Do not__ upload the exercise to any public space such as GitHub.
