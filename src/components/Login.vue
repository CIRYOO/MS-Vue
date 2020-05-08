<template>
  <div id="login">
    <el-form :model="loginForm">
      <h2>管理员登录</h2>
      <br />
      <br />

      <el-form-item>
        <el-input
          name="userName"
          placeholder="请输入用户名"
          v-model="loginForm.loginName"
          autofocus="true"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input name="password" placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button rount type="primary" :loading="loading" @click="loginState">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      loginForm:{
        loginName:'',
        password:'',
      },
      isLogin:false,
      loading: false,
      timer: ""
    };
  },
  methods: {
    loginState() {
      this.loading = !this.loading;
      clearTimeout(this.timer); //清除延迟执行
        this.$axios.post('/api/activity-api/activity/login',qs.stringify({
          loginName:this.loginForm.loginName,
          password:this.loginForm.password
        })).then(response =>{
          if(response.data.data!=''){
            // this.isLogin = true;
            // this.$emit('login',this.isLogin)
            // alert('登录成功！')
            this.$store.commit('loginIn')
            this.$message({
          showClose: true,
          message: '登录成功!',
          type: 'success'
        });
            this.loading = false;
            
          }else{
            this.$store.commit('loginOut')
            // this.isLogin = false
            // alert('登录失败！')
            this.$message({
          showClose: true,
          message: '登录失败！',
          type: 'error'
        });
            this.loading = false;
          }
        }).catch(error =>{
          console.log(error)
        })





      // this.$store.dispatch('login',this.loginForm)
      // this.timer = setTimeout(() => {
      //   //设置延迟执行
      //   if(this.loginName === this.$store.state.userName && this.password === this.$store.state.password){
      //   this.$store.commit("changeLoginState");
      //   }else{
      //       alert('账号或密码不正确')
      //       this.loginName = ''
      //       this.password = ''
      //       this.loading = false
      //   }

      // }, 1000);
    }
  }
};
</script>
<style  scoped>

.el-input {
  width: 300px;
}
#login {
  align-content: center;
  margin-left: 40%;
  margin-top: 10%;
}
</style>