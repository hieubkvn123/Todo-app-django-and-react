import React, { Component } from 'react'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap'
import { connect } from 'react-redux'
import { get_item, get_item_complete } from '../actions/itemAction'

import { MdArrowDropDown } from 'react-icons/md'

class UtilDropdown extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			isOpen : false
		}

		this.toggle = this.toggle.bind(this)
		this.onHistoryClick = this.onHistoryClick.bind(this)
	}

	toggle() {
		this.setState({ isOpen : !this.state.isOpen })
	}

	onHistoryClick(e) {
		const { historyView } = this.props

		if(!historyView)
			this.props.get_item_complete()
		else
			this.props.get_item()
	}

	render() {
		const { historyView } = this.props
		return (
			<Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
				<DropdownToggle style={{
					'background' : 'transparent',
					'border' : 'none'
				}}>
					<MdArrowDropDown/>
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem onClick={this.onHistoryClick}>{historyView ? "TODO" : "History"}</DropdownItem>
					<DropdownItem>
						<a rel="noreferrer" href="https://github.com/hieubkvn123" target='_blank'>
							My Github
						</a>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

const mapStateToProps = (state) => ({
	historyView : state.items.historyView
})

export default connect(mapStateToProps, { get_item, get_item_complete })(UtilDropdown)