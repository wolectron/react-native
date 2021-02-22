// Action Types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function login(sessionId, org){
    console.log("In login action function");
    return {
        type: LOGIN,
        payload: {
            sessionId: sessionId,
            org: org,
        }
    }
}

export function logout(org){
    return {
        type: LOGOUT,
        payload: {
            org: org,
        }
    }
}

export function switchApp(sessionState, sessionId, org){
    return {
        type: sessionState,
        payload: {
            sessionId: sessionId,
            org: org,
        }
    }
}

const initialState = {
    sessionId: null,
    org: null,
    sessionState: LOGOUT,
}

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                sessionId: action.payload.sessionId,
                org: action.payload.org,
                sessionState: LOGIN
            }
        
        case LOGOUT:
            return {
                ...state,
                sessionId: null,
                org: action.payload.org,
                sessionState: LOGOUT
            }
        
            default:
                return state
    }
}

export default sessionReducer