import { TAB_NUMBER } from '../constants/app'

const INITIAL_STATE = {
    tabnum: 0
}

export default function board(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TAB_NUMBER:
            return {
                ...state,
                tabnum: action.payload.tabnum,
            }
        default:
            return state
    }
}
