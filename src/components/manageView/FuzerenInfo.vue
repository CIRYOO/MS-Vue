<template>
  <div class="activity_info">
    <div class="top_bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>负责人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input v-model="fuzerenName" size="small" placeholder="输入负责人姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small"  type="primary" icon="el-icon-search" @click="searchFuzeren">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addFuzeren">添加</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table
      size="small"
      :data="fuzerenList"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column sortable prop="fuName" label="活动负责人姓名" width="150"></el-table-column>
      <el-table-column sortable prop="phoneNum" label="手机号码" width="190"></el-table-column>
      <el-table-column sortable prop="address" label="家庭住址" width="600"></el-table-column>
      <el-table-column sortable prop="editTime" label="修改时间" width="150"></el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" width="100"></el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFuzeren(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteFuzeren(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
    <!-- 添加、编辑页面 -->
    <el-dialog :title="title" :visible.sync="addFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="addFuzerenInfo" :rules="rules">
        <el-form-item label="id" prop="id">
          <el-input
            size="small"
            v-model="addFuzerenInfo.id"
            auto-complete="off"
            disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人姓名" prop="fuName">
          <el-input
            size="small"
            v-model="addFuzerenInfo.fuName"
            auto-complete="off"
            placeholder="请输入负责人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNum">
          <el-input
            size="small"
            v-model="addFuzerenInfo.phoneNum"
            auto-complete="off"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            size="small"
            v-model="addFuzerenInfo.address"
            auto-complete="off"
            placeholder="请输入负责人地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="当前时间" prop="editTime">
          <el-date-picker
            v-model="addFuzerenInfo.editTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="修改人" prop="editUser">
          <el-input
            size="small"
            v-model="addFuzerenInfo.editUser"
            auto-complete="off"
            placeholder="请输入修改人"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeAddDialog">取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="addFuzerenSave('addFuzerenInfo')"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      fuzerenName:'',
      addFuzerenInfo:{
        id:'',
        fuName:'',
        phoneNum:'',
        address:'',
        editTime:'',
        editUser:''
      },
      addFormVisible: false,
      fuzerenList: [],
      loading: false,
      title: "添加",

      rules: {
        fuName: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        editTime: [
          { required: true, message: "请选择修改时间", trigger: "blur" }
        ],
        editUser: [
          { required: true, message: "请输入修改人", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    searchFuzeren(){
      this.$axios
        .post(
          "/api/activity-api/activity/fuzerenList/fuName/{fuName}",
          qs.stringify({
            fuName: this.fuzerenName
          })
        )
        .then(response => {
          this.fuzerenList = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addFuzeren() {
      this.addFormVisible = true;
      this.title = "添加";
    },
    editFuzeren(index, row) {
      this.addFuzerenInfo = row;
      this.addFormVisible = true;
      this.title = "编辑负责人信息";
    },
    closeAddDialog() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },

    addFuzerenSave(addData) {
      if(this.addFuzerenInfo.id===''){
        this.$axios.post("/api/activity-api/activity/addFuzeren",qs.stringify({
            fuName: this.addFuzerenInfo.fuName,
            phoneNum: this.addFuzerenInfo.phoneNum,
            address: this.addFuzerenInfo.address,
            editTime: this.addFuzerenInfo.editTime,
            editUser: this.addFuzerenInfo.editUser
          })
        )
        .then(response => {
          this.$axios("/api/activity-api/activity/fuzerenList")
            .then(response => (this.fuzerenList = response.data.data))
            .catch(error => {
              console.log(error);
            });
          // alert("保存成功！");
          this.$message({
          showClose: true,
          message: '保存成功！',
          type: 'success'
        });
          this.addFormVisible = false;
        })
        .catch(error => {
          console.log(error);
        });
      }else{
        this.$axios.post("/api/activity-api/activity//fuzerenList/edit/{id}",qs.stringify({
            id:this.addFuzerenInfo.id,
            fuName: this.addFuzerenInfo.fuName,
            phoneNum: this.addFuzerenInfo.phoneNum,
            address: this.addFuzerenInfo.address,
            editTime: this.addFuzerenInfo.editTime,
            editUser: this.addFuzerenInfo.editUser
          })
        )
        .then(response => {
          this.$axios("/api/activity-api/activity/fuzerenList")
            .then(response => (this.fuzerenList = response.data.data))
            .catch(error => {
              console.log(error);
            });
          // alert("修改成功！");
          this.$message({
          showClose: true,
          message: '修改成功！',
          type: 'success'
        });
          this.addFormVisible = false;
        })
        .catch(error => {
          console.log(error);
        });
      }
      
     
    },
    // 删除负责人
    deleteFuzeren(index, row) {
      this.$axios
        .post(
          "/api/activity-api/activity/fuzerenList/{id}",
          qs.stringify({
            id: row.id
          })
        )
        .then(response => {
          this.$axios("/api/activity-api/activity/fuzerenList")
            .then(response => (this.fuzerenList = response.data.data))
            .catch(error => {
              console.log(error);
            });
          // alert("删除成功！");
          this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success'
        });
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeDialog() {
      this.editFormVisible = false;
    }
  },
  created() {
    this.$axios("/api/activity-api/activity/fuzerenList")
      .then(response => (this.fuzerenList = response.data.data))
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
