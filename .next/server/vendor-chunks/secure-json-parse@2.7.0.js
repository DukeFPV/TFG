"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/secure-json-parse@2.7.0";
exports.ids = ["vendor-chunks/secure-json-parse@2.7.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/secure-json-parse@2.7.0/node_modules/secure-json-parse/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/secure-json-parse@2.7.0/node_modules/secure-json-parse/index.js ***!
  \********************************************************************************************/
/***/ ((module) => {

eval("\n\nconst hasBuffer = typeof Buffer !== 'undefined'\nconst suspectProtoRx = /\"(?:_|\\\\u005[Ff])(?:_|\\\\u005[Ff])(?:p|\\\\u0070)(?:r|\\\\u0072)(?:o|\\\\u006[Ff])(?:t|\\\\u0074)(?:o|\\\\u006[Ff])(?:_|\\\\u005[Ff])(?:_|\\\\u005[Ff])\"\\s*:/\nconst suspectConstructorRx = /\"(?:c|\\\\u0063)(?:o|\\\\u006[Ff])(?:n|\\\\u006[Ee])(?:s|\\\\u0073)(?:t|\\\\u0074)(?:r|\\\\u0072)(?:u|\\\\u0075)(?:c|\\\\u0063)(?:t|\\\\u0074)(?:o|\\\\u006[Ff])(?:r|\\\\u0072)\"\\s*:/\n\nfunction _parse (text, reviver, options) {\n  // Normalize arguments\n  if (options == null) {\n    if (reviver !== null && typeof reviver === 'object') {\n      options = reviver\n      reviver = undefined\n    }\n  }\n\n  if (hasBuffer && Buffer.isBuffer(text)) {\n    text = text.toString()\n  }\n\n  // BOM checker\n  if (text && text.charCodeAt(0) === 0xFEFF) {\n    text = text.slice(1)\n  }\n\n  // Parse normally, allowing exceptions\n  const obj = JSON.parse(text, reviver)\n\n  // Ignore null and non-objects\n  if (obj === null || typeof obj !== 'object') {\n    return obj\n  }\n\n  const protoAction = (options && options.protoAction) || 'error'\n  const constructorAction = (options && options.constructorAction) || 'error'\n\n  // options: 'error' (default) / 'remove' / 'ignore'\n  if (protoAction === 'ignore' && constructorAction === 'ignore') {\n    return obj\n  }\n\n  if (protoAction !== 'ignore' && constructorAction !== 'ignore') {\n    if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {\n      return obj\n    }\n  } else if (protoAction !== 'ignore' && constructorAction === 'ignore') {\n    if (suspectProtoRx.test(text) === false) {\n      return obj\n    }\n  } else {\n    if (suspectConstructorRx.test(text) === false) {\n      return obj\n    }\n  }\n\n  // Scan result for proto keys\n  return filter(obj, { protoAction, constructorAction, safe: options && options.safe })\n}\n\nfunction filter (obj, { protoAction = 'error', constructorAction = 'error', safe } = {}) {\n  let next = [obj]\n\n  while (next.length) {\n    const nodes = next\n    next = []\n\n    for (const node of nodes) {\n      if (protoAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, '__proto__')) { // Avoid calling node.hasOwnProperty directly\n        if (safe === true) {\n          return null\n        } else if (protoAction === 'error') {\n          throw new SyntaxError('Object contains forbidden prototype property')\n        }\n\n        delete node.__proto__ // eslint-disable-line no-proto\n      }\n\n      if (constructorAction !== 'ignore' &&\n          Object.prototype.hasOwnProperty.call(node, 'constructor') &&\n          Object.prototype.hasOwnProperty.call(node.constructor, 'prototype')) { // Avoid calling node.hasOwnProperty directly\n        if (safe === true) {\n          return null\n        } else if (constructorAction === 'error') {\n          throw new SyntaxError('Object contains forbidden prototype property')\n        }\n\n        delete node.constructor\n      }\n\n      for (const key in node) {\n        const value = node[key]\n        if (value && typeof value === 'object') {\n          next.push(value)\n        }\n      }\n    }\n  }\n  return obj\n}\n\nfunction parse (text, reviver, options) {\n  const stackTraceLimit = Error.stackTraceLimit\n  Error.stackTraceLimit = 0\n  try {\n    return _parse(text, reviver, options)\n  } finally {\n    Error.stackTraceLimit = stackTraceLimit\n  }\n}\n\nfunction safeParse (text, reviver) {\n  const stackTraceLimit = Error.stackTraceLimit\n  Error.stackTraceLimit = 0\n  try {\n    return _parse(text, reviver, { safe: true })\n  } catch (_e) {\n    return null\n  } finally {\n    Error.stackTraceLimit = stackTraceLimit\n  }\n}\n\nmodule.exports = parse\nmodule.exports[\"default\"] = parse\nmodule.exports.parse = parse\nmodule.exports.safeParse = safeParse\nmodule.exports.scan = filter\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vc2VjdXJlLWpzb24tcGFyc2VAMi43LjAvbm9kZV9tb2R1bGVzL3NlY3VyZS1qc29uLXBhcnNlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLCtEQUErRDtBQUN0Rjs7QUFFQSx3QkFBd0IsMkRBQTJELElBQUk7QUFDdkY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUdBQWlHO0FBQ2pHO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQyxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsbUJBQW1CIiwic291cmNlcyI6WyIvVXNlcnMvY2FybG9zL0Rlc2t0b3AvVEZHL1RGRy9ub2RlX21vZHVsZXMvLnBucG0vc2VjdXJlLWpzb24tcGFyc2VAMi43LjAvbm9kZV9tb2R1bGVzL3NlY3VyZS1qc29uLXBhcnNlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBoYXNCdWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJ1xuY29uc3Qgc3VzcGVjdFByb3RvUnggPSAvXCIoPzpffFxcXFx1MDA1W0ZmXSkoPzpffFxcXFx1MDA1W0ZmXSkoPzpwfFxcXFx1MDA3MCkoPzpyfFxcXFx1MDA3MikoPzpvfFxcXFx1MDA2W0ZmXSkoPzp0fFxcXFx1MDA3NCkoPzpvfFxcXFx1MDA2W0ZmXSkoPzpffFxcXFx1MDA1W0ZmXSkoPzpffFxcXFx1MDA1W0ZmXSlcIlxccyo6L1xuY29uc3Qgc3VzcGVjdENvbnN0cnVjdG9yUnggPSAvXCIoPzpjfFxcXFx1MDA2MykoPzpvfFxcXFx1MDA2W0ZmXSkoPzpufFxcXFx1MDA2W0VlXSkoPzpzfFxcXFx1MDA3MykoPzp0fFxcXFx1MDA3NCkoPzpyfFxcXFx1MDA3MikoPzp1fFxcXFx1MDA3NSkoPzpjfFxcXFx1MDA2MykoPzp0fFxcXFx1MDA3NCkoPzpvfFxcXFx1MDA2W0ZmXSkoPzpyfFxcXFx1MDA3MilcIlxccyo6L1xuXG5mdW5jdGlvbiBfcGFyc2UgKHRleHQsIHJldml2ZXIsIG9wdGlvbnMpIHtcbiAgLy8gTm9ybWFsaXplIGFyZ3VtZW50c1xuICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgaWYgKHJldml2ZXIgIT09IG51bGwgJiYgdHlwZW9mIHJldml2ZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gcmV2aXZlclxuICAgICAgcmV2aXZlciA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGlmIChoYXNCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKHRleHQpKSB7XG4gICAgdGV4dCA9IHRleHQudG9TdHJpbmcoKVxuICB9XG5cbiAgLy8gQk9NIGNoZWNrZXJcbiAgaWYgKHRleHQgJiYgdGV4dC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICB0ZXh0ID0gdGV4dC5zbGljZSgxKVxuICB9XG5cbiAgLy8gUGFyc2Ugbm9ybWFsbHksIGFsbG93aW5nIGV4Y2VwdGlvbnNcbiAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZSh0ZXh0LCByZXZpdmVyKVxuXG4gIC8vIElnbm9yZSBudWxsIGFuZCBub24tb2JqZWN0c1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9ialxuICB9XG5cbiAgY29uc3QgcHJvdG9BY3Rpb24gPSAob3B0aW9ucyAmJiBvcHRpb25zLnByb3RvQWN0aW9uKSB8fCAnZXJyb3InXG4gIGNvbnN0IGNvbnN0cnVjdG9yQWN0aW9uID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5jb25zdHJ1Y3RvckFjdGlvbikgfHwgJ2Vycm9yJ1xuXG4gIC8vIG9wdGlvbnM6ICdlcnJvcicgKGRlZmF1bHQpIC8gJ3JlbW92ZScgLyAnaWdub3JlJ1xuICBpZiAocHJvdG9BY3Rpb24gPT09ICdpZ25vcmUnICYmIGNvbnN0cnVjdG9yQWN0aW9uID09PSAnaWdub3JlJykge1xuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIGlmIChwcm90b0FjdGlvbiAhPT0gJ2lnbm9yZScgJiYgY29uc3RydWN0b3JBY3Rpb24gIT09ICdpZ25vcmUnKSB7XG4gICAgaWYgKHN1c3BlY3RQcm90b1J4LnRlc3QodGV4dCkgPT09IGZhbHNlICYmIHN1c3BlY3RDb25zdHJ1Y3RvclJ4LnRlc3QodGV4dCkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9IGVsc2UgaWYgKHByb3RvQWN0aW9uICE9PSAnaWdub3JlJyAmJiBjb25zdHJ1Y3RvckFjdGlvbiA9PT0gJ2lnbm9yZScpIHtcbiAgICBpZiAoc3VzcGVjdFByb3RvUngudGVzdCh0ZXh0KSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBvYmpcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHN1c3BlY3RDb25zdHJ1Y3RvclJ4LnRlc3QodGV4dCkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9XG5cbiAgLy8gU2NhbiByZXN1bHQgZm9yIHByb3RvIGtleXNcbiAgcmV0dXJuIGZpbHRlcihvYmosIHsgcHJvdG9BY3Rpb24sIGNvbnN0cnVjdG9yQWN0aW9uLCBzYWZlOiBvcHRpb25zICYmIG9wdGlvbnMuc2FmZSB9KVxufVxuXG5mdW5jdGlvbiBmaWx0ZXIgKG9iaiwgeyBwcm90b0FjdGlvbiA9ICdlcnJvcicsIGNvbnN0cnVjdG9yQWN0aW9uID0gJ2Vycm9yJywgc2FmZSB9ID0ge30pIHtcbiAgbGV0IG5leHQgPSBbb2JqXVxuXG4gIHdoaWxlIChuZXh0Lmxlbmd0aCkge1xuICAgIGNvbnN0IG5vZGVzID0gbmV4dFxuICAgIG5leHQgPSBbXVxuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBpZiAocHJvdG9BY3Rpb24gIT09ICdpZ25vcmUnICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCAnX19wcm90b19fJykpIHsgLy8gQXZvaWQgY2FsbGluZyBub2RlLmhhc093blByb3BlcnR5IGRpcmVjdGx5XG4gICAgICAgIGlmIChzYWZlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSBlbHNlIGlmIChwcm90b0FjdGlvbiA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignT2JqZWN0IGNvbnRhaW5zIGZvcmJpZGRlbiBwcm90b3R5cGUgcHJvcGVydHknKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG5vZGUuX19wcm90b19fIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnN0cnVjdG9yQWN0aW9uICE9PSAnaWdub3JlJyAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCAnY29uc3RydWN0b3InKSAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLmNvbnN0cnVjdG9yLCAncHJvdG90eXBlJykpIHsgLy8gQXZvaWQgY2FsbGluZyBub2RlLmhhc093blByb3BlcnR5IGRpcmVjdGx5XG4gICAgICAgIGlmIChzYWZlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvckFjdGlvbiA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignT2JqZWN0IGNvbnRhaW5zIGZvcmJpZGRlbiBwcm90b3R5cGUgcHJvcGVydHknKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG5vZGUuY29uc3RydWN0b3JcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG5vZGVba2V5XVxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG5leHQucHVzaCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIHBhcnNlICh0ZXh0LCByZXZpdmVyLCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0YWNrVHJhY2VMaW1pdCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdFxuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAwXG4gIHRyeSB7XG4gICAgcmV0dXJuIF9wYXJzZSh0ZXh0LCByZXZpdmVyLCBvcHRpb25zKVxuICB9IGZpbmFsbHkge1xuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IHN0YWNrVHJhY2VMaW1pdFxuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVQYXJzZSAodGV4dCwgcmV2aXZlcikge1xuICBjb25zdCBzdGFja1RyYWNlTGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXRcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMFxuICB0cnkge1xuICAgIHJldHVybiBfcGFyc2UodGV4dCwgcmV2aXZlciwgeyBzYWZlOiB0cnVlIH0pXG4gIH0gY2F0Y2ggKF9lKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBmaW5hbGx5IHtcbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBzdGFja1RyYWNlTGltaXRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLnNhZmVQYXJzZSA9IHNhZmVQYXJzZVxubW9kdWxlLmV4cG9ydHMuc2NhbiA9IGZpbHRlclxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/secure-json-parse@2.7.0/node_modules/secure-json-parse/index.js\n");

/***/ })

};
;