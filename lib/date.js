/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * Defines the KollavarshamDate and another private class
 * @module date
 */

'use strict';

/**
 * Pads zeroes to print the date in a pretty format
 * @private
 * @param num
 * @param size
 * @returns {string}
 */
var pad = function (num, size) {
  var s = '000000000' + num;
  return s.substr(s.length - size);
};

/****************** Julian Date (private) ***************************/

var JulianDate = function (year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
};

JulianDate.prototype.toString = function () {
  return pad(this.year, 4) + ' ' + pad(this.month, 2) + ' ' + pad(this.day, 2);
};

module.exports.JulianDate = JulianDate;

/****************** Kollavarsham Date *******************************/

/**
 * @class KollavarshamDate
 * @param [year=1] {Number} The Kollavarsham year
 * @param [month=1] {Number} The Kollavarsham month
 * @param [day=1] {Number} The Kollavarsham day
 * @constructor
 */
var KollavarshamDate = function (year, month, day) {

  this.year = year || 1;
  this.month = month || 1;
  this.day = day || 1;

  this.globals = null;
};

/**
 * Converts the Kollavarsham Date to a nicely formatted string with year, month and date
 * @method toString
 * @for KollavarshamDate
 * @return {string}
 */
KollavarshamDate.prototype.toString = function () {
  return pad(this.year, 4) + ' ' + pad(this.month, 2) + ' ' + pad(this.day, 2);
};

/**
 * Returns the out string (that is probably relevant only from the CLI perspective)
 * @method print
 * @returns {string}
 */
KollavarshamDate.prototype.print = function () {
  if (this.globals) {
    var result = 'Saka : ' + pad(this.globals.YearSaka, 4) + '\t' + pad(this.globals.tithiDay, 2) + ' ' +
        this.globals.masa + ' (' + pad(this.globals.masaNum, 2) + ') ' + '\t[' + this.globals.paksa + ']\n';

    result += 'Saura: ' + pad(this.globals.YearSaka, 4) + '\t' + pad(this.globals.sauraMasaDay, 2) + ' ' +
        this.globals.sauraMasa + ' (' + pad(this.globals.sauraMasaNum, 2) + ') ' + '\t' + this.globals.naksatra + '\n';

    result += 'ME   : ' + pad(this.globals.MalayalamYear, 4) + '\t' + pad(this.globals.sauraMasaDay, 2) + ' ' +
        this.globals.malayalaMasa + ' (' + pad(this.globals.malayalaMasaNum, 2) + ') ' + '\t' + this.globals.malayalaNaksatra + '\n';

    return result;
  }
  return this.toString();
};

module.exports.KollavarshamDate = KollavarshamDate;