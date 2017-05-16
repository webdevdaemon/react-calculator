'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./Button.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button(props) {
		_classCallCheck(this, Button);

		var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'Button' },
				this.props.type === 'operator' ? _react2.default.createElement(
					'div',
					{
						className: 'ButtonOp ' + this.props.childClass,
						onClick: function onClick() {
							_this2.props.pressOperator(_this2.props.keyValue);
						}
					},
					this.props.opIcon
				) : _react2.default.createElement(
					'div',
					{
						className: 'ButtonNum ' + this.props.childClass,
						onClick: function onClick() {
							_this2.props.pressNumber(_this2.props.keyValue);
						}
					},
					_react2.default.createElement(
						'span',
						null,
						this.props.keyValue
					)
				)
			);
		}
	}]);

	return Button;
}(_react.Component);

Button.propTypes = {
	opIcon: _propTypes2.default.node,
	keyValue: _propTypes2.default.any,
	childClass: _propTypes2.default.string,
	children: _propTypes2.default.any,
	type: _propTypes2.default.string,
	pressNumber: _propTypes2.default.any,
	pressOperator: _propTypes2.default.any
};

Button.defaultProps = {};

exports.default = Button;
//# sourceMappingURL=/Users/cm/Desktop/git-main/freeCodeCampProjects/calcJS/_es5/maps/Components/Button/Button.js.map