"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@react-stately+utils@3.10.1_react@18.3.1";
exports.ids = ["vendor-chunks/@react-stately+utils@3.10.1_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@react-stately+utils@3.10.1_react@18.3.1/node_modules/@react-stately/utils/dist/useControlledState.mjs":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@react-stately+utils@3.10.1_react@18.3.1/node_modules/@react-stately/utils/dist/useControlledState.mjs ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useControlledState: () => (/* binding */ $458b0a5536c1a7cf$export$40bfa8c7b0832715)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n\n\n/*\n * Copyright 2020 Adobe. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */ \nfunction $458b0a5536c1a7cf$export$40bfa8c7b0832715(value, defaultValue, onChange) {\n    let [stateValue, setStateValue] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(value || defaultValue);\n    let isControlledRef = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value !== undefined);\n    let isControlled = value !== undefined;\n    (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        let wasControlled = isControlledRef.current;\n        if (wasControlled !== isControlled) console.warn(`WARN: A component changed from ${wasControlled ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}.`);\n        isControlledRef.current = isControlled;\n    }, [\n        isControlled\n    ]);\n    let currentValue = isControlled ? value : stateValue;\n    let setValue = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((value, ...args)=>{\n        let onChangeCaller = (value, ...onChangeArgs)=>{\n            if (onChange) {\n                if (!Object.is(currentValue, value)) onChange(value, ...onChangeArgs);\n            }\n            if (!isControlled) // If uncontrolled, mutate the currentValue local variable so that\n            // calling setState multiple times with the same value only emits onChange once.\n            // We do not use a ref for this because we specifically _do_ want the value to\n            // reset every render, and assigning to a ref in render breaks aborted suspended renders.\n            // eslint-disable-next-line react-hooks/exhaustive-deps\n            currentValue = value;\n        };\n        if (typeof value === 'function') {\n            console.warn('We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320');\n            // this supports functional updates https://reactjs.org/docs/hooks-reference.html#functional-updates\n            // when someone using useControlledState calls setControlledState(myFunc)\n            // this will call our useState setState with a function as well which invokes myFunc and calls onChange with the value from myFunc\n            // if we're in an uncontrolled state, then we also return the value of myFunc which to setState looks as though it was just called with myFunc from the beginning\n            // otherwise we just return the controlled value, which won't cause a rerender because React knows to bail out when the value is the same\n            let updateFunction = (oldValue, ...functionArgs)=>{\n                let interceptedValue = value(isControlled ? currentValue : oldValue, ...functionArgs);\n                onChangeCaller(interceptedValue, ...args);\n                if (!isControlled) return interceptedValue;\n                return oldValue;\n            };\n            setStateValue(updateFunction);\n        } else {\n            if (!isControlled) setStateValue(value);\n            onChangeCaller(value, ...args);\n        }\n    }, [\n        isControlled,\n        currentValue,\n        onChange\n    ]);\n    return [\n        currentValue,\n        setValue\n    ];\n}\n\n\n\n//# sourceMappingURL=useControlledState.module.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJlYWN0LXN0YXRlbHkrdXRpbHNAMy4xMC4xX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQHJlYWN0LXN0YXRlbHkvdXRpbHMvZGlzdC91c2VDb250cm9sbGVkU3RhdGUubWpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTZJOztBQUU3STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsMkNBQWU7QUFDekQsOEJBQThCLHlDQUFhO0FBQzNDO0FBQ0EsUUFBUSw0Q0FBZ0I7QUFDeEI7QUFDQSwyRkFBMkYsK0NBQStDLEtBQUssNkNBQTZDO0FBQzVMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw4Q0FBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR3lFO0FBQ3pFIiwic291cmNlcyI6WyIvVXNlcnMvY2FybG9zL0Rlc2t0b3AvVEZHL1RGRy9ub2RlX21vZHVsZXMvLnBucG0vQHJlYWN0LXN0YXRlbHkrdXRpbHNAMy4xMC4xX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQHJlYWN0LXN0YXRlbHkvdXRpbHMvZGlzdC91c2VDb250cm9sbGVkU3RhdGUubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dXNlU3RhdGUgYXMgJDN3aHRNJHVzZVN0YXRlLCB1c2VSZWYgYXMgJDN3aHRNJHVzZVJlZiwgdXNlRWZmZWN0IGFzICQzd2h0TSR1c2VFZmZlY3QsIHVzZUNhbGxiYWNrIGFzICQzd2h0TSR1c2VDYWxsYmFja30gZnJvbSBcInJlYWN0XCI7XG5cbi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBBZG9iZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgZmlsZSBpcyBsaWNlbnNlZCB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyXG4gKiB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBSRVBSRVNFTlRBVElPTlNcbiAqIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZVxuICogZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqLyBcbmZ1bmN0aW9uICQ0NThiMGE1NTM2YzFhN2NmJGV4cG9ydCQ0MGJmYThjN2IwODMyNzE1KHZhbHVlLCBkZWZhdWx0VmFsdWUsIG9uQ2hhbmdlKSB7XG4gICAgbGV0IFtzdGF0ZVZhbHVlLCBzZXRTdGF0ZVZhbHVlXSA9ICgwLCAkM3dodE0kdXNlU3RhdGUpKHZhbHVlIHx8IGRlZmF1bHRWYWx1ZSk7XG4gICAgbGV0IGlzQ29udHJvbGxlZFJlZiA9ICgwLCAkM3dodE0kdXNlUmVmKSh2YWx1ZSAhPT0gdW5kZWZpbmVkKTtcbiAgICBsZXQgaXNDb250cm9sbGVkID0gdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICAoMCwgJDN3aHRNJHVzZUVmZmVjdCkoKCk9PntcbiAgICAgICAgbGV0IHdhc0NvbnRyb2xsZWQgPSBpc0NvbnRyb2xsZWRSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKHdhc0NvbnRyb2xsZWQgIT09IGlzQ29udHJvbGxlZCkgY29uc29sZS53YXJuKGBXQVJOOiBBIGNvbXBvbmVudCBjaGFuZ2VkIGZyb20gJHt3YXNDb250cm9sbGVkID8gJ2NvbnRyb2xsZWQnIDogJ3VuY29udHJvbGxlZCd9IHRvICR7aXNDb250cm9sbGVkID8gJ2NvbnRyb2xsZWQnIDogJ3VuY29udHJvbGxlZCd9LmApO1xuICAgICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbXG4gICAgICAgIGlzQ29udHJvbGxlZFxuICAgIF0pO1xuICAgIGxldCBjdXJyZW50VmFsdWUgPSBpc0NvbnRyb2xsZWQgPyB2YWx1ZSA6IHN0YXRlVmFsdWU7XG4gICAgbGV0IHNldFZhbHVlID0gKDAsICQzd2h0TSR1c2VDYWxsYmFjaykoKHZhbHVlLCAuLi5hcmdzKT0+e1xuICAgICAgICBsZXQgb25DaGFuZ2VDYWxsZXIgPSAodmFsdWUsIC4uLm9uQ2hhbmdlQXJncyk9PntcbiAgICAgICAgICAgIGlmIChvbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LmlzKGN1cnJlbnRWYWx1ZSwgdmFsdWUpKSBvbkNoYW5nZSh2YWx1ZSwgLi4ub25DaGFuZ2VBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNDb250cm9sbGVkKSAvLyBJZiB1bmNvbnRyb2xsZWQsIG11dGF0ZSB0aGUgY3VycmVudFZhbHVlIGxvY2FsIHZhcmlhYmxlIHNvIHRoYXRcbiAgICAgICAgICAgIC8vIGNhbGxpbmcgc2V0U3RhdGUgbXVsdGlwbGUgdGltZXMgd2l0aCB0aGUgc2FtZSB2YWx1ZSBvbmx5IGVtaXRzIG9uQ2hhbmdlIG9uY2UuXG4gICAgICAgICAgICAvLyBXZSBkbyBub3QgdXNlIGEgcmVmIGZvciB0aGlzIGJlY2F1c2Ugd2Ugc3BlY2lmaWNhbGx5IF9kb18gd2FudCB0aGUgdmFsdWUgdG9cbiAgICAgICAgICAgIC8vIHJlc2V0IGV2ZXJ5IHJlbmRlciwgYW5kIGFzc2lnbmluZyB0byBhIHJlZiBpbiByZW5kZXIgYnJlYWtzIGFib3J0ZWQgc3VzcGVuZGVkIHJlbmRlcnMuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdXZSBjYW4gbm90IHN1cHBvcnQgYSBmdW5jdGlvbiBjYWxsYmFjay4gU2VlIEdpdGh1YiBJc3N1ZXMgZm9yIGRldGFpbHMgaHR0cHM6Ly9naXRodWIuY29tL2Fkb2JlL3JlYWN0LXNwZWN0cnVtL2lzc3Vlcy8yMzIwJyk7XG4gICAgICAgICAgICAvLyB0aGlzIHN1cHBvcnRzIGZ1bmN0aW9uYWwgdXBkYXRlcyBodHRwczovL3JlYWN0anMub3JnL2RvY3MvaG9va3MtcmVmZXJlbmNlLmh0bWwjZnVuY3Rpb25hbC11cGRhdGVzXG4gICAgICAgICAgICAvLyB3aGVuIHNvbWVvbmUgdXNpbmcgdXNlQ29udHJvbGxlZFN0YXRlIGNhbGxzIHNldENvbnRyb2xsZWRTdGF0ZShteUZ1bmMpXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgY2FsbCBvdXIgdXNlU3RhdGUgc2V0U3RhdGUgd2l0aCBhIGZ1bmN0aW9uIGFzIHdlbGwgd2hpY2ggaW52b2tlcyBteUZ1bmMgYW5kIGNhbGxzIG9uQ2hhbmdlIHdpdGggdGhlIHZhbHVlIGZyb20gbXlGdW5jXG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBpbiBhbiB1bmNvbnRyb2xsZWQgc3RhdGUsIHRoZW4gd2UgYWxzbyByZXR1cm4gdGhlIHZhbHVlIG9mIG15RnVuYyB3aGljaCB0byBzZXRTdGF0ZSBsb29rcyBhcyB0aG91Z2ggaXQgd2FzIGp1c3QgY2FsbGVkIHdpdGggbXlGdW5jIGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIGp1c3QgcmV0dXJuIHRoZSBjb250cm9sbGVkIHZhbHVlLCB3aGljaCB3b24ndCBjYXVzZSBhIHJlcmVuZGVyIGJlY2F1c2UgUmVhY3Qga25vd3MgdG8gYmFpbCBvdXQgd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWVcbiAgICAgICAgICAgIGxldCB1cGRhdGVGdW5jdGlvbiA9IChvbGRWYWx1ZSwgLi4uZnVuY3Rpb25BcmdzKT0+e1xuICAgICAgICAgICAgICAgIGxldCBpbnRlcmNlcHRlZFZhbHVlID0gdmFsdWUoaXNDb250cm9sbGVkID8gY3VycmVudFZhbHVlIDogb2xkVmFsdWUsIC4uLmZ1bmN0aW9uQXJncyk7XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VDYWxsZXIoaW50ZXJjZXB0ZWRWYWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0NvbnRyb2xsZWQpIHJldHVybiBpbnRlcmNlcHRlZFZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGRWYWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXRTdGF0ZVZhbHVlKHVwZGF0ZUZ1bmN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaXNDb250cm9sbGVkKSBzZXRTdGF0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlQ2FsbGVyKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgaXNDb250cm9sbGVkLFxuICAgICAgICBjdXJyZW50VmFsdWUsXG4gICAgICAgIG9uQ2hhbmdlXG4gICAgXSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY3VycmVudFZhbHVlLFxuICAgICAgICBzZXRWYWx1ZVxuICAgIF07XG59XG5cblxuZXhwb3J0IHskNDU4YjBhNTUzNmMxYTdjZiRleHBvcnQkNDBiZmE4YzdiMDgzMjcxNSBhcyB1c2VDb250cm9sbGVkU3RhdGV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlQ29udHJvbGxlZFN0YXRlLm1vZHVsZS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@react-stately+utils@3.10.1_react@18.3.1/node_modules/@react-stately/utils/dist/useControlledState.mjs\n");

/***/ })

};
;