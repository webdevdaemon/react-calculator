import './AppTitle.css'

import React from 'react'

const AppTitle = (props) => (
	<div className="AppTitle">
		<h2>{props.mainTitle}</h2>
		<h4>{props.subTitle}</h4>
	</div>
)



export default AppTitle
