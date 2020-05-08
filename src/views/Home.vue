<template>
  <div class="home">
    <div>
      <img
        src="../assets/img/header-bg.gif"
        class="headerBg"
        alt="我是头部大图"
      />
    </div>
    <div>
      <br />
    </div>
    <!--用来留空 -->
    <div class="main_content">
      <div class="left_none">
        <div class="left_button">
          <div class="add">＋</div>
        </div>
      </div>

      <div class="content">
        <center><h3 style="margin-top:50px">成功案例</h3></center>
        <div class="block">
          <el-carousel height="300px">
            <el-carousel-item >
              <img src="../assets/img/infoImg12.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg11.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg10.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg9.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg8.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg7.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg6.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg5.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg4.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg3.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg2.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../assets/img/infoImg1.jpg" alt="无法加载图片" width="100%" srcset="">
            </el-carousel-item>
          </el-carousel>
        </div>
          <center><h3>最新活动信息</h3></center>
        <el-row>
          <info-list v-if="reWrite"></info-list>
        </el-row>
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="pagination.page"
            :page-size.sync="pagination.size"
            :total="pagination.count"
            @current-change="pageChange"
            layout="prev, pager, next"
          ></el-pagination>
        </div>
      </div>

      <div class="right_none">
        <div class="login">
          <router-link to="manage">M</router-link>
        </div>
        <div class="right_button"></div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_content">Powder By Hc 丨 活动聚集地</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import InfoList from "../components/infoList";
export default {
  data() {
    return {
      reWrite: true,
      updateInfo: 1,
      pagination: {
        page: 1, //当前页数
        size: 6, //每页数据条数
        count: 10 //总记录条数
      },
      activityList1: "",
      currentDate: ""
    };
  },
  name: "home",
  components: {
    InfoList
  },
  methods: {
    watchInfo() {
      this.updateInfo = this.updateInfo++;
    },
    pageChange() {
      console.log(this.pagination.page);
      this.$axios
        .post(
          "/api/activity-api/activity/list/fenye",
          qs.stringify({
            page: this.pagination.page,
            size: this.pagination.size
          })
        )
        .then(response => {
          // this.pagination.page = response.data.totalPages,
          (this.pagination.size = response.data.size),
            (this.pagination.count = response.data.totalElements);
          for (var i = 0; i <= response.data.content.length; i++) {
            localStorage.setItem(
              "activityList",
              JSON.stringify(response.data.content)
            );
          }

          this.reWrite = false;
          this.$nextTick(function() {
            this.reWrite = true;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.$axios
      .post(
        "/api/activity-api/activity/list/fenye",
        qs.stringify({
          page: this.pagination.page,
          size: this.pagination.size
        })
      )
      .then(response => {
        (this.pagination.page = response.data.number + 1),
          (this.pagination.size = response.data.size),
          (this.pagination.count = response.data.totalElements);

        for (var i = 0; i <= response.data.content.length; i++) {
          localStorage.setItem(
            "activityList",
            JSON.stringify(response.data.content)
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  watch: {}
};
</script>

<style scoped>
@import url(../style/homeStyle.css);
.block{
  
  border: 4px solid rgb(155, 223, 214);
  margin: 60px 20px;
}
.content{
  background-color: #f0f2f8;
}
h3{
  height: 30px;
  width: 200px;
  background-color: orange;
}
</style>
