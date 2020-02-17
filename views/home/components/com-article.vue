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
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: "com-article",
  data() {
    return {
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
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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
