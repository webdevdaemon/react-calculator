import './IconFont.css'

import React from 'react'
import PropTypes from 'prop-types'


const IconFont = ({icon, color}) => (
	<div className="IconFont" style={{color}}>
		<span className={`icon icon-${icon}`}>
		</span>
	</div>
)

IconFont.propTypes = {
	icon: PropTypes.string,
	color: PropTypes.string
}

export default IconFont
