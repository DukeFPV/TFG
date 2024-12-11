"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-composed-ref@1.3.0_react@18.3.1";
exports.ids = ["vendor-chunks/use-composed-ref@1.3.0_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/use-composed-ref@1.3.0_react@18.3.1/node_modules/use-composed-ref/dist/use-composed-ref.esm.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/use-composed-ref@1.3.0_react@18.3.1/node_modules/use-composed-ref/dist/use-composed-ref.esm.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar updateRef = function updateRef(ref, value) {\n  if (typeof ref === 'function') {\n    ref(value);\n    return;\n  }\n  ref.current = value;\n};\n\nvar useComposedRef = function useComposedRef(libRef, userRef) {\n  var prevUserRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (instance) {\n    libRef.current = instance;\n\n    if (prevUserRef.current) {\n      updateRef(prevUserRef.current, null);\n    }\n\n    prevUserRef.current = userRef;\n\n    if (!userRef) {\n      return;\n    }\n\n    updateRef(userRef, instance);\n  }, [userRef]);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useComposedRef);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdXNlLWNvbXBvc2VkLXJlZkAxLjMuMF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL3VzZS1jb21wb3NlZC1yZWYvZGlzdC91c2UtY29tcG9zZWQtcmVmLmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDZDQUFNO0FBQzFCLFNBQVMsa0RBQVc7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxjQUFjLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL25vZGVfbW9kdWxlcy8ucG5wbS91c2UtY29tcG9zZWQtcmVmQDEuMy4wX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvdXNlLWNvbXBvc2VkLXJlZi9kaXN0L3VzZS1jb21wb3NlZC1yZWYuZXNtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5cbnZhciB1cGRhdGVSZWYgPSBmdW5jdGlvbiB1cGRhdGVSZWYocmVmLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZih2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlZi5jdXJyZW50ID0gdmFsdWU7XG59O1xuXG52YXIgdXNlQ29tcG9zZWRSZWYgPSBmdW5jdGlvbiB1c2VDb21wb3NlZFJlZihsaWJSZWYsIHVzZXJSZWYpIHtcbiAgdmFyIHByZXZVc2VyUmVmID0gdXNlUmVmKCk7XG4gIHJldHVybiB1c2VDYWxsYmFjayhmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICBsaWJSZWYuY3VycmVudCA9IGluc3RhbmNlO1xuXG4gICAgaWYgKHByZXZVc2VyUmVmLmN1cnJlbnQpIHtcbiAgICAgIHVwZGF0ZVJlZihwcmV2VXNlclJlZi5jdXJyZW50LCBudWxsKTtcbiAgICB9XG5cbiAgICBwcmV2VXNlclJlZi5jdXJyZW50ID0gdXNlclJlZjtcblxuICAgIGlmICghdXNlclJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHVwZGF0ZVJlZih1c2VyUmVmLCBpbnN0YW5jZSk7XG4gIH0sIFt1c2VyUmVmXSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDb21wb3NlZFJlZjtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/use-composed-ref@1.3.0_react@18.3.1/node_modules/use-composed-ref/dist/use-composed-ref.esm.js\n");

/***/ })

};
;