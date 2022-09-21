import fly from '@/utils/request.js'

export function getBanners()
{
	return 	fly.get('/home/swiperdata')
}
export function getCatItems()
{
	return 	fly.get('/home/catitems')
}
export function getfloor()
{
	return 	fly.get('/home/floordata')
}