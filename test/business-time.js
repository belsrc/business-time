var chai = require('chai');
var moment = require('moment');

var assert = chai.assert;
var time = require('./../lib-cov/business-time');


suite('BusinessTime', function() {

  /**
  * helpers.time.holidaysForYear test suite
  */
  suite('holidaysForYear', function() {

    test('should return an array', function() {
      var actual = time.holidaysForYear(2014);

      assert.isArray(actual);
    });

    test('should have correct number of holidays', function() {
      var days = time.holidaysForYear(2014);
      var actual = days.length;
      var expected = 6;

      assert.strictEqual(expected, actual);
    });

    test('days should be correct', function() {
      var actual = time.holidaysForYear(2014);
      var expected = [
        moment('2014-01-01', 'YYYY-MM-DD').toISOString(),
        moment('2014-05-26', 'YYYY-MM-DD').toISOString(),
        moment('2014-07-04', 'YYYY-MM-DD').toISOString(),
        moment('2014-09-01', 'YYYY-MM-DD').toISOString(),
        moment('2014-11-27', 'YYYY-MM-DD').toISOString(),
        moment('2014-12-25', 'YYYY-MM-DD').toISOString()
      ];

      assert.deepEqual(expected, actual);
    });
  });

  /**
  * helpers.time.holidaysForYearRange test suite
  */
  suite('holidaysForYearRange', function() {

    test('should return an array', function() {
      var actual = time.holidaysForYearRange(2013, 2014);

      assert.isArray(actual);
    });

    test('should have correct number of holidays', function() {
      var days = time.holidaysForYearRange(2013, 2014);
      var actual = days.length;
      var expected = 12;

      assert.strictEqual(expected, actual);
    });

    test('should work in reverse', function() {
      var days = time.holidaysForYearRange(2014, 2013);
      var actual = days.length;
      var expected = 12;

      assert.strictEqual(expected, actual);
    });

    test('days should be correct', function() {
      var actual = time.holidaysForYearRange(2013, 2014);
      var expected = [
        moment('2013-01-01', 'YYYY-MM-DD').toISOString(),
        moment('2013-05-27', 'YYYY-MM-DD').toISOString(),
        moment('2013-07-04', 'YYYY-MM-DD').toISOString(),
        moment('2013-09-09', 'YYYY-MM-DD').toISOString(),
        moment('2013-11-28', 'YYYY-MM-DD').toISOString(),
        moment('2013-12-25', 'YYYY-MM-DD').toISOString(),
        moment('2014-01-01', 'YYYY-MM-DD').toISOString(),
        moment('2014-05-26', 'YYYY-MM-DD').toISOString(),
        moment('2014-07-04', 'YYYY-MM-DD').toISOString(),
        moment('2014-09-01', 'YYYY-MM-DD').toISOString(),
        moment('2014-11-27', 'YYYY-MM-DD').toISOString(),
        moment('2014-12-25', 'YYYY-MM-DD').toISOString()
      ];

      assert.deepEqual(expected, actual);
    });
  });

  /**
  * helpers.time.businessDiff test suite
  */
  suite('businessDiff', function() {

    test('result should be a number', function() {
      var start = moment('12-11-2014', 'MM-DD-YYYY');
      var stop = moment('12-16-2014', 'MM-DD-YYYY');

      var actual = time.businessDiff(start, stop);

      assert.isNumber(actual);
    });

    test('should not include weekends', function() {
      var start = moment('12-11-2014', 'MM-DD-YYYY');
      var stop = moment('12-16-2014', 'MM-DD-YYYY');

      var actual = time.businessDiff(start, stop);
      var expected = 3;

      assert.strictEqual(expected, actual);
    });

    test('should skip to first week day', function() {
      var start = moment('12-13-2014', 'MM-DD-YYYY');
      var stop = moment('12-16-2014', 'MM-DD-YYYY');

      var actual = time.businessDiff(start, stop);
      var expected = 2;

      assert.strictEqual(expected, actual);
    });

    test('should skip holidays', function() {
      var start = moment('12-24-2014', 'MM-DD-YYYY');
      var stop = moment('12-26-2014', 'MM-DD-YYYY');

      var actual = time.businessDiff(start, stop);
      var expected = 1;

      assert.strictEqual(expected, actual);
    });

    test('should work in reverse', function() {
      var stop = moment('12-11-2014', 'MM-DD-YYYY');
      var start = moment('12-16-2014', 'MM-DD-YYYY');

      var actual = time.businessDiff(start, stop);
      var expected = 3;

      assert.strictEqual(expected, actual);
    });
  });

  /**
  * helpers.time.businessDayFromDate test suite
  */
  suite('businessDayFromDate', function() {

    test('should be an object', function() {
      var start = moment('12-16-2014', 'MM-DD-YYYY');

      var actual = time.businessDayFromDate(3, start);

      assert.isObject(actual);
    });

    test('should skip weekends', function() {
      var start = moment('12-15-2014', 'MM-DD-YYYY');

      var actual = time.businessDayFromDate(3, start);
      var expected = moment('12-10-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should skip holidays', function() {
      var start = moment('12-26-2013', 'MM-DD-YYYY');

      var actual = time.businessDayFromDate(1, start);
      var expected = moment('12-24-2013', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should add days', function() {
      var start = moment('12-24-2013', 'MM-DD-YYYY');

      var actual = time.businessDayFromDate(1, start, true);
      var expected = moment('12-26-2013', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });
  });

  /**
  * helpers.time.add test suite
  */
  suite('add', function() {

    test('should correctly handle days', function() {
      var start = moment('12-17-2014', 'MM-DD-YYYY');

      var actual = time.add(1, 'day', start);
      var expected = moment('12-18-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should correctly handle weeks', function() {
      var start = moment('12-17-2014', 'MM-DD-YYYY');

      var actual = time.add(1, 'week', start);
      var expected = moment('12-24-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should correctly handle months', function() {
      var start = moment('11-17-2014', 'MM-DD-YYYY');

      var actual = time.add(1, 'month', start);
      var expected = moment('12-17-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should be an object', function() {
      var start = moment('12-24-2014', 'MM-DD-YYYY');
      var actual = time.add(1, 'month', start);

      assert.isObject(actual);
    });

    test('should continue past weekends', function() {
      var start = moment('12-24-2014', 'MM-DD-YYYY');

      var actual = time.add(3, 'days', start);
      var expected = moment('12-29-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should continue past holidays', function() {
      var start = moment('12-24-2014', 'MM-DD-YYYY');

      var actual = time.add(1, 'day', start);
      var expected = moment('12-26-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });
  });

  /**
  * helpers.time.subtract test suite
  */
  suite('subtract', function() {

    test('should correctly handle days', function() {
      var start = moment('12-17-2014', 'MM-DD-YYYY');

      var actual = time.subtract(1, 'day', start);
      var expected = moment('12-16-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should correctly handle weeks', function() {
      var start = moment('12-17-2014', 'MM-DD-YYYY');

      var actual = time.subtract(1, 'week', start);
      var expected = moment('12-10-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should correctly handle months', function() {
      var start = moment('11-17-2014', 'MM-DD-YYYY');

      var actual = time.subtract(1, 'month', start);
      var expected = moment('10-17-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should be an object', function() {
      var start = moment('12-24-2014', 'MM-DD-YYYY');
      var actual = time.subtract(1, 'month', start);

      assert.isObject(actual);
    });

    test('should continue past weekends', function() {
      var start = moment('12-24-2014', 'MM-DD-YYYY');

      var actual = time.subtract(3, 'days', start);
      var expected = moment('12-19-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });

    test('should continue past holidays', function() {
      var start = moment('12-26-2014', 'MM-DD-YYYY');

      var actual = time.subtract(1, 'day', start);
      var expected = moment('12-24-2014', 'MM-DD-YYYY');

      assert.strictEqual(expected.format(), actual.format());
    });
  });
});
