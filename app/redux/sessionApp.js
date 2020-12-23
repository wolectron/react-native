// Action Types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function login(sessionId, orgId){
    console.log("In login action function");
    return {
        type: LOGIN,
        payload: {
            sessionId: sessionId,
            orgId: orgId,
        }
    }
}

export function logout(){
    return {
        type: LOGOUT,
        payload: {

        }
    }
}

const initialState = {
    sessionId: null,
    orgId: null,
    sessionState: LOGOUT,
}

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                sessionId: action.payload.sessionId,
                orgId: action.payload.orgId,
                sessionState: LOGIN
            }
        
        case LOGOUT:
            return {
                ...state,
                sessionId: null,
                orgId: null,
                sessionState: LOGOUT
            }
        
            default:
                return state
    }
}

export default sessionReducer