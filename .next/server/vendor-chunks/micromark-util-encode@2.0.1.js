"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-encode@2.0.1";
exports.ids = ["vendor-chunks/micromark-util-encode@2.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/micromark-util-encode@2.0.1/node_modules/micromark-util-encode/index.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/micromark-util-encode@2.0.1/node_modules/micromark-util-encode/index.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   encode: () => (/* binding */ encode)\n/* harmony export */ });\nconst characterReferences = {'\"': 'quot', '&': 'amp', '<': 'lt', '>': 'gt'}\n\n/**\n * Encode only the dangerous HTML characters.\n *\n * This ensures that certain characters which have special meaning in HTML are\n * dealt with.\n * Technically, we can skip `>` and `\"` in many cases, but CM includes them.\n *\n * @param {string} value\n *   Value to encode.\n * @returns {string}\n *   Encoded value.\n */\nfunction encode(value) {\n  return value.replace(/[\"&<>]/g, replace)\n\n  /**\n   * @param {string} value\n   *   Value to replace.\n   * @returns {string}\n   *   Encoded value.\n   */\n  function replace(value) {\n    return (\n      '&' +\n      characterReferences[\n        /** @type {keyof typeof characterReferences} */ (value)\n      ] +\n      ';'\n    )\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbWljcm9tYXJrLXV0aWwtZW5jb2RlQDIuMC4xL25vZGVfbW9kdWxlcy9taWNyb21hcmstdXRpbC1lbmNvZGUvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL25vZGVfbW9kdWxlcy8ucG5wbS9taWNyb21hcmstdXRpbC1lbmNvZGVAMi4wLjEvbm9kZV9tb2R1bGVzL21pY3JvbWFyay11dGlsLWVuY29kZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjaGFyYWN0ZXJSZWZlcmVuY2VzID0geydcIic6ICdxdW90JywgJyYnOiAnYW1wJywgJzwnOiAnbHQnLCAnPic6ICdndCd9XG5cbi8qKlxuICogRW5jb2RlIG9ubHkgdGhlIGRhbmdlcm91cyBIVE1MIGNoYXJhY3RlcnMuXG4gKlxuICogVGhpcyBlbnN1cmVzIHRoYXQgY2VydGFpbiBjaGFyYWN0ZXJzIHdoaWNoIGhhdmUgc3BlY2lhbCBtZWFuaW5nIGluIEhUTUwgYXJlXG4gKiBkZWFsdCB3aXRoLlxuICogVGVjaG5pY2FsbHksIHdlIGNhbiBza2lwIGA+YCBhbmQgYFwiYCBpbiBtYW55IGNhc2VzLCBidXQgQ00gaW5jbHVkZXMgdGhlbS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqICAgVmFsdWUgdG8gZW5jb2RlLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgRW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW1wiJjw+XS9nLCByZXBsYWNlKVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICogICBWYWx1ZSB0byByZXBsYWNlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiAgIEVuY29kZWQgdmFsdWUuXG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICcmJyArXG4gICAgICBjaGFyYWN0ZXJSZWZlcmVuY2VzW1xuICAgICAgICAvKiogQHR5cGUge2tleW9mIHR5cGVvZiBjaGFyYWN0ZXJSZWZlcmVuY2VzfSAqLyAodmFsdWUpXG4gICAgICBdICtcbiAgICAgICc7J1xuICAgIClcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/micromark-util-encode@2.0.1/node_modules/micromark-util-encode/index.js\n");

/***/ })

};
;