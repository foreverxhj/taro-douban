import Taro from '@tarojs/taro'

export function getStorage(key) {
    return new Promise((resolve, reject) => {
        Taro.getStorage({ key: key })
            .then(resolve).catch(reject)
    })
}

export function setStorage(key, value) {
    return new Promise((resolve, reject) => {
        Taro.setStorage({ key: key, data: value })
            .then(resolve).catch(reject)
    })
}