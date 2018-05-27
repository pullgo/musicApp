import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

//Object.assgin() 用于将所有可枚举的属性的值从一个或者多个元对象复制到目标对象 并返回目标对象
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
	    uin: 0,
	    needNewCode: 1
	})
	return jsonp (url, data, options)
}

//歌单列表
export function getDiscList() {
	const  url = '/api/getDiscList'//不是'api/getDiscList'
	//https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg

	const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
