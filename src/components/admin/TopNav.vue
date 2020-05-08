<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#334157"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
        <el-button class="btn_show" type="primary" icon="el-icon-s-fold"></el-button>

      <el-submenu index="1" class="admin_list">
        <template slot="title">管理员</template>
        <!-- <el-menu-item index="1-1">管理员信息</el-menu-item> -->
        <el-menu-item index="1-2" @click="loginOut">退出</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    loginOut(){
    this.$store.commit('loginOut');
    if($store.state.isLogin=false){
      this.$message({
          showClose: true,
          message: '退出成功！',
          type: 'success'
        });
    }else if($store.state.isLogin=true){
      this.$message({
          showClose: true,
          message: '退出失败！',
          type: 'error'
        });
    }else{
      this.$message({
          showClose: true,
          message: '功能异常，请联系开发者',
          type: 'error'
        });
    }
  }
  },
  
};
</script>
<style scoped>
.el-menu-demo{
    border: none;
}
.admin_list{
    float: right;
}
.btn_show{
  background-color: #334157;
  border: none;
  font-size: 30px;
}
</style>