"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/contacto/page",{

/***/ "(app-pages-browser)/./src/app/contacto/page.tsx":
/*!***********************************!*\
  !*** ./src/app/contacto/page.tsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Contact)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/noop-head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n// \"use client\" indica que este archivo contiene código del cliente\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n// Importaciones necesarias desde React y Next.js\n\n\n// Definición del componente de contacto\nfunction Contact() {\n    _s();\n    // Definición de estados para los campos del formulario\n    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');\n    const [phone, setPhone] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');\n    // Función que maneja el envío del formulario\n    const handleSubmit = (event)=>{\n        event.preventDefault();\n        alert('Formulario enviado!');\n    };\n    return(// Contenedor principal de la página de contacto\n    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen bg-gradient-to-br from-pink-400 via-indigo-400 to-neutral-50 flex flex-col justify-center items-left pl-20 \",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Contacto\"\n                }, void 0, false, {\n                    fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                    lineNumber: 28,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-purple-200 p-8 rounded-lg shadow-lg max-w-md w-full\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-bold mb-4\",\n                        children: \"Cu\\xe9ntanos lo que quieras\"\n                    }, void 0, false, {\n                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        onSubmit: handleSubmit,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"mb-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                        htmlFor: \"name\",\n                                        className: \"block text-sm font-medium text-gray-700\",\n                                        children: \"Nombre y apellidos\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                        lineNumber: 37,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                        type: \"text\",\n                                        id: \"name\",\n                                        value: name,\n                                        onChange: (e)=>setName(e.target.value),\n                                        className: \"mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-full\",\n                                        placeholder: \"Tu nombre y apellidos\",\n                                        required: true\n                                    }, void 0, false, {\n                                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                        lineNumber: 38,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"mb-4 grid grid-cols-1 md:grid-cols-2 gap-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                                htmlFor: \"phone\",\n                                                className: \"block text-sm font-medium text-gray-700\",\n                                                children: \"Tel\\xe9fono\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                                lineNumber: 50,\n                                                columnNumber: 15\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                type: \"text\",\n                                                id: \"phone\",\n                                                value: phone,\n                                                onChange: (e)=>setPhone(e.target.value),\n                                                className: \"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500\",\n                                                placeholder: \"600123456\",\n                                                required: true\n                                            }, void 0, false, {\n                                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                                lineNumber: 51,\n                                                columnNumber: 15\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                        lineNumber: 49,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                                htmlFor: \"email\",\n                                                className: \"block text-sm font-medium text-gray-700\",\n                                                children: \"Email\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                                lineNumber: 62,\n                                                columnNumber: 15\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                type: \"email\",\n                                                id: \"email\",\n                                                value: email,\n                                                onChange: (e)=>setEmail(e.target.value),\n                                                className: \"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500\",\n                                                placeholder: \"ejemplo@email.com\",\n                                                required: true\n                                            }, void 0, false, {\n                                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                                lineNumber: 63,\n                                                columnNumber: 15\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                        lineNumber: 61,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"mb-6\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                        htmlFor: \"message\",\n                                        className: \"block text-sm font-medium text-gray-700\",\n                                        children: \"Escribe tu mensaje\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                        lineNumber: 75,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                        id: \"message\",\n                                        value: message,\n                                        onChange: (e)=>setMessage(e.target.value),\n                                        className: \"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500\",\n                                        placeholder: \"Escribe aqu\\xed lo que nos quieras decir\",\n                                        required: true,\n                                        rows: 4\n                                    }, void 0, false, {\n                                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                        lineNumber: 76,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                className: \"border-black w-fit rounded-full border-2 bg-purple-400 text-nowrap px-20 sm:px-6 py-4 text-white transition-all hover:border-purple-400 hover:bg-transparent hover:text-black/90\",\n                                children: \"Enviar mensaje\"\n                            }, void 0, false, {\n                                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                                lineNumber: 87,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/carlos/Desktop/TFG/TFG/src/app/contacto/page.tsx\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this));\n}\n_s(Contact, \"QEByo187Sv8rB4xwPoXiunhVCRs=\");\n_c = Contact;\nvar _c;\n$RefreshReg$(_c, \"Contact\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29udGFjdG8vcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUVBQW1FOzs7QUFHbkUsaURBQWlEO0FBQ3BCO0FBQ2U7QUFFNUMsd0NBQXdDO0FBQ3pCLFNBQVNFOztJQUN0Qix1REFBdUQ7SUFDdkQsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdILCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ0ksT0FBT0MsU0FBUyxHQUFHTCwrQ0FBUUEsQ0FBQztJQUNuQyxNQUFNLENBQUNNLE9BQU9DLFNBQVMsR0FBR1AsK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBRXZDLDZDQUE2QztJQUM3QyxNQUFNVSxlQUFlLENBQUNDO1FBQ3BCQSxNQUFNQyxjQUFjO1FBRXBCQyxNQUFNO0lBQ1I7SUFFQSxPQUNFLGdEQUFnRDtrQkFDaEQsOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDaEIsa0RBQUlBOzBCQUVILDRFQUFDaUI7OEJBQU07Ozs7Ozs7Ozs7OzBCQUlULDhEQUFDRjtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNFO3dCQUFHRixXQUFVO2tDQUEwQjs7Ozs7O2tDQUV4Qyw4REFBQ0c7d0JBQUtDLFVBQVVUOzswQ0FDZCw4REFBQ0k7Z0NBQUlDLFdBQVU7O2tEQUNiLDhEQUFDSzt3Q0FBTUMsU0FBUTt3Q0FBT04sV0FBVTtrREFBMEM7Ozs7OztrREFDMUUsOERBQUNPO3dDQUNDQyxNQUFLO3dDQUNMQyxJQUFHO3dDQUNIQyxPQUFPdkI7d0NBQ1B3QixVQUFVQyxDQUFBQSxJQUFLeEIsUUFBUXdCLEVBQUVDLE1BQU0sQ0FBQ0gsS0FBSzt3Q0FDckNWLFdBQVU7d0NBQ1ZjLGFBQVk7d0NBQ1pDLFFBQVE7Ozs7Ozs7Ozs7OzswQ0FHWiw4REFBQ2hCO2dDQUFJQyxXQUFVOztrREFDYiw4REFBQ0Q7OzBEQUNDLDhEQUFDTTtnREFBTUMsU0FBUTtnREFBUU4sV0FBVTswREFBMEM7Ozs7OzswREFDM0UsOERBQUNPO2dEQUNDQyxNQUFLO2dEQUNMQyxJQUFHO2dEQUNIQyxPQUFPckI7Z0RBQ1BzQixVQUFVQyxDQUFBQSxJQUFLdEIsU0FBU3NCLEVBQUVDLE1BQU0sQ0FBQ0gsS0FBSztnREFDdENWLFdBQVU7Z0RBQ1ZjLGFBQVk7Z0RBQ1pDLFFBQVE7Ozs7Ozs7Ozs7OztrREFHWiw4REFBQ2hCOzswREFDQyw4REFBQ007Z0RBQU1DLFNBQVE7Z0RBQVFOLFdBQVU7MERBQTBDOzs7Ozs7MERBQzNFLDhEQUFDTztnREFDQ0MsTUFBSztnREFDTEMsSUFBRztnREFDSEMsT0FBT25CO2dEQUNQb0IsVUFBVUMsQ0FBQUEsSUFBS3BCLFNBQVNvQixFQUFFQyxNQUFNLENBQUNILEtBQUs7Z0RBQ3RDVixXQUFVO2dEQUNWYyxhQUFZO2dEQUNaQyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBSWQsOERBQUNoQjtnQ0FBSUMsV0FBVTs7a0RBQ2IsOERBQUNLO3dDQUFNQyxTQUFRO3dDQUFVTixXQUFVO2tEQUEwQzs7Ozs7O2tEQUM3RSw4REFBQ2dCO3dDQUNDUCxJQUFHO3dDQUNIQyxPQUFPakI7d0NBQ1BrQixVQUFVQyxDQUFBQSxJQUFLbEIsV0FBV2tCLEVBQUVDLE1BQU0sQ0FBQ0gsS0FBSzt3Q0FDeENWLFdBQVU7d0NBQ1ZjLGFBQVk7d0NBQ1pDLFFBQVE7d0NBQ1JFLE1BQU07Ozs7Ozs7Ozs7OzswQ0FJViw4REFBQ0M7Z0NBQ0NWLE1BQUs7Z0NBQ0xSLFdBQVU7MENBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9YO0dBeEZ3QmQ7S0FBQUEiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL3NyYy9hcHAvY29udGFjdG8vcGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gXCJ1c2UgY2xpZW50XCIgaW5kaWNhIHF1ZSBlc3RlIGFyY2hpdm8gY29udGllbmUgY8OzZGlnbyBkZWwgY2xpZW50ZVxuXCJ1c2UgY2xpZW50XCJcblxuLy8gSW1wb3J0YWNpb25lcyBuZWNlc2FyaWFzIGRlc2RlIFJlYWN0IHkgTmV4dC5qc1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IEZvcm1FdmVudCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbi8vIERlZmluaWNpw7NuIGRlbCBjb21wb25lbnRlIGRlIGNvbnRhY3RvXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb250YWN0KCkge1xuICAvLyBEZWZpbmljacOzbiBkZSBlc3RhZG9zIHBhcmEgbG9zIGNhbXBvcyBkZWwgZm9ybXVsYXJpb1xuICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwaG9uZSwgc2V0UGhvbmVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xuXG4gIC8vIEZ1bmNpw7NuIHF1ZSBtYW5lamEgZWwgZW52w61vIGRlbCBmb3JtdWxhcmlvXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudDogRm9ybUV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGFsZXJ0KCdGb3JtdWxhcmlvIGVudmlhZG8hJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICAvLyBDb250ZW5lZG9yIHByaW5jaXBhbCBkZSBsYSBww6FnaW5hIGRlIGNvbnRhY3RvXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1waW5rLTQwMCB2aWEtaW5kaWdvLTQwMCB0by1uZXV0cmFsLTUwIGZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgaXRlbXMtbGVmdCBwbC0yMCBcIj5cbiAgICAgIDxIZWFkPlxuICAgICAgICB7LyogTWV0YWRhdG9zIGRlIGxhIHDDoWdpbmEgKi99XG4gICAgICAgIDx0aXRsZT5Db250YWN0bzwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIHsvKiBDb250ZW5lZG9yIGRlbCBmb3JtdWxhcmlvIGRlIGNvbnRhY3RvICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1wdXJwbGUtMjAwIHAtOCByb3VuZGVkLWxnIHNoYWRvdy1sZyBtYXgtdy1tZCB3LWZ1bGxcIj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCBtYi00XCI+Q3XDqW50YW5vcyBsbyBxdWUgcXVpZXJhczwvaDE+XG4gICAgICAgIHsvKiBGb3JtdWxhcmlvIGRlIGNvbnRhY3RvLCBsb3MgZXN0aWxvcyB2YW4gZGVmaW5pZG9zIGVuIGNhZGEgY29udGVuZWRvciB5IGNhbXBvICovfVxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibmFtZVwiIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMFwiPk5vbWJyZSB5IGFwZWxsaWRvczwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgIGlkPVwibmFtZVwiIFxuICAgICAgICAgICAgICB2YWx1ZT17bmFtZX0gXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0xIGJsb2NrIHctZnVsbCBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBzaGFkb3ctc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctaW5kaWdvLTUwMCBmb2N1czpib3JkZXItaW5kaWdvLTUwMCByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR1IG5vbWJyZSB5IGFwZWxsaWRvc1wiIFxuICAgICAgICAgICAgICByZXF1aXJlZCBcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00IGdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGhvbmVcIiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDBcIj5UZWzDqWZvbm88L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBpZD1cInBob25lXCIgXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Bob25lfSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRQaG9uZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMSBibG9jayB3LWZ1bGwgcHgtMyBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1mdWxsIHNoYWRvdy1zbSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjYwMDEyMzQ1NlwiIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkIFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCIgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCIgXG4gICAgICAgICAgICAgICAgaWQ9XCJlbWFpbFwiIFxuICAgICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH0gXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTEgYmxvY2sgdy1mdWxsIHB4LTMgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtZnVsbCBzaGFkb3ctc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctaW5kaWdvLTUwMCBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlamVtcGxvQGVtYWlsLmNvbVwiIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkIFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi02XCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm1lc3NhZ2VcIiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDBcIj5Fc2NyaWJlIHR1IG1lbnNhamU8L2xhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhIFxuICAgICAgICAgICAgICBpZD1cIm1lc3NhZ2VcIiBcbiAgICAgICAgICAgICAgdmFsdWU9e21lc3NhZ2V9IFxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRNZXNzYWdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMSBibG9jayB3LWZ1bGwgcHgtMyBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZCBzaGFkb3ctc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctaW5kaWdvLTUwMCBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRXNjcmliZSBhcXXDrSBsbyBxdWUgbm9zIHF1aWVyYXMgZGVjaXJcIiBcbiAgICAgICAgICAgICAgcmVxdWlyZWQgXG4gICAgICAgICAgICAgIHJvd3M9ezR9XG4gICAgICAgICAgICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7LyogQm90w7NuIHBhcmEgZW52aWFyIGVsIGZvcm11bGFyaW8gY29uIGVsIG1pc21vIGVzdGlsbyBxdWUgeWEgc2UgYXBsaWPDsyBlbiBsYSBww6FnaW5hIHByaW5jaXBhbCBwYXJhIG1hbnRlbmVyIGNvaGVyZW5jaWEgKi99XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlci1ibGFjayB3LWZpdCByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYmctcHVycGxlLTQwMCB0ZXh0LW5vd3JhcCBweC0yMCBzbTpweC02IHB5LTQgdGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBob3Zlcjpib3JkZXItcHVycGxlLTQwMCBob3ZlcjpiZy10cmFuc3BhcmVudCBob3Zlcjp0ZXh0LWJsYWNrLzkwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBFbnZpYXIgbWVuc2FqZVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJIZWFkIiwidXNlU3RhdGUiLCJDb250YWN0IiwibmFtZSIsInNldE5hbWUiLCJwaG9uZSIsInNldFBob25lIiwiZW1haWwiLCJzZXRFbWFpbCIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFsZXJ0IiwiZGl2IiwiY2xhc3NOYW1lIiwidGl0bGUiLCJoMSIsImZvcm0iLCJvblN1Ym1pdCIsImxhYmVsIiwiaHRtbEZvciIsImlucHV0IiwidHlwZSIsImlkIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsInJlcXVpcmVkIiwidGV4dGFyZWEiLCJyb3dzIiwiYnV0dG9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/contacto/page.tsx\n"));

/***/ })

});