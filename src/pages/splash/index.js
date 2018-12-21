import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components'

import { getStorage, setStorage } from '../../utils/storage'

import { getBoardData } from '../../utils/api'

import './index.scss'

const LAST_SPLASH_DATA = 'LAST_SPLASH_DATA'

class Splash extends Component {
    static defaultProps = {
        movies: []
    }

    state = {
        movies: []
    }

    // 获取缓存数据
    async getCache() {
        try {
            let res = await getStorage(LAST_SPLASH_DATA)
            const { movies, expires } = res.data
            // 有缓存，判断是否过期
            if (movies && expires > Date.now()) {
                return res.data
            }
            // 已经过期
            console.log('uncached')
            return null
        } catch (error) {
            return null
        }
    }

    // 进入首页
    handleStart() {
        // 跳转到目的页面，在当前页面打开
        Taro.navigateTo({
            url: '/pages/board/index'
        })
    }

    // 获取默认列表数据
    async getInitData() {
        let cache = await this.getCache()
        if (cache) {
            this.setState({
                movies: cache.movies
            })
            return
        }
        let data = await getBoardData({ board: 'coming_soon', page: 1, count: 3 })
        this.setState({
            movies: data.subjects
        })
        await setStorage(LAST_SPLASH_DATA, {
            movies: data.subjects,
            expires: Date.now() + 1 * 24 * 60 * 60 * 1000
        })
    }

    componentDidMount() {
        this.getInitData()
    }

    render() {
        return (
            <View className='md-splash'>
                <Swiper className='md-splash__swiper'
                    indicatorDots='true'
                    indicatorActiveColor='#007aff'
                    indicatorColor='#999'
                    circular='true'
                >
                    {
                        this.state.movies.map((item, index) => (
                            <SwiperItem className='md-splash__item' key={item.id}>
                                <Image src={item.images.large} className='md-splash__image' mode='aspectFill' />
                                {
                                    index === this.state.movies.length - 1 ?
                                        <Button className='md-splash__start' onClick={this.handleStart}>立即体验</Button> :
                                        null
                                }
                            </SwiperItem>
                        ))
                    }
                </Swiper>
            </View>
        )
    }
}

export default Splash