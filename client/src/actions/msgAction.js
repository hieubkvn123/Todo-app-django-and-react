import { 
	MSG_SUCCESS,
	MSG_FAILED,
	MSG_WARNING,
	MSG_CLEAR
} from './types'

export const msg_success = (msg) =>  {
	return {
		type : MSG_SUCCESS,
		payload : {
			message : msg,
			type : "success"
		}
	}
}

export const msg_failed = (msg) => {
	return {
		type : MSG_FAILED,
		payload : {
			message : msg,
			type : 'failed'
		}
	}
}

export const msg_warning = (msg) => {
	return {
		type : MSG_WARNING,
		payload : {
			message : msg,
			type : 'warning'
		}
	}
}

export const clear_msg = () => {
	return {
		type : MSG_CLEAR
	}
}