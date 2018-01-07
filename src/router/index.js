import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '@/views/error/404'
import Login from '@/views/login/Login'
import Home from '@/views/pages/Home'
import uploadSetting from '@/views/pages/uploadSetting'
import inputSetting from '@/views/pages/inputSetting'
import setList from '@/views/pages/setList'
import configDetail from '@/views/pages/configDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
    },
    {
      path: '/',
      component: Home,
      name: '提取配置',
      iconCls: 'el-icon-setting',//图标样式class
      children: [
          { path: '/setting/file/', component: uploadSetting, name: 'excel导入' },
          { path: '/setting/input/', component: inputSetting, name: '页面导入' },

      ]
    },
    {
      path: '/',
      component: Home,
      name: '配置中心',
      iconCls: 'el-icon-tickets',//图标样式class
      children: [
          {path: '/setting/list/', component: setList, name: '展示列表'},
          {path: '/setting/detail/', component: configDetail, name: '详情页', hidden: true},
      ]
    }
  ]
})
