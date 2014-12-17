Business Time
=======

A simple module to help when working with business days.


## Installing

To install the latest release version:

    npm install business-time@"<=0.2.0"

To install the latest development version:

    npm install git+https://github.com/belsrc/business-time.git


## Methods

#### .businessDiff(start Moment, stop Moment)
```javascript
var start = moment('12-11-2014', 'MM-DD-YYYY');
var stop = moment('12-16-2014', 'MM-DD-YYYY');

var diff = business-time.businessDiff(start, stop);
```

#### .businessDayFromDate(days Number[, date Moment][, forward Boolean])
```javascript
var start = moment('12-16-2014', 'MM-DD-YYYY');

var date = business-time.businessDayFromDate(3, start);
```

#### .add(count Number, unit String[, date Moment])
```javascript
var then = business-time.businessDayFromDate(3, 'days');
```

#### .subtract(count Number, unit String[, date Moment])
```javascript
var start = moment('12-16-2014', 'MM-DD-YYYY');

var then = business-time.businessDayFromDate(3, 'days', start);
```


## License

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
