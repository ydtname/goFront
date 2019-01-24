<template>
  <div class="footer">
    <div class="footer__favourite common" @click.stop.prevent="changeFavourite">
      <!-- <i class="iconfont" :class="[show?'icon-zan1':'icon-zan']"></i> -->
      <i class="iconfont" :class="favrouriteImg"></i>
      <span>{{favrourite}}</span>
    </div>
    <div class="footer__comment common">
      <i class="iconfont icon-pinglun1"></i>
      <span>评论({{count}})</span>
    </div>
    <div class="footer__share common" @click.stop.prevent="changeCollect">
      <i class="iconfont" :class="likeImg"></i>
      <span>{{collect}}</span>
    </div>
    <!-- 蒙版 -->
    <div class="footer__mosk" v-show="mosk">
      <div class="footer__mosk-text">{{prompt}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import bus from "../../../static/eventBus.js"
import { MessageBox, Toast } from 'mint-ui';
import { changeUserFavourite, changeUserCollect, userLogin } from '../../../api/api'
export default {
  props: ["count", "select", "seller"],
  data() {
    return {
      show: false,
      // hide: false,
      mosk: false,
      localDate: {},
      localArr: [],
      nums: 0,
    }
  },
  computed: {
    // 得到图片
    likeImg() {
      return this.$store.state.likeImg
    },
    favrouriteImg() {
      return this.$store.state.favourite
    },
    favrourite() {
      if (this.$store.state.showzan === true) {
        return "已赞"
      } else {
        return "赞"
      }
      return favrourite
    },
    collect() {
      if (this.$store.state.showLike === true) {
        return "已收藏"
      } else {
        return "收藏"
      }
      return collect
    },
    prompt() {
      if (this.$store.state.showMosk === true) {
        return "请在我的收藏里面查看"
      } else {
        return "取消收藏"
      }
      return prompt
    }
  },
  methods: {
    init() {
      this.$store.commit("favourites", "icon-zan")
      this.$store.commit("showZan", false)
      this.$store.commit("like", "icon-shoucang");
      this.$store.commit("showLike", false)
      this.seller.favourite = this.seller.favourite || []
      this.seller.collect = this.seller.collect || []
      this.seller.favourite.forEach(element => {
        if (this.select._id === element) {
          this.$store.commit("favourites", "icon-zan1")
          this.$store.commit("showZan", true)
          this.$store.commit("keepZan", this.select)
        }
      });
      this.seller.collect.forEach(element => {
        if (this.select._id === element) {
          this.$store.commit("getSelectDate", this.select);
          this.$store.commit("like", "icon-shoucang1");
          this.$store.commit("showLike", true)
        }
      });
    },
    updateSeller() {
      let params = {
        account: this.seller.account,
        password: this.seller.password
      }
      userLogin(params).then(res => {
        let { user } = res
        sessionStorage.setItem('seller', JSON.stringify(user))
        this.$store.commit('setSeller', user)
      }).catch(err => {
        console.log(err)
        Toast('userLogin接口错误')
      })
    },
    changeFavourite() {
      let currentStatus = this.$store.state.showzan
      let para = { _id: this.seller._id }
      let currentId = this.select._id
      if (currentStatus) {
        this.$store.commit("favourites", "icon-zan")
        this.$store.commit("showZan", false)
        this.$store.commit("Zan", this.select)
        para.favourite = this.seller.favourite.filter(element => currentId !== element)
      } else {
        this.$store.commit("favourites", "icon-zan1")
        this.$store.commit("showZan", true)
        this.$store.commit("keepZan", this.select)
        this.seller.favourite.push(currentId)
        para.favourite = this.seller.favourite
      }
      changeUserFavourite(para).then(res => {
        // let { code, msg } = res
        currentStatus ? Toast('取消点赞') : Toast('点赞成功')
        this.updateSeller()
      }).catch(err => {
        console.log(err);
        Toast('changeFavourite接口错误');
      })
    },
    changeCollect() {
      let currentStatus = this.$store.state.showLike
      let para = { _id: this.seller._id }
      let currentId = this.select._id
      if (currentStatus) {
        this.$store.commit("likeSelectDate", this.select);
        this.$store.commit("like", "icon-shoucang");
        this.$store.commit("showLike", false)
        para.collect = this.seller.collect.filter(element => currentId !== element)
      } else {
        this.$store.commit("getSelectDate", this.select);
        this.$store.commit("like", "icon-shoucang1");
        this.$store.commit("showLike", true)
        this.seller.collect.push(currentId)
        para.collect = this.seller.collect
      }
      changeUserCollect(para).then(res => {
        // let { code, msg } = res
        currentStatus ? Toast('取消收藏') : Toast('收藏成功')
        this.updateSeller()
      }).catch(err => {
        console.log(err);
        Toast('changeCollect接口错误');
      })

    },
  },
}

</script>
<style lang="less">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  height: 48px;
  line-height: 48px;
  width: 100%;
  z-index: 150;
  background: #f5f5f5;
  border-top: 1px solid rgba(7, 17, 27, 0.2);
  .common {
    flex: 1;
    text-align: center;
    color: #3c9;
  }
  .iconfont {
    font-size: 24px;
  }
  &__mosk {
    position: fixed;
    top: 65%;
    left: 30%;
    bottom: 48px;
    text-align: center;
    height: 34px;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    padding: 5px 10px;
    box-sizing: border-box;
    line-height: 22px;
    z-index: -1;
    border-radius: 5px;
  }
}

.on {
  color: #3c9;
}
</style>
