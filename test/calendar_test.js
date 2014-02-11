/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var cal = require('../lib/calendar.js');
var celestial = require('../lib/celestial.js');
var math = require('../lib/math.js');

function cmpDates(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
}

exports.calendar = {
  setUp                          : function (done) {
    celestial.setPrimaryConstants();
    celestial.setSecondaryConstants();
    celestial.setPlanetaryConstants();
    done();
  },
  'nextDate'                     : function (test) {
    test.expect(9);
    test.ok(cmpDates(cal.nextDate(new Date(2013, cal.months.DECEMBER, 31)), new Date(2014, cal.months.JANUARY, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(2012, cal.months.JANUARY, 31)), new Date(2012, cal.months.FEBRUARY, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(2013, cal.months.FEBRUARY, 28)), new Date(2013, cal.months.MARCH, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(2012, cal.months.FEBRUARY, 28)), new Date(2012, cal.months.FEBRUARY, 29)));
    test.ok(cmpDates(cal.nextDate(new Date(1950, cal.months.FEBRUARY, 1)), new Date(1950, cal.months.FEBRUARY, 2)));
    test.ok(cmpDates(cal.nextDate(new Date(1997, cal.months.SEPTEMBER, 30)), new Date(1997, cal.months.OCTOBER, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(1752, cal.months.MARCH, 24)), new Date(1752, cal.months.MARCH, 25)));
    test.ok(cmpDates(cal.nextDate(new Date(1752, cal.months.SEPTEMBER, 2)), new Date(1752, cal.months.SEPTEMBER, 3)));
    test.ok(cmpDates(cal.nextDate(new Date(1997, cal.months.DECEMBER, 30)), new Date(1997, cal.months.DECEMBER, 31)));
    test.done();
  },
  'gregorianDateToJulianDay'     : function (test) {
    test.expect(14);
    test.equal(cal.gregorianDateToJulianDay(new Date(2013, cal.months.DECEMBER, 30)), 2456656.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2013, cal.months.DECEMBER, 31)), 2456657.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2012, cal.months.JANUARY, 31)), 2455957.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2013, cal.months.FEBRUARY, 28)), 2456351.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2012, cal.months.FEBRUARY, 28)), 2455985.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2001, cal.months.JANUARY, 1)), 2451910.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1950, cal.months.FEBRUARY, 1)), 2433313.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1997, cal.months.SEPTEMBER, 30)), 2450721.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1752, cal.months.MARCH, 24)), 2361047.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 2)), 2361209.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1997, cal.months.DECEMBER, 30)), 2450812.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(-1, cal.months.JANUARY, 31)), 1720722.5);
    // Special case for setting dates from years 0 - 99 AD
    var dateFrom7AD = new Date(7, cal.months.JANUARY, 1);
    dateFrom7AD.setFullYear(7);
    test.equal(cal.gregorianDateToJulianDay(dateFrom7AD), 1723614.5);
    var dateFrom0AD = new Date(0, cal.months.JANUARY, 1);
    dateFrom0AD.setFullYear(0);
    test.equal(cal.gregorianDateToJulianDay(dateFrom0AD), 1721057.5);
    test.done();
  },
  'julianInEngland'              : function (test) {
    test.expect(7);
    test.equal(cal.julianInEngland(2299158.5), false);
    test.equal(cal.julianInEngland(2299159.5), false);
    test.equal(cal.julianInEngland(2299160.5), true);
    test.equal(cal.julianInEngland(2299161.5), true);
    test.equal(cal.julianInEngland(2361220.5), true);
    test.equal(cal.julianInEngland(2361221.5), false);
    test.equal(cal.julianInEngland(2361222.5), false);
    test.done();
  },
  'julianInEnglandFromGregorian' : function (test) {
    test.expect(11);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(200, cal.months.JANUARY, 31))), false);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1582, cal.months.OCTOBER, 12))), false);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1582, cal.months.OCTOBER, 13))), false);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1582, cal.months.OCTOBER, 14))), false);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1582, cal.months.OCTOBER, 15))), true);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1582, cal.months.OCTOBER, 16))), true);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 11))), true);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 12))), true);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 13))), true);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 14))), false);
    test.equal(cal.julianInEngland(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 15))), false);
    test.done();
  },
  'julianDayToJulianDate'        : function (test) {
    test.expect(8);
    test.equal(cal.julianDayToJulianDate(2299158.5).toString(), '1582 10 02');
    test.equal(cal.julianDayToJulianDate(2299159.5).toString(), '1582 10 03');
    test.equal(cal.julianDayToJulianDate(2299160.5).toString(), '1582 10 04');
    test.equal(cal.julianDayToJulianDate(2299161.5).toString(), '1582 10 05');
    test.equal(cal.julianDayToJulianDate(2361220.5).toString(), '1752 09 01');
    test.equal(cal.julianDayToJulianDate(2361221.5).toString(), '1752 09 02');
    test.equal(cal.julianDayToJulianDate(2361222.5).toString(), '1752 09 03');
    test.equal(cal.julianDayToJulianDate(1721457.5).toString(), '0001 02 03');
    test.done();
  },
  'julianDayToGregorianDate'     : function (test) {
    test.expect(14);
    test.ok(cmpDates(cal.julianDayToGregorianDate(2299158.5), new Date(1582, cal.months.OCTOBER, 13)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2299159.5), new Date(1582, cal.months.OCTOBER, 14)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2299160.5), new Date(1582, cal.months.OCTOBER, 15)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2299161.5), new Date(1582, cal.months.OCTOBER, 16)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2361220.5), new Date(1752, cal.months.SEPTEMBER, 13)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2361221.5), new Date(1752, cal.months.SEPTEMBER, 14)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2361222.5), new Date(1752, cal.months.SEPTEMBER, 15)));
    var dateFrom1AD = new Date(1, cal.months.FEBRUARY, 2);
    dateFrom1AD.setFullYear(1);
    test.ok(cmpDates(cal.julianDayToGregorianDate(1721457.5), dateFrom1AD));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2456656.5), new Date(2013, cal.months.DECEMBER, 30)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2456657.5), new Date(2013, cal.months.DECEMBER, 31)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2455957.5), new Date(2012, cal.months.JANUARY, 31)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2456351.5), new Date(2013, cal.months.FEBRUARY, 28)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2455985.5), new Date(2012, cal.months.FEBRUARY, 28)));
    test.ok(cmpDates(cal.julianDayToGregorianDate(2433313.5), new Date(1950, cal.months.FEBRUARY, 1)));
    test.done();
  },
  'julianDayToModernDate'        : function (test) {
    test.expect(14);
    test.equal(cal.julianDayToModernDate(2299158.5).toString(), '1582 10 02');
    test.equal(cal.julianDayToModernDate(2299159.5).toString(), '1582 10 03');
    test.equal(cal.julianDayToModernDate(2299160.5).toString(), '1582 10 04');
    test.equal(cal.julianDayToModernDate(2299161.5).toString(), '1582 10 05');
    test.equal(cal.julianDayToModernDate(1721457.5).toString(), '0001 02 03');
    test.ok(cmpDates(cal.julianDayToModernDate(2361220.5), new Date(1752, cal.months.SEPTEMBER, 13)));
    test.ok(cmpDates(cal.julianDayToModernDate(2361221.5), new Date(1752, cal.months.SEPTEMBER, 14)));
    test.ok(cmpDates(cal.julianDayToModernDate(2361222.5), new Date(1752, cal.months.SEPTEMBER, 15)));
    test.ok(cmpDates(cal.julianDayToModernDate(2456656.5), new Date(2013, cal.months.DECEMBER, 30)));
    test.ok(cmpDates(cal.julianDayToModernDate(2456657.5), new Date(2013, cal.months.DECEMBER, 31)));
    test.ok(cmpDates(cal.julianDayToModernDate(2455957.5), new Date(2012, cal.months.JANUARY, 31)));
    test.ok(cmpDates(cal.julianDayToModernDate(2456351.5), new Date(2013, cal.months.FEBRUARY, 28)));
    test.ok(cmpDates(cal.julianDayToModernDate(2455985.5), new Date(2012, cal.months.FEBRUARY, 28)));
    test.ok(cmpDates(cal.julianDayToModernDate(2433313.5), new Date(1950, cal.months.FEBRUARY, 1)));
    test.done();
  },
  'julianDayToAhargana'          : function (test) {
    test.expect(14);
    test.equal(cal.julianDayToAhargana(2299158.5), 1710693);
    test.equal(cal.julianDayToAhargana(2299159.5), 1710694);
    test.equal(cal.julianDayToAhargana(2299160.5), 1710695);
    test.equal(cal.julianDayToAhargana(2299161.5), 1710696);
    test.equal(cal.julianDayToAhargana(2361220.5), 1772755);
    test.equal(cal.julianDayToAhargana(2361221.5), 1772756);
    test.equal(cal.julianDayToAhargana(2361222.5), 1772757);
    test.equal(cal.julianDayToAhargana(1721457.5), 1132992);
    test.equal(cal.julianDayToAhargana(2456656.5), 1868191);
    test.equal(cal.julianDayToAhargana(2456657.5), 1868192);
    test.equal(cal.julianDayToAhargana(2455957.5), 1867492);
    test.equal(cal.julianDayToAhargana(2456351.5), 1867886);
    test.equal(cal.julianDayToAhargana(2455985.5), 1867520);
    test.equal(cal.julianDayToAhargana(2433313.5), 1844848);
    test.done();
  },
  'aharganaToJulianDay'          : function (test) {
    test.expect(14);
    test.equal(cal.aharganaToJulianDay(1710693), 2299158.5);
    test.equal(cal.aharganaToJulianDay(1710694), 2299159.5);
    test.equal(cal.aharganaToJulianDay(1710695), 2299160.5);
    test.equal(cal.aharganaToJulianDay(1710696), 2299161.5);
    test.equal(cal.aharganaToJulianDay(1772755), 2361220.5);
    test.equal(cal.aharganaToJulianDay(1772756), 2361221.5);
    test.equal(cal.aharganaToJulianDay(1772757), 2361222.5);
    test.equal(cal.aharganaToJulianDay(1132992), 1721457.5);
    test.equal(cal.aharganaToJulianDay(1868191), 2456656.5);
    test.equal(cal.aharganaToJulianDay(1868192), 2456657.5);
    test.equal(cal.aharganaToJulianDay(1867492), 2455957.5);
    test.equal(cal.aharganaToJulianDay(1867886), 2456351.5);
    test.equal(cal.aharganaToJulianDay(1867520), 2455985.5);
    test.equal(cal.aharganaToJulianDay(1844848), 2433313.5);
    test.done();
  },
  'julianDayToWeekday'           : function (test) {
    test.expect();
    test.equal(cal.julianDayToWeekday(2299158.5), 'Wednesday');
    test.equal(cal.julianDayToWeekday(2299159.5), 'Thursday');
    test.equal(cal.julianDayToWeekday(2299160.5), 'Friday');
    test.equal(cal.julianDayToWeekday(2299161.5), 'Saturday');
    test.equal(cal.julianDayToWeekday(2361220.5), 'Wednesday');
    test.equal(cal.julianDayToWeekday(2361221.5), 'Thursday');
    test.equal(cal.julianDayToWeekday(2361222.5), 'Friday');
    test.equal(cal.julianDayToWeekday(1721457.5), 'Friday');
    test.equal(cal.julianDayToWeekday(2456656.5), 'Monday');
    test.equal(cal.julianDayToWeekday(2456657.5), 'Tuesday');
    test.equal(cal.julianDayToWeekday(2455957.5), 'Tuesday');
    test.equal(cal.julianDayToWeekday(2456351.5), 'Thursday');
    test.equal(cal.julianDayToWeekday(2455985.5), 'Tuesday');
    test.equal(cal.julianDayToWeekday(2433313.5), 'Wednesday');
    test.done();
  },
  'getMasaNum'                   : function (test) {
    test.expect(14);
    test.equal(cal.getMasaNum(31.3101877453024, 190.002232417937), 1);
    test.equal(cal.getMasaNum(42.2597957259723, 209.07961889886), 1);
    test.equal(cal.getMasaNum(59.2349729472294, 183.469749507872), 1);
    test.equal(cal.getMasaNum(62.5975972349908, 208.58681756282), 2);
    test.equal(cal.getMasaNum(80.4818781723799, 180.203508055438), 2);
    test.equal(cal.getMasaNum(121.1497130809087, 208.340416894636), 4);
    test.equal(cal.getMasaNum(320.8687779979979, 195.735990965544), 10);
    test.equal(cal.getMasaNum(131.3101877453024, 10.002232417937), 4);
    test.equal(cal.getMasaNum(242.2597957259723, 9.07961889886), 8);
    test.equal(cal.getMasaNum(359.2349729472294, 83.469749507872), 11);
    test.equal(cal.getMasaNum(62.5975972349908, 108.58681756282), 2);
    test.equal(cal.getMasaNum(280.4818781723799, 180.203508055438), 9);
    test.equal(cal.getMasaNum(21.1497130809087, 108.340416894636), 0);
    test.equal(cal.getMasaNum(20.8687779979979, 286.735990965544), 0);
    test.done();
  },
  'getSauraMasaMonthDay'         : function (test) {
    test.expect(28);
    test.equal(cal.getSauraMasaMonthDay(2299158.5).month, 7);
    test.equal(cal.getSauraMasaMonthDay(2299159.5).month, 7);
    test.equal(cal.getSauraMasaMonthDay(2299160.5).month, 7);
    test.equal(cal.getSauraMasaMonthDay(2299161.5).month, 7);
    test.equal(cal.getSauraMasaMonthDay(2361220.5).month, 6);
    test.equal(cal.getSauraMasaMonthDay(2361221.5).month, 6);
    test.equal(cal.getSauraMasaMonthDay(2361222.5).month, 6);
    test.equal(cal.getSauraMasaMonthDay(1721457.5).month, 11);
    test.equal(cal.getSauraMasaMonthDay(2456656.5).month, 9);
    test.equal(cal.getSauraMasaMonthDay(2456657.5).month, 9);
    test.equal(cal.getSauraMasaMonthDay(2455957.5).month, 10);
    test.equal(cal.getSauraMasaMonthDay(2456351.5).month, 11);
    test.equal(cal.getSauraMasaMonthDay(2455985.5).month, 11);
    test.equal(cal.getSauraMasaMonthDay(2433313.5).month, 10);
    test.equal(cal.getSauraMasaMonthDay(2299158.5).day, 6);
    test.equal(cal.getSauraMasaMonthDay(2299159.5).day, 7);
    test.equal(cal.getSauraMasaMonthDay(2299160.5).day, 8);
    test.equal(cal.getSauraMasaMonthDay(2299161.5).day, 9);
    test.equal(cal.getSauraMasaMonthDay(2361220.5).day, 4);
    test.equal(cal.getSauraMasaMonthDay(2361221.5).day, 5);
    test.equal(cal.getSauraMasaMonthDay(2361222.5).day, 6);
    test.equal(cal.getSauraMasaMonthDay(1721457.5).day, 27);
    test.equal(cal.getSauraMasaMonthDay(2456656.5).day, 19);
    test.equal(cal.getSauraMasaMonthDay(2456657.5).day, 20);
    test.equal(cal.getSauraMasaMonthDay(2455957.5).day, 21);
    test.equal(cal.getSauraMasaMonthDay(2456351.5).day, 20);
    test.equal(cal.getSauraMasaMonthDay(2455985.5).day, 19);
    test.equal(cal.getSauraMasaMonthDay(2433313.5).day, 23);
    test.done();
  },
  'findSamkranti'                : function (test) {
    test.expect(5);
    test.ok(math.floatingPointEqual(cal.findSamkranti(1868206, 1868207), 1868206.71761142));
    test.ok(math.floatingPointEqual(cal.findSamkranti(1868236, 1868237), 1868236.15636098));
    test.ok(math.floatingPointEqual(cal.findSamkranti(1868266, 1868267), 1868266.00000001));
    test.ok(math.floatingPointEqual(cal.findSamkranti(1721431, 1721432), 1721431.9425787));
    test.ok(math.floatingPointEqual(cal.findSamkranti(2299153, 2299154), 2299153.23922039));
    test.done();
  }
};
