import {
	MSG_SUCCESS,
	MSG_FAILED,
	MSG_WARNING,
	MSG_CLEAR
} from '../actions/types'

const initialState = {
	type : null,
	msg : null
}

export default function msgReducer(state=initialState, action) {
	switch(action.type) {
		case MSG_SUCCESS:
		case MSG_FAILED:
		case MSG_WARNING:
			return {
				...state,
				type : action.payload.type,
				msg : action.payload.message
			}
		case MSG_CLEAR:
			return {
				...state,
				type : null,
				msg : null
			}
		default:
			return state
	}
}