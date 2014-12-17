Business Time
=======

A simple module to help when working with business days.


#### Installing

To install the latest release version:

    npm install business-time@"<=0.1.0"

To install the latest development version:

    npm install git+https://github.com/belsrc/business-time.git


#### License

Business Time is copyright (c) 2014 Bryan Kizer and licensed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


# Testing TOC
   - [BusinessTime](#businesstime)
     - [holidaysForYear](#businesstime-holidaysforyear)
     - [holidaysForYearRange](#businesstime-holidaysforyearrange)
     - [businessDiff](#businesstime-businessdiff)
     - [businessDayFromDate](#businesstime-businessdayfromdate)
     - [add](#businesstime-add)
     - [subtract](#businesstime-subtract)
<a name=""></a>

<a name="businesstime"></a>
# BusinessTime
<a name="businesstime-holidaysforyear"></a>
## holidaysForYear
should return an array.

```js
var actual = time.holidaysForYear(2014);
assert.isArray(actual);
```

should have correct number of holidays.

```js
var days = time.holidaysForYear(2014);
var actual = days.length;
var expected = 6;
assert.strictEqual(expected, actual);
```

days should be correct.

```js
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
```

<a name="businesstime-holidaysforyearrange"></a>
## holidaysForYearRange
should return an array.

```js
var actual = time.holidaysForYearRange(2013, 2014);
assert.isArray(actual);
```

should have correct number of holidays.

```js
var days = time.holidaysForYearRange(2013, 2014);
var actual = days.length;
var expected = 12;
assert.strictEqual(expected, actual);
```

should work in reverse.

```js
var days = time.holidaysForYearRange(2014, 2013);
var actual = days.length;
var expected = 12;
assert.strictEqual(expected, actual);
```

days should be correct.

```js
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
```

<a name="businesstime-businessdiff"></a>
## businessDiff
result should be a number.

```js
var start = moment('12-11-2014', 'MM-DD-YYYY');
var stop = moment('12-16-2014', 'MM-DD-YYYY');
var actual = time.businessDiff(start, stop);
assert.isNumber(actual);
```

should not include weekends.

```js
var start = moment('12-11-2014', 'MM-DD-YYYY');
var stop = moment('12-16-2014', 'MM-DD-YYYY');
var actual = time.businessDiff(start, stop);
var expected = 3;
assert.strictEqual(expected, actual);
```

should skip to first week day.

```js
var start = moment('12-13-2014', 'MM-DD-YYYY');
var stop = moment('12-16-2014', 'MM-DD-YYYY');
var actual = time.businessDiff(start, stop);
var expected = 2;
assert.strictEqual(expected, actual);
```

should skip holidays.

```js
var start = moment('12-24-2014', 'MM-DD-YYYY');
var stop = moment('12-26-2014', 'MM-DD-YYYY');
var actual = time.businessDiff(start, stop);
var expected = 1;
assert.strictEqual(expected, actual);
```

should work in reverse.

```js
var stop = moment('12-11-2014', 'MM-DD-YYYY');
var start = moment('12-16-2014', 'MM-DD-YYYY');
var actual = time.businessDiff(start, stop);
var expected = 3;
assert.strictEqual(expected, actual);
```

<a name="businesstime-businessdayfromdate"></a>
## businessDayFromDate
should be an object.

```js
var start = moment('12-16-2014', 'MM-DD-YYYY');
var actual = time.businessDayFromDate(3, start);
assert.isObject(actual);
```

should skip weekends.

```js
var start = moment('12-16-2014', 'MM-DD-YYYY');
var actual = time.businessDayFromDate(3, start);
var expected = moment('12-11-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should skip holidays.

```js
var start = moment('12-26-2013', 'MM-DD-YYYY');
var actual = time.businessDayFromDate(1, start);
var expected = moment('12-24-2013', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should add days.

```js
var start = moment('12-24-2013', 'MM-DD-YYYY');
var actual = time.businessDayFromDate(1, start, true);
var expected = moment('12-26-2013', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

<a name="businesstime-add"></a>
## add
should correctly handle days.

```js
var start = moment('12-17-2014', 'MM-DD-YYYY');
var actual = time.add(1, 'day', start);
var expected = moment('12-18-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should correctly handle weeks.

```js
var start = moment('12-17-2014', 'MM-DD-YYYY');
var actual = time.add(1, 'week', start);
var expected = moment('12-24-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should correctly handle months.

```js
var start = moment('11-17-2014', 'MM-DD-YYYY');
var actual = time.add(1, 'month', start);
var expected = moment('12-17-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should be an object.

```js
var start = moment('12-24-2014', 'MM-DD-YYYY');
var actual = time.add(1, 'month', start);
assert.isObject(actual);
```

should continue past weekends.

```js
var start = moment('12-24-2014', 'MM-DD-YYYY');
var actual = time.add(3, 'days', start);
var expected = moment('12-29-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should continue past holidays.

```js
var start = moment('12-24-2014', 'MM-DD-YYYY');
var actual = time.add(1, 'day', start);
var expected = moment('12-26-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

<a name="businesstime-subtract"></a>
## subtract
should correctly handle days.

```js
var start = moment('12-17-2014', 'MM-DD-YYYY');
var actual = time.subtract(1, 'day', start);
var expected = moment('12-16-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should correctly handle weeks.

```js
var start = moment('12-17-2014', 'MM-DD-YYYY');
var actual = time.subtract(1, 'week', start);
var expected = moment('12-10-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should correctly handle months.

```js
var start = moment('11-17-2014', 'MM-DD-YYYY');
var actual = time.subtract(1, 'month', start);
var expected = moment('10-17-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should be an object.

```js
var start = moment('12-24-2014', 'MM-DD-YYYY');
var actual = time.subtract(1, 'month', start);
assert.isObject(actual);
```

should continue past weekends.

```js
var start = moment('12-24-2014', 'MM-DD-YYYY');
var actual = time.subtract(3, 'days', start);
var expected = moment('12-19-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```

should continue past holidays.

```js
var start = moment('12-26-2014', 'MM-DD-YYYY');
var actual = time.subtract(1, 'day', start);
var expected = moment('12-24-2014', 'MM-DD-YYYY');
assert.strictEqual(expected.format(), actual.format());
```
