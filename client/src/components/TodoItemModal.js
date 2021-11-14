import React, { Component } from 'react'
import {
	NavLink,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Form,
	Label,
	Input,
	Button,
	Alert
} from 'reactstrap'
import { add_item } from '../actions/itemAction'
import { clear_msg } from '../actions/msgAction'
import { connect } from 'react-redux'


class TodoItemModal extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			isOpen : false,
			title : "",
			desc : "",
			due_date : "" 
		}

		this.toggle = this.toggle.bind(this)
		this.render = this.render.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value})
	}

	onSubmit(e) {
		e.preventDefault()

		const { title, desc, due_date } = this.state
		this.props.add_item(title, desc, due_date)
	}

	toggle() {
		this.setState({ isOpen : !this.state.isOpen })
		this.props.clear_msg()
	}

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} style={{cursor:'pointer'}}>Add TODO</NavLink>	
			
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add TODO Item</ModalHeader>
						<ModalBody>
						{ this.props.msg.type === "success" ? <Alert color="success">{this.props.msg.msg}</Alert> : null }
						{ this.props.msg.type === "failed" ? <Alert color="danger">{this.props.msg.msg}</Alert> : null }
						<Form>
							<FormGroup>
								<Label for='title'>Title</Label>
								<Input onChange={this.onChange} className='mb-3' name='title' id='title' placeholder='Title' type='text'/>
							</FormGroup>
							<FormGroup>
								<Label for='desc'>Description</Label>
								<Input onChange={this.onChange} className='mb-3' name='desc' id='desc' placeholder='Description' type='textarea'/>
							</FormGroup>
							<FormGroup>
								<Label for='due-date'>Due Date</Label>
								<Input onChange={this.onChange} className='mb-3' name='due_date' id='due_date' type='date'/>
							</FormGroup>

							<Button onClick={this.onSubmit} color='primary'>Add</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	msg : state.msg
})

export default connect(mapStateToProps, { add_item, clear_msg })(TodoItemModal)