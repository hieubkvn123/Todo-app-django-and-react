import React, { Component } from 'react'
import { Container } from 'reactstrap'

class NotFound404 extends Component {
	render() {
		return (
			<Container className='app-container'>
				<div className = 'app-body'>
					<h1 style={{'text-decoration' : 'underline'}}>404 NOT FOUND</h1>
					<span style={{'font-weight' : 'bolder'}}>
						It looks like the page you are trying to access does not exist
					</span>
				</div>
			</Container>
		)
	}
}

export default NotFound404