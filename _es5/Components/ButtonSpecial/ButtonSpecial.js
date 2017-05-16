'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('./ButtonSpecial.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonSpecial = function ButtonSpecial(props) {
	var toggle = props.pressToggle;
	// console.log(toggle, toggle.toString())
	return _react2.default.createElement(
		'div',
		{ className: 'Button', onClick: toggle },
		_react2.default.createElement(
			'div',
			{ className: 'ButtonOp ' + props.childClass },
			props.opIcon
		)
	);
};

ButtonSpecial.propTypes = {
	childClass: _propTypes2.default.string,
	className: _propTypes2.default.string,
	pressToggle: _propTypes2.default.any,
	opIcon: _propTypes2.default.any,
	type: _propTypes2.default.string
};

ButtonSpecial.defaultProps = {};

exports.default = ButtonSpecial;
//# sourceMappingURL=/Users/cm/Desktop/git-main/freeCodeCampProjects/calcJS/_es5/maps/Components/ButtonSpecial/ButtonSpecial.js.map