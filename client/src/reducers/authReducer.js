import { 
	LOGIN_SUCCESS, 
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : localStorage.getItem('isAuthenticated'),
    isLoading : false,
    user : localStorage.getItem('user')
}

export default function authReducer(state=initialState, action) {
	switch(action.type) {
		case LOGIN_SUCCESS :
		case REGISTER_SUCCESS :
			const { user, token } = action.payload
			localStorage.setItem('user', user)
			localStorage.setItem('token', token)
			localStorage.setItem('isAuthenticated', true)

			return {
				...action.payload,
				isAuthenticated : true,
				isLoading : false
			}	
		case REGISTER_FAIL : 
		case LOGOUT_SUCCESS:
		case LOGIN_FAIL:
			localStorage.removeItem('user')
			localStorage.removeItem('token')
			localStorage.removeItem('isAuthenticated')

			return {
				...state,
				isAuthenticated : false,
				isLoading : false
			}
		default:
			return state
	}
}