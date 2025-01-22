[![npm version](https://img.shields.io/npm/v/.svg)](https://www.npmjs.com/package/dates-in-js)

[![npm downloads](https://img.shields.io/npm/dt/dates-in-js.svg)](https://www.npmjs.com/package/dates-in-js)

[NPM Package](https://www.npmjs.com/package/dates-in-js)

# dates-in-js npm package

The dates-in-js npm package is a custom date library designed to simplify date and time operations in JavaScript. It provides an intuitive way to work with dates, offering a set of methods for retrieving various date components, formatting dates, and calculating relative time differences from the current date.

## Installation

To start using dates-in-js in your JavaScript projects, you can install it via npm:

```shell
npm install dates-in-js
```

## Usage
Once you have installed dates-in-js, you can import the desired functions into your JavaScript code:

```javascript
const dateJS = require('dates-in-js');
```

## Features
dates-in-js offers a wide range of features that empower you to work with dates more effectively:

### Getters
- year(): Returns the full year (e.g., 2023).
- yr(): Returns the short year (e.g., 23 for 2023).
- month(): Returns the full month name (e.g., January).
- mon(): Returns the short month name (e.g., Jan).
- day(): Returns the full day of the week (e.g., Wednesday).
- dy(): Returns the short day of the week (e.g., Wed).
- date(): Returns the date of the month (e.g., 1).
- hours(): Returns the hour (0-23).
- mins(): Returns the minute (0-59).
- secs(): Returns the second (0-59).

### Methods
- format(mask = 'Y M D'): Formats the date according to the specified mask.
- when(): Returns a human-readable relative time difference from the current date.

## Usage

```javascript
const D = require('dates-in-js');

// Creating a datejs instance
const currentDate = new D();

// Accessing date components
console.log(currentDate.year); // 2023
console.log(currentDate.yr);   // 6
console.log(currentDate.month); // September
console.log(currentDate.mon);   // Sep
console.log(currentDate.day);   // Wednesday
console.log(currentDate.dy);    // Wed
console.log(currentDate.date);  // 6
console.log(currentDate.hours); // 11
console.log(currentDate.mins);  // 13
console.log(currentDate.secs);  // 45

// Formatting dates
console.log(currentDate.format('Y-M-D h:I:S')); // 2023-September-06 11:13:45
console.log(currentDate.format('y/m/D'));       // 23/sep/06

// Calculating relative time differences
const futureDate = new D(2024, 9, 6);
console.log(futureDate.when()); // 1 year from now

const pastDate = new D(2023, 3, 6);
console.log(pastDate.when()); // 6 months ago

```


## Contributing
I welcome contributions from the community to improve and expand the functionality of dates-in-js. If you have any suggestions, bug reports, or feature requests, please don't hesitate to open an issue or submit a pull request on the GitHub repository.

### 
- The package is intended to be used for educational purposes only.