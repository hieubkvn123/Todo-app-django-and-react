import React, { Component, Fragment } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import TODO from './TODO'
import NotFound404 from './NotFound404'

// For react-redux
import { connect } from 'react-redux'

// For routers
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

class Dashboard extends Component {
	render() {
		const { isAuthenticated } = this.props.auth 
		const guess_component = (
			<Fragment>
				<Switch>
					<Route exact path="/">
						<Redirect to="/register"/>
					</Route>

					<Route exact path="/register" component={RegisterForm}/>
					<Route exact path="/login" component={LoginForm}/>
					<Route component={NotFound404}/>
				</Switch>
			</Fragment>
		)

		const auth_component = (
			<Fragment>
				<Switch>
					<Route exact path='/'>
						<Redirect to="/user"/>
					</Route>
					<Route exact path='/user' component={TODO}></Route>
					<Route component={NotFound404}/>
				</Switch>
			</Fragment>
		)

		return (
			<Router>
				<LastLocationProvider>
						{/* For root path -> to TODO dashboard if authenticated */}
						{/* Otherwise, redirect to registration page */}
						{isAuthenticated ? auth_component : guess_component}
				</LastLocationProvider>
			</Router>
		)
	}
}

const mapStateToProps = (state) => ({
	auth : state.auth
})

export default connect(mapStateToProps, {})(Dashboard)