import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { switchTab } from '../../actions/app'

@connect(({ app }) => ({
    tabnum: app.tabnum
}), (dispatch) => ({
    switchTab(tab) {
        dispatch(switchTab(tab))
    }
}))
class TabBar extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        current: 0,
        tab: 0
    }

    handleClick(value) {
        if (this.state.current !== value) {
            this.props.switchTab(value)
            this.navigateSwitch(value)
        } else {
            return false
        }
    }

    navigateSwitch = (value) => {
        let Url = ''
        switch (value) {
            case 0:
                Url = '/pages/board/index'
                break;
            case 1:
                Url = '/pages/search/index'
                break;
            default:
                break;
        }
        Taro.navigateTo({
            url: Url
        })
    }

    componentDidMount() {
        this.setState({
            current: this.props.tab
        })
    }

    render() {
        return (
            <AtTabBar
                fixed
                tabList={[
                    { title: '首页', iconType: 'bullet-list' },
                    { title: '搜索', iconType: 'search', dot: 'New' }
                ]}
                onClick={this.handleClick.bind(this)}
                current={this.state.current}
            />
        )
    }
}

export default TabBar
