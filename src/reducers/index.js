import { combineReducers } from 'redux'
import counter from './counter'
import board from './board'
import movie from './movie'
import app from './app'

export default combineReducers({
  counter,
  board,
  app,
  movie
})
