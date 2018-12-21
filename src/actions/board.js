import { getBoardData } from '../utils/api'
import { BOARD_MOVIE_LIST, BOARD_BANNER } from '../constants/board'

export function getBoards() {
    return (dispatch, getState) => {
        const state = getState()
        const tasks = state.board.boards.map(board => {
            return getBoardData({ board: board.key, page: 1, count: 8 })
        })
        // console.log(tasks)
        Promise.all(tasks).then(boards => {
            state.board.boards.map((board, index) => {
                boards[index] = Object.assign({ key: board.key }, boards[index])
            })
            dispatch({
                type: BOARD_MOVIE_LIST,
                payload: boards
            })
        })
    }
}

export function getWeekly() {
    return (dispatch, getState) => {
        getBoardData({ board: 'weekly', page: 1, count: 8 }).then(data => {
            dispatch({
                type: BOARD_BANNER,
                payload: data
            })
        })
    }
}