import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getMovies, clearMovies } from '../../actions/movie'
import MovieList from '../../components/movie-list'

import './index.scss'

@connect(({ movie }) => ({
    movies: movie.movies,
    hasMore: movie.hasMore
}), (dispatch) => ({
    clearMovieData() {
        dispatch(clearMovies())
    },
    getMovieData({ type }) {
        dispatch(getMovies({ type }))
    }
}))
class List extends Component {
    state = {
        type: '',
        title: ''
    }

    getMovieList = () => {
        this.props.getMovieData({ type: this.state.type })
    }

    onReachBottom() {
        console.log('到底部了')
        this.props.hasMore && this.getMovieList()
    }

    componentWillMount() {
        const { type, title } = this.$router.params
        this.setState({ type, title })
    }

    componentDidMount() {
        this.getMovieList()
        // setTimeout(() => {
        //     this.getMovieList()
        // }, 2000);
    }

    componentWillUnmount() {
        this.props.clearMovieData()
    }

    render() {
        return (
            <ScrollView className='md-list' scrollY onScrollToLower={this.onReachBottom.bind(this)} scrollWithAnimation>
                <MovieList movies={this.props.movies} hasMore={this.props.hasMore} type={this.state.type}></MovieList>
            </ScrollView>
        )
    }
}

export default List