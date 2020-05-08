<template>
  <div class="manage">
    <div v-if="$store.state.isLogin">
      <el-row>
        <el-col class="left_header" :span="3">
          <left-nav class="sss" />
        </el-col>
        <el-col class="right" :span="21">
          <el-row>
            <top-nav />
          </el-row>
          <el-row class="mainView">
            <router-view></router-view>
            
          </el-row>
        </el-col>
      </el-row>
    </div>

    <login v-else></login>
  </div>
</template>
<script>
import Login from "../components/Login.vue";
import LeftNav from "../components/admin/LeftNav.vue";
import TopNav from "../components/admin/TopNav.vue";

export default {
  data() {
    return {
      // isLogin: false
    };
  },
  methods: {
    loginIn(state){
      this.isLogin = state
    }
  },
  components: {
    Login,
    LeftNav,
    TopNav

  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.left_header {
  background: #334157;
}
.mainView{
  margin: 30px 30px;
}
</style>
