import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import '../src/plugins/element'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false;
Vue.component('tree-table',TreeTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
