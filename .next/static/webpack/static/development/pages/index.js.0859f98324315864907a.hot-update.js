webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./src/components/PersonList.js":
/*!**************************************!*\
  !*** ./src/components/PersonList.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _components_PersonCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PersonCard */ "./src/components/PersonCard.js");


var _jsxFileName = "D:\\Development\\lugarlivre\\src\\components\\PersonList.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function _templateObject() {
  const data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  max-width: 800px;\n  margin: 20px auto;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  column-gap: 20px;\n  row-gap: 20px;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}






const PersonList = ({
  cards
}) => {
  return __jsx(List, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, cards.map(card => __jsx(_components_PersonCard__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    key: card.id
  }, card, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }))));
};

const List = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].ul(_templateObject());
PersonList.propTypes = {
  cards: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array
};
/* harmony default export */ __webpack_exports__["default"] = (PersonList);

/***/ })

})
//# sourceMappingURL=index.js.0859f98324315864907a.hot-update.js.map