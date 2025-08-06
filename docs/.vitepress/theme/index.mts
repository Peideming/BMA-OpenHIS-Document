// .vitepress/theme/index.mts
// .vitepress/theme/index.mts
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/var.css'  //导入自定义css
import Custom404 from './NotFoundPage.vue' // 本地404自定义组件

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(Custom404, {
      // 可传递额外属性
      homeLink: '/'
    })
  })
}
