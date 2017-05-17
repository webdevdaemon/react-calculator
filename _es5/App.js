'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./App.css');

var _index = require('./Components/AppTitle/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./Components/ButtonSpecial/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./Components/Button/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./Components/DigitalDisplay/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./Components/DisplayCurrent/index');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('./Components/DisplayHistory/index');

var _index12 = _interopRequireDefault(_index11);

var _index13 = require('./Components/Horizontal/index');

var _index14 = _interopRequireDefault(_index13);

var _index15 = require('./Components/IconFont/index');

var _index16 = _interopRequireDefault(_index15);

var _index17 = require('./Components/Keypad/index');

var _index18 = _interopRequireDefault(_index17);

var _index19 = require('./Components/Vertical/index');

var _index20 = _interopRequireDefault(_index19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var init_state = {
	current_value_array: [],
	hidden_history_array: [],
	previous_operation_history_array: [],
	is_decimal: false,
	is_negative: false,
	is_totaled: false,
	visible_display_string: '0',
	visible_history_string: '0'
};

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.aC = function () {
			_this.setState(init_state);
		};

		_this.cE = function () {
			var hh_arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.hidden_history_array;

			if (_this.state.is_totaled) {
				_this.setState(init_state);
				return;
			}
			_this.setState(!isNaN(parseFloat(_this.state.visible_display_string)) ? // (IF IS) - if vis_dis_val IS a number...
			{
				current_value_array: [],
				visible_display_string: '0'
			} : {
				visible_display_string: hh_arr[hh_arr.length - 1],
				current_value_array: hh_arr[hh_arr.length - 1].split(""),
				hidden_history_array: hh_arr.slice(0, -1),
				visible_history_string: hh_arr.slice(0, -1).join("")
			});
		};

		_this.eQ = function () {
			if (_this.state.is_totaled) {
				return;
			} else if (_this.state.hidden_history_array.length <= 1) {
				return;
			} else if (isNaN(Number(_this.state.visible_display_string))) {
				return;
			} else {
				_this.setState({
					hidden_history_array: _this.state.hidden_history_array.concat(_this.state.current_value_array.join("")),
					previous_operation_history_array: _this.state.hidden_history_array.concat(_this.state.current_value_array.join(""))
				}, function () {
					_this.setState(function (state, props) {
						return {
							visible_display_string: _this.calculateSolution(),
							visible_history_string: 'GRAND TOTAL',
							is_totaled: true,
							is_negative: false,
							is_decimal: false
						};
					});
				});
			}
		};

		_this.decimalToggle = function () {
			if (!_this.state.is_decimal) {
				_this.setState({ is_decimal: true }, function () {
					console.log('decimal toggled');
				});
			} else {
				_this.setState({ is_decimal: false });
			}
		};

		_this.negativeToggle = function () {
			if (isNaN(parseFloat(_this.state.visible_display_string))) {
				// (IF IS NOT) If curr_dis_str IS NOT a number...
				return; // eject
			}

			if (!_this.state.is_negative) {
				_this.setState({
					is_negative: true,
					current_value_array: ['-'].concat(_this.state.current_value_array)
				}, function () {
					console.log('negative toggled');
				});
			} else {
				_this.setState({
					is_negative: false,
					current_value_array: _this.state.current_value_array.slice(1)
				}, function () {
					console.log('negative toggled');
				});
			}
		};

		_this.pressNumber = function (number) {
			var vd_str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.visible_display_string;

			// special case: if GRAND TOTAL is currently displayed...
			if (_this.state.is_totaled) {
				_this.setState({
					current_value_array: [number],
					visible_display_string: '',
					is_totaled: false,
					hidden_history_array: [],
					visible_history_string: '0'
				}, function () {
					_this.setState({
						visible_display_string: number.toString()
					});
				});
			}
			// if operator is currently displayed...
			else if (isNaN(parseFloat(_this.state.visible_display_string))) {
					// (IF IS NOT) - if vis_dis_val IS NOT A NUMBER...
					_this.setState(function (state, props) {
						return {
							hidden_history_array: state.hidden_history_array.concat(vd_str),
							visible_display_string: number.toString(),
							visible_history_string: state.hidden_history_array.concat(vd_str).join(""),
							// current_value_array: state.current_value_array.concat(number)
							current_value_array: [].concat(number)
						};
					});
				}
				// if anything else is displayed (Hopefully a number!!!)...
				else {
						_this.setState({
							current_value_array: _this.state.current_value_array.concat(number)
						}, function () {
							_this.setState({
								visible_display_string: _this.state.current_value_array.join("")
							});
						});
					}
		};

		_this.pressOperator = function (operator) {
			var vd_str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.visible_display_string;

			if (_this.state.is_totaled) {
				_this.setState({
					is_totaled: false,
					hidden_history_array: [vd_str],
					// visible_history_string: this.state.previous_operation_history_array.join(""),
					visible_history_string: vd_str,
					visible_display_string: operator,
					current_value_array: []
				});
			} else if (!isNaN(parseFloat(_this.state.visible_display_string))) {
				// (IF IS) - if vis_dis_str IS a NUMBER...
				var curr_val = _this.state.current_value_array.join("");
				_this.setState({
					// hidden_history_array: this.state.hidden_history_array.concat(this.state.visible_display_string),
					hidden_history_array: _this.state.hidden_history_array.concat(curr_val),
					current_value_array: [],
					visible_display_string: operator,
					is_negative: false,
					is_decimal: false
				}, function () {
					if (!isNaN(parseFloat(vd_str))) {
						// (IF IS) - if vis_dis_val IS a	number...
						_this.setState({ visible_history_string: _this.state.hidden_history_array.join("") });
					} else {
						return;
					}
				});
			} else {
				// (IF IS NOT) - if vis_dis_str IS NOT NUMBER...
				_this.setState({
					visible_display_string: operator,
					current_value_array: []
				}, function () {
					if (!isNaN(parseFloat(vd_str))) {
						// (IF IS) - if vis_dis_val IS a number...
						_this.setState({ visible_history_string: _this.state.hidden_history_array.join("") });
					} else {
						return;
					}
				});
			}
		};

		_this.calculateSolution = function () {
			var maths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.hidden_history_array;

			var current_operator = '',
			    solution = maths.reduce(function (accumulate, current, index, array) {
				// special case - first round handler
				if (index === 0) {
					return accumulate += parseFloat(current);
				}
				// if current index = number...
				if (!isNaN(parseFloat(current))) {
					// (IF IS) - if current IS a number...
					current = parseFloat(current);
					switch (current_operator) {
						case '+':
							accumulate += current;
							break;
						case '-':
							accumulate -= current;
							break;
						case '*':
							accumulate *= current;
							break;
						case '/':
							accumulate /= current;
							break;
						default:
							console.log('CALCULATION ERROR - NO current operator');
					}
					// if current index = operator - store operator for use in the next iteration
				} else if (isNaN(parseFloat(current))) {
					// (IF IS NOT) - if current IS NOT a number...
					current_operator = current;
				} else {
					console.log("CALCULATION ERROR, CURRENT HISTORY ITEM NEITHER A NUMBER, NOR AN OPERATOR...");
				}
				return parseFloat(accumulate);
			}, 0);
			return solution.toString();
		};

		_this.state = init_state;
		return _this;
	}
	// =============== Utility Button Hnadlers =============== //


	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'app-wrap' },
				_react2.default.createElement(_index2.default, { mainTitle: _react2.default.createElement(
						'h2',
						null,
						'reac',
						_react2.default.createElement(
							'span',
							{ className: 'the-u' },
							'U'
						),
						'l',
						_react2.default.createElement(
							'span',
							{ className: 'the-8' },
							'8'
						),
						'r'
					), subTitle: 'a simple calculator, built with ReactJS' }),
				_react2.default.createElement(
					'div',
					{ className: 'App' },
					_react2.default.createElement(
						'div',
						{ className: 'display-wrap' },
						_react2.default.createElement(
							_index8.default,
							null,
							_react2.default.createElement(_index10.default, { stateObj: this.state, displayValue: this.state.visible_display_string }),
							_react2.default.createElement(_index12.default, { historyValue: this.state.visible_history_string, previousHistory: this.state.previous_operation_history_array.join("") })
						)
					),
					_react2.default.createElement(
						_index18.default,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'H4 W3' },
							_react2.default.createElement(
								_index14.default,
								{ pressNumber: this.pressNumber },
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 9, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 8, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 7, pressNumber: this.pressNumber })
							),
							_react2.default.createElement(
								_index14.default,
								{ pressNumber: this.pressNumber },
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 6, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 5, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 4, pressNumber: this.pressNumber })
							),
							_react2.default.createElement(
								_index14.default,
								{ pressNumber: this.pressNumber },
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 3, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 2, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 1, pressNumber: this.pressNumber })
							),
							_react2.default.createElement(
								_index14.default,
								null,
								_react2.default.createElement(_index4.default, { type: 'decimalToggle', className: 'Button', childClass: 'bg-black', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'decimal' }), keyValue: '.', pressToggle: this.decimalToggle }),
								_react2.default.createElement(_index6.default, { className: 'Button', childClass: 'bg-grey', keyValue: 0, pressNumber: this.pressNumber }),
								_react2.default.createElement(_index4.default, { type: 'invertToggle', className: 'Button', childClass: 'bg-black', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'plus-minus' }), keyValue: '_', pressToggle: this.negativeToggle })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'H4 W1' },
							_react2.default.createElement(
								_index20.default,
								null,
								_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-plus', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'plus' }), keyValue: '+', pressOperator: this.pressOperator }),
								_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-minus', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'minus' }), keyValue: '-', pressOperator: this.pressOperator }),
								_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-multiply', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'multiply' }), keyValue: '*', pressOperator: this.pressOperator }),
								_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-divide', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'divide' }), keyValue: '/', pressOperator: this.pressOperator })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'H4 W1' },
							_react2.default.createElement(
								'div',
								{ className: 'H2' },
								_react2.default.createElement(
									_index20.default,
									null,
									_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-red', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'AC' }), keyValue: 'AC', pressOperator: this.aC }),
									_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-red', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'CE' }), keyValue: 'CE', pressOperator: this.cE })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'H2' },
								_react2.default.createElement(
									_index20.default,
									{ pressOperator: this.pressOperator },
									_react2.default.createElement(_index6.default, { type: 'operator', className: 'Button', childClass: 'bg-green', opIcon: _react2.default.createElement(_index16.default, { color: 'white', icon: 'equals' }), keyValue: '=', pressOperator: this.eQ })
								)
							)
						)
					)
				)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;
//# sourceMappingURL=/Users/cm/Desktop/git-main/freeCodeCampProjects/calcJS/_es5/maps/App.js.map