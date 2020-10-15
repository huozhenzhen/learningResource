import request from '@/utils/request'

export function getBlogList(params) {
  return request({
    url: '/blog/list',
    method: 'get',
    params
  })
}
export function getBlogDetail(params) {
  return request({
    url: '/blog/detail',
    method: 'get',
    params
  })
}

export function saveBlog(data) {
  return request({
    url: '/blog/new',
    method: 'post',
    data
  })
}
export function updateBlog(data, params) {
  return request({
    url: '/blog/update',
    method: 'post',
    data,
    params
  })
}

export function deleteBlog(params) {
  return request({
    url: '/blog/delete',
    method: 'post',
    params
  })
}
