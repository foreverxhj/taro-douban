import Taro, { Component } from '@tarojs/taro'
import { View, Image, Block, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getMovie, clearMovie } from '../../actions/movie'

import './index.scss'

@connect(({ movie }) => ({
    movie: movie.movie
}), (dispatch) => ({
    getMovieData(id) {
        dispatch(getMovie(id))
    },
    clearMovieItemData() {
        dispatch(clearMovie())
    }
}))
class Item extends Component {
    static defaultProps = {
        id: ''
    }

    componentWillMount() {
        this.setState({
            id: this.$router.params.id
        })
    }

    componentDidMount() {
        this.props.getMovieData(this.state.id)
    }

    componentWillUnmount() {
        this.props.clearMovieItemData()
    }

    render() {
        const movie = this.props.movie

        return (
            <View className='md-item'>
                {movie.images && <Image className='md-item__background' src={movie.images.large} mode='aspectFill' />}
                {
                    movie.title && <Block v-if=''>
                        <View className='md-item__meta'>
                            <Image className='md-item__poster' src={movie.images.large} mode='aspectFit' />
                            <Text className='md-item__title'>{movie.title}({movie.year})</Text>
                            <Text className='md-item__info'>评分：{movie.rating.average}</Text>
                            <Text className='md-item__info'>
                                导演：{movie.directors.map(director => (<Block key={director.id}> {director.name + ' '} </Block>))}
                            </Text>
                            <Text className='md-item__info'>
                                主演：{movie.casts.map(cast => (<Block key={cast.id}> {cast.name + ' '} </Block>))}
                            </Text>
                        </View>
                        <View className='md-item__summary'>
                            <Text className='md-item__label'>摘要：</Text>
                            <Text className='md-item__content'>{movie.summary}</Text>
                        </View>
                    </Block>
                }
            </View>
        )
    }
}

export default Item