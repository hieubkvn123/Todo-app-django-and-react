import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Alert,
	ListGroup,
	ListGroupItem
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { get_item } from '../actions/itemAction'

import TodoItem from './TodoItem'

class TODO extends Component {
	componentDidMount() {
		this.props.get_item()
	}

	render() {
		const { items } = this.props.items

		return (
			<Container className='app-container'>
				<div className='app-body' id='todo-list'> 
					{/* Message in case something happens */}
					{ this.props.msg.type === "failed" ? <Alert color="danger">{this.props.msg.msg}</Alert> : null }
					
					{/* Items */}
					<ListGroup>
					<TransitionGroup>
						{items.map(({id, title, description, due_date}) => {
							return (
								<CSSTransition key={id} timeout={500} classNames='fade'>
									<ListGroupItem className='mb-1'>
										<TodoItem title={title} desc={description} index={id} date={due_date}/>
									</ListGroupItem>
								</CSSTransition>
							)
						})}
					</TransitionGroup>
					</ListGroup>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	auth : state.auth,
	items : state.items,
	msg : state.msg
})

export default connect(mapStateToProps, { get_item })(TODO)