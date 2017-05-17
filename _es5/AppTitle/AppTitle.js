'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('./AppTitle.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppTitle = function AppTitle(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'AppTitle' },
		_react2.default.createElement(
			'h2',
			null,
			props.mainTitle
		),
		_react2.default.createElement(
			'h4',
			null,
			props.subTitle
		)
	);
};

exports.default = AppTitle;
//# sourceMappingURL=/Users/cm/Desktop/git-main/freeCodeCampProjects/calcJS/_es5/maps/AppTitle/AppTitle.js.map