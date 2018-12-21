import Taro, { Component } from '@tarojs/taro'
import { AtNavBar } from 'taro-ui'
import { View, Swiper, SwiperItem, Image, Block, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import TabBar from '../../components/tab-bar'

import { getBoards, getWeekly } from '../../actions/board'

import './index.scss'
import arrowRightPng from '../../assets/images/arrowright.png'

@connect(({ board }) => ({
    boards: board.boards,
    movies: board.movies
}), (dispatch) => ({
    getBoardData() {
        dispatch(getBoards())
    },
    getWeeklyData() {
        dispatch(getWeekly())
    }
}))
class Board extends Component {


    static defaultProps = {
        movies: [],
        boards: []
    }

    // config = {
    //     navigationBarTitleText: '榜单 « 电影 « 豆瓣'
    // }

    componentDidMount() {
        this.props.getBoardData()
        this.props.getWeeklyData()
    }

    navigateToList = (item) => {
        Taro.navigateTo({
            url: '/pages/list/index?type=' + item.key + '&title=' + item.title
        })
    }

    navigateToItem = (id) => {
        Taro.navigateTo({
            url: '/pages/item/index?id=' + id
        })
    }

    render() {
        return (
            <View className='md-board'>
                <AtNavBar
                    // onClickRgIconSt={this.handleClick}
                    // onClickRgIconNd={this.handleClick}
                    // onClickLeftIcon={this.handleClick}
                    color='#000'
                    title='豆瓣电影'
                    fixed
                // leftText='返回'
                // rightFirstIconType='bullet-list'
                // rightSecondIconType='user'
                />
                <View className='md-board__slide'>
                    <Swiper className='md-board__swiper' autoplay interval={3000} duration={1000} indicatorDots>
                        {
                            this.props.movies.map((movie, index) => (
                                <SwiperItem key={index}>
                                    <Image className='md-board__slide-image' src={movie.subject.images.large} mode='widthFix' onClick={this.navigateToItem.bind(this, movie.subject.id)} />
                                </SwiperItem>
                            ))
                        }
                    </Swiper>
                </View>
                <View className='md-board__list' scroll-y>
                    {
                        this.props.boards.map((item, index) => (
                            <Block key={item.key}>
                                <View className='md-board__item'>
                                    <View className='md-board__title' onClick={this.navigateToList.bind(this, item)}>
                                        <Text className='md-board__title-text'>{item.title}</Text>
                                        <Image className='md-board__title-image' src={arrowRightPng} mode='aspectFill' />
                                    </View>
                                    <ScrollView className='md-board__content' indicatorDots scrollX upperThreshold lowerThreshold scrollWithAnimation>
                                        {
                                            item.key !== 'us_box' ?
                                                <View className='md-board__inner'>
                                                    {
                                                        item.subjects && item.subjects.map((movie, i) => (
                                                            <View className='md-board__movie' key={movie.id + index + i} onClick={this.navigateToItem.bind(this, movie.id)}>
                                                                <Image className='md-board__movie-image' src={movie.images.large} mode='aspectFill' />
                                                                <Text className='md-board__movie-text'>{movie.title}</Text>
                                                            </View>
                                                        ))
                                                    }
                                                </View> :
                                                <View className='md-board__inner'>
                                                    {
                                                        item.subjects && item.subjects.map((movie, i) => (
                                                            <View className='md-board__movie' key={movie.rank + index + i} onClick={this.navigateToItem.bind(this, movie.subject.id)}>
                                                                <Image className='md-board__movie-image' src={movie.subject.images.large} mode='aspectFill' />
                                                                <Text className='md-board__movie-text'>{movie.subject.title}</Text>
                                                            </View>
                                                        ))
                                                    }
                                                </View>
                                        }
                                    </ScrollView>
                                </View>
                            </Block>
                        ))
                    }
                </View>
                <TabBar tab={0}></TabBar>
            </View>
        )
    }
}

export default Board