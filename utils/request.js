import Fly from 'flyio/dist/npm/wx'
import toast from '@/utils/toast.js'
const fly = new Fly()

fly.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

fly.interceptors.response.use(response => {
	return response.data
}, err => {
	toast.error('请求失败')
	console.dir(err)
})

export default fly
