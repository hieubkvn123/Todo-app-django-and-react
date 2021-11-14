import {
	ADD_ITEM, 
	GET_ITEM,
	DELETE_ITEM,
	UPDATE_ITEM,
	COMPLETE_TASK,
	GET_COMPLETE_ITEM
} from './types'
import { msg_success, msg_failed } from './msgAction'
import axios from 'axios'

export const add_item = (title, description, due_date) => dispatch => {
	const token = localStorage.getItem('token')
	const username = localStorage.getItem('user')
	const header = {
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Token ${token}`
		}
	}

	const body = { username, title, description, due_date : new Date(due_date).toISOString()}

	axios.post('/todo/items/', body, header)
		.then(res => {
			dispatch(msg_success("Item added"))
			dispatch({
				type : ADD_ITEM,
				payload : res.data
			})
		})
		.catch(res => {
			dispatch(msg_failed("Something wrong happened"))
		})
}

export const get_item = () => dispatch => {
	const token = localStorage.getItem('token')
	const header = {
		headers : {
			'Authorization' : `Token ${token}`,
			'Content-Type' : 'application/json'
		}
	}

	axios.get('/todo/items/', header)
		.then(res => {
			dispatch({
				type : GET_ITEM,
				payload : res.data.payload.items
			})
		})
		.catch(res => {
			console.log(res)
			dispatch(msg_failed("Cannot get items, please try again later"))
		})
}

export const get_item_complete = () => dispatch => {
	const token = localStorage.getItem('token')
	const header = {
		headers : {
			'Authorization' : `Token ${token}`,
			'Content-Type' : 'application/json'
		}
	}

	axios.get('/todo/items/get_complete', header)
		.then(res => {
			dispatch({
				type : GET_COMPLETE_ITEM,
				payload : res.data.payload.items
			})
		})
		.catch(res => {
			dispatch(msg_failed("Cannot get items, please try again later"))
		})
}

export const delete_item = (id) => dispatch => {
	const token = localStorage.getItem('token')
	const header = {
		headers : {
			'Authorization' : `Token ${token}`,
			'Content-Type' : 'application/json'
		}
	}

	axios.delete(`/todo/items/${id}`, header)
		.then(res => {
			dispatch(msg_success("Item deleted!"))
			dispatch({
				type : DELETE_ITEM,
				payload : id
			})
		})
		.catch(res => {
			dispatch(msg_failed("Cannot delete item, please try again later"))
		})
}

export const update_item = (id, title, description, due_date) => dispatch => {
	const username = localStorage.getItem('user')
	const token = localStorage.getItem('token')

	const header = {
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Token ${token}`
		}
	}

	const body = { username, title, description, due_date : new Date(due_date).toISOString()}

	axios.put(`/todo/items/${id}\/`, body, header)
		.then(res => {
			dispatch(msg_success("Item updated!"))
			dispatch({
				type : UPDATE_ITEM,
				payload : id
			})
		})
		.catch(err => {
			dispatch(msg_failed("Cannot update item, please try again later"))
		})
}

export const complete_task = (title) => dispatch => {
	const username = localStorage.getItem('user')
	const token = localStorage.getItem('token')

	const header = {
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Token ${token}`
		}
	}

	const body = { username, title }

	axios.post('/todo/items/complete', body, header)
		.then(res => {
			dispatch(msg_success(res.data.msg))
			dispatch({
				type : COMPLETE_TASK,
				payload : res.data.payload
			})
		})
		.catch(res => {
			dispatch(msg_failed(res.response.data.msg))
		})
}