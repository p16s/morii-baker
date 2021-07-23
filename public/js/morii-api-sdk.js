(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
		(function (global){(function (){
			/*! https://mths.be/punycode v1.4.1 by @mathias */
			;(function(root) {

				/** Detect free variables */
				var freeExports = typeof exports == 'object' && exports &&
					!exports.nodeType && exports;
				var freeModule = typeof module == 'object' && module &&
					!module.nodeType && module;
				var freeGlobal = typeof global == 'object' && global;
				if (
					freeGlobal.global === freeGlobal ||
					freeGlobal.window === freeGlobal ||
					freeGlobal.self === freeGlobal
				) {
					root = freeGlobal;
				}

				/**
				 * The `punycode` object.
				 * @name punycode
				 * @type Object
				 */
				var punycode,

					/** Highest positive signed 32-bit float value */
					maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

					/** Bootstring parameters */
					base = 36,
					tMin = 1,
					tMax = 26,
					skew = 38,
					damp = 700,
					initialBias = 72,
					initialN = 128, // 0x80
					delimiter = '-', // '\x2D'

					/** Regular expressions */
					regexPunycode = /^xn--/,
					regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
					regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

					/** Error messages */
					errors = {
						'overflow': 'Overflow: formInput needs wider integers to process',
						'not-basic': 'Illegal formInput >= 0x80 (not a basic code point)',
						'invalid-input': 'Invalid formInput'
					},

					/** Convenience shortcuts */
					baseMinusTMin = base - tMin,
					floor = Math.floor,
					stringFromCharCode = String.fromCharCode,

					/** Temporary variable */
					key;

				/*--------------------------------------------------------------------------*/

				/**
				 * A generic error utility function.
				 * @private
				 * @param {String} type The error type.
				 * @returns {Error} Throws a `RangeError` with the applicable error message.
				 */
				function error(type) {
					throw new RangeError(errors[type]);
				}

				/**
				 * A generic `Array#map` utility function.
				 * @private
				 * @param {Array} array The array to iterate over.
				 * @param {Function} callback The function that gets called for every array
				 * item.
				 * @returns {Array} A new array of values returned by the callback function.
				 */
				function map(array, fn) {
					var length = array.length;
					var result = [];
					while (length--) {
						result[length] = fn(array[length]);
					}
					return result;
				}

				/**
				 * A simple `Array#map`-like wrapper to work with domain name strings or email
				 * addresses.
				 * @private
				 * @param {String} domain The domain name or email address.
				 * @param {Function} callback The function that gets called for every
				 * character.
				 * @returns {Array} A new string of characters returned by the callback
				 * function.
				 */
				function mapDomain(string, fn) {
					var parts = string.split('@');
					var result = '';
					if (parts.length > 1) {
						// In email addresses, only the domain name should be punycoded. Leave
						// the local part (i.e. everything up to `@`) intact.
						result = parts[0] + '@';
						string = parts[1];
					}
					// Avoid `split(regex)` for IE8 compatibility. See #17.
					string = string.replace(regexSeparators, '\x2E');
					var labels = string.split('.');
					var encoded = map(labels, fn).join('.');
					return result + encoded;
				}

				/**
				 * Creates an array containing the numeric code points of each Unicode
				 * character in the string. While JavaScript uses UCS-2 internally,
				 * this function will convert a pair of surrogate halves (each of which
				 * UCS-2 exposes as separate characters) into a single code point,
				 * matching UTF-16.
				 * @see `punycode.ucs2.encode`
				 * @see <https://mathiasbynens.be/notes/javascript-encoding>
				 * @memberOf punycode.ucs2
				 * @name decode
				 * @param {String} string The Unicode formInput string (UCS-2).
				 * @returns {Array} The new array of code points.
				 */
				function ucs2decode(string) {
					var output = [],
						counter = 0,
						length = string.length,
						value,
						extra;
					while (counter < length) {
						value = string.charCodeAt(counter++);
						if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
							// high surrogate, and there is a next character
							extra = string.charCodeAt(counter++);
							if ((extra & 0xFC00) == 0xDC00) { // low surrogate
								output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
							} else {
								// unmatched surrogate; only append this code unit, in case the next
								// code unit is the high surrogate of a surrogate pair
								output.push(value);
								counter--;
							}
						} else {
							output.push(value);
						}
					}
					return output;
				}

				/**
				 * Creates a string based on an array of numeric code points.
				 * @see `punycode.ucs2.decode`
				 * @memberOf punycode.ucs2
				 * @name encode
				 * @param {Array} codePoints The array of numeric code points.
				 * @returns {String} The new Unicode string (UCS-2).
				 */
				function ucs2encode(array) {
					return map(array, function(value) {
						var output = '';
						if (value > 0xFFFF) {
							value -= 0x10000;
							output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
							value = 0xDC00 | value & 0x3FF;
						}
						output += stringFromCharCode(value);
						return output;
					}).join('');
				}

				/**
				 * Converts a basic code point into a digit/integer.
				 * @see `digitToBasic()`
				 * @private
				 * @param {Number} codePoint The basic numeric code point value.
				 * @returns {Number} The numeric value of a basic code point (for use in
				 * representing integers) in the range `0` to `base - 1`, or `base` if
				 * the code point does not represent a value.
				 */
				function basicToDigit(codePoint) {
					if (codePoint - 48 < 10) {
						return codePoint - 22;
					}
					if (codePoint - 65 < 26) {
						return codePoint - 65;
					}
					if (codePoint - 97 < 26) {
						return codePoint - 97;
					}
					return base;
				}

				/**
				 * Converts a digit/integer into a basic code point.
				 * @see `basicToDigit()`
				 * @private
				 * @param {Number} digit The numeric value of a basic code point.
				 * @returns {Number} The basic code point whose value (when used for
				 * representing integers) is `digit`, which needs to be in the range
				 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
				 * used; else, the lowercase form is used. The behavior is undefined
				 * if `flag` is non-zero and `digit` has no uppercase form.
				 */
				function digitToBasic(digit, flag) {
					//  0..25 map to ASCII a..z or A..Z
					// 26..35 map to ASCII 0..9
					return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
				}

				/**
				 * Bias adaptation function as per section 3.4 of RFC 3492.
				 * https://tools.ietf.org/html/rfc3492#section-3.4
				 * @private
				 */
				function adapt(delta, numPoints, firstTime) {
					var k = 0;
					delta = firstTime ? floor(delta / damp) : delta >> 1;
					delta += floor(delta / numPoints);
					for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
						delta = floor(delta / baseMinusTMin);
					}
					return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
				}

				/**
				 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
				 * symbols.
				 * @memberOf punycode
				 * @param {String} input The Punycode string of ASCII-only symbols.
				 * @returns {String} The resulting string of Unicode symbols.
				 */
				function decode(input) {
					// Don't use UCS-2
					var output = [],
						inputLength = input.length,
						out,
						i = 0,
						n = initialN,
						bias = initialBias,
						basic,
						j,
						index,
						oldi,
						w,
						k,
						digit,
						t,
						/** Cached calculation results */
						baseMinusT;

					// Handle the basic code points: let `basic` be the number of formInput code
					// points before the last delimiter, or `0` if there is none, then copy
					// the first basic code points to the output.

					basic = input.lastIndexOf(delimiter);
					if (basic < 0) {
						basic = 0;
					}

					for (j = 0; j < basic; ++j) {
						// if it's not a basic code point
						if (input.charCodeAt(j) >= 0x80) {
							error('not-basic');
						}
						output.push(input.charCodeAt(j));
					}

					// Main decoding loop: start just after the last delimiter if any basic code
					// points were copied; start at the beginning otherwise.

					for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

						// `index` is the index of the next character to be consumed.
						// Decode a generalized variable-length integer into `delta`,
						// which gets added to `i`. The overflow checking is easier
						// if we increase `i` as we go, then subtract off its starting
						// value at the end to obtain `delta`.
						for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

							if (index >= inputLength) {
								error('invalid-input');
							}

							digit = basicToDigit(input.charCodeAt(index++));

							if (digit >= base || digit > floor((maxInt - i) / w)) {
								error('overflow');
							}

							i += digit * w;
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

							if (digit < t) {
								break;
							}

							baseMinusT = base - t;
							if (w > floor(maxInt / baseMinusT)) {
								error('overflow');
							}

							w *= baseMinusT;

						}

						out = output.length + 1;
						bias = adapt(i - oldi, out, oldi == 0);

						// `i` was supposed to wrap around from `out` to `0`,
						// incrementing `n` each time, so we'll fix that now:
						if (floor(i / out) > maxInt - n) {
							error('overflow');
						}

						n += floor(i / out);
						i %= out;

						// Insert `n` at position `i` of the output
						output.splice(i++, 0, n);

					}

					return ucs2encode(output);
				}

				/**
				 * Converts a string of Unicode symbols (e.g. a domain name label) to a
				 * Punycode string of ASCII-only symbols.
				 * @memberOf punycode
				 * @param {String} input The string of Unicode symbols.
				 * @returns {String} The resulting Punycode string of ASCII-only symbols.
				 */
				function encode(input) {
					var n,
						delta,
						handledCPCount,
						basicLength,
						bias,
						j,
						m,
						q,
						k,
						t,
						currentValue,
						output = [],
						/** `inputLength` will hold the number of code points in `formInput`. */
						inputLength,
						/** Cached calculation results */
						handledCPCountPlusOne,
						baseMinusT,
						qMinusT;

					// Convert the formInput in UCS-2 to Unicode
					input = ucs2decode(input);

					// Cache the length
					inputLength = input.length;

					// Initialize the state
					n = initialN;
					delta = 0;
					bias = initialBias;

					// Handle the basic code points
					for (j = 0; j < inputLength; ++j) {
						currentValue = input[j];
						if (currentValue < 0x80) {
							output.push(stringFromCharCode(currentValue));
						}
					}

					handledCPCount = basicLength = output.length;

					// `handledCPCount` is the number of code points that have been handled;
					// `basicLength` is the number of basic code points.

					// Finish the basic string - if it is not empty - with a delimiter
					if (basicLength) {
						output.push(delimiter);
					}

					// Main encoding loop:
					while (handledCPCount < inputLength) {

						// All non-basic code points < n have been handled already. Find the next
						// larger one:
						for (m = maxInt, j = 0; j < inputLength; ++j) {
							currentValue = input[j];
							if (currentValue >= n && currentValue < m) {
								m = currentValue;
							}
						}

						// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
						// but guard against overflow
						handledCPCountPlusOne = handledCPCount + 1;
						if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
							error('overflow');
						}

						delta += (m - n) * handledCPCountPlusOne;
						n = m;

						for (j = 0; j < inputLength; ++j) {
							currentValue = input[j];

							if (currentValue < n && ++delta > maxInt) {
								error('overflow');
							}

							if (currentValue == n) {
								// Represent delta as a generalized variable-length integer
								for (q = delta, k = base; /* no condition */; k += base) {
									t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
									if (q < t) {
										break;
									}
									qMinusT = q - t;
									baseMinusT = base - t;
									output.push(
										stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
									);
									q = floor(qMinusT / baseMinusT);
								}

								output.push(stringFromCharCode(digitToBasic(q, 0)));
								bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
								delta = 0;
								++handledCPCount;
							}
						}

						++delta;
						++n;

					}
					return output.join('');
				}

				/**
				 * Converts a Punycode string representing a domain name or an email address
				 * to Unicode. Only the Punycoded parts of the formInput will be converted, i.e.
				 * it doesn't matter if you call it on a string that has already been
				 * converted to Unicode.
				 * @memberOf punycode
				 * @param {String} input The Punycoded domain name or email address to
				 * convert to Unicode.
				 * @returns {String} The Unicode representation of the given Punycode
				 * string.
				 */
				function toUnicode(input) {
					return mapDomain(input, function(string) {
						return regexPunycode.test(string)
							? decode(string.slice(4).toLowerCase())
							: string;
					});
				}

				/**
				 * Converts a Unicode string representing a domain name or an email address to
				 * Punycode. Only the non-ASCII parts of the domain name will be converted,
				 * i.e. it doesn't matter if you call it with a domain that's already in
				 * ASCII.
				 * @memberOf punycode
				 * @param {String} input The domain name or email address to convert, as a
				 * Unicode string.
				 * @returns {String} The Punycode representation of the given domain name or
				 * email address.
				 */
				function toASCII(input) {
					return mapDomain(input, function(string) {
						return regexNonASCII.test(string)
							? 'xn--' + encode(string)
							: string;
					});
				}

				/*--------------------------------------------------------------------------*/

				/** Define the public API */
				punycode = {
					/**
					 * A string representing the current Punycode.js version number.
					 * @memberOf punycode
					 * @type String
					 */
					'version': '1.4.1',
					/**
					 * An object of methods to convert from JavaScript's internal character
					 * representation (UCS-2) to Unicode code points, and back.
					 * @see <https://mathiasbynens.be/notes/javascript-encoding>
					 * @memberOf punycode
					 * @type Object
					 */
					'ucs2': {
						'decode': ucs2decode,
						'encode': ucs2encode
					},
					'decode': decode,
					'encode': encode,
					'toASCII': toASCII,
					'toUnicode': toUnicode
				};

				/** Expose `punycode` */
				// Some AMD build optimizers, like r.js, check for specific condition patterns
				// like the following:
				if (
					typeof define == 'function' &&
					typeof define.amd == 'object' &&
					define.amd
				) {
					define('punycode', function() {
						return punycode;
					});
				} else if (freeExports && freeModule) {
					if (module.exports == freeExports) {
						// in Node.js, io.js, or RingoJS v0.8.0+
						freeModule.exports = punycode;
					} else {
						// in Narwhal or RingoJS v0.7.0-
						for (key in punycode) {
							punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
						}
					}
				} else {
					// in Rhino or a web browser
					root.punycode = punycode;
				}

			}(this));

		}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

		'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
		function hasOwnProperty(obj, prop) {
			return Object.prototype.hasOwnProperty.call(obj, prop);
		}

		module.exports = function(qs, sep, eq, options) {
			sep = sep || '&';
			eq = eq || '=';
			var obj = {};

			if (typeof qs !== 'string' || qs.length === 0) {
				return obj;
			}

			var regexp = /\+/g;
			qs = qs.split(sep);

			var maxKeys = 1000;
			if (options && typeof options.maxKeys === 'number') {
				maxKeys = options.maxKeys;
			}

			var len = qs.length;
			// maxKeys <= 0 means that we should not limit keys count
			if (maxKeys > 0 && len > maxKeys) {
				len = maxKeys;
			}

			for (var i = 0; i < len; ++i) {
				var x = qs[i].replace(regexp, '%20'),
					idx = x.indexOf(eq),
					kstr, vstr, k, v;

				if (idx >= 0) {
					kstr = x.substr(0, idx);
					vstr = x.substr(idx + 1);
				} else {
					kstr = x;
					vstr = '';
				}

				k = decodeURIComponent(kstr);
				v = decodeURIComponent(vstr);

				if (!hasOwnProperty(obj, k)) {
					obj[k] = v;
				} else if (isArray(obj[k])) {
					obj[k].push(v);
				} else {
					obj[k] = [obj[k], v];
				}
			}

			return obj;
		};

		var isArray = Array.isArray || function (xs) {
			return Object.prototype.toString.call(xs) === '[object Array]';
		};

	},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

		'use strict';

		var stringifyPrimitive = function(v) {
			switch (typeof v) {
				case 'string':
					return v;

				case 'boolean':
					return v ? 'true' : 'false';

				case 'number':
					return isFinite(v) ? v : '';

				default:
					return '';
			}
		};

		module.exports = function(obj, sep, eq, name) {
			sep = sep || '&';
			eq = eq || '=';
			if (obj === null) {
				obj = undefined;
			}

			if (typeof obj === 'object') {
				return map(objectKeys(obj), function(k) {
					var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
					if (isArray(obj[k])) {
						return map(obj[k], function(v) {
							return ks + encodeURIComponent(stringifyPrimitive(v));
						}).join(sep);
					} else {
						return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
					}
				}).join(sep);

			}

			if (!name) return '';
			return encodeURIComponent(stringifyPrimitive(name)) + eq +
				encodeURIComponent(stringifyPrimitive(obj));
		};

		var isArray = Array.isArray || function (xs) {
			return Object.prototype.toString.call(xs) === '[object Array]';
		};

		function map (xs, f) {
			if (xs.map) return xs.map(f);
			var res = [];
			for (var i = 0; i < xs.length; i++) {
				res.push(f(xs[i], i));
			}
			return res;
		}

		var objectKeys = Object.keys || function (obj) {
			var res = [];
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
			}
			return res;
		};

	},{}],4:[function(require,module,exports){
		'use strict';

		exports.decode = exports.parse = require('./decode');
		exports.encode = exports.stringify = require('./encode');

	},{"./decode":2,"./encode":3}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

		'use strict';

		var punycode = require('punycode');
		var util = require('./util');

		exports.parse = urlParse;
		exports.resolve = urlResolve;
		exports.resolveObject = urlResolveObject;
		exports.format = urlFormat;

		exports.Url = Url;

		function Url() {
			this.protocol = null;
			this.slashes = null;
			this.auth = null;
			this.host = null;
			this.port = null;
			this.hostname = null;
			this.hash = null;
			this.search = null;
			this.query = null;
			this.pathname = null;
			this.path = null;
			this.href = null;
		}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
		var protocolPattern = /^([a-z0-9.+-]+:)/i,
			portPattern = /:[0-9]*$/,

			// Special case for a simple path URL
			simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

			// RFC 2396: characters reserved for delimiting URLs.
			// We actually just auto-escape these.
			delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

			// RFC 2396: characters not allowed for various reasons.
			unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

			// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
			autoEscape = ['\''].concat(unwise),
			// Characters that are never ever allowed in a hostname.
			// Note that any invalid chars are also handled, but these
			// are the ones that are *expected* to be seen, so we fast-path
			// them.
			nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
			hostEndingChars = ['/', '?', '#'],
			hostnameMaxLen = 255,
			hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
			hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
			// protocols that can allow "unsafe" and "unwise" chars.
			unsafeProtocol = {
				'javascript': true,
				'javascript:': true
			},
			// protocols that never have a hostname.
			hostlessProtocol = {
				'javascript': true,
				'javascript:': true
			},
			// protocols that always contain a // bit.
			slashedProtocol = {
				'http': true,
				'https': true,
				'ftp': true,
				'gopher': true,
				'file': true,
				'http:': true,
				'https:': true,
				'ftp:': true,
				'gopher:': true,
				'file:': true
			},
			querystring = require('querystring');

		function urlParse(url, parseQueryString, slashesDenoteHost) {
			if (url && util.isObject(url) && url instanceof Url) return url;

			var u = new Url;
			u.parse(url, parseQueryString, slashesDenoteHost);
			return u;
		}

		Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
			if (!util.isString(url)) {
				throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
			}

			// Copy chrome, IE, opera backslash-handling behavior.
			// Back slashes before the query string get converted to forward slashes
			// See: https://code.google.com/p/chromium/issues/detail?id=25916
			var queryIndex = url.indexOf('?'),
				splitter =
					(queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
				uSplit = url.split(splitter),
				slashRegex = /\\/g;
			uSplit[0] = uSplit[0].replace(slashRegex, '/');
			url = uSplit.join(splitter);

			var rest = url;

			// trim before proceeding.
			// This is to support parse stuff like "  http://foo.com  \n"
			rest = rest.trim();

			if (!slashesDenoteHost && url.split('#').length === 1) {
				// Try fast path regexp
				var simplePath = simplePathPattern.exec(rest);
				if (simplePath) {
					this.path = rest;
					this.href = rest;
					this.pathname = simplePath[1];
					if (simplePath[2]) {
						this.search = simplePath[2];
						if (parseQueryString) {
							this.query = querystring.parse(this.search.substr(1));
						} else {
							this.query = this.search.substr(1);
						}
					} else if (parseQueryString) {
						this.search = '';
						this.query = {};
					}
					return this;
				}
			}

			var proto = protocolPattern.exec(rest);
			if (proto) {
				proto = proto[0];
				var lowerProto = proto.toLowerCase();
				this.protocol = lowerProto;
				rest = rest.substr(proto.length);
			}

			// figure out if it's got a host
			// user@server is *always* interpreted as a hostname, and url
			// resolution will treat //foo/bar as host=foo,path=bar because that's
			// how the browser resolves relative URLs.
			if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
				var slashes = rest.substr(0, 2) === '//';
				if (slashes && !(proto && hostlessProtocol[proto])) {
					rest = rest.substr(2);
					this.slashes = true;
				}
			}

			if (!hostlessProtocol[proto] &&
				(slashes || (proto && !slashedProtocol[proto]))) {

				// there's a hostname.
				// the first instance of /, ?, ;, or # ends the host.
				//
				// If there is an @ in the hostname, then non-host chars *are* allowed
				// to the left of the last @ sign, unless some host-ending character
				// comes *before* the @-sign.
				// URLs are obnoxious.
				//
				// ex:
				// http://a@b@c/ => user:a@b host:c
				// http://a@b?@c => user:a host:c path:/?@c

				// v0.12 TODO(isaacs): This is not quite how Chrome does things.
				// Review our test case against browsers more comprehensively.

				// find the first instance of any hostEndingChars
				var hostEnd = -1;
				for (var i = 0; i < hostEndingChars.length; i++) {
					var hec = rest.indexOf(hostEndingChars[i]);
					if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
						hostEnd = hec;
				}

				// at this point, either we have an explicit point where the
				// auth portion cannot go past, or the last @ char is the decider.
				var auth, atSign;
				if (hostEnd === -1) {
					// atSign can be anywhere.
					atSign = rest.lastIndexOf('@');
				} else {
					// atSign must be in auth portion.
					// http://a@b/c@d => host:b auth:a path:/c@d
					atSign = rest.lastIndexOf('@', hostEnd);
				}

				// Now we have a portion which is definitely the auth.
				// Pull that off.
				if (atSign !== -1) {
					auth = rest.slice(0, atSign);
					rest = rest.slice(atSign + 1);
					this.auth = decodeURIComponent(auth);
				}

				// the host is the remaining to the left of the first non-host char
				hostEnd = -1;
				for (var i = 0; i < nonHostChars.length; i++) {
					var hec = rest.indexOf(nonHostChars[i]);
					if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
						hostEnd = hec;
				}
				// if we still have not hit it, then the entire thing is a host.
				if (hostEnd === -1)
					hostEnd = rest.length;

				this.host = rest.slice(0, hostEnd);
				rest = rest.slice(hostEnd);

				// pull out port.
				this.parseHost();

				// we've indicated that there is a hostname,
				// so even if it's empty, it has to be present.
				this.hostname = this.hostname || '';

				// if hostname begins with [ and ends with ]
				// assume that it's an IPv6 address.
				var ipv6Hostname = this.hostname[0] === '[' &&
					this.hostname[this.hostname.length - 1] === ']';

				// validate a little.
				if (!ipv6Hostname) {
					var hostparts = this.hostname.split(/\./);
					for (var i = 0, l = hostparts.length; i < l; i++) {
						var part = hostparts[i];
						if (!part) continue;
						if (!part.match(hostnamePartPattern)) {
							var newpart = '';
							for (var j = 0, k = part.length; j < k; j++) {
								if (part.charCodeAt(j) > 127) {
									// we replace non-ASCII char with a temporary placeholder
									// we need this to make sure size of hostname is not
									// broken by replacing non-ASCII by nothing
									newpart += 'x';
								} else {
									newpart += part[j];
								}
							}
							// we test again with ASCII char only
							if (!newpart.match(hostnamePartPattern)) {
								var validParts = hostparts.slice(0, i);
								var notHost = hostparts.slice(i + 1);
								var bit = part.match(hostnamePartStart);
								if (bit) {
									validParts.push(bit[1]);
									notHost.unshift(bit[2]);
								}
								if (notHost.length) {
									rest = '/' + notHost.join('.') + rest;
								}
								this.hostname = validParts.join('.');
								break;
							}
						}
					}
				}

				if (this.hostname.length > hostnameMaxLen) {
					this.hostname = '';
				} else {
					// hostnames are always lower case.
					this.hostname = this.hostname.toLowerCase();
				}

				if (!ipv6Hostname) {
					// IDNA Support: Returns a punycoded representation of "domain".
					// It only converts parts of the domain name that
					// have non-ASCII characters, i.e. it doesn't matter if
					// you call it with a domain that already is ASCII-only.
					this.hostname = punycode.toASCII(this.hostname);
				}

				var p = this.port ? ':' + this.port : '';
				var h = this.hostname || '';
				this.host = h + p;
				this.href += this.host;

				// strip [ and ] from the hostname
				// the host field still retains them, though
				if (ipv6Hostname) {
					this.hostname = this.hostname.substr(1, this.hostname.length - 2);
					if (rest[0] !== '/') {
						rest = '/' + rest;
					}
				}
			}

			// now rest is set to the post-host stuff.
			// chop off any delim chars.
			if (!unsafeProtocol[lowerProto]) {

				// First, make 100% sure that any "autoEscape" chars get
				// escaped, even if encodeURIComponent doesn't think they
				// need to be.
				for (var i = 0, l = autoEscape.length; i < l; i++) {
					var ae = autoEscape[i];
					if (rest.indexOf(ae) === -1)
						continue;
					var esc = encodeURIComponent(ae);
					if (esc === ae) {
						esc = escape(ae);
					}
					rest = rest.split(ae).join(esc);
				}
			}


			// chop off from the tail first.
			var hash = rest.indexOf('#');
			if (hash !== -1) {
				// got a fragment string.
				this.hash = rest.substr(hash);
				rest = rest.slice(0, hash);
			}
			var qm = rest.indexOf('?');
			if (qm !== -1) {
				this.search = rest.substr(qm);
				this.query = rest.substr(qm + 1);
				if (parseQueryString) {
					this.query = querystring.parse(this.query);
				}
				rest = rest.slice(0, qm);
			} else if (parseQueryString) {
				// no query string, but parseQueryString still requested
				this.search = '';
				this.query = {};
			}
			if (rest) this.pathname = rest;
			if (slashedProtocol[lowerProto] &&
				this.hostname && !this.pathname) {
				this.pathname = '/';
			}

			//to support http.request
			if (this.pathname || this.search) {
				var p = this.pathname || '';
				var s = this.search || '';
				this.path = p + s;
			}

			// finally, reconstruct the href based on what has been validated.
			this.href = this.format();
			return this;
		};

// format a parsed object into a url string
		function urlFormat(obj) {
			// ensure it's an object, and not a string url.
			// If it's an obj, this is a no-op.
			// this way, you can call url_format() on strings
			// to clean up potentially wonky urls.
			if (util.isString(obj)) obj = urlParse(obj);
			if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
			return obj.format();
		}

		Url.prototype.format = function() {
			var auth = this.auth || '';
			if (auth) {
				auth = encodeURIComponent(auth);
				auth = auth.replace(/%3A/i, ':');
				auth += '@';
			}

			var protocol = this.protocol || '',
				pathname = this.pathname || '',
				hash = this.hash || '',
				host = false,
				query = '';

			if (this.host) {
				host = auth + this.host;
			} else if (this.hostname) {
				host = auth + (this.hostname.indexOf(':') === -1 ?
					this.hostname :
					'[' + this.hostname + ']');
				if (this.port) {
					host += ':' + this.port;
				}
			}

			if (this.query &&
				util.isObject(this.query) &&
				Object.keys(this.query).length) {
				query = querystring.stringify(this.query);
			}

			var search = this.search || (query && ('?' + query)) || '';

			if (protocol && protocol.substr(-1) !== ':') protocol += ':';

			// only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
			// unless they had them to begin with.
			if (this.slashes ||
				(!protocol || slashedProtocol[protocol]) && host !== false) {
				host = '//' + (host || '');
				if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
			} else if (!host) {
				host = '';
			}

			if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
			if (search && search.charAt(0) !== '?') search = '?' + search;

			pathname = pathname.replace(/[?#]/g, function(match) {
				return encodeURIComponent(match);
			});
			search = search.replace('#', '%23');

			return protocol + host + pathname + search + hash;
		};

		function urlResolve(source, relative) {
			return urlParse(source, false, true).resolve(relative);
		}

		Url.prototype.resolve = function(relative) {
			return this.resolveObject(urlParse(relative, false, true)).format();
		};

		function urlResolveObject(source, relative) {
			if (!source) return relative;
			return urlParse(source, false, true).resolveObject(relative);
		}

		Url.prototype.resolveObject = function(relative) {
			if (util.isString(relative)) {
				var rel = new Url();
				rel.parse(relative, false, true);
				relative = rel;
			}

			var result = new Url();
			var tkeys = Object.keys(this);
			for (var tk = 0; tk < tkeys.length; tk++) {
				var tkey = tkeys[tk];
				result[tkey] = this[tkey];
			}

			// hash is always overridden, no matter what.
			// even href="" will remove it.
			result.hash = relative.hash;

			// if the relative url is empty, then there's nothing left to do here.
			if (relative.href === '') {
				result.href = result.format();
				return result;
			}

			// hrefs like //foo/bar always cut to the protocol.
			if (relative.slashes && !relative.protocol) {
				// take everything except the protocol from relative
				var rkeys = Object.keys(relative);
				for (var rk = 0; rk < rkeys.length; rk++) {
					var rkey = rkeys[rk];
					if (rkey !== 'protocol')
						result[rkey] = relative[rkey];
				}

				//urlParse appends trailing / to urls like http://www.example.com
				if (slashedProtocol[result.protocol] &&
					result.hostname && !result.pathname) {
					result.path = result.pathname = '/';
				}

				result.href = result.format();
				return result;
			}

			if (relative.protocol && relative.protocol !== result.protocol) {
				// if it's a known url protocol, then changing
				// the protocol does weird things
				// first, if it's not file:, then we MUST have a host,
				// and if there was a path
				// to begin with, then we MUST have a path.
				// if it is file:, then the host is dropped,
				// because that's known to be hostless.
				// anything else is assumed to be absolute.
				if (!slashedProtocol[relative.protocol]) {
					var keys = Object.keys(relative);
					for (var v = 0; v < keys.length; v++) {
						var k = keys[v];
						result[k] = relative[k];
					}
					result.href = result.format();
					return result;
				}

				result.protocol = relative.protocol;
				if (!relative.host && !hostlessProtocol[relative.protocol]) {
					var relPath = (relative.pathname || '').split('/');
					while (relPath.length && !(relative.host = relPath.shift()));
					if (!relative.host) relative.host = '';
					if (!relative.hostname) relative.hostname = '';
					if (relPath[0] !== '') relPath.unshift('');
					if (relPath.length < 2) relPath.unshift('');
					result.pathname = relPath.join('/');
				} else {
					result.pathname = relative.pathname;
				}
				result.search = relative.search;
				result.query = relative.query;
				result.host = relative.host || '';
				result.auth = relative.auth;
				result.hostname = relative.hostname || relative.host;
				result.port = relative.port;
				// to support http.request
				if (result.pathname || result.search) {
					var p = result.pathname || '';
					var s = result.search || '';
					result.path = p + s;
				}
				result.slashes = result.slashes || relative.slashes;
				result.href = result.format();
				return result;
			}

			var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
				isRelAbs = (
					relative.host ||
					relative.pathname && relative.pathname.charAt(0) === '/'
				),
				mustEndAbs = (isRelAbs || isSourceAbs ||
					(result.host && relative.pathname)),
				removeAllDots = mustEndAbs,
				srcPath = result.pathname && result.pathname.split('/') || [],
				relPath = relative.pathname && relative.pathname.split('/') || [],
				psychotic = result.protocol && !slashedProtocol[result.protocol];

			// if the url is a non-slashed url, then relative
			// links like ../.. should be able
			// to crawl up to the hostname, as well.  This is strange.
			// result.protocol has already been set by now.
			// Later on, put the first path part into the host field.
			if (psychotic) {
				result.hostname = '';
				result.port = null;
				if (result.host) {
					if (srcPath[0] === '') srcPath[0] = result.host;
					else srcPath.unshift(result.host);
				}
				result.host = '';
				if (relative.protocol) {
					relative.hostname = null;
					relative.port = null;
					if (relative.host) {
						if (relPath[0] === '') relPath[0] = relative.host;
						else relPath.unshift(relative.host);
					}
					relative.host = null;
				}
				mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
			}

			if (isRelAbs) {
				// it's absolute.
				result.host = (relative.host || relative.host === '') ?
					relative.host : result.host;
				result.hostname = (relative.hostname || relative.hostname === '') ?
					relative.hostname : result.hostname;
				result.search = relative.search;
				result.query = relative.query;
				srcPath = relPath;
				// fall through to the dot-handling below.
			} else if (relPath.length) {
				// it's relative
				// throw away the existing file, and take the new path instead.
				if (!srcPath) srcPath = [];
				srcPath.pop();
				srcPath = srcPath.concat(relPath);
				result.search = relative.search;
				result.query = relative.query;
			} else if (!util.isNullOrUndefined(relative.search)) {
				// just pull out the search.
				// like href='?foo'.
				// Put this after the other two cases because it simplifies the booleans
				if (psychotic) {
					result.hostname = result.host = srcPath.shift();
					//occationaly the auth can get stuck only in host
					//this especially happens in cases like
					//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
					var authInHost = result.host && result.host.indexOf('@') > 0 ?
						result.host.split('@') : false;
					if (authInHost) {
						result.auth = authInHost.shift();
						result.host = result.hostname = authInHost.shift();
					}
				}
				result.search = relative.search;
				result.query = relative.query;
				//to support http.request
				if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
					result.path = (result.pathname ? result.pathname : '') +
						(result.search ? result.search : '');
				}
				result.href = result.format();
				return result;
			}

			if (!srcPath.length) {
				// no path at all.  easy.
				// we've already handled the other stuff above.
				result.pathname = null;
				//to support http.request
				if (result.search) {
					result.path = '/' + result.search;
				} else {
					result.path = null;
				}
				result.href = result.format();
				return result;
			}

			// if a url ENDs in . or .., then it must get a trailing slash.
			// however, if it ends in anything else non-slashy,
			// then it must NOT get a trailing slash.
			var last = srcPath.slice(-1)[0];
			var hasTrailingSlash = (
				(result.host || relative.host || srcPath.length > 1) &&
				(last === '.' || last === '..') || last === '');

			// strip single dots, resolve double dots to parent dir
			// if the path tries to go above the root, `up` ends up > 0
			var up = 0;
			for (var i = srcPath.length; i >= 0; i--) {
				last = srcPath[i];
				if (last === '.') {
					srcPath.splice(i, 1);
				} else if (last === '..') {
					srcPath.splice(i, 1);
					up++;
				} else if (up) {
					srcPath.splice(i, 1);
					up--;
				}
			}

			// if the path is allowed to go above the root, restore leading ..s
			if (!mustEndAbs && !removeAllDots) {
				for (; up--; up) {
					srcPath.unshift('..');
				}
			}

			if (mustEndAbs && srcPath[0] !== '' &&
				(!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
				srcPath.unshift('');
			}

			if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
				srcPath.push('');
			}

			var isAbsolute = srcPath[0] === '' ||
				(srcPath[0] && srcPath[0].charAt(0) === '/');

			// put the host back
			if (psychotic) {
				result.hostname = result.host = isAbsolute ? '' :
					srcPath.length ? srcPath.shift() : '';
				//occationaly the auth can get stuck only in host
				//this especially happens in cases like
				//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
				var authInHost = result.host && result.host.indexOf('@') > 0 ?
					result.host.split('@') : false;
				if (authInHost) {
					result.auth = authInHost.shift();
					result.host = result.hostname = authInHost.shift();
				}
			}

			mustEndAbs = mustEndAbs || (result.host && srcPath.length);

			if (mustEndAbs && !isAbsolute) {
				srcPath.unshift('');
			}

			if (!srcPath.length) {
				result.pathname = null;
				result.path = null;
			} else {
				result.pathname = srcPath.join('/');
			}

			//to support request.http
			if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
				result.path = (result.pathname ? result.pathname : '') +
					(result.search ? result.search : '');
			}
			result.auth = relative.auth || result.auth;
			result.slashes = result.slashes || relative.slashes;
			result.href = result.format();
			return result;
		};

		Url.prototype.parseHost = function() {
			var host = this.host;
			var port = portPattern.exec(host);
			if (port) {
				port = port[0];
				if (port !== ':') {
					this.port = port.substr(1);
				}
				host = host.substr(0, host.length - port.length);
			}
			if (host) this.hostname = host;
		};

	},{"./util":6,"punycode":1,"querystring":4}],6:[function(require,module,exports){
		'use strict';

		module.exports = {
			isString: function(arg) {
				return typeof(arg) === 'string';
			},
			isObject: function(arg) {
				return typeof(arg) === 'object' && arg !== null;
			},
			isNull: function(arg) {
				return arg === null;
			},
			isNullOrUndefined: function(arg) {
				return arg == null;
			}
		};

	},{}],7:[function(require,module,exports){
		(function (global){(function (){
			const Api = require("./src/api.js");
			const Watson = require("./src/watson.js");
			const Sherlock = require("./src/sherlock.js");
			const Lestrade = require("./src/lestrade")

			class MoriiSdk {
				/**
				 * @param {string} appToken
				 * @param {string} userToken
				 * @param {string} url
				 */
				constructor(appToken, userToken, url) {
					this._appToken = appToken;
					this._userToken = userToken;
					this._url = url;
					this._verboseMode = false;
					this._api = new Api(appToken, userToken, url);
					this.watson = new Watson(this._api, '/watson');
					this.sherlock = new Sherlock(this._api, '/sherlock');
					this.lestrade = new Lestrade(this._api, '/lestrade')
				}

				/**
				 * get the API
				 * @returns {Api}
				 */
				get api() {
					return this._api;
				}

				/**
				 * is verbose mode on or off?
				 * @returns {boolean}
				 */
				get verboseMode() {
					return this._verboseMode;
				}

				/**
				 * set verbose mode on/off
				 * @param {boolean} value - set verbose mode on or off
				 */
				set verboseMode(value) {
					this._verboseMode = value;
					this.api.verboseMode = value;
					console.log('Verbose mode ' + (value ? 'ON' : 'OFF'));
				}

				/**
				 * @returns {string}
				 */
				get appToken() {
					return this._api.appToken;
				}

				/**
				 * @param {string} value
				 */
				set appToken(value) {
					this._api.appToken = value;
				}

				/**
				 * @returns {string}
				 */
				get userToken() {
					return this._api._userToken;
				}

				/**
				 * @param {string} value
				 */
				set userToken(value) {
					this._api._userToken = value;
				}

				/**
				 * @returns {string} The URL of the API
				 */
				get url() {
					return this._url;
				}

				/**
				 * @param {string} value - The URL of the API
				 */
				set url(value) {
					this._url = value;
				}

				/**
				 * toggle verbose mode
				 */
				get v() {
					this.verboseMode = !this.verboseMode;
				}
			}

			module.exports = MoriiSdk;

// export to window
			if (typeof window !== 'undefined') {
				window.MoriiSdk = MoriiSdk;
			}

// add fetch to the global scope in NodeJS
			if (typeof fetch === 'undefined') {
				global.fetch = require("node-fetch");
			}

// let moriiSdk = new MoriiSdk("appToken", "userToken", "http://127.0.0.1:3000/");
// moriiSdk.watson.user.search().then((users) => {console.log(users)})

//let moriiSdk = new MoriiSdk("appToken", "userToken", "http://127.0.0.1:3000/");
// moriiSdk.watson.user.get('n8wwsjvcw58kk5hhvg0').then((resp) => {
//     if (resp === null) {
//         console.log('User not found');
//     } else {
//         console.log(resp)
//         resp.username = 'MikeTest';
//         resp.hhhh = 'asdasd';
//         moriiSdk.watson.user.update(resp).then((res) => {console.log(res)}).catch((res) => {console.log('Error', res)});
//     }
// })

		}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./src/api.js":33,"./src/lestrade":35,"./src/sherlock.js":36,"./src/watson.js":37,"node-fetch":32}],8:[function(require,module,exports){
		let objects = {
			Action: require('./src/action.js'),
			ActionHistory: require('./src/action-history'),
			ApiObject: require('./src/api-object.js'),
			// CapTableEntry: require('./src/cap-table-entry.js.removed'),
			// CapTableEntryCollection: require('./src/cap-table-entry-collection.js.removed'),
			Entity: require('./src/entity.js'),
			Group: require('./src/group.js'),
			Files: require('./src/files.js'),
			Message: require('./src/message.js'),
			// ShareClass: require('./src/share-class.js.removed'),
			// ShareTransfer: require('./src/share-transfer.js.removed'),
			User: require('./src/user.js'),
			Vote: require('./src/vote'),
			VoteResult: require('./src/vote-result.js'),
			types: {
				Address: require('./src/types/address.js'),
				EntityStatus: require('./src/types/entity-status.js'),
				EntityType: require('./src/types/entity-type.js'),
				MessageType: require('./src/types/message-type.js'),
				MessageStatus: require('./src/types/message-status.js'), // rvk
				// ShareTransferType: require('./src/types/share-transfer-type.js.removed'),
				GroupType: require('./src/types/group-type'),
				UserType: require('./src/types/user-type.js'),
				UserStatus: require('./src/types/user-status.js'),
				InviteStatus: require('./src/types/invite-status.js')
			},
			collections: {
				Collection: require('./src/collections/collection.js'),
				Storage: require('./src/collections/storage.js')
			},
			errors: {
				InvalidPropertyError: require('./src/errors/invalid-property-error.js'),
				BadPropertyError: require('./src/errors/bad-property-error.js')
			}
		};

		module.exports = objects;

// testing...
// let bob = {
//   hello: function () {
//
//   },
//   world: function () {
//
//   }
// },
//     helloWorldInterface = new objects.ObjectInterface("hello", "world"),
//     fooBarInterface = new objects.ObjectInterface('foo', 'bar');
//
// console.log(objects.usesInterface(bob, helloWorldInterface)); // should be true
// console.log(objects.usesInterface(bob, fooBarInterface)); // should be false
	},{"./src/action-history":9,"./src/action.js":10,"./src/api-object.js":11,"./src/collections/collection.js":12,"./src/collections/storage.js":13,"./src/entity.js":14,"./src/errors/bad-property-error.js":15,"./src/errors/invalid-property-error.js":16,"./src/files.js":17,"./src/group.js":18,"./src/message.js":19,"./src/types/address.js":20,"./src/types/entity-status.js":21,"./src/types/entity-type.js":22,"./src/types/group-type":23,"./src/types/invite-status.js":24,"./src/types/message-status.js":25,"./src/types/message-type.js":26,"./src/types/user-status.js":27,"./src/types/user-type.js":28,"./src/user.js":29,"./src/vote":31,"./src/vote-result.js":30}],9:[function(require,module,exports){
		const ApiObject = require('./api-object.js');

		class ActionHistory extends ApiObject {

			/**
			 * Create action history object
			 */
			constructor() {
				super('_actionId', '_targetObject', '_targetType', '_changedFrom', '_changedTo');
			}

			/**
			 * @property val
			 */
			set actionId(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property actionId must be a string');
				}
				this._actionId = val;
			}

			get actionId() {
				return this._actionId;
			}

			/**
			 * @property val
			 */
			set targetObject(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property targetObject must be a string');
				}
				this._targetObject = val;
			}

			get targetObject() {
				return this._targetObject;
			}

			/**
			 * @property val
			 */
			set targetType(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property targetType must be a string');
				}
				this._targetType = val;
			}

			get targetType() {
				return this._targetType;
			}

			/**
			 * @property val
			 */
			set changedFrom(val) {
				// TODO: Change validation
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property changedFrom must be a array');
				}
				this._changedFrom = val;
			}

			get changedFrom() {
				return this._changedFrom
			}

			/**
			 * @property val
			 */
			set changedTo(val) {
				// TODO: Change validation
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property changedFrTo must be a array');
				}
				this._changedTo = val;
			}

			get changedTo() {
				return this._changedTo;
			}

		}

		module.exports = ActionHistory;
	},{"./api-object.js":11}],10:[function(require,module,exports){
		const ApiObject = require('./api-object');
		const User = require('./user');

		class Action extends ApiObject {

			/**
			 * Create action object
			 */
			constructor() {
				super('_timestamp', '_actor', '_apicall');
			}

			/**
			 * @property val
			 */
			set timestamp(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property timestamp must be a string');
				}
				this._timestamp = val;
			}

			get timestamp() {
				return this._timestamp;
			}

			/**
			 * @property val
			 */
			set actor(val) {
				// TODO: Change validation
				if (!(val instanceof User) && val !== null) {
					throw new TypeError('Property actor must be a User object');
				}
				this._actor= val;
			}

			get actor() {
				return this._actor;
			}

			/**
			 * @property val
			 */
			set apicall(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property actor must be a string');
				}
				this._apicall = val;
			}

			get apicall() {
				return this._apicall;
			}

		}

		module.exports = Action;
	},{"./api-object":11,"./user":29}],11:[function(require,module,exports){
		const BadPropertyError = require('./errors/bad-property-error.js');

		class ApiObject {
			/**
			 * Create an Object interface to hold a list of names
			 *
			 * @param {string} properties
			 */
			constructor(...properties) {

				this._guid = null;
				properties.forEach((value) => {
					this[value] = null;
				});

				this._userOptions = {};
				this._systemOptions = {};
				this._applicationOptions = {};
			}

			/**
			 * Get GUID
			 * @returns {null}
			 */
			get guid() {
				return this._guid;
			}

			/**
			 * Set GUID
			 * @param guid
			 */
			set guid(guid) {
				this._guid = guid;
			}

			/**
			 * get User Options
			 * @returns {Object}
			 */
			get userOptions() {
				return this._userOptions;
			}

			/**
			 * get system options
			 * @returns {Object}
			 */
			get systemOptions() {
				return this._systemOptions;
			}

			/**
			 * Get application Options
			 * @returns {Object}
			 */
			get applicationOptions() {
				return this._applicationOptions;
			}

			/**
			 * set user options
			 * @param value
			 */
			set userOptions(value) {
				this._userOptions = value;
			}

			/**
			 * set system options
			 * @param value
			 */
			set systemOptions(value) {
				this._systemOptions = value;
			}

			/**
			 * Set Application options
			 * @param value
			 */
			set applicationOptions(value) {
				this._applicationOptions = value;
			}

			// add static guid generator
			static generateGuid() {
				//TODO: expand
				return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
			}

			/**
			 *
			 * @param {Object} object
			 *
			 * @return {ApiObject}
			 */
			static fromObject(object) {
				return this.fromJSON(JSON.stringify(object))
			}

			/**
			 * From JSON
			 *
			 * @param {string} json
			 */
			static fromJSON(json) {

				// create a new object
				let o = new this();

				// loop through json parsed string
				for (const [key, value] of Object.entries(JSON.parse(json))) {
					if (typeof o[key] !== 'undefined') {
						try {
							o[key] = value;
						} catch (e) {
							throw new BadPropertyError('Invalid value for property', key);
						}
					} else {
						throw new BadPropertyError('Property does not exist', key)
					}
				}

				return o;
			}


			toJSON() {
				return this.toObject();
			}

			toObject() {
				let o = {},
					keys = [],
					values = [],
					i = 0;

				for (const [key, value] of Object.entries(this)) {
					keys.push(key);
					values.push(value);
				}

				keys.forEach((key) => {
					let value = values[i];

					// check if this looks like a private property and remove the _ if it probably is
					if (key.substring(0,1) === '_' // is a sudo private property
						&& !keys.includes(key.substring(1)) // not a conflicting property in the object
						&& typeof this[key] !== 'undefined' // we have some form of getter/setter on the object
					) {
						o[key.substring(1)] = value;
					} else {
						o[key] = value;
					}

					i++;
				});

				return o;
			}
		}

		module.exports = ApiObject;
	},{"./errors/bad-property-error.js":15}],12:[function(require,module,exports){
		const ApiObject = require('../api-object.js');
		const StorageDriver = require('./storage.js');

		class Collection {

			/**
			 * @param Entity the ApiObject class
			 * @param {Storage} storageDriver
			 */
			constructor(Entity, storageDriver, name) {
				this._Entity = Entity;
				this._storage = storageDriver;
				this._name = name;
			}

			/**
			 * @param guid
			 * @return {ApiObject|null}
			 */
			async get(guid) {
				return (await this.find('guid=' + guid))[0] ?? null;
			}

			/**
			 * @param queryString
			 * @return {ApiObject[]}
			 */
			async find(queryString) {
				let storageResults = await this._storage.find(this._name, queryString);
				let results = [];
				try {
					storageResults.forEach((val) => {
						results.push(this._Entity.fromObject(val));
					});
				} catch (e) {
					console.log(e);
				}


				return results;
			}

			/**
			 * Create
			 *
			 * creates and returns a new object
			 *
			 * @param {Object} object
			 */
			async createFromObject(object) {
				// create a new object and set the GUID
				let o = this._Entity.fromObject(object);
				o.guid = ApiObject.generateGuid();

				await this._storage.store(this._name, o.toObject());

				return o;
			}

			/**
			 *
			 * @param guid
			 * @param object
			 */
			async update(guid, object) {

				// create an object from this object, so the validation is tested
				this._Entity.fromObject(object);

				return this._storage.update(this._name, guid, object)
			}

			async delete(guid) {
				return this._storage.delete(this._name, guid);
			}
		}

		module.exports = Collection;
	},{"../api-object.js":11,"./storage.js":13}],13:[function(require,module,exports){
		class Storage {
			/**
			 * @param {string} queryString
			 *
			 * @return {Object[]}
			 */
			find(location, queryString) {
				return [];
			}

			/**
			 *
			 * @param {Object} object
			 * @return {boolean}
			 */
			store(location, object) {
				return true;
			}

			/**
			 *
			 * @param guid
			 * @param object
			 *
			 * @return {boolean} if update is a success
			 */
			update(location, guid, object) {
				return true;
			}

			/**
			 * @param guid
			 *
			 * @return {boolean}
			 */
			delete(location, guid) {
				return true;
			}
		}


		module.exports = Storage;
	},{}],14:[function(require,module,exports){
		const ApiObject = require('./api-object.js');
		const Address = require('./types/address.js');
		const EntityType = require('./types/entity-type.js');
		const EntityStatus = require('./types/entity-status');

		class Entity extends ApiObject {

			/**
			 * Create entity object
			 */
			constructor() {
				super('_entityType', '_owner', '_name', '_companyNumber', '_stakeholders', '_status', '_created', '_address');
			}

			/**
			 * @property val
			 */
			set entityType(val) {
				if (!(val instanceof EntityType ) && val !== null) {
					throw new TypeError('Property name must be a EntityType object');
				}
				this._entityType = val;
			}

			get entityType() {
				return this._entityType;
			}

			set owner(val) {
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property owner must be a string');
				}
				this._owner = val;
			}

			get owner() {
				return this._owner;
			}

			/**
			 * @property val
			 */
			set name(val) {
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property name must be a string');
				}
				this._name = val;
			}

			get name() {
				return this._name;
			}


			/**
			 * @property val
			 */
			set companyNumber(val) {
				if (typeof val !== 'string' && val !== null && val.length != 8) {
					throw new TypeError('Property companyNumber must be a string with 8 characters');
				}
				this._companyNumber = val;
			}

			get companyNumber() {
				return this._companyNumber;
			}

			/**
			 * @param val
			 */
			set stakeholders(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property stakeholders must be an array');
				}
				this._stakeholders = val;
			}

			/**
			 * @returns []
			 */
			get stakeholders() {
				return this._stakeholders;
			}

			/**
			 * @property status
			 * @return string
			 */
			set status(val) {
				if (!(val instanceof EntityStatus) && val !== null) {
					throw new TypeError('Property status must be of type EntityStatus');
				}
				this._status = val;
			}

			get status() {
				return this._status;
			}

			/**
			 * @property val
			 */
			set created(val) {
				if (typeof val !== 'number' && val !== null) {
					throw new TypeError('Property type created be of type number');
				}
				this._created = val;
			}

			get created() {
				return this._created;
			}

			/**
			 * Set Address
			 * @param {Address} val
			 */
			set address(val) {
				if (!(val instanceof Address) && val !== null) {
					throw new TypeError('Property address must be of type Address');
				}
				this._address = val;
			}

			/**
			 * get the address object
			 * @returns {Address}
			 */
			get address() {
				return this._address;
			}
		}
		module.exports = Entity;
	},{"./api-object.js":11,"./types/address.js":20,"./types/entity-status":21,"./types/entity-type.js":22}],15:[function(require,module,exports){
		class BadPropertyError extends Error {

			_propertyName = '';

			constructor(msg, propertyName) {
				super(msg);
				this._propertyName = propertyName;
			}

			get propertyName() {
				return this._propertyName;
			}
		}

		module.exports = BadPropertyError;
	},{}],16:[function(require,module,exports){
		class InvalidPropertyError extends Error {
			_propertyName = '';

			constructor(msg, propertyName) {
				super(msg);
				this._propertyName = propertyName;
			}

			get propertyName() {
				return this._propertyName;
			}
		}

		module.exports = InvalidPropertyError;
	},{}],17:[function(require,module,exports){
		const ApiObject = require('./api-object.js');
		const URL = require("url").URL;

		class Files extends ApiObject {

			/**
			 * Create files object
			 */
			constructor() {
				super('_name', '_location');
			}

			/**
			 * @property val
			 */
			set name(val) {
				// TODO: Change validation
				if ( typeof val !== 'string' && val !== null) {
					throw new TypeError('Property name must be a string');
				}
				this._name = val;
			}

			get name() {
				return this._name;
			}

			/**
			 * @property val
			 */
			set location(val) {
				// TODO: Change validation
				if ( typeof val !== 'string' && val !== null) {
					throw new TypeError('Property location must be a string');
				} else if( this.stringIsAValidUrl(val) === false ) {
					throw new TypeError('Property location must be a valid URI');
				}
				this._location = val;
			}

			get location() {
				return this._location;
			}

			// TODO: move this out of class
			stringIsAValidUrl = (uri) => {
				try {
					new URL(uri);
					return true;
				} catch (err) {
					return false;
				}
			};
		}

		module.exports = Files;
	},{"./api-object.js":11,"url":5}],18:[function(require,module,exports){
		const ApiObject = require('./api-object');
		const GroupType = require('./types/group-type');
		const EntityType = require('./types/entity-type');
		const UserType = require('./types/user-type');

		class Group extends ApiObject {

			constructor() {
				super('_groupType', '_name', '_owner', '_members', '_details', '_created');
			}

			/**
			 * Set the group type
			 * @param {GroupType|number} val
			 */
			set groupType(val) {
				//@todo: check the group type object
				if (typeof val !== 'number' && val !== null) {
					throw new TypeError('Property groupType must be a GroupType object');
				}
				this._groupType = val;
			}

			/**
			 * Get the group type
			 * @return {GroupType}
			 */
			get groupType() {
				return this._groupType;
			}

			/**
			 * Set the group name
			 * @param {string} val
			 */
			set name(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property name must be a string');
				}
				this._name = val;
			}

			/**
			 * Get the group name/title
			 * @return {string}
			 */
			get name() {
				return this._name;
			}

			/**
			 * Set the owner
			 * @param {string} val the GUID of the owner
			 */
			set owner(val) {
				// pass in guid of the entity not the object
				if ((typeof val !== 'string') && val !== null) {
					throw new TypeError('Property owner must be a string');
				}
				this._owner = val;
			}

			/**
			 * Get the owner GUID
			 * @return {string}
			 */
			get owner() {
				return this._owner;
			}

			set members(val) {
				// TODO: Change to array of guids so iterate?
				if (!( Array.isArray(val) ) && val !== null) {
					throw new TypeError('Property members must be a array');
				}
				this._members = val;
			}

			get members() {
				return this._members;
			}

			set details(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property details must be a string');
				}
				this._details = val;
			}

			get details() {
				return this._details;
			}

			set created(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property created must be a string');
				}
				this._created = val;
			}

			get created() {
				return this._created;
			}

		}

		module.exports = Group;
	},{"./api-object":11,"./types/entity-type":22,"./types/group-type":23,"./types/user-type":28}],19:[function(require,module,exports){
		const ApiObject = require('./api-object.js');
		const MessageType = require('./types/message-type');
		const MessageStatus = require('./types/message-status'); // rvk
		const User = require('./user');
		const Entity = require('./entity');

		class Message extends ApiObject {

			/**
			 * Create message object
			 */

			// todo: add group and have generic all group?
			constructor() {
				super(
					'_type',
					'_to',
					'_groups',
					'_from',
					'_subject',
					'_summary',
					'_body',
					'_attachments',
					'_scheduled',
					'_created',
					'_status',
					'_sentAt',
					'_opened',
					'_seen'
				);
			}

			/**
			 * @property val
			 */
			set groups(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property groups must be an array');
				} else {
					(val ?? []).forEach( element => {
							if (typeof element !== 'string') {
								throw new TypeError('Property guid must be a groupguid string');
							}
						}
					);
				}
				this._groups = val;
			}

			get groups() {
				return this._groups;
			}

			/**
			 *
			 * @param val
			 */
			set sentAt(val) {
				//@todo: validate the timestamp
				this._sentAt = val;
			}

			/**
			 *
			 * @returns {*}
			 */
			get sentAt() {
				return this._sentAt;
			}

			/**
			 * @property val
			 */
			set seen(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property seen must be an array');
				} else {
					(val ?? []).forEach( element => {
							if (typeof element !== 'string') {
								throw new TypeError('Property seen must be a timestamp string');
							}
						}
					);
				}
				this._seen = val;
			}

			get seen() {
				return this._seen;
			}

			/**
			 * @property val
			 */
			set opened(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property opened must be an array');
				} else {
					(val ?? []).forEach( element => {
							if (typeof element !== 'string') {
								throw new TypeError('Property opened must be a timestamp string');
							}
						}
					);
				}
				this._opened = val;
			}

			get opened() {
				return this._opened;
			}

			/**
			 * @property val
			 */
			set type(messageType) {
				if (!(messageType instanceof MessageType) && messageType !== null) {
					try {
						messageType = new MessageType(messageType);
					} catch (e) {
						throw new TypeError('Property type must be a MessageType object or messageType of a message type');
					}

					this._type = messageType.value;
				}
			}

			get type() {
				return this._type;
			}

			set summary(val) {
				if (( typeof val !== 'string' ) && val !== null) {
					throw new TypeError('Property from must be a string');
				}
				this._summary = val;
			}

			get summary() {
				return this._summary;
			}


			/**
			 * @property val
			 */
			set to(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property to must be an array');
				} else {
					(val ?? []).forEach( element => {
							if (typeof element !== 'string') {
								throw new TypeError('Property guid must be a user or entity guid string');
							}
						}
					);
				}
				this._to = val;
			}

			get to() {
				return this._to;
			}

			/**
			 * @property val
			 */
			set from(val) {
				// TODO: Change validation
				if (( typeof val !== 'string' ) && val !== null) {
					throw new TypeError('Property from must be a user or entity guid string');
				}
				this._from = val;
			}

			get from() {
				return this._from;
			}

			/**
			 * @property val
			 */
			set subject(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property subject must be a string');
				}
				this._subject = val;
			}

			get subject() {
				return this._subject;
			}

			/**
			 * @property val
			 */
			set body(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property body must be a string');
				}
				this._body = val;
			}

			get body() {
				return this._body;
			}

			set attachments(val) {
				// TODO: Change validation
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property attachments must be a array');
				} else {

					(val ?? []).forEach( element => {
							if (typeof element !== 'string') {
								throw new TypeError('Property guid must be an attachments guid string');
							}
						}
					);
				}
				this._attachments = val;
			}

			get attachments() {
				return this._attachments;
			}

			/**
			 * @property val
			 */
			set scheduled(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property scheduled must be a string');
				}
				this._scheduled = val;
			}

			get scheduled() {
				return this._scheduled;
			}

			/**
			 * @property val
			 */
			set status(messageStatus) {
				if (!(messageStatus instanceof MessageStatus) && messageStatus !== null) {
					try {
						messageStatus = new MessageStatus(messageStatus);
					} catch (e) {
						throw new TypeError('Property type must be a MessageStatus object or messageStatus of a message status');
					}

					this._status = messageStatus.value;
				}
			}

			get status() {
				return this._status;
			}

			get status() {
				return this._status;
			}

			/**
			 * @property val
			 */
			set created(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property created must be a string');
				}
				this._created = val;
			}

			get created() {
				return this._created;
			}

		}

		module.exports = Message;
	},{"./api-object.js":11,"./entity":14,"./types/message-status":25,"./types/message-type":26,"./user":29}],20:[function(require,module,exports){
		class Address {
			//@todo: finish address object
		}

		module.exports = Address;
	},{}],21:[function(require,module,exports){
		class EntityStatus {
			//@todo: finish EntityStatus object
		}

		module.exports = EntityStatus;
	},{}],22:[function(require,module,exports){
		class EntityType {
			//@todo: finish EntityType object
		}

		module.exports = EntityType;
	},{}],23:[function(require,module,exports){
		class GroupType {

			static ADHOC = 0;
			static PERMANENT = 1;
			static DYNAMIC = 2;
			static FIXED = 3;
			static DELETED = 4;
			//@todo: finish GroupType object

			constructor(val) {
				if (GroupType.isValid(val)) {
					this._value = val;
				} else {
					throw new Error('Invalid Group type');
				}
			}


			get value() {
				return this._value;
			}

			static isValid(val) {
				return (val === GroupType.ADHOC
					|| val === GroupType.PERMANENT
					|| val === GroupType.DYNAMIC
					|| val === GroupType.FIXED
					|| val === GroupType.DELETED);
			}
		}

		module.exports = GroupType;
	},{}],24:[function(require,module,exports){
		class InviteStatus {

			static PENDING = 0;
			static ACCEPTED = 1;
			static DELETED = 2;
			static DECLINED = 3;

			constructor(val) {
				if (InviteStatus.isValid(val)) {
					this._value = val;
				} else {
					throw new Error('Invalid invite status');
				}
			}

			get value() {
				return this._value;
			}

			static isValid(val) {
				if (val === InviteStatus.PENDING
					|| val === InviteStatus.ACCEPTED
					|| val === InviteStatus.DELETED
					|| val === InviteStatus.DECLINED) {
					return true;
				}
				return false;
			}

			static isPending(val) {
				return (val === InviteStatus.PENDING);
			}

			static isAccepted(val) {
				return (val === InviteStatus.ACCEPTED);
			}

			static isDeleted(val) {
				return (val === InviteStatus.DELETED);
			}

			static isDeclined(val) {
				return (val === InviteStatus.DECLINED);
			}

		}

		module.exports = InviteStatus;
	},{}],25:[function(require,module,exports){
		class MessageStatus {

			static DRAFT = 0;
			static SCHEDULED = 1;
			static DELETED = 2;
			static SENT = 3;

			constructor(val) {
				if (MessageStatus.isValid(val)) {
					this._value = val;
				} else {
					throw new Error('Invalid message status');
				}
			}

			get value() {
				return this._value;
			}

			static isValid(val) {
				if (val === MessageStatus.DRAFT
					|| val === MessageStatus.DELETED
					|| val === MessageStatus.SCHEDULED
					|| val === MessageStatus.SENT) {
					return true;
				}
				return false;
			}

			static isDraft(val) {
				return (val === MessageStatus.DRAFT);
			}

			static isDeleted(val) {
				return (val === MessageStatus.DELETED);
			}

			static isScheduled(val) {
				return (val === MessageStatus.SCHEDULED);
			}

			static isSent(val) {
				return (val === MessageStatus.SENT);
			}

		}

		module.exports = MessageStatus;
	},{}],26:[function(require,module,exports){
		class MessageType {
			//@todo: finish MessageType object
			static MESSAGE = 0;

			constructor(val) {
				if (MessageType.isValid(val)) {
					this._value = val;
				} else {
					throw new Error('Invalid message type');
				}
			}

			get value() {
				return this._value;
			}

			static isValid(val) {
				// todo: check with ME if this is correct
				return (parseInt(val) === MessageType.MESSAGE);
			}
		}


		module.exports = MessageType;
	},{}],27:[function(require,module,exports){
		class UserStatus {

			static NEW = 0;
			static PENDING = 1;
			static ACTIVE = 2;
			static ARCHIVED = 3;
			static SILENT = 4;
			static HOLD = 5;
			static DELETED = 6;

			constructor(val) {
				if (UserStatus.isValid(val)) {
					this._value = val;
				} else {
					throw new Error('Invalid user status');
				}
			}

			get value() {
				return this._value;
			}

			static isValid(val) {
				if (val === UserStatus.NEW
					|| val === UserStatus.PENDING
					|| val === UserStatus.ACTIVE
					|| val === UserStatus.ARCHIVED
					|| val === UserStatus.SILENT
					|| val === UserStatus.HOLD
					|| val === UserStatus.DELETED) {
					return true;
				}
				return false;
			}

			static isNew(val) {
				return (val === UserStatus.NEW);
			}

			static isPending(val) {
				return (val === UserStatus.PENDING);
			}

			static isActive(val) {
				return (val === UserStatus.ACTIVE);
			}

			static isArchived(val) {
				return (val === UserStatus.ARCHIVED);
			}

			static isSilent(val) {
				return (val === UserStatus.SILENT);
			}

			static isHold(val) {
				return (val === UserStatus.HOLD);
			}

			static isDeleted(val) {
				return (val === UserStatus.DELETED);
			}

		}

		module.exports = UserStatus;
	},{}],28:[function(require,module,exports){
		class UserType {
			//@todo: finish UserType object
			static USER = 0;
			static ADMIN = 1;

			constructor(val) {
				if (UserType.isValid(val)) {
					this._value = val;
				} else {
					throw new Error('Invalid user type');
				}
			}


			get value() {
				return this._value;
			}

			static isValid(val) {
				return (val === UserType.ADMIN || val === UserType.USER);
			}
		}

		module.exports = UserType;
	},{}],29:[function(require,module,exports){
		const ApiObject = require('./api-object.js');
		const UserType = require('./types/user-type.js');

		class User extends ApiObject {

			/**
			 * Create user object
			 */
			constructor() {
				super('_type', '_pin', '_created', '_address', '_username', '_name', '_entities', '_groups');
			}
			/**
			 * @property val
			 */
			set username(val) {
				// TODO: Change validation
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property username must be a string');
				}
				this._username = val;
			}

			get username() {
				return this._username;
			}

			/**
			 * @property val
			 */
			set type(val) {
				if (!(val instanceof UserType) && val !== null) {
					try {
						val = new UserType(val);
					} catch (e) {
						throw new TypeError('Property type must be a UserType object or value of a UserType object');
					}
					this._type = val.value;
				}
			}

			get type() {
				return this._type;
			}

			/**
			 * @property val
			 */
			set pin(val) {
				//@todo: improve this validation. a number starting with a 0 will mess this up.
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property type pin be of type number');
				}
				this._pin = val;
			}

			get pin() {
				return this._pin;
			}

			/**
			 * @property val
			 */
			set created(val) {
				if (typeof val !== 'number' && val !== null) {
					throw new TypeError('Property type created be of type number');
				}
				this._created = val;
			}

			get created() {
				return this._created;
			}

			/**
			 * Set Address
			 */
			set address(val) {

				// todo: add this validation back in
				// if (!(val instanceof Address) && val !== null) {
				//     throw new TypeError('Property address must be of type Address');
				// }
				this._address = val;
			}

			/**
			 * get the address object
			 * @returns {Address}
			 */
			get address() {
				return this._address;
			}

			set name(val) {
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property name must be a string');
				}
				this._name = val;
			}

			get name() {
				return this._name;
			}

			set entities(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property type entities must be of type array');
				}
				this._entities = val;
			}

			get entities() {
				return this._entities;
			}

			set groups(val) {
				if (!Array.isArray(val) && val !== null) {
					throw new TypeError('Property type groups must be of type array');
				}
				this._groups = val;
			}

			get groups() {
				return this._groups;
			}

		}
		module.exports = User;

// let bob = User.fromObject({'_pin': 123});
//
// console.log(bob);
// console.log(JSON.stringify(bob));
// console.log(bob.toObject());
//
// console.log(User.fromJSON('{"guid":null,"type":null,"pin":123,"created":null,"address":null,"username":null,"userOptions":[],"systemOptions":[],"applicationOptions":[]}'));
	},{"./api-object.js":11,"./types/user-type.js":28}],30:[function(require,module,exports){
		const ApiObject = require('./api-object.js');

		class VoteResult extends ApiObject {

			/**
			 * Create vote result object
			 */
			constructor() {
				super('_result', '_metrics');
			}

			/**
			 * @property val
			 */
			set result(val) {
				if (!(Number.isInteger(val)) && val !== null) {
					throw new TypeError('Property result must be a integer');
				}
				this._result = val;
			}

			get result() {
				return this._result;
			}

			/**
			 * @property val
			 */
			set metrics(val) {
				if (!(Array.isArray(val)) && val !== null) {
					throw new TypeError('Property metrics must be a array');
				}
				this._metrics = val;
			}

			get metrics() {
				return this._metrics;
			}

		}

		module.exports = VoteResult;
	},{"./api-object.js":11}],31:[function(require,module,exports){
		const ApiObject = require('./api-object');
		const VoteResult = require('./vote-result');

		class Vote extends ApiObject {

			/**
			 * Create vote object
			 */
			constructor() {
				super('_title', '_proposition', '_expiry', '_status', '_results', '_created');
			}

			/**
			 * @property val
			 */
			set title(val) {
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property title must be a string');
				}
				this._title = val;
			}

			get title() {
				return this._title;
			}

			/**
			 * @property val
			 */
			set proposition(val) {
				if (typeof val !== 'string' && val !== null) {
					throw new TypeError('Property proposition must be a string');
				}
				this._proposition = val;
			}

			get proposition() {
				return this._proposition;
			}

			/**
			 * @property val
			 */
			set expiry(val) {
				if (typeof val !== 'number' && val !== null) {
					throw new TypeError('Property expiry must be a number');
				}
				this._expiry = val;
			}

			get expiry() {
				return this._expiry;
			}

			/**
			 * @property val
			 */
			set status(val) {
				if (!(Number.isInteger(val)) && val !== null) {
					throw new TypeError('Property status must be a integer');
				}
				this._status = val;
			}

			get status() {
				return this._status;
			}

			/**
			 * @property val
			 */
			set results(val) {
				if (!(val instanceof VoteResult) && val !== null) {
					throw new TypeError('Property results must be a VoteResult');
				}
				this._results = val;
			}

			get results() {
				return this._results;
			}

			/**
			 * @property val
			 */
			set created(val) {
				if (typeof val !== 'number' && val !== null) {
					throw new TypeError('Property created must be a number');
				}
				this._created = val;
			}

			get created() {
				return this._created;
			}

		}

		module.exports = Vote;
	},{"./api-object":11,"./vote-result":30}],32:[function(require,module,exports){
		(function (global){(function (){
			"use strict";

// ref: https://github.com/tc39/proposal-global
			var getGlobal = function () {
				// the only reliable means to get the global object is
				// `Function('return this')()`
				// However, this causes CSP violations in Chrome apps.
				if (typeof self !== 'undefined') { return self; }
				if (typeof window !== 'undefined') { return window; }
				if (typeof global !== 'undefined') { return global; }
				throw new Error('unable to locate global object');
			}

			var global = getGlobal();

			module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
			if (global.fetch) {
				exports.default = global.fetch.bind(global);
			}

			exports.Headers = global.Headers;
			exports.Request = global.Request;
			exports.Response = global.Response;
		}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],33:[function(require,module,exports){
		class Api {
			/**
			 * @param {string} appToken
			 * @param {string} userToken
			 * @param {string} url
			 */
			constructor(appToken, userToken, url) {
				this._appToken = appToken;
				this._userToken = userToken;
				this._url = url;

				this._verboseMode = false;
				this._http = require("./http.js");

				// remove "/" from the end of the URL if it is there...
				if (this._url.slice(-1) === "/") {
					this._url = this._url.slice(0, -1);
				}
			}

			/**
			 * @param {Object} headers
			 *
			 * @private
			 */
			_headers(headers) {
				headers = headers ?? {};
				headers.at = this.appToken;
				if (
					typeof this.userToken === 'string'
					&& this.userToken.toLocaleLowerCase() !== 'usertoken'
					&& this.userToken.toLowerCase() !== 'user token'
				) {
					headers["1-ut"] = this.userToken;
				}

				return headers;
			}

			/**
			 * @param {string} endPoint
			 * @param {Object} headers
			 *
			 * @return {Promise<Response>}
			 * @constructor
			 */
			GET(endPoint, headers) {
				endPoint = endPoint ?? '/';
				if (this.verboseMode) {
					console.log('Getting "' + endPoint +'" from API (' + this.url + ')');
				}
				return this.http.GET(
					this.url + (endPoint ?? '/'),
					this._headers(headers)
				);
			}

			/**
			 * @param {string} endPoint
			 * @param {Object} data
			 * @param {Object} headers
			 *
			 * @return {Promise<Response>}
			 * @constructor
			 */
			POST(endPoint, data, headers) {
				endPoint = endPoint ?? '/';

				if (this.verboseMode) {
					console.log('Sending data to "' + endPoint +'" on API (' + this.url + ')');
					console.log('sent', data);
				}

				return this.http.POST(
					this.url + endPoint,
					data,
					this._headers(headers)
				);
			}

			/**
			 * @param {string} endPoint
			 * @param {Object} data
			 * @param {Object} headers
			 *
			 * @return {Promise | PromiseLike}
			 * @constructor
			 */
			PATCH(endPoint, data, headers) {
				endPoint = endPoint ?? '/';

				if (this.verboseMode) {
					console.log('Sending PATCH data to "' + endPoint +'" on API (' + this.url + ')');
					console.log('sent', data);
				}
				return this.http.PATCH(
					this.url + (endPoint ?? '/'),
					data,
					this._headers(headers)
				);
			}

			/**
			 * @param {string} endPoint
			 * @poram {Object} headers
			 *
			 * @return {Promise | PromiseLike}
			 *
			 * @constructor
			 */
			DELETE(endPoint, headers) {
				endPoint = endPoint ?? '/';

				if (this.verboseMode) {
					console.log('Sending DELETE to "' + endPoint +'" on API (' + this.url + ')');
				}

				return this.http.DELETE(
					this.url + (endPoint ?? '/'),
					this._headers(headers)
				);
			}

			get http() {
				return this._http;
			}

			/**
			 * @return {boolean}
			 */
			get verboseMode() {
				return this._verboseMode;
			}

			/**
			 * @param {boolean} value
			 */
			set verboseMode(value) {
				this._verboseMode = value;
				this.http.verboseMode = value;
			}

			/**
			 * @return {string}
			 */
			get appToken() {
				return this._appToken;
			}

			/**
			 * @param {string} value
			 */
			set appToken(value) {
				this._appToken = value;
			}

			/**
			 * @return {string}
			 */
			get userToken() {
				return this._userToken;
			}

			/**
			 * @param {string} value
			 */
			set userToken(value) {
				this._userToken = value;
			}

			/**
			 * @return {string}
			 */
			get url() {
				return this._url;
			}

			/**
			 * The URL
			 * @param {string} value
			 */
			set url(value) {
				this._url = value;
			}
		}

		module.exports = Api;
	},{"./http.js":34}],34:[function(require,module,exports){
		module.exports = {
			verboseMode: false,

			/**
			 * Calls fetch with the given URL and options
			 *
			 * Method here so we can replace fetch easily if needed.
			 *
			 * @param {string} url - the URL
			 * @param {object} [options] - fetch options
			 *
			 * @returns {Promise<Response>}
			 */
			_fetch: function apiHttp_Fetch(url, options) {

				let that = this;

				return fetch(url, options).then(
					function (response) {

						// output result to the console if in verbose mode.
						if (that.verboseMode) {
							if (response.status !== 200) {
								console.log('Looks like there was a problem. Status Code: ' + response.status);
								console.log('Response', response);
								return;
							}

							// Examine the text in the response
							return response.json().then(function(data) {
								console.log('Response', data);
								return data;
							});
						}

						if (response.status === 204) {
							return null;
						}
						return response.json();
					}
				);
			},

			/**
			 *
			 * @param {string} url the URL to fetch
			 * @param {Object} headers
			 *
			 * @returns {Promise<Response>}
			 */
			GET: function (url, headers) {
				headers = headers ?? {};

				return this._fetch(url, {headers: headers});
			},

			/**
			 * Post data to the given URL
			 *
			 * @param {string} url
			 * @param {Object} data
			 * @param {Object} headers
			 *
			 * @returns {Promise<Response>}
			 * @constructor
			 */
			POST: function (url, data, headers) {
				headers = headers ?? {};

				return this._fetch(
					url,
					{
						method: 'POST',
						headers: {
							...{'Content-Type': 'application/json'},
							...headers
						},
						body: JSON.stringify(data),
					}
				)
			},

			/**
			 * Patch data to the given URL
			 *
			 * @param {string} url
			 * @param {Object} data
			 * @param {Object} headers
			 *
			 * @constructor
			 */
			PATCH: function (url, data, headers) {
				headers = headers ?? {};

				return this._fetch(
					url,
					{
						method: 'PATCH',
						headers: {
							...{'Content-Type': 'application/json'},
							...headers
						},
						body: JSON.stringify(data),
					}
				);
			},

			/**
			 * @param {string} url
			 * @param {Object} headers
			 *
			 * @return {Promise<Response>}
			 *
			 * @constructor
			 */
			DELETE: function (url, headers) {
				headers = headers ?? {};

				return this._fetch(
					url,
					{
						headers: headers,
						method: 'DELETE',
					}
				);
			}
		}
	},{}],35:[function(require,module,exports){
		class Lestrade {

			constructor(Api, endPointPrefix) {
				this._api = Api;
				this._endPointPrefix = endPointPrefix ?? '/lestrade';
				this._Api = Api;
				this._endPointPrefix = endPointPrefix;
			}


			get Api() {
				return this._Api;
			}

			get endPointPrefix() {
				return this._endPointPrefix;
			}

			requestLoginEmail(email) {
				return this.POST('/loginrequest', {
					name: email,
				}).then(
					(response) => {
						if (typeof (response.messages ?? {}).token !== 'undefined') {
							this.loginToken = response.messages.token;
							return true
						}
						return false;
					}
				)
			}

			login(email, verificationCode, pin, loginToken) {
				loginToken = loginToken ?? this.loginToken
				if (typeof loginToken === 'undefined') {
					return Promise.reject("No login token")
				}

				return this.POST(
					'/login',
					{
						username: email,
						code: verificationCode,
						pin: pin,
					}, {
						lt: loginToken
					}
				);
			}

			GET(endPoint) {
				return this._api.GET(this.endPointPrefix + endPoint);
			}

			POST(endPoint, data, headers) {
				return this._api.POST(this.endPointPrefix + endPoint, data, headers);
			}
		}

		module.exports = Lestrade;
	},{}],36:[function(require,module,exports){
		class Sherlock {
			constructor(Api, endPointPrefix) {
				this._api = Api;
				this._endPointPrefix = endPointPrefix ?? '/sherlock';
			}

			get endPointPrefix() {
				return this._endPointPrefix;
			}

			GET(endPoint) {
				return this._api.GET(this.endPointPrefix + endPoint);
			}

			DELETE(endPoint) {
				return this._api.DELETE(this.endPointPrefix + endPoint);
			}

			POST(endPoint, data) {
				return this._api.POST(this.endPointPrefix + endPoint, data);
			}

			PATCH(endPoint, data) {
				return this._api.PATCH(this.endPointPrefix + endPoint, data);
			}

			getSettings() {
				return this.GET('/settings');
			}

			updatePin(oldPin, newPin) {
				if (oldPin === newPin) {
					return Promise.reject('The New PIN must not match the Old PIN');
				}

				return this.PATCH(
					'/settings',
					{
						oldpin: oldPin,
						newpin: newPin,
					}
				);
			}

			updateCommunicationPreferences(mobile, sms, whatsapp) {

				// validate
				if (typeof mobile !== 'string' || mobile === '') {
					return Promise.reject('A mobile number is required');
				}

				if (typeof sms !== "boolean") {
					return Promise.reject('sms should be a boolean');
				}
				if (typeof whatsapp !== "boolean") {
					return Promise.reject('whatsapp should be a boolean');
				}

				return this.PATCH(
					'/settings',
					{
						phone: mobile,
						communication:{
							whatsapp: whatsapp,
							sms: sms,
						}
					}
				);
			}

			dashboard() {
				return this.GET('/dashboard');
			}

			getMessages(entity) {
				return this.GET("/stakeholder/entity/" + entity + "/message");
			}

			getMessage(entity, message) {
				return this.GET("/stakeholder/entity/" + entity + "/message/" + message);
			}

			getStakeholders(entity) {
				return this.GET("/owner/entity/" + entity + "/stakeholder");
			}

			inviteStakeholder(entity, name, email) {
				return this.POST(
					"/owner/entity/" + entity + "/stakeholder" ,
					{name: name, email: email}
				);
			}

			deleteStakeholder(entity, stakeholder) {
				return this.DELETE("/owner/entity/" + entity + "/stakeholder/" + stakeholder);
			}

			getGroups(entity) {
				return this.GET("/owner/entity/" + entity + "/group");
			}

			createGroup(entity, name) {
				return this.POST(
					"/owner/entity/" + entity + "/group" ,
					{name: name}
				);
			}

			getGroup(entity, group) {
				return this.GET("/owner/entity/" + entity + "/group/" + group);
			}

			setGroupName(entity, group, name) {
				return this.PATCH(
					"/owner/entity/" + entity + "/group/" + group,
					{name: name}
				);
			}

			addStakeholderToGroup(entity, group, stakeholders) {
				return this.POST(
					"/owner/entity/" + entity + "/group/" + group + '/stakeholder' ,
					{stakeholders: stakeholders}
				);
			}

			getGroupStakeholders(entity, group) {
				return this.GET(
					"/owner/entity/" + entity + "/group/" + group + '/stakeholder' ,
				);
			}

			deleteGroupStakeholder(entity, group, stakeholder) {
				return this.DELETE(
					"/owner/entity/" + entity + "/group/" + group + '/stakeholder/' + stakeholder
				);
			}

			updateStakeholderVotingPower(entity, group, stakeholder, power) {
				return this.PATCH(
					"/owner/entity/" + entity + "/group/" + group + '/stakeholder/' + stakeholder + '/vote/' + power,
					{}
				);
			}

			deleteGroup(entity, group) {
				return this.DELETE(
					"/owner/entity/" + entity + "/group/" + group
				);
			}
		}

		module.exports = Sherlock;
	},{}],37:[function(require,module,exports){
		const moriiApiObjects = require('morii-api-objects');

		class Watson {
			/**
			 * @param {Api} Api
			 * @param {string} endPointPrefix
			 */
			constructor(Api, endPointPrefix) {
				this._api = Api;
				this._endPointPrefix = endPointPrefix ?? '/watson';

				Object.keys(moriiApiObjects).forEach((key) => {
					if (moriiApiObjects[key] !== moriiApiObjects.ApiObject
						&& (moriiApiObjects[key].prototype ?? null) instanceof moriiApiObjects.ApiObject
					) {
						this._createEndPoint(key);
					}
				});
			}

			/**
			 * @return {string}
			 */
			get endPointPrefix() {
				return this._endPointPrefix;
			}

			/**
			 * @param endPoint
			 * @return {Promise<Response>}
			 */
			GET(endPoint) {
				return this._api.GET(this.endPointPrefix + endPoint);
			}

			/**
			 * @param endPoint
			 * @param data
			 * @return {Promise<Response>}
			 */
			POST(endPoint, data) {
				return this._api.POST(this.endPointPrefix + endPoint, data);
			}

			/**
			 *
			 * @param endPoint
			 * @return {Promise | PromiseLike}
			 */
			DELETE(endPoint) {
				return this._api.DELETE(this.endPointPrefix + endPoint);
			}

			/**
			 *
			 * @param {string} endPoint
			 * @param {object} data
			 *
			 * @return {Promise | PromiseLike}
			 */
			PATCH(endPoint, data) {
				return this._api.PATCH(this.endPointPrefix + endPoint, data);
			}

			_paramObjectToString(params) {
				let paramsString = '';
				let prefix = '';
				let key = '';
				let value = '';
				for ([key, value] of Object.entries(params)) {
					paramsString = paramsString + prefix + key + "=" + encodeURIComponent(value);
					prefix = '&';
				}
				return paramsString;
			}

			_createEndPoint(key) {
				// create the end point...
				let that = this;

				this[key.toLowerCase()] = {
					/**
					 * @param {string|Object} params search parameters
					 * @return {Promise<moriiApiObjects.ApiObject[]> | PromiseLike<moriiApiObjects.ApiObject[]>}
					 */
					search: function (params) {
						params = params ?? '';

						// convert object to string
						if (typeof params === "object" && params !== null) {
							params = that._paramObjectToString(params);
						}

						let response = that.GET('/' + key.toLowerCase() + '?' + params);

						return response.then(
							(val) => {
								let objects = [];
								if (typeof val[key] !== 'undefined' && Array.isArray(val[key])) {
									val[key].forEach((val) => {
										objects.push(moriiApiObjects[key].fromObject(val));
									});
								}
								return objects;
							}
						);
					},
					/**
					 * @param {string} guid
					 * @return {Promise<moriiApiObjects.ApiObject> | PromiseLike<moriiApiObjects.ApiObject>}
					 */
					get: function (guid) {
						let response = that.GET('/' + key.toLowerCase() + '/' + guid);

						return response.then(
							(val) => {
								if (typeof val === "undefined" || typeof val[key] === "undefined") {
									return null;
								}

								return moriiApiObjects[key].fromObject(val[key]);
							}
						)
					},

					/**
					 * @param {object} object
					 *
					 * @return {Promise<moriiApiObjects.ApiObject> | PromiseLike<moriiApiObjects.ApiObject>}
					 */
					create: function (object) {
						object = object ?? {};

						if (typeof object !== "object") {
							throw new Error('object param needs to be an object');
						}
						let apiObject = moriiApiObjects[key].fromObject(object);

						return that.POST('/' + key.toLowerCase(), object).then(
							(val) => {
								if (typeof val !== "undefined" && typeof val.guid !== "undefined") {
									apiObject.guid = val.guid;
									return apiObject;
								}
								return null;
							}
						);
					},

					/**
					 *
					 * @param {string} guid
					 *
					 * @return {*}
					 */
					delete: function (guid) {
						return that.DELETE('/' + key.toLowerCase() + '/' + guid);
					},

					/**
					 * @param {moriiApiObjects.ApiObject} apiObject
					 *
					 * @return {*}
					 */
					update: function (apiObject) {
						let object = apiObject.toObject();
						delete object.guid;

						//@todo: check what type of ApiObject is sent

						return that.PATCH('/' + key.toLowerCase() + '/' + apiObject.guid, object);
					}
				}
			}
		}
		module.exports = Watson;
	},{"morii-api-objects":8}]},{},[7]);
