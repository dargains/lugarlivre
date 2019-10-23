webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./src/components/PersonCard.js":
/*!**************************************!*\
  !*** ./src/components/PersonCard.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
var _jsxFileName = "D:\\Development\\lugarlivre\\src\\components\\PersonCard.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const PersonCard = ({
  id,
  name,
  email,
  available,
  department
}) => {
  const handleClick = ({
    currentTarget
  }) => {
    console.log(currentTarget.dataset.personId);
  };

  return __jsx(Card, {
    onClick: handleClick,
    "data-person-id": id,
    available: available,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, __jsx(Title, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, name), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, department));
};

const Card = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].li.withConfig({
  displayName: "PersonCard__Card",
  componentId: "z5ms73-0"
})(["padding:20px;box-shadow:2px 2px 20px rgba(0,0,0,.2);border-radius:5px;cursor:pointer;"]);
const Title = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h2.withConfig({
  displayName: "PersonCard__Title",
  componentId: "z5ms73-1"
})(["font-size:1.2em;margin-bottom:10px;"]);
PersonCard.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  email: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  avaiable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  department: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (PersonCard);

/***/ })

})
//# sourceMappingURL=index.js.493625c09fae2ed16445.hot-update.js.map