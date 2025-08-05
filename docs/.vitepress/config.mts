import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/BMA-OpenHIS-Document/',
  build: {
    assetsDir: 'assets' // 确保与请求路径中的目录名匹配
  },
  title: "蓝衣通文档中心",
  description: "BlueMedAccess蓝衣通是一个专注于开发中小医疗机构计算机程序的一个组织。这里是我们的文档中心，你在里可以知道我们项目的用法、了解我们的信息、得到开发者文档。详细的阅读文档可以有助于你的使用、二次开发。若要了解更多信息，请前往蓝衣通论坛:http://luntan-bma.tttttttttt.top/public/     我们欢迎您的到来！",
  head: [
    // 引入自定义 CSS
    ['link', { rel: 'stylesheet', href: '/theme/style/var.css' }],
    // 设置网站图标
    ["link", { rel: "icon", href: "/logo.png" }],
  ],
  themeConfig: {
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '快速开始', link: '/quick-start' }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '快速开始', link: '/quick-start' },
          { text: '快速部署', link: '/run-server' },
          { text: '修改配置', link: '/setting-his' },
        ]
      },

      {
        text: '开发文档',
        items: [
          { text: '带补充', link: '/1X' },
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',      // 搜索按钮文字
            buttonAriaLabel: '搜索文档' // 按钮无障碍标签
          },
          modal: {
            noResultsText: '无法找到相关结果', // 无结果提示
            resetButtonTitle: '清除查询条件',  // 重置按钮标题
            footer: {
              selectText: '选择',      // 选择操作提示
              navigateText: '切换',    // 导航操作提示
              closeText: '关闭'        // 关闭按钮文字
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/Peideming/BMA-OpenHIS-Document/edit/master/docs/:path',
      text: '在GitHub上编辑此页'
    },

    footer: {
      message: 'Released under the CC BY-NC-SA 4.0 License.',
      copyright: 'Copyright © 2025 BlueMedAccess'
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/BlueMedAccess/bmsopenhisserver' }
    ]
  }
})
