<template>
  <div>
    <div v-for="info in activityList" :key="info.id">
      <el-col :span="8">
        <div class="grid-content">

          <!-- <img src="../assets/img/infoImg1.jpg" alt="">
          <img src="../assets/img/infoImg2.jpg" alt="">
          <img src="../assets/img/infoImg3.jpg" alt="">
          <img src="../assets/img/infoImg4.jpg" alt="">
          <img src="../assets/img/infoImg5.jpg" alt="">
          <img src="../assets/img/infoImg6.jpg" alt=""> -->

          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
            width="302px"
            height="302px"
              :src="`../assets/img/`+info.img"
              class="image"
              alt="暂未获取到图片信息"
            />
            <div style="padding: 14px;">
              <span class="info_title">{{ info.acName }}</span>
              <div class="bottom clearfix">
                <time class="time">发布时间 ：{{ info.editTime }}</time>
                <br />
                <br />
                <br />
                <span class="info_content">{{ info.acContent }}</span>
                <el-button
                  type="text"
                  class="button"
                  @click="dialogFormVisible = true"
                  >报名</el-button
                >

                <!-- 填写表单 -->
                <el-dialog title="报名信息" :visible.sync="dialogFormVisible">
                  <el-form :model="BMInfoForm">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-col :span="10">
                        <el-input
                          v-model="BMInfoForm.realName"
                          placeholder="请输入联系人姓名"
                          maxlength="10"
                        ></el-input>
                      </el-col>
                    </el-form-item>

                    
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                      <el-col :span="10">
                        <el-input
                          v-model="BMInfoForm.phoneNum"
                          autocomplete="off"
                          maxlength="11"
                          placeholder="请输入联系电话"
                        ></el-input>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="验证码" :label-width="formLabelWidth">
                      <el-col :span="10">
                        <el-input
                          placeholder="请输入手机验证码"
                          v-model="BMInfoForm.phoneYZM"
                          maxlength="6"
                          size="large"
                        >
                          <el-button
                            slot="append"
                            :loading="loading"
                            @click="getYZM"
                            >获取验证码</el-button
                          >
                        </el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="当前日期" prop="editTime" :label-width="formLabelWidth">
                      <el-col :span="10">
                        <el-date-picker
                        v-model="BMInfoForm.addTime"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                      </el-col>
                      
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="BMForm">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
            
          </el-card>

          
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  // currentDate:'',
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      BMInfoForm: {
        realName: "",
        addTime:'',
        phoneNum: "",
        state:0
      },
      formLabelWidth: "100px",
      activityList: ""
    };
  },
  methods: {
    bm() {
      alert("报名成功！");
    },
    getYZM() {
      this.loading = true;
    },
    BMForm() {
      this.$axios.post('/api/activity-api/activity/addUser',qs.stringify({
        phoneNum:this.BMInfoForm.phoneNum,
        realName:this.BMInfoForm.realName,
        addTime:this.BMInfoForm.addTime,
        state:this.BMInfoForm.state
      })).then(response =>{
        
        this.dialogFormVisible = false;
      // alert("感谢您参加本活动，工作人员会在一个工作日内与您联系！");
      this.$alert('感谢您参加本活动，工作人员会在一个工作日内与您联系！', '报名成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: `报名成功！`
            });
          }
        });
      })
      .catch(error =>{
        console.log(error)
      })
      
    }
  },
  created() {
    this.activityList = JSON.parse(localStorage.getItem("activityList"))
    // this.$axios("/api/activity-api/activity/listAll")
    //   .then(response => (this.activityList = response.data.data))
    //   .catch(error => {
    //     console.log(error);
    //   });

    // console.log(this.activityList);
  }
};
</script>
<style scoped>
@import url(../style/homeStyle.css);
.info_title {
  font-weight: 600;
  font-size: 21px;
}
.info_content {
  font-size: 15px;
  color: grey;
  /* font-family: Arial, Helvetica, sans-serif */
}
.grid-content {
  height: 500px;
}
el-dialog el-input input {
  width: 100px;
}

</style>
