<template>
  <!-- 文章列表展示区域 -->
  <div class="scroll-wrapper">
    <!-- 下拉 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 文章上拉列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in articleList"
          :key="item.art_id.toString()"
          :title="item.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { apiArticleList } from "@/api/article";
export default {
  name: "com-article",
  data() {
    return {
      // 声明一个时间戳成员，用于获取文章使用
      ts: Date.now(),
      // 当前频道文章列表信息
      articleList: [],
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    };
  },
  props: {
    // 当前选中的频道id信息
    channel_id: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 获得文章列表
    async getArticleList() {
      let result = await apiArticleList({
        channel_id: this.channel_id,
        timestamp: this.ts,
        with_top: 1
      });
      // data接收获取的文章
      this.articleList = result.results;
      // 更新时间戳信息
      this.ts = result.pre_timestamp;
    },
    // 下拉刷新载入
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false; // 暂停拉取
        this.onLoad(); // 获取数据一次
      }, 1000);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 获取文章
        this.getArticleList();
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 给上拉列表设置样式
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>
