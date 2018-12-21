import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtNavBar, AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import TabBar from '../../components/tab-bar'

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
    getMovieData({ type, search }) {
        dispatch(getMovies({ type, search }))
    }
}))
class Search extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            searchvalue: ''
        }
    }
    onChange(value) {
        this.setState({
            searchvalue: value
        })
    }
    onActionClick() {
        console.log(this.state.searchvalue)
        this.props.clearMovieData()
        this.getMovieList(this.state.searchvalue)
    }
    getMovieList = (search) => {
        this.props.getMovieData({ type: 'search', search })
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

        // setTimeout(() => {
        //     this.getMovieList()
        // }, 2000);
    }

    componentWillUnmount() {
        this.props.clearMovieData()
    }

    render() {
        return (
            <ScrollView className='md-search' scrollY onScrollToLower={this.onReachBottom.bind(this)} scrollWithAnimation>
                <AtNavBar
                    color='#000'
                    title='电影搜索'
                    fixed
                />
                <View className='md-search__box'>
                    <AtSearchBar
                        value={this.state.searchvalue}
                        onChange={this.onChange.bind(this)}
                        onActionClick={this.onActionClick.bind(this)}
                    />
                </View>
                <MovieList movies={this.props.movies} hasMore={this.props.hasMore} type={this.state.type}></MovieList>
                <TabBar tab={1}></TabBar>
            </ScrollView>
        )
    }
}

export default Search