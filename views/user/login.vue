<template>
  <div class="user-login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单部分
      vant里边没有form相关组件，只有普通表单域组件
      van-cell-group是对普通表单域组件做封装
     -->
    <ValidationObserver ref="loginFormRef">
      <van-cell-group>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|phone"
          name="手机号"
        >
          <!--van-field 输入框表单域组件
        label="手机号" 表单域前边的名字设置
        required：不进行校验，设置表单域前边有"红星"
        clearable：表单域内容可以通过“叉号”清除
      -->
          <!-- 表单域校验，通过 ValidationProvider 对被校验的项目做包围
        name：校验失败，提示当前项目名称的
        rules：设置校验规则，required 必填
        接收"作用域插槽"数据，即校验失败错误信息
        v-slot
          在vue新版本中，可以通过v-slot接收作用域插槽数据，格式就是 v-slot="数据名称"
        slot-scope="stData" {{stData.errors[0]}}表现具体校验失败错误信息的
        形式上：v-slot="stData"     slot-scope="stData" 就是一样的
        一点小区别：
          v-slot:应用在template、组件标签
          slot-scope:应用在template、组件标签、普通html标签

        注意：
          当前这个地方只让使用v-slot（使用slot-scope，页面就没有效果了）

        v-slot="{errors}" 对象解构赋值  errors[0]
        v-slot="stData" {{stData.errors[0]}}

        当前校验部分，errors[0]  就可以访问到校验失败的错误信息了,固定用法
      -->
          <!-- 把校验的错误信息展示出来
        error-message：显示校验失败的错误信息
         -->
          <van-field
            v-model="loginForm.mobile"
            type="text"
            placeholder="请输入手机号码"
            label="手机号"
            required
            clearable
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" name="密码">
          <van-field
            v-model="loginForm.code"
            type="password"
            placeholder="请输入验证码"
            label="验证码"
            required
            clearable
            :error-message="errors[0]"
          >
            <!-- 命名插槽应用，提示相关按钮，是要给van-field组件内部的slot去填充的
        size="small" 设置按钮大小的
        type="primary" 设置按钮背景颜色
          -->
            <van-button slot="button" size="small" type="primary"
              >发送验证码</van-button
            >
          </van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>

    <div class="login-btn">
      <!--van-button
        type:按钮背景颜色
        size:按钮大小的
        round：圆圈效果
        block：块级样式设置，占据一行
      -->
      <van-button
        type="info"
        block
        @click="login()"
        :loading="isLogin"
        loading-text="登录中..."
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
// 验证相关模块导入
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "user-login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      isLogin: false, // 登录等待
      loginForm: {
        mobile: "13911111111",
        code: "246810"
      }
    };
  },
  methods: {
    async login() {
      let valid = await this.$refs.loginFormRef.validate();
      if (!valid) {
        return false;
      }
      this.isLogin = true; // 开启等待效果
      try {
        let result = await apiUserLogin(this.loginForm);
        this.updateUser(result);
        this.$toast.success("登录成功");
        this.$router.push("/");
      } catch (err) {
        return this.$toast.fail("账号ddd不正确");
      }
      this.isLogin = false; // 关闭等待效果
    }
  }
};
</script>

<style scoped lang="less"></style>
