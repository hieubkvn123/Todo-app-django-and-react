import {
	ADD_ITEM,
	GET_ITEM,
	DELETE_ITEM,
	COMPLETE_TASK,
	GET_COMPLETE_ITEM
} from '../actions/types'

const initialState = {
	items : [],
	historyView : false
}

export default function itemReducer(state=initialState, action) {
	switch(action.type) {
		case GET_ITEM:
			return {
				items : action.payload,
				historyView : false
			}
		case GET_COMPLETE_ITEM:
			return {
				items : action.payload,
				historyView : true
			}
		case ADD_ITEM:
			return {
				...state,
				items : [action.payload, ...state.items]
			}
		case DELETE_ITEM:
			return {
				...state,
				items : state.items.filter(item => item.id !== action.payload)
			}
		case COMPLETE_TASK:
			return {
				...state,
				items : state.items.filter(item => item.id !== action.payload)
			}
		default :
			return state
	}
}