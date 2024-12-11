"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.ts":
/*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(middleware)/./node_modules/.pnpm/@clerk+nextjs@6.3.2_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react_erh4rexutio6xfxki4qahuk4f4/node_modules/@clerk/nextjs/dist/esm/server/routeMatcher.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(middleware)/./node_modules/.pnpm/@clerk+nextjs@6.3.2_next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react_erh4rexutio6xfxki4qahuk4f4/node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js\");\n\nconst isPublicRoute = (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_0__.createRouteMatcher)([\n    '/',\n    '/sign-in(.*)',\n    '/sign-up(.*)',\n    '/panel-control(.*)'\n]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_1__.clerkMiddleware)(async (auth, request)=>{\n    if (!isPublicRoute(request)) {\n        await auth.protect();\n    }\n}));\nconst config = {\n    matcher: [\n        // Skip Next.js internals and all static files, unless found in search params\n        '/((?!_next).*)',\n        // Always run for API routes\n        '/(api|trpc)(.*)'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwRTtBQUUxRSxNQUFNRSxnQkFBZ0JELHdFQUFrQkEsQ0FBQztJQUFDO0lBQUs7SUFBZ0I7SUFBZ0I7Q0FBcUI7QUFFcEcsaUVBQWVELHFFQUFlQSxDQUFDLE9BQU9HLE1BQU1DO0lBQzFDLElBQUksQ0FBQ0YsY0FBY0UsVUFBVTtRQUMzQixNQUFNRCxLQUFLRSxPQUFPO0lBQ3BCO0FBQ0YsRUFBRTtBQUVLLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7UUFDUCw2RUFBNkU7UUFDN0U7UUFDQSw0QkFBNEI7UUFDNUI7S0FDRDtBQUNILEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL3NyYy9taWRkbGV3YXJlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsZXJrTWlkZGxld2FyZSwgY3JlYXRlUm91dGVNYXRjaGVyIH0gZnJvbSAnQGNsZXJrL25leHRqcy9zZXJ2ZXInXG5cbmNvbnN0IGlzUHVibGljUm91dGUgPSBjcmVhdGVSb3V0ZU1hdGNoZXIoWycvJywgJy9zaWduLWluKC4qKScsICcvc2lnbi11cCguKiknLCAnL3BhbmVsLWNvbnRyb2woLiopJ10pXG5cbmV4cG9ydCBkZWZhdWx0IGNsZXJrTWlkZGxld2FyZShhc3luYyAoYXV0aCwgcmVxdWVzdCkgPT4ge1xuICBpZiAoIWlzUHVibGljUm91dGUocmVxdWVzdCkpIHtcbiAgICBhd2FpdCBhdXRoLnByb3RlY3QoKVxuICB9XG59KVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiBbXG4gICAgLy8gU2tpcCBOZXh0LmpzIGludGVybmFscyBhbmQgYWxsIHN0YXRpYyBmaWxlcywgdW5sZXNzIGZvdW5kIGluIHNlYXJjaCBwYXJhbXNcbiAgICAnLygoPyFfbmV4dCkuKiknLFxuICAgIC8vIEFsd2F5cyBydW4gZm9yIEFQSSByb3V0ZXNcbiAgICAnLyhhcGl8dHJwYykoLiopJyxcbiAgXSxcbn0iXSwibmFtZXMiOlsiY2xlcmtNaWRkbGV3YXJlIiwiY3JlYXRlUm91dGVNYXRjaGVyIiwiaXNQdWJsaWNSb3V0ZSIsImF1dGgiLCJyZXF1ZXN0IiwicHJvdGVjdCIsImNvbmZpZyIsIm1hdGNoZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});