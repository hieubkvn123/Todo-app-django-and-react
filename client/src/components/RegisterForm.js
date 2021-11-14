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
import { register } from '../actions/authAction'
import { connect } from 'react-redux'

class RegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
            name : '',
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
    	e.preventDefault()
        const { name, username, password } = this.state
        this.props.register(name, username, password)
        // window.location.replace('/user')
    }

	render() {
		return (
			<Container className='app-form-container'> 
                <Form className='app-form'>
	                <h4>Registration {this.props.auth.isLoading ? "ahihi" : null}</h4>
	                { this.props.msg.type === "success" ? <Alert color="success">{this.props.msg.msg}</Alert> : null }
	                { this.props.msg.type === "failed" ? <Alert color="danger">{this.props.msg.msg}</Alert> : null }
					<FormGroup className='mt-2'>
						<Label className='loginLabel' for="name">Name</Label>
						<Input type='text' name='name' id='name' placeholder='Name' onChange={this.onChange}/>
					</FormGroup>

                    <FormGroup className='mt-2'>
						<Label className='loginLabel' for="username">Username</Label>
						<Input type='text' name='username' id='username' placeholder='Username' onChange={this.onChange}/>
					</FormGroup>

					<FormGroup className='mt-2'>
						<Label className='loginLabel' for="password">Password</Label>
						<Input type='password' name='password' id='password' placeholder='Password' onChange={this.onChange}/>
					</FormGroup>

					<Button onClick={this.onSubmit} className='mt-2' color='primary'>Register</Button>
				</Form>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    msg : state.msg
})

export default connect(mapStateToProps, { register })(RegisterForm)