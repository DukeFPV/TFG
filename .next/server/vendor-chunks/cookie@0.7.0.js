"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/cookie@0.7.0";
exports.ids = ["vendor-chunks/cookie@0.7.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/cookie@0.7.0/node_modules/cookie/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/.pnpm/cookie@0.7.0/node_modules/cookie/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/*!\n * cookie\n * Copyright(c) 2012-2014 Roman Shtylman\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nexports.parse = parse;\nexports.serialize = serialize;\n\n/**\n * Module variables.\n * @private\n */\n\nvar __toString = Object.prototype.toString\n\n/**\n * RegExp to match cookie-name in RFC 6265 sec 4.1.1\n * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2\n * which has been replaced by the token definition in RFC 7230 appendix B.\n *\n * cookie-name       = token\n * token             = 1*tchar\n * tchar             = \"!\" / \"#\" / \"$\" / \"%\" / \"&\" / \"'\" /\n *                     \"*\" / \"+\" / \"-\" / \".\" / \"^\" / \"_\" /\n *                     \"`\" / \"|\" / \"~\" / DIGIT / ALPHA\n */\n\nvar cookieNameRegExp = /^[!#$%&'*+\\-.^_`|~0-9A-Za-z]+$/;\n\n/**\n * RegExp to match cookie-value in RFC 6265 sec 4.1.1\n *\n * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )\n * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E\n *                     ; US-ASCII characters excluding CTLs,\n *                     ; whitespace DQUOTE, comma, semicolon,\n *                     ; and backslash\n */\n\nvar cookieValueRegExp = /^(\"?)[\\u0021\\u0023-\\u002B\\u002D-\\u003A\\u003C-\\u005B\\u005D-\\u007E]*\\1$/;\n\n/**\n * RegExp to match domain-value in RFC 6265 sec 4.1.1\n *\n * domain-value      = <subdomain>\n *                     ; defined in [RFC1034], Section 3.5, as\n *                     ; enhanced by [RFC1123], Section 2.1\n * <subdomain>       = <label> | <subdomain> \".\" <label>\n * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]\n *                     Labels must be 63 characters or less.\n *                     'let-dig' not 'letter' in the first char, per RFC1123\n * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>\n * <let-dig-hyp>     = <let-dig> | \"-\"\n * <let-dig>         = <letter> | <digit>\n * <letter>          = any one of the 52 alphabetic characters A through Z in\n *                     upper case and a through z in lower case\n * <digit>           = any one of the ten digits 0 through 9\n */\n\nvar domainValueRegExp = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;\n\n/**\n * RegExp to match path-value in RFC 6265 sec 4.1.1\n *\n * path-value        = <any CHAR except CTLs or \";\">\n * CHAR              = %x01-7F\n *                     ; defined in RFC 5234 appendix B.1\n */\n\nvar pathValueRegExp = /^[\\u0020-\\u003A\\u003D-\\u007E]*$/;\n\n/**\n * Parse a cookie header.\n *\n * Parse the given cookie header string into an object\n * The object has the various cookies as keys(names) => values\n *\n * @param {string} str\n * @param {object} [options]\n * @return {object}\n * @public\n */\n\nfunction parse(str, options) {\n  if (typeof str !== 'string') {\n    throw new TypeError('argument str must be a string');\n  }\n\n  var obj = {};\n  var len = str.length;\n  // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.\n  var max = len - 2;\n  if (max < 0) return obj;\n\n  var dec = (options && options.decode) || decode;\n  var index = 0;\n  var eqIdx = 0;\n  var endIdx = 0;\n\n  do {\n    eqIdx = str.indexOf('=', index);\n\n    // no more cookie pairs\n    if (eqIdx === -1) {\n      break;\n    }\n\n    endIdx = str.indexOf(';', index);\n\n    if (endIdx === -1) {\n      endIdx = len;\n    } else if (eqIdx > endIdx) {\n      // backtrack on prior semicolon\n      index = str.lastIndexOf(';', eqIdx - 1) + 1;\n      continue;\n    }\n\n    var keyStartIdx = startIndex(str, index, eqIdx);\n    var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);\n    var key = str.slice(keyStartIdx, keyEndIdx);\n\n    // only assign once\n    if (undefined === obj[key]) {\n      var valStartIdx = startIndex(str, eqIdx + 1, endIdx);\n      var valEndIdx = endIndex(str, endIdx, valStartIdx);\n\n      if (str.charCodeAt(valStartIdx) === 0x22 /* \" */ && str.charCodeAt(valEndIdx - 1) === 0x22 /* \" */) {\n        valStartIdx++;\n        valEndIdx--;\n      }\n\n      var val = str.slice(valStartIdx, valEndIdx);\n      obj[key] = tryDecode(val, dec);\n    }\n\n    index = endIdx + 1\n  } while (index < max);\n\n  return obj;\n}\n\nfunction startIndex(str, index, max) {\n  do {\n    var code = str.charCodeAt(index);\n    if (code !== 0x20 /*   */ && code !== 0x09 /* \\t */) return index;\n  } while (++index < max);\n  return max;\n}\n\nfunction endIndex(str, index, min) {\n  while (index > min) {\n    var code = str.charCodeAt(--index);\n    if (code !== 0x20 /*   */ && code !== 0x09 /* \\t */) return index + 1;\n  }\n  return min;\n}\n\n/**\n * Serialize data into a cookie header.\n *\n * Serialize a name value pair into a cookie string suitable for\n * http headers. An optional options object specifies cookie parameters.\n *\n * serialize('foo', 'bar', { httpOnly: true })\n *   => \"foo=bar; httpOnly\"\n *\n * @param {string} name\n * @param {string} val\n * @param {object} [options]\n * @return {string}\n * @public\n */\n\nfunction serialize(name, val, options) {\n  var opt = options || {};\n  var enc = opt.encode || encode;\n\n  if (typeof enc !== 'function') {\n    throw new TypeError('option encode is invalid');\n  }\n\n  if (!cookieNameRegExp.test(name)) {\n    throw new TypeError('argument name is invalid');\n  }\n\n  var value = enc(val);\n\n  if (value && !cookieValueRegExp.test(value)) {\n    throw new TypeError('argument val is invalid');\n  }\n\n  var str = name + '=' + value;\n\n  if (null != opt.maxAge) {\n    var maxAge = opt.maxAge - 0;\n\n    if (!isFinite(maxAge)) {\n      throw new TypeError('option maxAge is invalid')\n    }\n\n    str += '; Max-Age=' + Math.floor(maxAge);\n  }\n\n  if (opt.domain) {\n    if (!domainValueRegExp.test(opt.domain)) {\n      throw new TypeError('option domain is invalid');\n    }\n\n    str += '; Domain=' + opt.domain;\n  }\n\n  if (opt.path) {\n    if (!pathValueRegExp.test(opt.path)) {\n      throw new TypeError('option path is invalid');\n    }\n\n    str += '; Path=' + opt.path;\n  }\n\n  if (opt.expires) {\n    var expires = opt.expires\n\n    if (!isDate(expires) || isNaN(expires.valueOf())) {\n      throw new TypeError('option expires is invalid');\n    }\n\n    str += '; Expires=' + expires.toUTCString()\n  }\n\n  if (opt.httpOnly) {\n    str += '; HttpOnly';\n  }\n\n  if (opt.secure) {\n    str += '; Secure';\n  }\n\n  if (opt.partitioned) {\n    str += '; Partitioned'\n  }\n\n  if (opt.priority) {\n    var priority = typeof opt.priority === 'string'\n      ? opt.priority.toLowerCase()\n      : opt.priority\n\n    switch (priority) {\n      case 'low':\n        str += '; Priority=Low'\n        break\n      case 'medium':\n        str += '; Priority=Medium'\n        break\n      case 'high':\n        str += '; Priority=High'\n        break\n      default:\n        throw new TypeError('option priority is invalid')\n    }\n  }\n\n  if (opt.sameSite) {\n    var sameSite = typeof opt.sameSite === 'string'\n      ? opt.sameSite.toLowerCase() : opt.sameSite;\n\n    switch (sameSite) {\n      case true:\n        str += '; SameSite=Strict';\n        break;\n      case 'lax':\n        str += '; SameSite=Lax';\n        break;\n      case 'strict':\n        str += '; SameSite=Strict';\n        break;\n      case 'none':\n        str += '; SameSite=None';\n        break;\n      default:\n        throw new TypeError('option sameSite is invalid');\n    }\n  }\n\n  return str;\n}\n\n/**\n * URL-decode string value. Optimized to skip native call when no %.\n *\n * @param {string} str\n * @returns {string}\n */\n\nfunction decode (str) {\n  return str.indexOf('%') !== -1\n    ? decodeURIComponent(str)\n    : str\n}\n\n/**\n * URL-encode value.\n *\n * @param {string} val\n * @returns {string}\n */\n\nfunction encode (val) {\n  return encodeURIComponent(val)\n}\n\n/**\n * Determine if value is a Date.\n *\n * @param {*} val\n * @private\n */\n\nfunction isDate (val) {\n  return __toString.call(val) === '[object Date]' ||\n    val instanceof Date\n}\n\n/**\n * Try decoding a string using a decoding function.\n *\n * @param {string} str\n * @param {function} decode\n * @private\n */\n\nfunction tryDecode(str, decode) {\n  try {\n    return decode(str);\n  } catch (e) {\n    return str;\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vY29va2llQDAuNy4wL25vZGVfbW9kdWxlcy9jb29raWUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYixpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QyxLQUFLLGtDQUFrQyxLQUFLOztBQUUxRjtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixnQkFBZ0I7QUFDN0Msa0JBQWtCO0FBQ2xCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2Nhcmxvcy9EZXNrdG9wL1RGRy9URkcvbm9kZV9tb2R1bGVzLy5wbnBtL2Nvb2tpZUAwLjcuMC9ub2RlX21vZHVsZXMvY29va2llL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogY29va2llXG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IFJvbWFuIFNodHlsbWFuXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMuc2VyaWFsaXplID0gc2VyaWFsaXplO1xuXG4vKipcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbnZhciBfX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBjb29raWUtbmFtZSBpbiBSRkMgNjI2NSBzZWMgNC4xLjFcbiAqIFRoaXMgcmVmZXJzIG91dCB0byB0aGUgb2Jzb2xldGVkIGRlZmluaXRpb24gb2YgdG9rZW4gaW4gUkZDIDI2MTYgc2VjIDIuMlxuICogd2hpY2ggaGFzIGJlZW4gcmVwbGFjZWQgYnkgdGhlIHRva2VuIGRlZmluaXRpb24gaW4gUkZDIDcyMzAgYXBwZW5kaXggQi5cbiAqXG4gKiBjb29raWUtbmFtZSAgICAgICA9IHRva2VuXG4gKiB0b2tlbiAgICAgICAgICAgICA9IDEqdGNoYXJcbiAqIHRjaGFyICAgICAgICAgICAgID0gXCIhXCIgLyBcIiNcIiAvIFwiJFwiIC8gXCIlXCIgLyBcIiZcIiAvIFwiJ1wiIC9cbiAqICAgICAgICAgICAgICAgICAgICAgXCIqXCIgLyBcIitcIiAvIFwiLVwiIC8gXCIuXCIgLyBcIl5cIiAvIFwiX1wiIC9cbiAqICAgICAgICAgICAgICAgICAgICAgXCJgXCIgLyBcInxcIiAvIFwiflwiIC8gRElHSVQgLyBBTFBIQVxuICovXG5cbnZhciBjb29raWVOYW1lUmVnRXhwID0gL15bISMkJSYnKitcXC0uXl9gfH4wLTlBLVphLXpdKyQvO1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBjb29raWUtdmFsdWUgaW4gUkZDIDYyNjUgc2VjIDQuMS4xXG4gKlxuICogY29va2llLXZhbHVlICAgICAgPSAqY29va2llLW9jdGV0IC8gKCBEUVVPVEUgKmNvb2tpZS1vY3RldCBEUVVPVEUgKVxuICogY29va2llLW9jdGV0ICAgICAgPSAleDIxIC8gJXgyMy0yQiAvICV4MkQtM0EgLyAleDNDLTVCIC8gJXg1RC03RVxuICogICAgICAgICAgICAgICAgICAgICA7IFVTLUFTQ0lJIGNoYXJhY3RlcnMgZXhjbHVkaW5nIENUTHMsXG4gKiAgICAgICAgICAgICAgICAgICAgIDsgd2hpdGVzcGFjZSBEUVVPVEUsIGNvbW1hLCBzZW1pY29sb24sXG4gKiAgICAgICAgICAgICAgICAgICAgIDsgYW5kIGJhY2tzbGFzaFxuICovXG5cbnZhciBjb29raWVWYWx1ZVJlZ0V4cCA9IC9eKFwiPylbXFx1MDAyMVxcdTAwMjMtXFx1MDAyQlxcdTAwMkQtXFx1MDAzQVxcdTAwM0MtXFx1MDA1QlxcdTAwNUQtXFx1MDA3RV0qXFwxJC87XG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGRvbWFpbi12YWx1ZSBpbiBSRkMgNjI2NSBzZWMgNC4xLjFcbiAqXG4gKiBkb21haW4tdmFsdWUgICAgICA9IDxzdWJkb21haW4+XG4gKiAgICAgICAgICAgICAgICAgICAgIDsgZGVmaW5lZCBpbiBbUkZDMTAzNF0sIFNlY3Rpb24gMy41LCBhc1xuICogICAgICAgICAgICAgICAgICAgICA7IGVuaGFuY2VkIGJ5IFtSRkMxMTIzXSwgU2VjdGlvbiAyLjFcbiAqIDxzdWJkb21haW4+ICAgICAgID0gPGxhYmVsPiB8IDxzdWJkb21haW4+IFwiLlwiIDxsYWJlbD5cbiAqIDxsYWJlbD4gICAgICAgICAgID0gPGxldC1kaWc+IFsgWyA8bGRoLXN0cj4gXSA8bGV0LWRpZz4gXVxuICogICAgICAgICAgICAgICAgICAgICBMYWJlbHMgbXVzdCBiZSA2MyBjaGFyYWN0ZXJzIG9yIGxlc3MuXG4gKiAgICAgICAgICAgICAgICAgICAgICdsZXQtZGlnJyBub3QgJ2xldHRlcicgaW4gdGhlIGZpcnN0IGNoYXIsIHBlciBSRkMxMTIzXG4gKiA8bGRoLXN0cj4gICAgICAgICA9IDxsZXQtZGlnLWh5cD4gfCA8bGV0LWRpZy1oeXA+IDxsZGgtc3RyPlxuICogPGxldC1kaWctaHlwPiAgICAgPSA8bGV0LWRpZz4gfCBcIi1cIlxuICogPGxldC1kaWc+ICAgICAgICAgPSA8bGV0dGVyPiB8IDxkaWdpdD5cbiAqIDxsZXR0ZXI+ICAgICAgICAgID0gYW55IG9uZSBvZiB0aGUgNTIgYWxwaGFiZXRpYyBjaGFyYWN0ZXJzIEEgdGhyb3VnaCBaIGluXG4gKiAgICAgICAgICAgICAgICAgICAgIHVwcGVyIGNhc2UgYW5kIGEgdGhyb3VnaCB6IGluIGxvd2VyIGNhc2VcbiAqIDxkaWdpdD4gICAgICAgICAgID0gYW55IG9uZSBvZiB0aGUgdGVuIGRpZ2l0cyAwIHRocm91Z2ggOVxuICovXG5cbnZhciBkb21haW5WYWx1ZVJlZ0V4cCA9IC9eKFthLXowLTldKFthLXowLTktXXswLDYxfVthLXowLTldKT8pKFsuXVthLXowLTldKFthLXowLTktXXswLDYxfVthLXowLTldKT8pKiQvaTtcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggcGF0aC12YWx1ZSBpbiBSRkMgNjI2NSBzZWMgNC4xLjFcbiAqXG4gKiBwYXRoLXZhbHVlICAgICAgICA9IDxhbnkgQ0hBUiBleGNlcHQgQ1RMcyBvciBcIjtcIj5cbiAqIENIQVIgICAgICAgICAgICAgID0gJXgwMS03RlxuICogICAgICAgICAgICAgICAgICAgICA7IGRlZmluZWQgaW4gUkZDIDUyMzQgYXBwZW5kaXggQi4xXG4gKi9cblxudmFyIHBhdGhWYWx1ZVJlZ0V4cCA9IC9eW1xcdTAwMjAtXFx1MDAzQVxcdTAwM0QtXFx1MDA3RV0qJC87XG5cbi8qKlxuICogUGFyc2UgYSBjb29raWUgaGVhZGVyLlxuICpcbiAqIFBhcnNlIHRoZSBnaXZlbiBjb29raWUgaGVhZGVyIHN0cmluZyBpbnRvIGFuIG9iamVjdFxuICogVGhlIG9iamVjdCBoYXMgdGhlIHZhcmlvdXMgY29va2llcyBhcyBrZXlzKG5hbWVzKSA9PiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHN0ciBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gIH1cblxuICB2YXIgb2JqID0ge307XG4gIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuICAvLyBSRkMgNjI2NSBzZWMgNC4xLjEsIFJGQyAyNjE2IDIuMiBkZWZpbmVzIGEgY29va2llIG5hbWUgY29uc2lzdHMgb2Ygb25lIGNoYXIgbWluaW11bSwgcGx1cyAnPScuXG4gIHZhciBtYXggPSBsZW4gLSAyO1xuICBpZiAobWF4IDwgMCkgcmV0dXJuIG9iajtcblxuICB2YXIgZGVjID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWNvZGUpIHx8IGRlY29kZTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGVxSWR4ID0gMDtcbiAgdmFyIGVuZElkeCA9IDA7XG5cbiAgZG8ge1xuICAgIGVxSWR4ID0gc3RyLmluZGV4T2YoJz0nLCBpbmRleCk7XG5cbiAgICAvLyBubyBtb3JlIGNvb2tpZSBwYWlyc1xuICAgIGlmIChlcUlkeCA9PT0gLTEpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVuZElkeCA9IHN0ci5pbmRleE9mKCc7JywgaW5kZXgpO1xuXG4gICAgaWYgKGVuZElkeCA9PT0gLTEpIHtcbiAgICAgIGVuZElkeCA9IGxlbjtcbiAgICB9IGVsc2UgaWYgKGVxSWR4ID4gZW5kSWR4KSB7XG4gICAgICAvLyBiYWNrdHJhY2sgb24gcHJpb3Igc2VtaWNvbG9uXG4gICAgICBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZignOycsIGVxSWR4IC0gMSkgKyAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtleVN0YXJ0SWR4ID0gc3RhcnRJbmRleChzdHIsIGluZGV4LCBlcUlkeCk7XG4gICAgdmFyIGtleUVuZElkeCA9IGVuZEluZGV4KHN0ciwgZXFJZHgsIGtleVN0YXJ0SWR4KTtcbiAgICB2YXIga2V5ID0gc3RyLnNsaWNlKGtleVN0YXJ0SWR4LCBrZXlFbmRJZHgpO1xuXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxuICAgIGlmICh1bmRlZmluZWQgPT09IG9ialtrZXldKSB7XG4gICAgICB2YXIgdmFsU3RhcnRJZHggPSBzdGFydEluZGV4KHN0ciwgZXFJZHggKyAxLCBlbmRJZHgpO1xuICAgICAgdmFyIHZhbEVuZElkeCA9IGVuZEluZGV4KHN0ciwgZW5kSWR4LCB2YWxTdGFydElkeCk7XG5cbiAgICAgIGlmIChzdHIuY2hhckNvZGVBdCh2YWxTdGFydElkeCkgPT09IDB4MjIgLyogXCIgKi8gJiYgc3RyLmNoYXJDb2RlQXQodmFsRW5kSWR4IC0gMSkgPT09IDB4MjIgLyogXCIgKi8pIHtcbiAgICAgICAgdmFsU3RhcnRJZHgrKztcbiAgICAgICAgdmFsRW5kSWR4LS07XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWwgPSBzdHIuc2xpY2UodmFsU3RhcnRJZHgsIHZhbEVuZElkeCk7XG4gICAgICBvYmpba2V5XSA9IHRyeURlY29kZSh2YWwsIGRlYyk7XG4gICAgfVxuXG4gICAgaW5kZXggPSBlbmRJZHggKyAxXG4gIH0gd2hpbGUgKGluZGV4IDwgbWF4KTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBzdGFydEluZGV4KHN0ciwgaW5kZXgsIG1heCkge1xuICBkbyB7XG4gICAgdmFyIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpbmRleCk7XG4gICAgaWYgKGNvZGUgIT09IDB4MjAgLyogICAqLyAmJiBjb2RlICE9PSAweDA5IC8qIFxcdCAqLykgcmV0dXJuIGluZGV4O1xuICB9IHdoaWxlICgrK2luZGV4IDwgbWF4KTtcbiAgcmV0dXJuIG1heDtcbn1cblxuZnVuY3Rpb24gZW5kSW5kZXgoc3RyLCBpbmRleCwgbWluKSB7XG4gIHdoaWxlIChpbmRleCA+IG1pbikge1xuICAgIHZhciBjb2RlID0gc3RyLmNoYXJDb2RlQXQoLS1pbmRleCk7XG4gICAgaWYgKGNvZGUgIT09IDB4MjAgLyogICAqLyAmJiBjb2RlICE9PSAweDA5IC8qIFxcdCAqLykgcmV0dXJuIGluZGV4ICsgMTtcbiAgfVxuICByZXR1cm4gbWluO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSBkYXRhIGludG8gYSBjb29raWUgaGVhZGVyLlxuICpcbiAqIFNlcmlhbGl6ZSBhIG5hbWUgdmFsdWUgcGFpciBpbnRvIGEgY29va2llIHN0cmluZyBzdWl0YWJsZSBmb3JcbiAqIGh0dHAgaGVhZGVycy4gQW4gb3B0aW9uYWwgb3B0aW9ucyBvYmplY3Qgc3BlY2lmaWVzIGNvb2tpZSBwYXJhbWV0ZXJzLlxuICpcbiAqIHNlcmlhbGl6ZSgnZm9vJywgJ2JhcicsIHsgaHR0cE9ubHk6IHRydWUgfSlcbiAqICAgPT4gXCJmb289YmFyOyBodHRwT25seVwiXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUobmFtZSwgdmFsLCBvcHRpb25zKSB7XG4gIHZhciBvcHQgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgZW5jID0gb3B0LmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHR5cGVvZiBlbmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZW5jb2RlIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIGlmICghY29va2llTmFtZVJlZ0V4cC50ZXN0KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgbmFtZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgdmFsdWUgPSBlbmModmFsKTtcblxuICBpZiAodmFsdWUgJiYgIWNvb2tpZVZhbHVlUmVnRXhwLnRlc3QodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgdmFsIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHZhciBzdHIgPSBuYW1lICsgJz0nICsgdmFsdWU7XG5cbiAgaWYgKG51bGwgIT0gb3B0Lm1heEFnZSkge1xuICAgIHZhciBtYXhBZ2UgPSBvcHQubWF4QWdlIC0gMDtcblxuICAgIGlmICghaXNGaW5pdGUobWF4QWdlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIG1heEFnZSBpcyBpbnZhbGlkJylcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgTWF4LUFnZT0nICsgTWF0aC5mbG9vcihtYXhBZ2UpO1xuICB9XG5cbiAgaWYgKG9wdC5kb21haW4pIHtcbiAgICBpZiAoIWRvbWFpblZhbHVlUmVnRXhwLnRlc3Qob3B0LmRvbWFpbikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBkb21haW4gaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBEb21haW49JyArIG9wdC5kb21haW47XG4gIH1cblxuICBpZiAob3B0LnBhdGgpIHtcbiAgICBpZiAoIXBhdGhWYWx1ZVJlZ0V4cC50ZXN0KG9wdC5wYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHBhdGggaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBQYXRoPScgKyBvcHQucGF0aDtcbiAgfVxuXG4gIGlmIChvcHQuZXhwaXJlcykge1xuICAgIHZhciBleHBpcmVzID0gb3B0LmV4cGlyZXNcblxuICAgIGlmICghaXNEYXRlKGV4cGlyZXMpIHx8IGlzTmFOKGV4cGlyZXMudmFsdWVPZigpKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGV4cGlyZXMgaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBFeHBpcmVzPScgKyBleHBpcmVzLnRvVVRDU3RyaW5nKClcbiAgfVxuXG4gIGlmIChvcHQuaHR0cE9ubHkpIHtcbiAgICBzdHIgKz0gJzsgSHR0cE9ubHknO1xuICB9XG5cbiAgaWYgKG9wdC5zZWN1cmUpIHtcbiAgICBzdHIgKz0gJzsgU2VjdXJlJztcbiAgfVxuXG4gIGlmIChvcHQucGFydGl0aW9uZWQpIHtcbiAgICBzdHIgKz0gJzsgUGFydGl0aW9uZWQnXG4gIH1cblxuICBpZiAob3B0LnByaW9yaXR5KSB7XG4gICAgdmFyIHByaW9yaXR5ID0gdHlwZW9mIG9wdC5wcmlvcml0eSA9PT0gJ3N0cmluZydcbiAgICAgID8gb3B0LnByaW9yaXR5LnRvTG93ZXJDYXNlKClcbiAgICAgIDogb3B0LnByaW9yaXR5XG5cbiAgICBzd2l0Y2ggKHByaW9yaXR5KSB7XG4gICAgICBjYXNlICdsb3cnOlxuICAgICAgICBzdHIgKz0gJzsgUHJpb3JpdHk9TG93J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWVkaXVtJzpcbiAgICAgICAgc3RyICs9ICc7IFByaW9yaXR5PU1lZGl1bSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgICAgICBzdHIgKz0gJzsgUHJpb3JpdHk9SGlnaCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBwcmlvcml0eSBpcyBpbnZhbGlkJylcbiAgICB9XG4gIH1cblxuICBpZiAob3B0LnNhbWVTaXRlKSB7XG4gICAgdmFyIHNhbWVTaXRlID0gdHlwZW9mIG9wdC5zYW1lU2l0ZSA9PT0gJ3N0cmluZydcbiAgICAgID8gb3B0LnNhbWVTaXRlLnRvTG93ZXJDYXNlKCkgOiBvcHQuc2FtZVNpdGU7XG5cbiAgICBzd2l0Y2ggKHNhbWVTaXRlKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xheCc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1MYXgnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmljdCc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9Tm9uZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHNhbWVTaXRlIGlzIGludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIFVSTC1kZWNvZGUgc3RyaW5nIHZhbHVlLiBPcHRpbWl6ZWQgdG8gc2tpcCBuYXRpdmUgY2FsbCB3aGVuIG5vICUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBkZWNvZGUgKHN0cikge1xuICByZXR1cm4gc3RyLmluZGV4T2YoJyUnKSAhPT0gLTFcbiAgICA/IGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgOiBzdHJcbn1cblxuLyoqXG4gKiBVUkwtZW5jb2RlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlICh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpXG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHZhbHVlIGlzIGEgRGF0ZS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0RhdGUgKHZhbCkge1xuICByZXR1cm4gX190b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJyB8fFxuICAgIHZhbCBpbnN0YW5jZW9mIERhdGVcbn1cblxuLyoqXG4gKiBUcnkgZGVjb2RpbmcgYSBzdHJpbmcgdXNpbmcgYSBkZWNvZGluZyBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBkZWNvZGVcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gdHJ5RGVjb2RlKHN0ciwgZGVjb2RlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZShzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/cookie@0.7.0/node_modules/cookie/index.js\n");

/***/ })

};
;