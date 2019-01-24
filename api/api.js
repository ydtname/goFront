import axios from 'axios'

let base = ''

export const userLogin = params => {
  return axios.post(`${base}/api/user/login`, params).then(res => res.data)
}

export const getHomeList = params => {
  return axios.get(`${base}/api/home/list`, { params: params })
}

export const addHomeCommend = params => {
  return axios.post(`${base}/api/home/addCommond`, params).then(res => res.data)
}

export const changeUserFavourite = params => {
  return axios
    .post(`${base}/api/user/changeFavourite`, params)
    .then(res => res.data)
}
export const changeUserCollect = params => {
  return axios
    .post(`${base}/api/user/changeCollect`, params)
    .then(res => res.data)
}

export const getCategory = () => {
  return axios.get(`${base}/api/category/destination`)
}

export const getCityInfo = (params) => {
  return axios.get(`${base}/api/category/cityInfo`, { params: params })
}

// export const getHomeList = params => { return axios.get(`${base}/api/home/list`, { params: params }); };

// export const addHomeItem = params => { return axios.post(`${base}/api/home/add`, params).then(res => res.data); };

// export const editHomeItem = params => { return axios.post(`${base}/api/home/edit`, params).then(res => res.data); };

// export const removeHomeItem = params => { return axios.get(`${base}/api/home/remove`, { params: params }); };

// export const batchRemoveHomeItem = params => { return axios.post(`${base}/api/home/batchRemove`, params); };

// export const getCategoryList = params => { return axios.get(`${base}/api/category/list`, { params: params }); };

// export const addCategory = params => { return axios.post(`${base}/api/category/add`, params).then(res => res.data); };

// export const editCategory = params => { return axios.post(`${base}/api/category/edit`, params).then(res => res.data); };

// export const removeCategory = params => { return axios.get(`${base}/api/category/remove`, { params: params }); };

// export const batchRemoveCategory = params => { return axios.post(`${base}/api/category/batchRemove`, params); };

// export const getCityList = params => { return axios.get(`${base}/api/city/list`, { params: params }); };

// export const addCity = params => { return axios.post(`${base}/api/city/add`, params).then(res => res.data); };

// export const editCity = params => { return axios.post(`${base}/api/city/edit`, params).then(res => res.data); };

// export const removeCity = params => { return axios.get(`${base}/api/city/remove`, { params: params }); };

// export const batchRemoveCity = params => { return axios.post(`${base}/api/city/batchRemove`, params); };
