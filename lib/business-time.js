'use strict'

var moment = require('moment');


/**
 * Initializes a new instance of the TimeHelper class.
 * @constructor
 */
var TimeHelpers = function() {};


/**
 * Gets the holidays for th supplied year
 * @param  {String} year The year.
 * @return {Array}
 */
TimeHelpers.prototype.holidaysForYear = function(year) {
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
TimeHelpers.prototype.holidaysForYearRange = function(start, stop) {
  start = start * 1;
  stop  = stop * 1;

  var desc = start > stop;
  var days = [];
  var flag = true;

  while(flag) {
    days = days.concat(this.holidaysForYear(start));
    start = desc ? start - 1 : start + 1;
    if(desc) {
      flag = start >= stop;
    }
    else {
      flag = start <= stop;
    }
  }

  return days;
};


/**
 * Gets the time difference in bussiness days.
 * @param  {Moment} startDate The moment.js start date object.
 * @param  {Moment} stopDate  The moment.js stop date object.
 * @return {Number}
 *
 * Ripped from https://github.com/leonardosantos/momentjs-business/blob/master/momentjs-business.js
 */
TimeHelpers.prototype.businessDiff = function(start, stop) {
  start = moment(start);
  stop  = moment(stop);

  var date     = moment(start);
  var holidays = this.holidaysForYearRange(start.format('YYYY'), stop.format('YYYY'));
  var desc     = start.isAfter(stop);
  var counter  = 0;

  while(date.format('DDD') !== stop.format('DDD')) {
    if(desc) {
      date.subtract(1, 'day');
    }
    else {
      date.add(1, 'day');
    }

    if(date.format('E') < 6 && !~holidays.indexOf(date.toISOString())) {
      counter++;
    }
  }

  return counter;
};


/**
 * Gets the business day from the provided date.
 * @param  {Number}  days The number of days.
 * @param  {Moment}  date The starting Moment object. Now by default.
 * @param  {Boolean} desc Whether the day should count up or down. True by default.
 * @return {Moment}
 */
TimeHelpers.prototype.businessDayFromDate = function(days, date, desc) {
  date = (typeof date === 'undefined') ? moment() : moment(date);
  desc = (typeof desc === 'undefined') ? true : desc;
  var holidays = this.holidaysForYear(date.format('YYYY'));

  while(days !== 0) {
    if(desc) {
      date.subtract(1, 'day');
    }
    else {
      date.add(1, 'day');
    }

    if(date.format('E') < 6 && !~holidays.indexOf(date.toISOString())) {
      days--;
    }
  }

  return moment(date);
};


module.exports = new TimeHelpers();
