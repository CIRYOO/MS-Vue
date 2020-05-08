<template>
  <div class="activity_info">
    <div class="top_bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户总览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索筛选 -->
    <el-form :inline="true"  class="user-search">
      <el-form-item label="搜索：">
        <el-input v-model="serchUserName" size="small" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="searchUser"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table
      size="small"
      :data="userList"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="realName" label="姓名" width="250">
      </el-table-column>
      <el-table-column sortable prop="phoneNum" label="手机号码" width="250">
      </el-table-column>
      <el-table-column sortable prop="addTime" label="修改时间" width="250">
      </el-table-column>
      <el-table-column  sortable prop="state" label="是否联系" width="250">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === true ? 'success' : 'warning'">{{scope.row.state}}</el-tag>
          
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="changeState(scope.$index, scope.row)"
            >已联系</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
   
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      serchUserName:'',
      loading: false,
      editFormVisible: false,
      userList:[],
    };
  },
  methods: {
    searchUser(){
      this.$axios.post('/api/activity-api/activity/userList/realName/{realName}',qs.stringify({
          realName:this.serchUserName
      })).then(response =>{
        this.userList = response.data.data
        
      }).catch(error =>{
        console.log(error)
      })
    },
    changeState(index,row){
      this.$axios.post('/api/activity-api/activity/user/change/{id}',qs.stringify({
        state:!row.state,
        id:row.id

      })).then(response =>{
        // alert('已修改')
        this.$message({
          showClose: true,
          message: '已修改',
          type: 'success'
        });
         this.$axios("/api/activity-api/activity/userList")
      .then(response => {
        this.userList = response.data.data
        })
      .catch(error => {
        console.log(error);
      });
      })
    },
  
    // 删除用户
    deleteUser(index, row) {
     this.$axios.post('/api/activity-api/activity/userList/{id}',qs.stringify({
        id:row.id
      })).then(response =>{
         this.$axios("/api/activity-api/activity/userList")
      .then(response => {
        this.userList = response.data.data
        })
      .catch(error => {
        console.log(error);
      });
        // alert("删除成功！")
        this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success'
        });
      }).catch(error =>{
        console.log(error)
      })
    },
    closeDialog() {
      this.editFormVisible = false;
    }
  },
  created(){
    this.$axios("/api/activity-api/activity/userList")
      .then(response => {
        this.userList = response.data.data
        })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.user-search {
  margin-top: 20px;
}

</style>
