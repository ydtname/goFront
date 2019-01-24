<template>
  <transition name="move">
    <div class="viewspot" v-show="show" ref="viewspot">
      <div class="viewspot-content">
        <div class="close iconfont icon-fanhui1" @click.stop.prevent="close"></div>
        <!-- 景点介绍 -->
        <div class="viewspot__intro">
          <div class="viewspot__intro-img">
            <!-- 蒙层 -->
            <div class="viewspot__mosk"></div>
            <img :src="selectGoods.pic">
            <div class="viewspot__intro-title">
              <h2 class="title">{{selectGoods.title}}</h2>
              <p class="ptag">{{selectGoods.sub_title}}</p>
            </div>
          </div>
          <div class="viewspot__intro-text border-1px">
            <p class="first">
              <strong class="em">出发君说:</strong>
              {{selectGoods.introduce}}
            </p>
            <p>
              <strong class="em">推荐人群:</strong>
              {{selectGoods.recommend}}
            </p>
          </div>
          <!-- end -->
          <div class="menu__end">
            <i class="menu__end-logo"></i>
            <div class="style"></div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment" ref="commentHeight">
          <h2 class="comment__title">评论</h2>
          <div class="comment__textarea">
            <textarea class="textarea" placeholder="请填写评论" contenteditable v-model="words"></textarea>
            <p class="comment__words">
              <span class="comment__words-number">{{wordslength}}</span>
              <span>/270</span>
            </p>
            <p>
              <a
                href="javascript:;"
                class="comment__submit"
                :class="{'haswords':wordslength>0}"
                @click="submit"
              >评论</a>
            </p>
          </div>
          <!-- 评论列表 -->
          <comment :comments="selectFoods"></comment>
        </div>
        <!-- 样式 -->
      </div>
      <v-footer :count="count" :select="selectGoods" :seller="seller" ref="footer"></v-footer>
    </div>
  </transition>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import Comment from "../comment/comment.vue";
import Star from "../star/star.vue"
import Footer from "../goodsFooter/footer.vue"
// import { mapState, mapMutations } from 'vuex'
import { MessageBox, Toast } from 'mint-ui';
import { addHomeCommend, getHomeList } from '../../../api/api'

const ERR_OK = 0
export default {
  props: ["seller", "selectGoods"],
  data() {
    return {
      show: false,
      words: "",
      abc: {},
      count: 0,
      getdata: [],
      // selectGoods:'',
    }
  },
  components: { comment: Comment, star: Star, "v-footer": Footer },
  created() {
  },
  // watch: {
  //   seller() {
  //     this.$nextTick(() => {
  //       this.showDetail();
  //     });
  //   }
  // },
  updated() {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    showDetail() {
      this.show = true
      this.$refs.footer.init();
    },
    // 滚动条
    initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.viewspot, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    close() {
      this.show = false;
    },
    // 获取用户输入评论
    getInputComment() {
      let logined = sessionStorage.getItem('user')
      if (logined === 'true') {
        this.count++;
        let foodtype = this.selectGoods.comment || []
        if (this.words.length >= 1) {
          this.abc.content = this.words
          this.abc.avatar = this.seller.pic
          this.abc.user = this.seller.account
          this.abc.date = new Date();
          foodtype.unshift(this.abc)
        } else {
          return foodtype
        }
        this.getdata = foodtype;
        this.words = ""
        return foodtype
      } else {
        this.$store.commit('showLogin', true)
        MessageBox.alert('请先登录');
      }
    },
    // 提交按钮
    submit() {
      let foodtype = this.getInputComment()
      let para = {
        _id: this.selectGoods._id,
        comment: foodtype,
      }
      addHomeCommend(para).then(data => {
        let { msg, code, user } = data;
        Toast(msg);
        // this.getHomeList()
      }).catch(err => {
        console.log(err);
        Toast('接口错误');
      })
    },
  },
  computed: {
    wordslength() {
      let length;
      length = this.words.length;
      return length
    },
    inputContent() {
      return this.words
    },
    selectFoods() {
      let food = []
      food = this.selectGoods.comment
      for (var i in this.selectGoods.comment) {
        this.count = ++i
      }
      return food
    },
  }
}

</script>
<style lang="less">
/*1像素边框*/

@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  .border-1px {
    &:after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  .border-1px {
    &:after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}

/*行高*/

.line-height(@h: 44px, @l: 44px) {
  height: @h;
  line-height: @l;
}

/*字体*/

.font-size(@s: 12px, @c: #fff) {
  font-size: @s;
  color: @c;
}

// 公共样式
.commons {
  .em {
    padding-right: 5px;
    font-weight: bold;
  }
}

/*动画*/

.move-enter,
.move-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.3s linear;
}

.viewspot {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 120;
  background: #f5f5f5;
  opacity: 1;
  .close {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
    z-index: 111;
  }
  &__intro {
    position: relative;
    bottom: 48px;
    &-img {
      position: relative;
      width: 100%;
      padding-top: 90%;
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .viewspot__mosk {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      z-index: 2;
    }
    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      transform: translate(-50%, -50%);
      width: 80%;
      text-align: center;
    }
    .title {
      .font-size(24px, #fff);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: lighter;
    }
    .ptag {
      .font-size(16px, #fff);
      margin-top: 8px;
      font-weight: lighter;
    }
    &-text {
      position: relative;
      padding: 16px;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
    .first {
      padding-bottom: 15px;
    }
    .em {
      .commons>.em;
    }
  }
}

/*景点列表*/

.menu {
  position: relative;
  &__title {
    position: relative;
    padding: 10px 0;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid rgba(7, 17, 27, 0.2);
    }
    .common {
      .font-size(12px, #3c9);
    }
    &-date {
      padding-left: 15px;
      &:before {
        display: inline-block;
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #3c9;
        margin-right: 20px;
        border: 2px solid #f5f5f5;
        box-sizing: border-box;
      }
    }
    &-spot {
      padding: 10px 0 0 50px;
    }
    &-overview {
      .font-size(12px, #666);
      padding: 15px 15px 15px 50px;
      line-height: 1.5;
    }
  }
  /*列表*/
  .list {
    position: relative;
    padding: 0 15px 25px 15px;
    z-index: 5;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid rgba(7, 17, 27, 0.2);
    }
    &__header {
      padding: 15px 0 15px 0;
    }
    &__title {
      display: inline-block;
      font-size: 16px;
      color: #333;
      line-height: 1.5;
    }
    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #3c9;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      color: #f5f5f5;
      box-sizing: border-box;
      border: 2px solid #f5f5f5;
      margin-left: -5px;
    }
    &__warrper {
      width: 100%;
      overflow: hidden;
    }
    &__menu {
      width: 100%;
      height: 275px;
      overflow: hidden;
      @media only screen and (max-width: 320px) {
        height: 230px;
      }
    }
    &__img {
      width: 100%;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    &__text {
      background: #fff;
      padding: 0 10px;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      &-tag {
        font-size: 16px;
        font-weight: 700;
        padding: 10px 0;
      }
      &-common {
        padding-bottom: 15px;
      }
    }
    .em {
      .commons>.em;
    }
  }
  .line {
    position: absolute;
    top: 30px;
    left: 21px;
    z-index: 0;
    width: 4px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.06);
  }
}

.menu__end {
  position: relative;
  &-logo {
    display: inline-block;
    width: 194px;
    height: 68px;
    background: url(../../assets/images/end-bd.png) no-repeat left center;
    transform: scale(0.5, 0.5);
  }
}

.star-warrper {
  padding: 5px 0;
}

.style {
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.04);
}

.comment {
  position: relative;
  padding: 15px 15px 0 15px;
  bottom: 48px;
  &__title {
    font-size: 14px;
    height: 48px;
    line-height: 48px;
    color: #666;
  }
  &__textarea {
    .textarea {
      display: block;
      width: 100%;
      height: 90px;
      padding: 8px;
      box-sizing: border-box;
      font-size: 14px;
      resize: none;
      color: #333;
      border-top: 0;
      border-right: 1px solid #e6e6e6;
      border-bottom: 0;
      border-left: 1px solid #e6e6e6;
      border-radius: 0;
      background-color: #fff;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      outline: none;
    }
  }
  &__words {
    padding: 5px;
    font-size: 12px;
    line-height: 1;
    text-align: right;
    color: #999;
    border-right: 1px solid #e6e6e6;
    border-left: 1px solid #e6e6e6;
    background-color: white;
  }
  &__submit {
    display: block;
    height: 44px;
    overflow: hidden;
    font-size: 1.1429em;
    line-height: 44px;
    cursor: default;
    text-align: center;
    text-decoration: none;
    color: white;
    border: 1px solid #e6e6e6;
    background-color: #e6e6e6;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .haswords {
    background: #3c9;
  }
}

// 左边导航
.right__nav {
  position: fixed;
  bottom: 65px;
  right: 0;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px 0 0 6px;
  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -15px;
    background: url(../../assets/images/down.png) no-repeat;
    background-size: 100% 100%;
    width: 30px;
    height: 20px;
    transform: rotate(-90deg);
  } // 动画
  .down1 {
    animation: down 1s linear infinite;
  } // .down2 {
  //   animation: down 1s linear  infinite;
  // }
  &-warrper {
    position: relative;
    height: 100%;
  }
}

@keyframes down {
  0% {
    transform: translateX(0) rotate(-90deg);
    opacity: 1;
  }
  100% {
    transform: translateX(20px) rotate(-90deg);
    opacity: 0;
    width: 25px;
    margin-left: -5px;
  }
}

// 滚动菜单
.scroll__menu {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 70%; // background: rgba(7, 17, 27, 0.6);
  z-index: 151;
  &-mosk {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 70%;
    background: rgba(0, 0, 0, 0.6);
  }
  &-ul {
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    z-index: 100;
    width: 100%;
  }
  &-li {
    display: flex;
    align-items: center;
    flex: 1;
  }
  &-ptag {
    font-size: 14px;
    color: #fff;
    line-height: 50px;
    padding-left: 30px;
    font-weight: normal;
    letter-spacing: 1px;
    &:before {
      display: inline-block;
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #3c8;
      margin-right: 15px;
      opacity: 0.8;
    }
  }
  .scroll__line {
    position: absolute;
    top: 80px;
    width: 2px;
    height: 80%;
    background: rgba(255, 255, 255, 0.4);
    left: 35px;
  } // 关闭按钮
  .icon-close {
    position: absolute;
    z-index: 160;
    bottom: 20px;
    right: 20px;
    font-size: 24px;
    color: #fff;
    padding: 5px;
  } // 当前状态
  .click-active {
    color: #3c9;
  }
}

// 动画
.scroll-enter,
.scroll-leave-to {
  transform: transition3d(70%, 0, 0);
  opacity: 0;
}

.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.5s;
}
</style>
