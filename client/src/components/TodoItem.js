import React, { Component } from 'react'
import {
	Card, 
	CardHeader,
	CardBody,
	Collapse,
	CardSubtitle
} from 'reactstrap'
import { connect } from 'react-redux'
import { delete_item, update_item, complete_task } from '../actions/itemAction'
import { AiOutlineCloseSquare, AiOutlineCheckSquare, AiOutlineClockCircle, AiOutlineFieldTime } from 'react-icons/ai'
import UpdateTodoModal from './UpdateTodoModal'

class TodoItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
			...this.props, // Map props to state
			isOpen : false
		}

		this.render = this.render.bind(this)
		this.toggle = this.toggle.bind(this)
		this.onCompleteClick = this.onCompleteClick.bind(this)
		this.onRemoveClick = this.onRemoveClick.bind(this)
		this.updateHandler = this.updateHandler.bind(this)
	}

	onRemoveClick(e) {
		e.stopPropagation()
		if(window.confirm("Are you sure you want to delete this item?")) {
			const { index } = this.props
			this.props.delete_item(index)
		}
	}

	onCompleteClick(e) {
		e.stopPropagation()

		const { title } = this.state
		if(window.confirm(`Complete task ${title}?`)) {
			// Action : complete task
			this.props.complete_task(title)
		}
	}

	updateHandler(data) {
		const { title, desc, date } = data
		const index = this.state.index 

		this.setState({ title, desc, date })
		this.props.update_item(index, title, desc, date)
	}

	toggle() {
		this.setState({isOpen : !this.state.isOpen})
	}

	render() {
		const { title, desc, index, date } = this.state
		const { historyView } = this.props
		const getDateDiff = (date) => {
			const date1 = new Date(date)
			const date2 = new Date() // Today

			// const diffTime = Math.abs(date2 - date1)
			const diffTime = date1 - date2
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

			return diffDays
		}
		
		return (
			<div>
				<Card>
				<CardHeader style={{cursor : 'pointer'}} onClick={this.toggle}>
					<strong className='mb-3'><em><u>{title}</u></em></strong>
					{historyView ? null : 
					(<div style={{ position : 'absolute', 'right' : 10, top : 0 }}>
						{ getDateDiff(date) > 0 && getDateDiff(date) < 4 ?
							<AiOutlineClockCircle title={`Task dued in ${getDateDiff(date)} days`} style={{'color':'red'}} /> : null
						}

						{ getDateDiff(date) < 0 ?
							<AiOutlineFieldTime title={'Task overdued'} style={{'color' : 'red'}}/> : null
						}

						<span onClick={this.onRemoveClick} style={{ color : 'red'}}><AiOutlineCloseSquare/></span>
						<span onClick={this.onCompleteClick} style={{ color : 'green '}}><AiOutlineCheckSquare/></span>
						<UpdateTodoModal title={title} desc={desc} index={index} date={date} handler={this.updateHandler}/>
					</div>)}
				<CardSubtitle className="mb-2 text-muted">Due : {new Date(date).toLocaleDateString()}</CardSubtitle>
				</CardHeader> 

				<Collapse isOpen={this.state.isOpen}>
					<CardBody>{desc}</CardBody>
				</Collapse>
				</Card>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	msg : state.msg,
	historyView : state.items.historyView
})

export default connect(mapStateToProps, { delete_item, update_item, complete_task })(TodoItem)