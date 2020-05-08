<template>
  <div class="activity_info">
    <div class="top_bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动总览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="serchActivity" placeholder="输入活动名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addActivity()">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- <img :src="../../assets/img/infoImg1.jpg" alt="" srcset=""> -->
    <!--列表-->
    <el-table
      size="small"
      :data="activityList"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60"></el-table-column>

      <el-table-column ortable label="活动名称" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.acName }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable label="活动图片" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.img }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable label="活动代码" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable label="活动内容" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.acContent }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable label="活动负责人" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.acFuzeren }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable label="修改时间" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.editTime }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable label="修改人" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.editUser }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editActivity(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteActivity(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->

    <el-dialog :title="title" :visible.sync="addFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules">
        <el-form-item label="活动图片地址" prop="img">
          <el-input size="small" v-model="editForm.img" placeholder="请输入活动图片地址"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="acName">
          <el-input size="small" v-model="editForm.acName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动代码" prop="id">
          <el-input size="small" v-model="editForm.id" disabled="true" placeholder></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="acContent">
          <el-input
            size="small"
            type="textarea"
            maxlength="30"
            v-model="editForm.acContent"
            placeholder="请输入活动内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="当前日期" prop="editTime">
          <el-date-picker
            v-model="editForm.editTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动负责人" prop="acFuzeren">
          <el-input size="small" v-model="editForm.acFuzeren" placeholder="请输入活动内容"></el-input>
        </el-form-item>

        <el-form-item label="修改人" prop="editUser">
          <el-input size="small" v-model="editForm.editUser" placeholder="请输入修改人信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="addForm('editForm');"
        >保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm1" :rules="rules">
        <el-form-item label="活动图片地址" prop="img">
          <el-input size="small" v-model="editForm1.img" placeholder="请输入活动图片地址"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="acName">
          <el-input size="small" v-model="editForm1.acName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动代码" prop="id">
          <el-input size="small" v-model="editForm1.id" disabled="true" placeholder></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="acContent">
          <el-input size="small" v-model="editForm1.acContent" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item label="当前日期" prop="editTime">
          <el-date-picker
            v-model="editForm1.editTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动负责人" prop="acFuzeren">
          <el-input size="small" v-model="editForm1.acFuzeren" placeholder="请输入活动内容"></el-input>
        </el-form-item>

        <el-form-item label="修改人" prop="editUser">
          <el-input size="small" v-model="editForm1.editUser" placeholder="请输入修改人信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="editActivityInfo('editForm1');"
        >保存</el-button>
      </div>
    </el-dialog>

    
  </div>
</template>

<script>
import qs from "qs";
import { mapState } from "vuex";
export default {
  data() {
    return {
      serchActivity: "",
      loading: false,
      addFormVisible: false,
      editFormVisible: false,
      title: "添加",
      activityList: [],
      editForm: {
        img: "",
        acName: "",
        acContent: "",
        acFuzeren: "",
        editTime: "",
        editUser: ""
      },
      editForm1: {
        id: "",
        img: "",
        acName: "",
        acContent: "",
        acFuzeren: "",
        editTime: "",
        editUser: ""
      },
      rules: {
        img: [
          { required: true, message: "请输入活动图片地址", trigger: "blur" }
        ],
        acName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        acContent: [
          { required: true, message: "请输入活动内容", trigger: "blur" }
        ],
        acFuzeren: [
          { required: true, message: "请输入活动负责人", trigger: "blur" }
        ],
        editTime: [
          { required: true, message: "请选择活动修改日期", trigger: "blur" }
        ],
        editUser: [
          { required: true, message: "请选择活动修改日期", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    search() {
      this.$axios
        .post(
          "/api/activity-api/activity/list/acName/{acName}",
          qs.stringify({
            acName: this.serchActivity
          })
        )
        .then(response => {
          this.activityList = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addActivity() {
      this.addFormVisible = true;
      this.title = "添加";
    },
    editActivity(index, row) {
      this.editForm1 = row;
      this.editFormVisible = true;
      this.title = "编辑活动信息";
    },

    editActivityInfo(editForm1) {
      this.$axios
        .post(
          "/api/activity-api/activity/list/edit/{id}",
          qs.stringify({
            id: this.editForm1.id,
            img: this.editForm1.img,
            acName: this.editForm1.acName,
            acContent: this.editForm1.acContent,
            acFuzeren: this.editForm1.acFuzeren,
            editTime: this.editForm1.editTime,
            editUser: this.editForm1.editUser
          })
        )
        .then(response => {
          this.$axios("/api/activity-api/activity/listAll")
            .then(response => (this.activityList = response.data.data))
            .catch(error => {
              console.log(error);
            });

          // alert("修改成功！");
          this.$message({
          showClose: true,
          message: '修改成功！',
          type: 'success'
        });
          this.editFormVisible = false;
        })
        .catch(error => {
          console.log(error);
          // alert("修改失败！");
          this.$message({
          showClose: true,
          message: '修改失败！',
          type: 'error'
        });
          this.editFormVisible = false;
        });
    },

    addForm(editData) {
      this.$axios
        .post(
          "/api/activity-api/activity/addActivity",
          qs.stringify({
            img: this.editForm.img,
            acName: this.editForm.acName,
            acContent: this.editForm.acContent,
            acFuzeren: this.editForm.acFuzeren,
            editTime: this.editForm.editTime,
            editUser: this.editForm.editUser
          })
        )
        .then(response => {
          this.$axios("/api/activity-api/activity/listAll")
            .then(response => (this.activityList = response.data.data))

            .catch(error => {
              console.log(error);
            });
          (this.editForm.img = ""),
            (this.editForm.acName = ""),
            (this.editForm.acContent = ""),
            (this.editForm.acFuzeren = ""),
            (this.editForm.editTime = ""),
            (this.editForm.editUser = "");
          // alert("添加成功！");
          this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'
        });

          this.addFormVisible = false;
        })
        .catch(error => {
          (this.editForm.img = ""),
            (this.editForm.acName = ""),
            (this.editForm.acContent = ""),
            (this.editForm.acFuzeren = ""),
            (this.editForm.editTime = ""),
            (this.editForm.editUser = "");
          console.log(error);
        });

      //   if(this.editForm.activityName===''||this.editForm.activityNum===''||this.editForm.content===''||this.editForm.activityFuzeren||this.editForm.editTime===''){
      //     alert('输入内容不可为空')
      //   }else{
      //     this.$store.dispatch('add_activity',this.editForm)
      // this.editFormVisible = false;
      //   }
    },

    // 删除活动
    deleteActivity(index, row) {
      this.$axios
        .post(
          "/api/activity-api/activity/list/{id}",
          qs.stringify({
            id: row.id
          })
        )
        .then(response => {
          this.$axios("/api/activity-api/activity/listAll")
            .then(response => (this.activityList = response.data.data))
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
      this.addFormVisible = false;
      this.editFormVisible = false;
    }
  },
  computed: {
    ...mapState(["tableData"])
  },
  created() {
    this.$axios("/api/activity-api/activity/listAll")
      .then(response => (this.activityList = response.data.data))

      .catch(error => {
        console.log(error);
      });

    console.log(this.activityList);
  }
};
</script>
<style scoped>
.user-search {
  margin-top: 20px;
}
</style>
