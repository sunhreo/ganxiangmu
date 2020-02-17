<template>
  <div class="container">
    <!-- 频道展示区域 -->
    <van-tabs v-model="activeChannelIndex">
      <!--对频道做遍历展示-->
      <van-cell
        v-for="item in articleList"
        :key="item.art_id.toString()"
        :title="item.title"
      >
        <template slot="label">
          <van-grid
            :border="false"
            v-if="item.cover.type > 0"
            :column-num="item.cover.type"
          >
            <van-grid-item v-for="(item2, k2) in item.cover.images" :key="k2">
              <van-image width="90" height="90" :src="item2" />
            </van-grid-item>
          </van-grid>
          <p>
            <span>作者:{{ item.aut_name }}</span>
            &nbsp;
            <span>评论 :{{ item.comm_count }}</span>
            &nbsp;
            <span>时间:{{ item.pubdate }}</span>
            &nbsp;
          </p>
        </template>
      </van-cell>
    </van-tabs>
  </div>
</template>

<script>
import { apiChannelList } from "@/api/channel";
import ComArticle from "./components/com-article";
export default {
  name: "home-index",
  components: {
    ComArticle
  },
  data() {
    return {
      channelList: [],
      activeChannelIndex: 0
    };
  },
  created() {
    // 频道
    this.getChannelList();
  },
  methods: {
    // 获得频道列表
    async getChannelList() {
      let result = await apiChannelList();
      // 接收频道信息
      this.channelList = result.channels;
    }
  }
};
</script>

<style scoped lang="less">
.van-tabs {
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直显示，正如一个列一样
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    // flex:1;的值是1 1 0%，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%】
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    // 给上拉列表设置样式
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
