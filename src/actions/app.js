import { TAB_NUMBER } from '../constants/app'

// export function switchTab(tab) {
//     return (dispatch, getState) => {
//         const state = getState()
//         dispatch({
//             type: TAB_NUMBER,
//             payload: {
//                 tabnum: tab
//             }
//         })
//     }
// }

export const switchTab = (tab) => {
    return {
        type: TAB_NUMBER,
        payload: {
            tabnum: tab
        }
    }
}