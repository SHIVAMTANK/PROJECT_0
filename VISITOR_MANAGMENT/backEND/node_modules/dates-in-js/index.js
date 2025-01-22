/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dys = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * D class
 * @class
 * @classdesc A custom date library that handles date operations in a better
 * and more intuitive way than the built in Date Object.
 */
class D {
  /**
   * @constructor Initializes a new date instance
   * @param {...*} args - Parameters to create the date object
   */
  constructor(...args) {
    // eslint-disable-next-line no-underscore-dangle
    this._date = new Date(...args);
  }

  // Getters
  /**
   * Gets the full year of the date
   * @returns {number} - Full year  e.g. 2023
   */
  get year() { // getter method
    return this._date.getFullYear(); // returns full year
  }

  /**
     * Gets the short year of the date
     * @returns {number} - Last two digits of the year: Short year  e.g. 23 for year 2023
     */
  get yr() {
    return this._date.getFullYear() % 100; // returns short year
  }

  /**
     * Gets the month name of the date
     * @returns {string} - Name of the Month e.g. September for the date 2/1/2023
     */
  get month() {
    return months[this._date.getMonth()]; // returns month
  }

  /**
     * Gets the short month name of the date
     * @returns {string} - Three letter short Name of the Month e.g. Sep for the date 2/1/2023
     */
  get mon() {
    return mons[this._date.getMonth()]; // returns short month
  }

  /**
     * Gets the day of the week
     * @returns {string} -  Full Name for the day of the date e.g. Wednesday
     */
  get day() {
    return days[this._date.getDay()]; // returns day
  }

  /**
     * Gets the short day of the week
     * @returns {string} -  Three letter Short name for the day of the date e.g. Wed
     */

  get dy() {
    return dys[this._date.getDay()]; // returns short day
  }

  /**
     * Gets the date of the month
     * @returns {number} -  The date e.g. 9 for July 9th, 2023
     */
  get date() {
    return this._date.getDate(); // returns date
  }

  /**
     * Gets the Hour in a date
     * @returns {number} -  Hour e.g. 18
     */
  get hours() {
    return this._date.getHours(); // returns hours
  }

  /**
     * Gets the Minute of the date
     * @returns {number} -  Minutes
     */
  get mins() {
    return this._date.getMinutes(); // returns minutes
  }

  /**
     * Gets the seconds of the date
     * @returns {number} -  Seconds
     */
  get secs() {
    return this._date.getSeconds(); // returns seconds
  }

  // Challenge 3:
  // Format
  /**
     * Returns the date formatted according to a specified mask
     * @param {string} [mask='Y M D'] - Output format - Format mask
     * @returns {string} - Formatted date string
     */
  format(mask = 'Y M D') {
    const dateStr = mask.split('').map((char) => { // split the mask string into an array of characters
      switch (char) {
        case 'Y':
          return this.year;
        case 'y':
          return this.yr;
        case 'M':
          return this.month;
        case 'm':
          return this.mon;
        case 'D':
          return this.date.toString().padStart(2, '0');
        case 'd':
          return this.date;
        case 'H':
          return this.hours.toString().padStart(2, '0');
        case 'h':
          return this.hours;
        case 'I':
          return this.mins.toString().padStart(2, '0');
        case 'i':
          return this.mins;
        case 'S':
          return this.secs.toString().padStart(2, '0');
        case 's':
          return this.secs;
        default:
          return char;
      }
    }).join('');
    return dateStr;
  }

  // Challenge 4
  // WHEN
  /**
     * returns a human-readble relative time difference from now.
     * @returns {string} - The relative time difference string
     */
  when() {
    const currentDate = new Date(); // Get the current date and time
    const diffInSeconds = Math.floor((this._date - currentDate) / 1000);

    if (diffInSeconds === 0) {
      return 'today';
    }
    const seconds = Math.abs(diffInSeconds);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
    } if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
    } if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
    } if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
    } if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
    }
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
  }
}

module.exports = D;
