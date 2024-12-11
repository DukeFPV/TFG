"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@react-stately+tooltip@3.4.9_react@18.3.1";
exports.ids = ["vendor-chunks/@react-stately+tooltip@3.4.9_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@react-stately+tooltip@3.4.9_react@18.3.1/node_modules/@react-stately/tooltip/dist/useTooltipTriggerState.mjs":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@react-stately+tooltip@3.4.9_react@18.3.1/node_modules/@react-stately/tooltip/dist/useTooltipTriggerState.mjs ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useTooltipTriggerState: () => (/* binding */ $8796f90736e175cb$export$4d40659c25ecb50b)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-stately/overlays */ \"(ssr)/./node_modules/.pnpm/@react-stately+overlays@3.6.12_react@18.3.1/node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs\");\n\n\n\n/*\n * Copyright 2020 Adobe. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */ \n\nconst $8796f90736e175cb$var$TOOLTIP_DELAY = 1500; // this seems to be a 1.5 second delay, check with design\nconst $8796f90736e175cb$var$TOOLTIP_COOLDOWN = 500;\nlet $8796f90736e175cb$var$tooltips = {};\nlet $8796f90736e175cb$var$tooltipId = 0;\nlet $8796f90736e175cb$var$globalWarmedUp = false;\nlet $8796f90736e175cb$var$globalWarmUpTimeout = null;\nlet $8796f90736e175cb$var$globalCooldownTimeout = null;\nfunction $8796f90736e175cb$export$4d40659c25ecb50b(props = {}) {\n    let { delay: delay = $8796f90736e175cb$var$TOOLTIP_DELAY, closeDelay: closeDelay = $8796f90736e175cb$var$TOOLTIP_COOLDOWN } = props;\n    let { isOpen: isOpen, open: open, close: close } = (0, _react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.useOverlayTriggerState)(props);\n    let id = (0, react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>`${++$8796f90736e175cb$var$tooltipId}`, []);\n    let closeTimeout = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n    let ensureTooltipEntry = ()=>{\n        $8796f90736e175cb$var$tooltips[id] = hideTooltip;\n    };\n    let closeOpenTooltips = ()=>{\n        for(let hideTooltipId in $8796f90736e175cb$var$tooltips)if (hideTooltipId !== id) {\n            $8796f90736e175cb$var$tooltips[hideTooltipId](true);\n            delete $8796f90736e175cb$var$tooltips[hideTooltipId];\n        }\n    };\n    let showTooltip = ()=>{\n        clearTimeout(closeTimeout.current);\n        closeTimeout.current = null;\n        closeOpenTooltips();\n        ensureTooltipEntry();\n        $8796f90736e175cb$var$globalWarmedUp = true;\n        open();\n        if ($8796f90736e175cb$var$globalWarmUpTimeout) {\n            clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout);\n            $8796f90736e175cb$var$globalWarmUpTimeout = null;\n        }\n        if ($8796f90736e175cb$var$globalCooldownTimeout) {\n            clearTimeout($8796f90736e175cb$var$globalCooldownTimeout);\n            $8796f90736e175cb$var$globalCooldownTimeout = null;\n        }\n    };\n    let hideTooltip = (immediate)=>{\n        if (immediate || closeDelay <= 0) {\n            clearTimeout(closeTimeout.current);\n            closeTimeout.current = null;\n            close();\n        } else if (!closeTimeout.current) closeTimeout.current = setTimeout(()=>{\n            closeTimeout.current = null;\n            close();\n        }, closeDelay);\n        if ($8796f90736e175cb$var$globalWarmUpTimeout) {\n            clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout);\n            $8796f90736e175cb$var$globalWarmUpTimeout = null;\n        }\n        if ($8796f90736e175cb$var$globalWarmedUp) {\n            if ($8796f90736e175cb$var$globalCooldownTimeout) clearTimeout($8796f90736e175cb$var$globalCooldownTimeout);\n            $8796f90736e175cb$var$globalCooldownTimeout = setTimeout(()=>{\n                delete $8796f90736e175cb$var$tooltips[id];\n                $8796f90736e175cb$var$globalCooldownTimeout = null;\n                $8796f90736e175cb$var$globalWarmedUp = false;\n            }, Math.max($8796f90736e175cb$var$TOOLTIP_COOLDOWN, closeDelay));\n        }\n    };\n    let warmupTooltip = ()=>{\n        closeOpenTooltips();\n        ensureTooltipEntry();\n        if (!isOpen && !$8796f90736e175cb$var$globalWarmUpTimeout && !$8796f90736e175cb$var$globalWarmedUp) $8796f90736e175cb$var$globalWarmUpTimeout = setTimeout(()=>{\n            $8796f90736e175cb$var$globalWarmUpTimeout = null;\n            $8796f90736e175cb$var$globalWarmedUp = true;\n            showTooltip();\n        }, delay);\n        else if (!isOpen) showTooltip();\n    };\n    // eslint-disable-next-line arrow-body-style\n    (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        return ()=>{\n            clearTimeout(closeTimeout.current);\n            let tooltip = $8796f90736e175cb$var$tooltips[id];\n            if (tooltip) delete $8796f90736e175cb$var$tooltips[id];\n        };\n    }, [\n        id\n    ]);\n    return {\n        isOpen: isOpen,\n        open: (immediate)=>{\n            if (!immediate && delay > 0 && !closeTimeout.current) warmupTooltip();\n            else showTooltip();\n        },\n        close: hideTooltip\n    };\n}\n\n\n\n//# sourceMappingURL=useTooltipTriggerState.module.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJlYWN0LXN0YXRlbHkrdG9vbHRpcEAzLjQuOV9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0ByZWFjdC1zdGF0ZWx5L3Rvb2x0aXAvZGlzdC91c2VUb29sdGlwVHJpZ2dlclN0YXRlLm1qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0c7QUFDUjs7QUFFaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdELFVBQVUsc0hBQXNIO0FBQ2hJLFVBQVUsMkNBQTJDLE1BQU0sMkVBQTZCO0FBQ3hGLGlCQUFpQiwwQ0FBYyxTQUFTLGtDQUFrQztBQUMxRSwyQkFBMkIseUNBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNENBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHNkU7QUFDN0UiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL25vZGVfbW9kdWxlcy8ucG5wbS9AcmVhY3Qtc3RhdGVseSt0b29sdGlwQDMuNC45X3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQHJlYWN0LXN0YXRlbHkvdG9vbHRpcC9kaXN0L3VzZVRvb2x0aXBUcmlnZ2VyU3RhdGUubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dXNlTWVtbyBhcyAkNTBjQ1QkdXNlTWVtbywgdXNlUmVmIGFzICQ1MGNDVCR1c2VSZWYsIHVzZUVmZmVjdCBhcyAkNTBjQ1QkdXNlRWZmZWN0fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7dXNlT3ZlcmxheVRyaWdnZXJTdGF0ZSBhcyAkNTBjQ1QkdXNlT3ZlcmxheVRyaWdnZXJTdGF0ZX0gZnJvbSBcIkByZWFjdC1zdGF0ZWx5L292ZXJsYXlzXCI7XG5cbi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBBZG9iZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgZmlsZSBpcyBsaWNlbnNlZCB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyXG4gKiB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBSRVBSRVNFTlRBVElPTlNcbiAqIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZVxuICogZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqLyBcblxuY29uc3QgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJFRPT0xUSVBfREVMQVkgPSAxNTAwOyAvLyB0aGlzIHNlZW1zIHRvIGJlIGEgMS41IHNlY29uZCBkZWxheSwgY2hlY2sgd2l0aCBkZXNpZ25cbmNvbnN0ICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRUT09MVElQX0NPT0xET1dOID0gNTAwO1xubGV0ICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciR0b29sdGlwcyA9IHt9O1xubGV0ICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciR0b29sdGlwSWQgPSAwO1xubGV0ICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtZWRVcCA9IGZhbHNlO1xubGV0ICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtVXBUaW1lb3V0ID0gbnVsbDtcbmxldCAkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsQ29vbGRvd25UaW1lb3V0ID0gbnVsbDtcbmZ1bmN0aW9uICQ4Nzk2ZjkwNzM2ZTE3NWNiJGV4cG9ydCQ0ZDQwNjU5YzI1ZWNiNTBiKHByb3BzID0ge30pIHtcbiAgICBsZXQgeyBkZWxheTogZGVsYXkgPSAkODc5NmY5MDczNmUxNzVjYiR2YXIkVE9PTFRJUF9ERUxBWSwgY2xvc2VEZWxheTogY2xvc2VEZWxheSA9ICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRUT09MVElQX0NPT0xET1dOIH0gPSBwcm9wcztcbiAgICBsZXQgeyBpc09wZW46IGlzT3Blbiwgb3Blbjogb3BlbiwgY2xvc2U6IGNsb3NlIH0gPSAoMCwgJDUwY0NUJHVzZU92ZXJsYXlUcmlnZ2VyU3RhdGUpKHByb3BzKTtcbiAgICBsZXQgaWQgPSAoMCwgJDUwY0NUJHVzZU1lbW8pKCgpPT5gJHsrKyQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciR0b29sdGlwSWR9YCwgW10pO1xuICAgIGxldCBjbG9zZVRpbWVvdXQgPSAoMCwgJDUwY0NUJHVzZVJlZikoKTtcbiAgICBsZXQgZW5zdXJlVG9vbHRpcEVudHJ5ID0gKCk9PntcbiAgICAgICAgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJHRvb2x0aXBzW2lkXSA9IGhpZGVUb29sdGlwO1xuICAgIH07XG4gICAgbGV0IGNsb3NlT3BlblRvb2x0aXBzID0gKCk9PntcbiAgICAgICAgZm9yKGxldCBoaWRlVG9vbHRpcElkIGluICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciR0b29sdGlwcylpZiAoaGlkZVRvb2x0aXBJZCAhPT0gaWQpIHtcbiAgICAgICAgICAgICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciR0b29sdGlwc1toaWRlVG9vbHRpcElkXSh0cnVlKTtcbiAgICAgICAgICAgIGRlbGV0ZSAkODc5NmY5MDczNmUxNzVjYiR2YXIkdG9vbHRpcHNbaGlkZVRvb2x0aXBJZF07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBzaG93VG9vbHRpcCA9ICgpPT57XG4gICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQuY3VycmVudCk7XG4gICAgICAgIGNsb3NlVGltZW91dC5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgY2xvc2VPcGVuVG9vbHRpcHMoKTtcbiAgICAgICAgZW5zdXJlVG9vbHRpcEVudHJ5KCk7XG4gICAgICAgICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtZWRVcCA9IHRydWU7XG4gICAgICAgIG9wZW4oKTtcbiAgICAgICAgaWYgKCQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtVXBUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbFdhcm1VcFRpbWVvdXQpO1xuICAgICAgICAgICAgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbFdhcm1VcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsQ29vbGRvd25UaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbENvb2xkb3duVGltZW91dCk7XG4gICAgICAgICAgICAkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsQ29vbGRvd25UaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IGhpZGVUb29sdGlwID0gKGltbWVkaWF0ZSk9PntcbiAgICAgICAgaWYgKGltbWVkaWF0ZSB8fCBjbG9zZURlbGF5IDw9IDApIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQuY3VycmVudCk7XG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFjbG9zZVRpbWVvdXQuY3VycmVudCkgY2xvc2VUaW1lb3V0LmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9LCBjbG9zZURlbGF5KTtcbiAgICAgICAgaWYgKCQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtVXBUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbFdhcm1VcFRpbWVvdXQpO1xuICAgICAgICAgICAgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbFdhcm1VcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsV2FybWVkVXApIHtcbiAgICAgICAgICAgIGlmICgkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsQ29vbGRvd25UaW1lb3V0KSBjbGVhclRpbWVvdXQoJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbENvb2xkb3duVGltZW91dCk7XG4gICAgICAgICAgICAkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsQ29vbGRvd25UaW1lb3V0ID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIGRlbGV0ZSAkODc5NmY5MDczNmUxNzVjYiR2YXIkdG9vbHRpcHNbaWRdO1xuICAgICAgICAgICAgICAgICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxDb29sZG93blRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtZWRVcCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgTWF0aC5tYXgoJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJFRPT0xUSVBfQ09PTERPV04sIGNsb3NlRGVsYXkpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IHdhcm11cFRvb2x0aXAgPSAoKT0+e1xuICAgICAgICBjbG9zZU9wZW5Ub29sdGlwcygpO1xuICAgICAgICBlbnN1cmVUb29sdGlwRW50cnkoKTtcbiAgICAgICAgaWYgKCFpc09wZW4gJiYgISQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtVXBUaW1lb3V0ICYmICEkODc5NmY5MDczNmUxNzVjYiR2YXIkZ2xvYmFsV2FybWVkVXApICQ4Nzk2ZjkwNzM2ZTE3NWNiJHZhciRnbG9iYWxXYXJtVXBUaW1lb3V0ID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbFdhcm1VcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJGdsb2JhbFdhcm1lZFVwID0gdHJ1ZTtcbiAgICAgICAgICAgIHNob3dUb29sdGlwKCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgZWxzZSBpZiAoIWlzT3Blbikgc2hvd1Rvb2x0aXAoKTtcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJvdy1ib2R5LXN0eWxlXG4gICAgKDAsICQ1MGNDVCR1c2VFZmZlY3QpKCgpPT57XG4gICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dC5jdXJyZW50KTtcbiAgICAgICAgICAgIGxldCB0b29sdGlwID0gJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJHRvb2x0aXBzW2lkXTtcbiAgICAgICAgICAgIGlmICh0b29sdGlwKSBkZWxldGUgJDg3OTZmOTA3MzZlMTc1Y2IkdmFyJHRvb2x0aXBzW2lkXTtcbiAgICAgICAgfTtcbiAgICB9LCBbXG4gICAgICAgIGlkXG4gICAgXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNPcGVuOiBpc09wZW4sXG4gICAgICAgIG9wZW46IChpbW1lZGlhdGUpPT57XG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSAmJiBkZWxheSA+IDAgJiYgIWNsb3NlVGltZW91dC5jdXJyZW50KSB3YXJtdXBUb29sdGlwKCk7XG4gICAgICAgICAgICBlbHNlIHNob3dUb29sdGlwKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlOiBoaWRlVG9vbHRpcFxuICAgIH07XG59XG5cblxuZXhwb3J0IHskODc5NmY5MDczNmUxNzVjYiRleHBvcnQkNGQ0MDY1OWMyNWVjYjUwYiBhcyB1c2VUb29sdGlwVHJpZ2dlclN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZVRvb2x0aXBUcmlnZ2VyU3RhdGUubW9kdWxlLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@react-stately+tooltip@3.4.9_react@18.3.1/node_modules/@react-stately/tooltip/dist/useTooltipTriggerState.mjs\n");

/***/ })

};
;