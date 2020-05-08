<template>
  <el-menu
    class="el-menu-vertical-demo"
    unique-opened
    router
    background-color="#334157"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="logobox">
      <h3>XX活动管理后台</h3>
    </div>

    <el-submenu v-for="navs in navList" :key="navs.navId" :index="navs.navName">
      <template slot="title">
        <i class="el-icon-set-up"></i>
        <span slot="title">{{ navs.navName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="menu in navs.menus"
          :index="'/' + menu.menuUrl"
          :key="menu.menuId"
        >
          <span>{{ menu.menuName }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          navId: 11,
          navName: "活动管理",
          navUrl: null,
          menus: [
            {
              menuId: 12,
              menuName: "活动总览",
              menuUrl: "activity/activityInfo"
            }
          ]
        },
        {
          navId: 21,
          navName: "客户管理",
          navUrl: null,
          menus: [
            {
              menuId: 22,
              menuName: "客户总览",
              menuUrl: "user/userInfo"
            }
          ]
        },
        {
          navId: 31,
          navName: "负责人管理",
          navUrl: null,
          menus: [
            {
              menuId: 32,
              menuName: "负责人信息",
              menuUrl: "fuzeren/fuzerenInfo"
            }
          ]
        },
        {
          navId: 41,
          navName: "网站数据",
          navUrl: null,
          menus: [
            {
              menuId: 42,
              menuName: "具体信息",
              menuUrl: "web/webInfo"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
.el-menu-vertical-demo {
  width: 190px;
  min-height: 983px;
  /* height: 100%;
  margin-bottom: 0; */
  border: none;
}
.logobox {
  height: 60px;
  padding-top: 50px;
  padding-left: 40px;
  color: #ffffff;
}
</style>
