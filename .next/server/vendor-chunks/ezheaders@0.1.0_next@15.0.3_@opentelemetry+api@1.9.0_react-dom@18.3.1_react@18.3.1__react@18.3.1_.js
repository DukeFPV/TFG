"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_";
exports.ids = ["vendor-chunks/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_"];
exports.modules = {

/***/ "(action-browser)/./node_modules/.pnpm/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/ezheaders/dist/index.mjs":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/ezheaders/dist/index.mjs ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cookie: () => (/* binding */ cookie),\n/* harmony export */   getCookies: () => (/* binding */ getCookies),\n/* harmony export */   getHeaders: () => (/* binding */ getHeaders),\n/* harmony export */   header: () => (/* binding */ header)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(action-browser)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/headers.js\");\n// src/headers.ts\n\nfunction createHeaderHelpers(headers = next_headers__WEBPACK_IMPORTED_MODULE_0__.headers) {\n  const header2 = async (...args) => {\n    const headerStrore = await headers();\n    return headerStrore.get(...args);\n  };\n  const getHeaders2 = async () => headers();\n  return { header: header2, getHeaders: getHeaders2 };\n}\nvar { header, getHeaders } = createHeaderHelpers();\n\n// src/cookies.ts\n\nfunction createCookieHelpers(cookies = next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies) {\n  async function cookie2(...args) {\n    const [nameOrCookie, value, opts] = args;\n    const name = typeof nameOrCookie === \"string\" ? nameOrCookie : nameOrCookie.name;\n    const cookieStore = await cookies();\n    if (name && args.length >= 2) {\n      return cookieStore.set(name, value, opts);\n    }\n    return cookieStore.get(name);\n  }\n  const getCookies2 = async () => cookies();\n  return { cookie: cookie2, getCookies: getCookies2 };\n}\nvar { cookie, getCookies } = createCookieHelpers();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy8ucG5wbS9lemhlYWRlcnNAMC4xLjBfbmV4dEAxNS4wLjNfQG9wZW50ZWxlbWV0cnkrYXBpQDEuOS4wX3JlYWN0LWRvbUAxOC4zLjFfcmVhY3RAMTguMy4xX19yZWFjdEAxOC4zLjFfL25vZGVfbW9kdWxlcy9lemhlYWRlcnMvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNtRDtBQUNuRCx1Q0FBdUMsaURBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE1BQU0scUJBQXFCOztBQUUzQjtBQUNtRDtBQUNuRCx1Q0FBdUMsaURBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxNQUFNLHFCQUFxQjtBQU16QiIsInNvdXJjZXMiOlsiL1VzZXJzL2Nhcmxvcy9EZXNrdG9wL1RGRy9URkcvbm9kZV9tb2R1bGVzLy5wbnBtL2V6aGVhZGVyc0AwLjEuMF9uZXh0QDE1LjAuM19Ab3BlbnRlbGVtZXRyeSthcGlAMS45LjBfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMV8vbm9kZV9tb2R1bGVzL2V6aGVhZGVycy9kaXN0L2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvaGVhZGVycy50c1xuaW1wb3J0IHsgaGVhZGVycyBhcyBfaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlckhlbHBlcnMoaGVhZGVycyA9IF9oZWFkZXJzKSB7XG4gIGNvbnN0IGhlYWRlcjIgPSBhc3luYyAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGhlYWRlclN0cm9yZSA9IGF3YWl0IGhlYWRlcnMoKTtcbiAgICByZXR1cm4gaGVhZGVyU3Ryb3JlLmdldCguLi5hcmdzKTtcbiAgfTtcbiAgY29uc3QgZ2V0SGVhZGVyczIgPSBhc3luYyAoKSA9PiBoZWFkZXJzKCk7XG4gIHJldHVybiB7IGhlYWRlcjogaGVhZGVyMiwgZ2V0SGVhZGVyczogZ2V0SGVhZGVyczIgfTtcbn1cbnZhciB7IGhlYWRlciwgZ2V0SGVhZGVycyB9ID0gY3JlYXRlSGVhZGVySGVscGVycygpO1xuXG4vLyBzcmMvY29va2llcy50c1xuaW1wb3J0IHsgY29va2llcyBhcyBfY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmZ1bmN0aW9uIGNyZWF0ZUNvb2tpZUhlbHBlcnMoY29va2llcyA9IF9jb29raWVzKSB7XG4gIGFzeW5jIGZ1bmN0aW9uIGNvb2tpZTIoLi4uYXJncykge1xuICAgIGNvbnN0IFtuYW1lT3JDb29raWUsIHZhbHVlLCBvcHRzXSA9IGFyZ3M7XG4gICAgY29uc3QgbmFtZSA9IHR5cGVvZiBuYW1lT3JDb29raWUgPT09IFwic3RyaW5nXCIgPyBuYW1lT3JDb29raWUgOiBuYW1lT3JDb29raWUubmFtZTtcbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcbiAgICBpZiAobmFtZSAmJiBhcmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICByZXR1cm4gY29va2llU3RvcmUuc2V0KG5hbWUsIHZhbHVlLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb2tpZVN0b3JlLmdldChuYW1lKTtcbiAgfVxuICBjb25zdCBnZXRDb29raWVzMiA9IGFzeW5jICgpID0+IGNvb2tpZXMoKTtcbiAgcmV0dXJuIHsgY29va2llOiBjb29raWUyLCBnZXRDb29raWVzOiBnZXRDb29raWVzMiB9O1xufVxudmFyIHsgY29va2llLCBnZXRDb29raWVzIH0gPSBjcmVhdGVDb29raWVIZWxwZXJzKCk7XG5leHBvcnQge1xuICBjb29raWUsXG4gIGdldENvb2tpZXMsXG4gIGdldEhlYWRlcnMsXG4gIGhlYWRlclxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/.pnpm/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/ezheaders/dist/index.mjs\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/ezheaders/dist/index.mjs":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/ezheaders/dist/index.mjs ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cookie: () => (/* binding */ cookie),\n/* harmony export */   getCookies: () => (/* binding */ getCookies),\n/* harmony export */   getHeaders: () => (/* binding */ getHeaders),\n/* harmony export */   header: () => (/* binding */ header)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/headers.js\");\n// src/headers.ts\n\nfunction createHeaderHelpers(headers = next_headers__WEBPACK_IMPORTED_MODULE_0__.headers) {\n  const header2 = async (...args) => {\n    const headerStrore = await headers();\n    return headerStrore.get(...args);\n  };\n  const getHeaders2 = async () => headers();\n  return { header: header2, getHeaders: getHeaders2 };\n}\nvar { header, getHeaders } = createHeaderHelpers();\n\n// src/cookies.ts\n\nfunction createCookieHelpers(cookies = next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies) {\n  async function cookie2(...args) {\n    const [nameOrCookie, value, opts] = args;\n    const name = typeof nameOrCookie === \"string\" ? nameOrCookie : nameOrCookie.name;\n    const cookieStore = await cookies();\n    if (name && args.length >= 2) {\n      return cookieStore.set(name, value, opts);\n    }\n    return cookieStore.get(name);\n  }\n  const getCookies2 = async () => cookies();\n  return { cookie: cookie2, getCookies: getCookies2 };\n}\nvar { cookie, getCookies } = createCookieHelpers();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vZXpoZWFkZXJzQDAuMS4wX25leHRAMTUuMC4zX0BvcGVudGVsZW1ldHJ5K2FwaUAxLjkuMF9yZWFjdC1kb21AMTguMy4xX3JlYWN0QDE4LjMuMV9fcmVhY3RAMTguMy4xXy9ub2RlX21vZHVsZXMvZXpoZWFkZXJzL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDbUQ7QUFDbkQsdUNBQXVDLGlEQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxNQUFNLHFCQUFxQjs7QUFFM0I7QUFDbUQ7QUFDbkQsdUNBQXVDLGlEQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsTUFBTSxxQkFBcUI7QUFNekIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL25vZGVfbW9kdWxlcy8ucG5wbS9lemhlYWRlcnNAMC4xLjBfbmV4dEAxNS4wLjNfQG9wZW50ZWxlbWV0cnkrYXBpQDEuOS4wX3JlYWN0LWRvbUAxOC4zLjFfcmVhY3RAMTguMy4xX19yZWFjdEAxOC4zLjFfL25vZGVfbW9kdWxlcy9lemhlYWRlcnMvZGlzdC9pbmRleC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2hlYWRlcnMudHNcbmltcG9ydCB7IGhlYWRlcnMgYXMgX2hlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJIZWxwZXJzKGhlYWRlcnMgPSBfaGVhZGVycykge1xuICBjb25zdCBoZWFkZXIyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBoZWFkZXJTdHJvcmUgPSBhd2FpdCBoZWFkZXJzKCk7XG4gICAgcmV0dXJuIGhlYWRlclN0cm9yZS5nZXQoLi4uYXJncyk7XG4gIH07XG4gIGNvbnN0IGdldEhlYWRlcnMyID0gYXN5bmMgKCkgPT4gaGVhZGVycygpO1xuICByZXR1cm4geyBoZWFkZXI6IGhlYWRlcjIsIGdldEhlYWRlcnM6IGdldEhlYWRlcnMyIH07XG59XG52YXIgeyBoZWFkZXIsIGdldEhlYWRlcnMgfSA9IGNyZWF0ZUhlYWRlckhlbHBlcnMoKTtcblxuLy8gc3JjL2Nvb2tpZXMudHNcbmltcG9ydCB7IGNvb2tpZXMgYXMgX2Nvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5mdW5jdGlvbiBjcmVhdGVDb29raWVIZWxwZXJzKGNvb2tpZXMgPSBfY29va2llcykge1xuICBhc3luYyBmdW5jdGlvbiBjb29raWUyKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbbmFtZU9yQ29va2llLCB2YWx1ZSwgb3B0c10gPSBhcmdzO1xuICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgbmFtZU9yQ29va2llID09PSBcInN0cmluZ1wiID8gbmFtZU9yQ29va2llIDogbmFtZU9yQ29va2llLm5hbWU7XG4gICAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKCk7XG4gICAgaWYgKG5hbWUgJiYgYXJncy5sZW5ndGggPj0gMikge1xuICAgICAgcmV0dXJuIGNvb2tpZVN0b3JlLnNldChuYW1lLCB2YWx1ZSwgb3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBjb29raWVTdG9yZS5nZXQobmFtZSk7XG4gIH1cbiAgY29uc3QgZ2V0Q29va2llczIgPSBhc3luYyAoKSA9PiBjb29raWVzKCk7XG4gIHJldHVybiB7IGNvb2tpZTogY29va2llMiwgZ2V0Q29va2llczogZ2V0Q29va2llczIgfTtcbn1cbnZhciB7IGNvb2tpZSwgZ2V0Q29va2llcyB9ID0gY3JlYXRlQ29va2llSGVscGVycygpO1xuZXhwb3J0IHtcbiAgY29va2llLFxuICBnZXRDb29raWVzLFxuICBnZXRIZWFkZXJzLFxuICBoZWFkZXJcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/ezheaders@0.1.0_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/ezheaders/dist/index.mjs\n");

/***/ })

};
;