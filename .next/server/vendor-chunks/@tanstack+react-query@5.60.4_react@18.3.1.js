"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@tanstack+react-query@5.60.4_react@18.3.1";
exports.ids = ["vendor-chunks/@tanstack+react-query@5.60.4_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QueryClientContext: () => (/* binding */ QueryClientContext),\n/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),\n/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js\");\n/* __next_internal_client_entry_do_not_use__ QueryClientContext,QueryClientProvider,useQueryClient auto */ // src/QueryClientProvider.tsx\n\n\nvar QueryClientContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);\nvar useQueryClient = (queryClient)=>{\n    const client = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientContext);\n    if (queryClient) {\n        return queryClient;\n    }\n    if (!client) {\n        throw new Error(\"No QueryClient set, use QueryClientProvider to set one\");\n    }\n    return client;\n};\nvar QueryClientProvider = ({ client, children })=>{\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect({\n        \"QueryClientProvider.useEffect\": ()=>{\n            client.mount();\n            return ({\n                \"QueryClientProvider.useEffect\": ()=>{\n                    client.unmount();\n                }\n            })[\"QueryClientProvider.useEffect\"];\n        }\n    }[\"QueryClientProvider.useEffect\"], [\n        client\n    ]);\n    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryClientContext.Provider, {\n        value: client,\n        children\n    });\n};\n //# sourceMappingURL=QueryClientProvider.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHRhbnN0YWNrK3JlYWN0LXF1ZXJ5QDUuNjAuNF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9yZWFjdC1xdWVyeS9idWlsZC9tb2Rlcm4vUXVlcnlDbGllbnRQcm92aWRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDdUI7QUF1Q25CO0FBbkNHLElBQU0sbUNBQTJCLGlEQUN0QztBQUdLLElBQU0saUJBQWlCLENBQUM7SUFDN0IsTUFBTSxTQUFlLDhDQUFXLGtCQUFrQjtJQUVsRCxJQUFJLGFBQWE7UUFDZixPQUFPO0lBQ1Q7SUFFQSxJQUFJLENBQUMsUUFBUTtRQUNYLE1BQU0sSUFBSSxNQUFNLHdEQUF3RDtJQUMxRTtJQUVBLE9BQU87QUFDVDtBQU9PLElBQU0sc0JBQXNCLENBQUMsRUFDbEMsUUFDQSxVQUNGO0lBQ1E7eUNBQVU7WUFDZCxPQUFPLE1BQU07WUFDYjtpREFBTztvQkFDTCxPQUFPLFFBQVE7Z0JBQ2pCOztRQUNGO3dDQUFHO1FBQUMsTUFBTTtLQUFDO0lBRVgsT0FDRSx1RUFBQyxtQkFBbUIsVUFBbkI7UUFBNEIsT0FBTztRQUNqQztJQUFBLENBQ0g7QUFFSiIsInNvdXJjZXMiOlsiL1VzZXJzL2Nhcmxvcy9EZXNrdG9wL3NyYy9RdWVyeUNsaWVudFByb3ZpZGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3F1ZXJ5LWNvcmUnXG5cbmV4cG9ydCBjb25zdCBRdWVyeUNsaWVudENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0PFF1ZXJ5Q2xpZW50IHwgdW5kZWZpbmVkPihcbiAgdW5kZWZpbmVkLFxuKVxuXG5leHBvcnQgY29uc3QgdXNlUXVlcnlDbGllbnQgPSAocXVlcnlDbGllbnQ/OiBRdWVyeUNsaWVudCkgPT4ge1xuICBjb25zdCBjbGllbnQgPSBSZWFjdC51c2VDb250ZXh0KFF1ZXJ5Q2xpZW50Q29udGV4dClcblxuICBpZiAocXVlcnlDbGllbnQpIHtcbiAgICByZXR1cm4gcXVlcnlDbGllbnRcbiAgfVxuXG4gIGlmICghY2xpZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBRdWVyeUNsaWVudCBzZXQsIHVzZSBRdWVyeUNsaWVudFByb3ZpZGVyIHRvIHNldCBvbmUnKVxuICB9XG5cbiAgcmV0dXJuIGNsaWVudFxufVxuXG5leHBvcnQgdHlwZSBRdWVyeUNsaWVudFByb3ZpZGVyUHJvcHMgPSB7XG4gIGNsaWVudDogUXVlcnlDbGllbnRcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGVcbn1cblxuZXhwb3J0IGNvbnN0IFF1ZXJ5Q2xpZW50UHJvdmlkZXIgPSAoe1xuICBjbGllbnQsXG4gIGNoaWxkcmVuLFxufTogUXVlcnlDbGllbnRQcm92aWRlclByb3BzKTogUmVhY3QuSlNYLkVsZW1lbnQgPT4ge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNsaWVudC5tb3VudCgpXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsaWVudC51bm1vdW50KClcbiAgICB9XG4gIH0sIFtjbGllbnRdKVxuXG4gIHJldHVybiAoXG4gICAgPFF1ZXJ5Q2xpZW50Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17Y2xpZW50fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1F1ZXJ5Q2xpZW50Q29udGV4dC5Qcm92aWRlcj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useMutation.js":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useMutation.js ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useMutation: () => (/* binding */ useMutation)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/query-core */ \"(ssr)/./node_modules/.pnpm/@tanstack+query-core@5.59.20/node_modules/@tanstack/query-core/build/modern/mutationObserver.js\");\n/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/query-core */ \"(ssr)/./node_modules/.pnpm/@tanstack+query-core@5.59.20/node_modules/@tanstack/query-core/build/modern/notifyManager.js\");\n/* harmony import */ var _QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider.js */ \"(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/utils.js\");\n/* __next_internal_client_entry_do_not_use__ useMutation auto */ // src/useMutation.ts\n\n\n\n\nfunction useMutation(options, queryClient) {\n    const client = (0,_QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)(queryClient);\n    const [observer] = react__WEBPACK_IMPORTED_MODULE_0__.useState({\n        \"useMutation.useState\": ()=>new _tanstack_query_core__WEBPACK_IMPORTED_MODULE_2__.MutationObserver(client, options)\n    }[\"useMutation.useState\"]);\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect({\n        \"useMutation.useEffect\": ()=>{\n            observer.setOptions(options);\n        }\n    }[\"useMutation.useEffect\"], [\n        observer,\n        options\n    ]);\n    const result = react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(react__WEBPACK_IMPORTED_MODULE_0__.useCallback({\n        \"useMutation.useSyncExternalStore[result]\": (onStoreChange)=>observer.subscribe(_tanstack_query_core__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(onStoreChange))\n    }[\"useMutation.useSyncExternalStore[result]\"], [\n        observer\n    ]), {\n        \"useMutation.useSyncExternalStore[result]\": ()=>observer.getCurrentResult()\n    }[\"useMutation.useSyncExternalStore[result]\"], {\n        \"useMutation.useSyncExternalStore[result]\": ()=>observer.getCurrentResult()\n    }[\"useMutation.useSyncExternalStore[result]\"]);\n    const mutate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback({\n        \"useMutation.useCallback[mutate]\": (variables, mutateOptions)=>{\n            observer.mutate(variables, mutateOptions).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);\n        }\n    }[\"useMutation.useCallback[mutate]\"], [\n        observer\n    ]);\n    if (result.error && (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.shouldThrowError)(observer.options.throwOnError, [\n        result.error\n    ])) {\n        throw result.error;\n    }\n    return {\n        ...result,\n        mutate,\n        mutateAsync: result.mutate\n    };\n}\n //# sourceMappingURL=useMutation.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHRhbnN0YWNrK3JlYWN0LXF1ZXJ5QDUuNjAuNF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9yZWFjdC1xdWVyeS9idWlsZC9tb2Rlcm4vdXNlTXV0YXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUN1QjtBQUN5QjtBQUNqQjtBQUNRO0FBVWhDLFNBQVMsWUFNZCxTQUNBLGFBQ3dEO0lBQ3hELE1BQU0sU0FBUyx1RUFBYyxDQUFDLFdBQVc7SUFFekMsTUFBTSxDQUFDLFFBQVEsSUFBVTtnQ0FDdkIsSUFDRSxJQUFJLGtFQUFnQixDQUNsQixRQUNBOztJQUlBO2lDQUFVO1lBQ2QsU0FBUyxXQUFXLE9BQU87UUFDN0I7Z0NBQUc7UUFBQztRQUFVLE9BQU87S0FBQztJQUV0QixNQUFNLFNBQWUsd0RBQ2I7b0RBQ0osQ0FBQyxnQkFDQyxTQUFTLFVBQVUsK0RBQWEsQ0FBQyxXQUFXLGFBQWEsQ0FBQzttREFDNUQ7UUFBQyxRQUFRO0tBQUE7b0RBRVgsSUFBTSxTQUFTLGlCQUFpQjs7b0RBQ2hDLElBQU0sU0FBUyxpQkFBaUI7O0lBR2xDLE1BQU0sU0FBZTsyQ0FHbkIsQ0FBQyxXQUFXO1lBQ1YsU0FBUyxPQUFPLFdBQVcsYUFBYSxFQUFFLE1BQU0sMkNBQUk7UUFDdEQ7MENBQ0E7UUFBQyxRQUFRO0tBQUE7SUFHWCxJQUNFLE9BQU8sU0FDUCwyREFBZ0IsQ0FBQyxTQUFTLFFBQVEsY0FBYztRQUFDLE9BQU8sS0FBSztLQUFDLEdBQzlEO1FBQ0EsTUFBTSxPQUFPO0lBQ2Y7SUFFQSxPQUFPO1FBQUUsR0FBRztRQUFRO1FBQVEsYUFBYSxPQUFPO0lBQU87QUFDekQiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9zcmMvdXNlTXV0YXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE11dGF0aW9uT2JzZXJ2ZXIsIG5vdGlmeU1hbmFnZXIgfSBmcm9tICdAdGFuc3RhY2svcXVlcnktY29yZSdcbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi9RdWVyeUNsaWVudFByb3ZpZGVyJ1xuaW1wb3J0IHsgbm9vcCwgc2hvdWxkVGhyb3dFcnJvciB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7XG4gIFVzZU11dGF0ZUZ1bmN0aW9uLFxuICBVc2VNdXRhdGlvbk9wdGlvbnMsXG4gIFVzZU11dGF0aW9uUmVzdWx0LFxufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0RXJyb3IsIFF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3F1ZXJ5LWNvcmUnXG5cbi8vIEhPT0tcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU11dGF0aW9uPFxuICBURGF0YSA9IHVua25vd24sXG4gIFRFcnJvciA9IERlZmF1bHRFcnJvcixcbiAgVFZhcmlhYmxlcyA9IHZvaWQsXG4gIFRDb250ZXh0ID0gdW5rbm93bixcbj4oXG4gIG9wdGlvbnM6IFVzZU11dGF0aW9uT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4gIHF1ZXJ5Q2xpZW50PzogUXVlcnlDbGllbnQsXG4pOiBVc2VNdXRhdGlvblJlc3VsdDxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4ge1xuICBjb25zdCBjbGllbnQgPSB1c2VRdWVyeUNsaWVudChxdWVyeUNsaWVudClcblxuICBjb25zdCBbb2JzZXJ2ZXJdID0gUmVhY3QudXNlU3RhdGUoXG4gICAgKCkgPT5cbiAgICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PihcbiAgICAgICAgY2xpZW50LFxuICAgICAgICBvcHRpb25zLFxuICAgICAgKSxcbiAgKVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb2JzZXJ2ZXIuc2V0T3B0aW9ucyhvcHRpb25zKVxuICB9LCBbb2JzZXJ2ZXIsIG9wdGlvbnNdKVxuXG4gIGNvbnN0IHJlc3VsdCA9IFJlYWN0LnVzZVN5bmNFeHRlcm5hbFN0b3JlKFxuICAgIFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICAgKG9uU3RvcmVDaGFuZ2UpID0+XG4gICAgICAgIG9ic2VydmVyLnN1YnNjcmliZShub3RpZnlNYW5hZ2VyLmJhdGNoQ2FsbHMob25TdG9yZUNoYW5nZSkpLFxuICAgICAgW29ic2VydmVyXSxcbiAgICApLFxuICAgICgpID0+IG9ic2VydmVyLmdldEN1cnJlbnRSZXN1bHQoKSxcbiAgICAoKSA9PiBvYnNlcnZlci5nZXRDdXJyZW50UmVzdWx0KCksXG4gIClcblxuICBjb25zdCBtdXRhdGUgPSBSZWFjdC51c2VDYWxsYmFjazxcbiAgICBVc2VNdXRhdGVGdW5jdGlvbjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cbiAgPihcbiAgICAodmFyaWFibGVzLCBtdXRhdGVPcHRpb25zKSA9PiB7XG4gICAgICBvYnNlcnZlci5tdXRhdGUodmFyaWFibGVzLCBtdXRhdGVPcHRpb25zKS5jYXRjaChub29wKVxuICAgIH0sXG4gICAgW29ic2VydmVyXSxcbiAgKVxuXG4gIGlmIChcbiAgICByZXN1bHQuZXJyb3IgJiZcbiAgICBzaG91bGRUaHJvd0Vycm9yKG9ic2VydmVyLm9wdGlvbnMudGhyb3dPbkVycm9yLCBbcmVzdWx0LmVycm9yXSlcbiAgKSB7XG4gICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gIH1cblxuICByZXR1cm4geyAuLi5yZXN1bHQsIG11dGF0ZSwgbXV0YXRlQXN5bmM6IHJlc3VsdC5tdXRhdGUgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useMutation.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/utils.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/utils.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   noop: () => (/* binding */ noop),\n/* harmony export */   shouldThrowError: () => (/* binding */ shouldThrowError)\n/* harmony export */ });\n// src/utils.ts\nfunction shouldThrowError(throwError, params) {\n  if (typeof throwError === \"function\") {\n    return throwError(...params);\n  }\n  return !!throwError;\n}\nfunction noop() {\n}\n\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHRhbnN0YWNrK3JlYWN0LXF1ZXJ5QDUuNjAuNF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9yZWFjdC1xdWVyeS9idWlsZC9tb2Rlcm4vdXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvY2FybG9zL0Rlc2t0b3AvVEZHL1RGRy9ub2RlX21vZHVsZXMvLnBucG0vQHRhbnN0YWNrK3JlYWN0LXF1ZXJ5QDUuNjAuNF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9yZWFjdC1xdWVyeS9idWlsZC9tb2Rlcm4vdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL3V0aWxzLnRzXG5mdW5jdGlvbiBzaG91bGRUaHJvd0Vycm9yKHRocm93RXJyb3IsIHBhcmFtcykge1xuICBpZiAodHlwZW9mIHRocm93RXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB0aHJvd0Vycm9yKC4uLnBhcmFtcyk7XG4gIH1cbiAgcmV0dXJuICEhdGhyb3dFcnJvcjtcbn1cbmZ1bmN0aW9uIG5vb3AoKSB7XG59XG5leHBvcnQge1xuICBub29wLFxuICBzaG91bGRUaHJvd0Vycm9yXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.60.4_react@18.3.1/node_modules/@tanstack/react-query/build/modern/utils.js\n");

/***/ })

};
;