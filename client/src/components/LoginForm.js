import React, { Component } from 'react'
import { 
	Button, 
	Form, 
	FormGroup, 
	Input, 
	Label, 
	Container,
	Alert
} from 'reactstrap'
import { login } from '../actions/authAction'
import { connect } from 'react-redux'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username : '',
			password : ''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value})
	}

	onSubmit(e) {
		const { username, password } = this.state
		this.props.login(username, password)
	}

	render() {
		return (
			<Container className='app-form-container'> 
				<Form className='app-form'>
					<h4>Login</h4>
					{ this.props.msg.type === "failed" ? <Alert color="danger">{this.props.msg.msg}</Alert> : null }
					{ this.props.msg.type === "success" ? <Alert color="success">{this.props.msg.msg}</Alert> : null }
					<FormGroup className='mt-2 loginFormGroup'>
						<Label className='loginLabel' for="username">Username</Label>
						<Input type='text' name='username' id='username' placeholder='Username' onChange={this.onChange}/>
					</FormGroup>

					<FormGroup className='mt-2 loginFormGroup'>
						<Label className='loginLabel' for="password">Password</Label>
						<Input type='password' name='password' id='password' placeholder='Password' onChange={this.onChange}/>
					</FormGroup>

					<Button className='mt-2' color='primary' onClick={this.onSubmit}>Login</Button>
				</Form>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	auth : state.auth,
	msg : state.msg
})

export default connect(mapStateToProps, { login })(LoginForm)