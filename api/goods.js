import fly from '@/utils/request.js'

export function getSearchGoods (data)
{
	return 	fly.get('/goods/search', data)
}