'use strict'

var moment = require('moment');


/**
 * Initializes a new instance of the BusinessTime class.
 * @constructor
 */
var BusinessTime = function() {};


/**
 * Gets the holidays for th supplied year
 * @param  {String} year The year.
 * @return {Array}
 */
BusinessTime.prototype.holidaysForYear = function(year) {
  var format = 'YYYY-MM-DD';
  var startOfSept = moment(year + '-09-01', format);
  var startOfNov  = moment(year + '-11-01', format);

  return [
    // New Years
    moment(year + '-01-01', format).toISOString(),

    // Memorial Day (last Monday in May)
    moment(year + '-05-01', format).endOf('month').startOf('week').add(1, 'days').toISOString(),

    // Independence Day
    moment(year + '-07-04', format).toISOString(),

    // Labor Day (first Monday of September)
    startOfSept.format('E') == 1 ?
      startOfSept.toISOString() :
      startOfSept.startOf('week').add(1, 'week').add(1, 'day').toISOString(),

    // Thanksgiving (fourth Thurs of November)
    startOfNov.format('E') > 4 && startOfNov.format('E') != 7 ?
      startOfNov.startOf('week').add(4, 'weeks').add(4, 'day').toISOString() :
      startOfNov.startOf('week').add(3, 'weeks').add(4, 'day').toISOString(),

    // Christmas
    moment(year + '-12-25', format).toISOString()
  ];
};


/**
 * Gets the holidays for the supplied year range. Stop year IS inclusive.
 * @param {Number} start The start year.
 * @param {Number} stop  The stop year.
 */
BusinessTime.prototype.holidaysForYearRange = function(start, stop) {
  start = start * 1;
  stop  = stop * 1;

  var forward = start < stop;
  var days    = [];
  var flag    = true;

  while(flag) {
    days = days.concat(this.holidaysForYear(start));
    start = forward ? start + 1 : start - 1;
    if(forward) {
      flag = start <= stop;
    }
    else {
      flag = start >= stop;
    }
  }

  return days;
};


/**
 * Gets the time difference in bussiness days.
 * @param  {Moment} start The moment.js start date object.
 * @param  {Moment} stop  The moment.js stop date object.
 * @return {Number}
 */
BusinessTime.prototype.businessDiff = function(start, stop) {
  start = moment(start);
  stop  = moment(stop);

  var date     = moment(start);
  var holidays = this.holidaysForYearRange(start.format('YYYY'), stop.format('YYYY'));
  var forward  = stop.isAfter(start);
  var counter  = 0;

  while(date.format('DDD') !== stop.format('DDD')) {
    if(forward) {
      date.add(1, 'day');
    }
    else {
      date.subtract(1, 'day');
    }

    if(date.format('E') < 6 && !~holidays.indexOf(date.toISOString())) {
      counter++;
    }
  }

  return counter;
};


/**
 * Gets the business day from the provided date.
 * @param  {Number}  days    The number of days.
 * @param  {Moment}  date    The starting Moment object. Now by default.
 * @param  {Boolean} forward Whether the day should count up or down. False by default.
 * @return {Moment}
 */
BusinessTime.prototype.businessDayFromDate = function(days, date, forward) {
  date = (typeof date === 'undefined') ? moment() : moment(date);
  forward = (typeof forward === 'undefined') ? false : forward;
  var holidays = this.holidaysForYear(date.format('YYYY'));

  while(days !== 0) {
    if(forward) {
      date.add(1, 'day');
    }
    else {
      date.subtract(1, 'day');
    }

    if(date.format('E') < 6 && !~holidays.indexOf(date.toISOString())) {
      days--;
    }
  }

  return moment(date);
};


/**
 * Adds a specified amount of time to that supplied date.
 * @param  {Number} count The number of units to add.
 * @param  {String} unit  The time unit string.
 * @param  {Moment} date  The starting Moment object. Now by default.
 * @return {Moment}
 */
BusinessTime.prototype.add = function(count, unit, date) {
  date = (typeof date === 'undefined') ? moment() : moment(date);
  var holidays = this.holidaysForYear(date.format('YYYY'));

  date.add(count, unit);

  while(date.format('E') > 5 || ~holidays.indexOf(date.toISOString())) {
    date.add(1, 'day');
  }

  return moment(date);
};


/**
 * Subtracts a specified amount of time to that supplied date.
 * @param  {Number} count The number of units to subtract.
 * @param  {String} unit  The time unit string.
 * @param  {Moment} date  The starting Moment object. Now by default.
 * @return {Moment}
 */
BusinessTime.prototype.subtract = function(count, unit, date) {
  date = (typeof date === 'undefined') ? moment() : moment(date);
  var holidays = this.holidaysForYear(date.format('YYYY'));

  date.subtract(count, unit);

  while(date.format('E') > 5 || ~holidays.indexOf(date.toISOString())) {
    date.subtract(1, 'day');
  }

  return moment(date);
};


module.exports = new BusinessTime();
