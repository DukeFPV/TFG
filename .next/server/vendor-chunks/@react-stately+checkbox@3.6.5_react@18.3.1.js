"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@react-stately+checkbox@3.6.5_react@18.3.1";
exports.ids = ["vendor-chunks/@react-stately+checkbox@3.6.5_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@react-stately+checkbox@3.6.5_react@18.3.1/node_modules/@react-stately/checkbox/dist/useCheckboxGroupState.mjs":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@react-stately+checkbox@3.6.5_react@18.3.1/node_modules/@react-stately/checkbox/dist/useCheckboxGroupState.mjs ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCheckboxGroupState: () => (/* binding */ $587d3ad58be6d31f$export$daff6da51032a415)\n/* harmony export */ });\n/* harmony import */ var _react_stately_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-stately/form */ \"(ssr)/./node_modules/.pnpm/@react-stately+form@3.1.0_react@18.3.1/node_modules/@react-stately/form/dist/useFormValidationState.mjs\");\n/* harmony import */ var _react_stately_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-stately/utils */ \"(ssr)/./node_modules/.pnpm/@react-stately+utils@3.10.5_react@18.3.1/node_modules/@react-stately/utils/dist/useControlledState.mjs\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.0.3_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n\n\n\n\n/*\n * Copyright 2020 Adobe. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */ \n\n\nfunction $587d3ad58be6d31f$export$daff6da51032a415(props = {}) {\n    let [selectedValues, setValue] = (0, _react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.useControlledState)(props.value, props.defaultValue || [], props.onChange);\n    let isRequired = !!props.isRequired && selectedValues.length === 0;\n    let invalidValues = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map());\n    let validation = (0, _react_stately_form__WEBPACK_IMPORTED_MODULE_2__.useFormValidationState)({\n        ...props,\n        value: selectedValues\n    });\n    let isInvalid = validation.displayValidation.isInvalid;\n    var _props_validationState;\n    const state = {\n        ...validation,\n        value: selectedValues,\n        setValue (value) {\n            if (props.isReadOnly || props.isDisabled) return;\n            setValue(value);\n        },\n        isDisabled: props.isDisabled || false,\n        isReadOnly: props.isReadOnly || false,\n        isSelected (value) {\n            return selectedValues.includes(value);\n        },\n        addValue (value) {\n            if (props.isReadOnly || props.isDisabled) return;\n            if (!selectedValues.includes(value)) setValue(selectedValues.concat(value));\n        },\n        removeValue (value) {\n            if (props.isReadOnly || props.isDisabled) return;\n            if (selectedValues.includes(value)) setValue(selectedValues.filter((existingValue)=>existingValue !== value));\n        },\n        toggleValue (value) {\n            if (props.isReadOnly || props.isDisabled) return;\n            if (selectedValues.includes(value)) setValue(selectedValues.filter((existingValue)=>existingValue !== value));\n            else setValue(selectedValues.concat(value));\n        },\n        setInvalid (value, v) {\n            let s = new Map(invalidValues.current);\n            if (v.isInvalid) s.set(value, v);\n            else s.delete(value);\n            invalidValues.current = s;\n            validation.updateValidation((0, _react_stately_form__WEBPACK_IMPORTED_MODULE_2__.mergeValidation)(...s.values()));\n        },\n        validationState: (_props_validationState = props.validationState) !== null && _props_validationState !== void 0 ? _props_validationState : isInvalid ? 'invalid' : null,\n        isInvalid: isInvalid,\n        isRequired: isRequired\n    };\n    return state;\n}\n\n\n\n//# sourceMappingURL=useCheckboxGroupState.module.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJlYWN0LXN0YXRlbHkrY2hlY2tib3hAMy42LjVfcmVhY3RAMTguMy4xL25vZGVfbW9kdWxlcy9AcmVhY3Qtc3RhdGVseS9jaGVja2JveC9kaXN0L3VzZUNoZWNrYm94R3JvdXBTdGF0ZS5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF1STtBQUNsRDtBQUN2Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsNkRBQTZEO0FBQzdELHlDQUF5QyxvRUFBeUI7QUFDbEU7QUFDQSw0QkFBNEIseUNBQWE7QUFDekMseUJBQXlCLHVFQUE2QjtBQUN0RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGdFQUFzQjtBQUNsRSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHNEU7QUFDNUUiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9URkcvVEZHL25vZGVfbW9kdWxlcy8ucG5wbS9AcmVhY3Qtc3RhdGVseStjaGVja2JveEAzLjYuNV9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0ByZWFjdC1zdGF0ZWx5L2NoZWNrYm94L2Rpc3QvdXNlQ2hlY2tib3hHcm91cFN0YXRlLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VzZUZvcm1WYWxpZGF0aW9uU3RhdGUgYXMgJDNPZjRBJHVzZUZvcm1WYWxpZGF0aW9uU3RhdGUsIG1lcmdlVmFsaWRhdGlvbiBhcyAkM09mNEEkbWVyZ2VWYWxpZGF0aW9ufSBmcm9tIFwiQHJlYWN0LXN0YXRlbHkvZm9ybVwiO1xuaW1wb3J0IHt1c2VDb250cm9sbGVkU3RhdGUgYXMgJDNPZjRBJHVzZUNvbnRyb2xsZWRTdGF0ZX0gZnJvbSBcIkByZWFjdC1zdGF0ZWx5L3V0aWxzXCI7XG5pbXBvcnQge3VzZVJlZiBhcyAkM09mNEEkdXNlUmVmfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIENvcHlyaWdodCAyMDIwIEFkb2JlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBmaWxlIGlzIGxpY2Vuc2VkIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXJcbiAqIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIFJFUFJFU0VOVEFUSU9OU1xuICogT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlXG4gKiBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovIFxuXG5cbmZ1bmN0aW9uICQ1ODdkM2FkNThiZTZkMzFmJGV4cG9ydCRkYWZmNmRhNTEwMzJhNDE1KHByb3BzID0ge30pIHtcbiAgICBsZXQgW3NlbGVjdGVkVmFsdWVzLCBzZXRWYWx1ZV0gPSAoMCwgJDNPZjRBJHVzZUNvbnRyb2xsZWRTdGF0ZSkocHJvcHMudmFsdWUsIHByb3BzLmRlZmF1bHRWYWx1ZSB8fCBbXSwgcHJvcHMub25DaGFuZ2UpO1xuICAgIGxldCBpc1JlcXVpcmVkID0gISFwcm9wcy5pc1JlcXVpcmVkICYmIHNlbGVjdGVkVmFsdWVzLmxlbmd0aCA9PT0gMDtcbiAgICBsZXQgaW52YWxpZFZhbHVlcyA9ICgwLCAkM09mNEEkdXNlUmVmKShuZXcgTWFwKCkpO1xuICAgIGxldCB2YWxpZGF0aW9uID0gKDAsICQzT2Y0QSR1c2VGb3JtVmFsaWRhdGlvblN0YXRlKSh7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICB2YWx1ZTogc2VsZWN0ZWRWYWx1ZXNcbiAgICB9KTtcbiAgICBsZXQgaXNJbnZhbGlkID0gdmFsaWRhdGlvbi5kaXNwbGF5VmFsaWRhdGlvbi5pc0ludmFsaWQ7XG4gICAgdmFyIF9wcm9wc192YWxpZGF0aW9uU3RhdGU7XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLnZhbGlkYXRpb24sXG4gICAgICAgIHZhbHVlOiBzZWxlY3RlZFZhbHVlcyxcbiAgICAgICAgc2V0VmFsdWUgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMuaXNSZWFkT25seSB8fCBwcm9wcy5pc0Rpc2FibGVkKSByZXR1cm47XG4gICAgICAgICAgICBzZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRGlzYWJsZWQ6IHByb3BzLmlzRGlzYWJsZWQgfHwgZmFsc2UsXG4gICAgICAgIGlzUmVhZE9ubHk6IHByb3BzLmlzUmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICAgIGlzU2VsZWN0ZWQgKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRWYWx1ZXMuaW5jbHVkZXModmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRWYWx1ZSAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5pc1JlYWRPbmx5IHx8IHByb3BzLmlzRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmICghc2VsZWN0ZWRWYWx1ZXMuaW5jbHVkZXModmFsdWUpKSBzZXRWYWx1ZShzZWxlY3RlZFZhbHVlcy5jb25jYXQodmFsdWUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlVmFsdWUgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMuaXNSZWFkT25seSB8fCBwcm9wcy5pc0Rpc2FibGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZXMuaW5jbHVkZXModmFsdWUpKSBzZXRWYWx1ZShzZWxlY3RlZFZhbHVlcy5maWx0ZXIoKGV4aXN0aW5nVmFsdWUpPT5leGlzdGluZ1ZhbHVlICE9PSB2YWx1ZSkpO1xuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVWYWx1ZSAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5pc1JlYWRPbmx5IHx8IHByb3BzLmlzRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlcy5pbmNsdWRlcyh2YWx1ZSkpIHNldFZhbHVlKHNlbGVjdGVkVmFsdWVzLmZpbHRlcigoZXhpc3RpbmdWYWx1ZSk9PmV4aXN0aW5nVmFsdWUgIT09IHZhbHVlKSk7XG4gICAgICAgICAgICBlbHNlIHNldFZhbHVlKHNlbGVjdGVkVmFsdWVzLmNvbmNhdCh2YWx1ZSkpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRJbnZhbGlkICh2YWx1ZSwgdikge1xuICAgICAgICAgICAgbGV0IHMgPSBuZXcgTWFwKGludmFsaWRWYWx1ZXMuY3VycmVudCk7XG4gICAgICAgICAgICBpZiAodi5pc0ludmFsaWQpIHMuc2V0KHZhbHVlLCB2KTtcbiAgICAgICAgICAgIGVsc2Ugcy5kZWxldGUodmFsdWUpO1xuICAgICAgICAgICAgaW52YWxpZFZhbHVlcy5jdXJyZW50ID0gcztcbiAgICAgICAgICAgIHZhbGlkYXRpb24udXBkYXRlVmFsaWRhdGlvbigoMCwgJDNPZjRBJG1lcmdlVmFsaWRhdGlvbikoLi4ucy52YWx1ZXMoKSkpO1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0aW9uU3RhdGU6IChfcHJvcHNfdmFsaWRhdGlvblN0YXRlID0gcHJvcHMudmFsaWRhdGlvblN0YXRlKSAhPT0gbnVsbCAmJiBfcHJvcHNfdmFsaWRhdGlvblN0YXRlICE9PSB2b2lkIDAgPyBfcHJvcHNfdmFsaWRhdGlvblN0YXRlIDogaXNJbnZhbGlkID8gJ2ludmFsaWQnIDogbnVsbCxcbiAgICAgICAgaXNJbnZhbGlkOiBpc0ludmFsaWQsXG4gICAgICAgIGlzUmVxdWlyZWQ6IGlzUmVxdWlyZWRcbiAgICB9O1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblxuXG5leHBvcnQgeyQ1ODdkM2FkNThiZTZkMzFmJGV4cG9ydCRkYWZmNmRhNTEwMzJhNDE1IGFzIHVzZUNoZWNrYm94R3JvdXBTdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VDaGVja2JveEdyb3VwU3RhdGUubW9kdWxlLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@react-stately+checkbox@3.6.5_react@18.3.1/node_modules/@react-stately/checkbox/dist/useCheckboxGroupState.mjs\n");

/***/ })

};
;