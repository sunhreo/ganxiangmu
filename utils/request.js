import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router/index.js'
const instance = axios.create()
export default instance
const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [function (data) {
        try {
        return JSONBig.parse(data)
        } catch (err) {
            return data
    }
    }]
})