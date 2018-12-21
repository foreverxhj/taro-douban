import Taro from '@tarojs/taro'
import { baseUrl, noConsole } from './config'
// 额外参数
const request_data = {};

export default (options = { method: 'GET', data: {} }) => {
    // 是否需要打印请求接口
    if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`)
    }

    return Taro.request({
        url: baseUrl + options.url,
        data: {
            ...request_data,
            ...options.data
        },
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        },
        // mode: 'no-cors',
        method: options.method.toUpperCase()
    }).then((res) => {
        if (!noConsole) {
            console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data);
        }
        if (res.statusCode === 200) {
            return res.data
        } else {
            throw new Error(`网络请求错误:${res}`);
        }
    }).catch((e) => {
        throw new Error(`网络请求错误:${e}`);
    })
}
