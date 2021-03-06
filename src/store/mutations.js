export default {
  // 收藏
  getSelectDate(state, data) {
    state.selectData.push(data)
  },
  // 收藏图标
  like(state, data) {
    state.likeImg = data
  },
  // 取消收藏
  likeSelectDate(state, data) {
    state.selectData.splice(state.selectData.indexOf(data), 1)
  },
  // 展示 赞 收藏 的 状态
  showLike(state, data) {
    state.showLike = data
    state.showMosk = data
  },
  showZan(state, data) {
    state.showzan = data
  },
  favourites(state, data) {
    state.favourite = data
  },
  keepZan(state, data) {
    state.keepZan.push(data)
  },
  Zan(state, data) {
    state.keepZan.splice(state.keepZan.indexOf(data), 1)
  },
  showLogin(state, data) {
    state.loginVisible = data
  },
  setSeller(state, data) {
    state.seller = data
  },
  setHomeList(state, data){
    state.homeList = data
  }
}
