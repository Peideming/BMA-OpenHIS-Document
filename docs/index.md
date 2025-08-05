---
layout: home

hero:
  name: "Document Center"
  text: |
    <span id="typing-text"></span>🖐🏻
  tagline: 你可以在这里获得你想要的😊
  actions:
    - theme: brand
      text: 快速部署
      link: /run-server
    - theme: alt
      text: 关于项目
      link: /quick-start
  image:
    src: /large_logo.png
    alt: 网页的logo图标

features:
  - title: "快速部署"
    details: "5 分钟内完成安装和运行。"
    link: "/run-server"
    icon: "✈️"  # 内置图标
  - title: "修改配置"
    details: "在这里你可以更详细的了解如何更好地配置系统"
    link: "/setting-his"
    icon: "🛠️"  # 内置图标
  - title: "Gitee 仓库"
    details: "参与开源贡献。"
    link: "https://gitee.com/BlueMedAccess/bmsopenhisserver"
    linkText: "前往 Gitee"
    icon: "👟"  # 内置图标
---

<script>
export default {
  mounted() {
    this.initTypingEffect();
  },
  methods: {
    initTypingEffect() {
      const text = "Hey,欢迎来到我们的文档中心!";
      const element = document.getElementById("typing-text");
      let i = 0;
      
      const typing = setInterval(() => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(typing);
        }
      }, 150); // 调整速度（数值越小越快）
    }
  }
}
</script>

<style>
#typing-text {
  border-right: 2px solid #0095ff;
  padding-right: 2px;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #3eaf7c }
}
</style>