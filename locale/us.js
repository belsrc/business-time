var moment = require('moment');

module.exports = {
  holidays: function(year) {
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
  }
};
