import React, { Component } from 'react'
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Form,
	Label,
	Input,
	Alert
} from 'reactstrap'
import { AiOutlineEdit } from 'react-icons/ai'
import { connect } from 'react-redux'
import { clear_msg } from '../actions/msgAction'

class UpdateTodoModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			...this.props,
			isOpen : false
		}

		this.toggle = this.toggle.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	toggle(e) {
		e.stopPropagation()
		this.setState({ isOpen : !this.state.isOpen })
		clear_msg()
	}

	onChange(e) {
		this.setState({ [e.target.name] : e.target.value })
	}

	render() {
		const { title, desc, date } = this.state

		return (
			<div style={{'display' : 'inline'}}>
				<span onClick={this.toggle} style={{ color : 'blue' }}><AiOutlineEdit/></span>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Update TODO Item</ModalHeader>
					{ this.props.msg.type === "success" ? <Alert color="success">{this.props.msg.msg}</Alert> : null }
					{ this.props.msg.type === "failed" ? <Alert color="danger">{this.props.msg.msg}</Alert> : null }
						<ModalBody>
						<Form>
							<FormGroup>
								<Label for='title'>Title</Label>
								<Input onChange={this.onChange} className='mb-3' name='title' id='title' placeholder='Title' type='text' value={title}/>
							</FormGroup>
							<FormGroup>
								<Label for='desc'>Description</Label>
								<Input onChange={this.onChange} className='mb-3' name='desc' id='desc' placeholder='Description' type='textarea' value={desc}/>
							</FormGroup>
							<FormGroup>
								<Label for='due-date'>Due Date</Label>
								<Input onChange={this.onChange} className='mb-3' name='date' id='date' type='date' defaultValue={new Date(date).toISOString().substr(0,10)}/>
							</FormGroup>

							<Button onClick={() => this.props.handler(this.state)} color='primary'>Update</Button>
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

export default connect(mapStateToProps)(UpdateTodoModal)