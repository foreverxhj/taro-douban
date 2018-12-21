import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'

import './index.scss'

class MovieItem extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    movie: {}
  }
  render() {
    return (
      <View className='md-movie-item'>
        <View className='md-movie-item__item'>
          <Image className='md-movie-item__poster' src={this.props.movie.images.small}></Image>
          <View className='md-movie-item__meta'>
            <Text className='md-movie-item__title'>{this.props.movie.title}</Text>
            <Text className='md-movie-item__sub-title'>{this.props.movie.original_title} ({this.props.movie.year})</Text>
            <View className='md-movie-item__artists'>
              导演：{
                this.props.movie.directors && this.props.movie.directors.map(director => (
                  (director && director.name) ? <Text key={this.props.movie.id}> {director.name} </Text> : null
                ))
              }
            </View>
          </View>
          <View className='md-movie-item__rating'>
            <Text className='md-movie-item__rating-text'>{this.props.movie.rating.average}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default MovieItem
