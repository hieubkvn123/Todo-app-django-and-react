import React, { Component, Fragment } from 'react'
import {
	Container,
	Nav,
	Navbar,
	NavItem,
	NavbarBrand,
	NavbarToggler,
	NavLink,
	Collapse
} from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../actions/authAction'

import TodoItemModal from './TodoItemModal'
import UtilDropdown from './UtilDropdown'

class AppNavbar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isOpen : false
		}

		this.toggle = this.toggle.bind(this)
		this.logout = this.logout.bind(this)
	}

	toggle() {
		this.setState({isOpen : !this.state.isOpen})
	}

	logout() {
		this.props.logout()
		window.location.replace("/register")
	}

	render() {
		const guess_component = (
			<Fragment>
				<NavItem>
					<NavLink href="/register">Register</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/login">Login</NavLink>
				</NavItem>
			</Fragment>
		)

		const auth_component = (
			<Fragment>
				<NavItem>
					<TodoItemModal/>
				</NavItem>
				<NavItem>
					<NavLink onClick={this.logout} href="#">Logout</NavLink>
				</NavItem>
				<NavItem>
					<UtilDropdown/>
				</NavItem>
			</Fragment>
		)

		const { isAuthenticated, user } = this.props.auth

		return (
			<Navbar color='dark' dark expand='sm' className='app-navbar'>
				<Container>
					{ isAuthenticated ? 
						<NavbarBrand href="/user">TODO</NavbarBrand> :
						<NavbarBrand href="/register">TODO</NavbarBrand>
					}
					<NavbarToggler onClick={this.toggle}></NavbarToggler>
					<Collapse isOpen={this.state.isOpen} navbar>
						{ isAuthenticated ? <span style={{color:'white'}}>Welcome {user}</span> : null}
						<Nav className="ms-auto" navbar>
							{ isAuthenticated ? auth_component : guess_component}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		)
	}
}

const mapStateToProps = (state) => ({
	auth : state.auth
})

export default connect(mapStateToProps, { logout })(AppNavbar)