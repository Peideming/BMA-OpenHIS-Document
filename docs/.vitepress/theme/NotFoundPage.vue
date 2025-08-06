<template>
  <div class="not-found" :style="{ backgroundImage: `url(${wallpaperUrl})` }">
    <div class="content">
      <h1 ref="typewriter" class="typewriter">{{ displayText }}</h1>
      <p class="redirect-text">我们将在10s后为您重定向至首页</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallpaperUrl: '',
      messages: [
        "404了，页面像失群的候鸟，保护环境，让生态不再迷失。",
        "页面不见了，就像被遗忘的环保法规，让我们重新遵守。",
        "哎呀，页面出走了！就像被破坏的珊瑚礁，保护海洋，刻不容缓。",
        "404错误，页面不在服务区，就像远离环保的工业区，需要绿色转型。",
        "页面似乎迷路了，就像在雾霾中找不到方向，环保就是我们的清新剂。",
        "页面出走了，就像被滥伐的森林，让我们共同守护绿色家园。",
        "404，页面未找到！就像被污染的湖泊，还它一片清澈。",
        "页面离家出走，就像离开巢穴的幼鸟，保护环境，让生命自由飞翔。",
        "页面似乎逃跑了，就像逃避环保检查的企业，让我们共同监督。",
        "404错误，页面不在此！就像被遗忘的环保项目，让我们重新启动。",
        "页面出走了，就像被遗弃的宠物，给它们一个家，也给地球一份爱。",
        "哎呀，页面不见了！就像消失的绿洲，保护环境，让沙漠变绿洲。",
        "页面似乎迷路了，就像在荒漠中孤独的旅者，环保就是我们的水源。",
        "404，页面未找到！就像被破坏的湿地公园，需要我们共同修复。",
        "页面离家出走，就像离开大海的鱼儿，保护海洋，让生命自由游弋。",
        "页面似乎逃跑了，就像逃避环保教育的孩子，让我们共同学习。",
        "404错误，页面不在服务区！就像远离自然的城市，让我们回归绿色生活。",
        "页面出走了，就像被遗忘的环保英雄，让我们铭记他们的贡献。",
        "哎呀，页面不见了！就像消失的星空，保护环境，让夜空更璀璨。",
        "页面似乎迷路了，就像在污染中迷失的自我，环保就是我们的救赎。",
        "404，页面未找到！就像被破坏的山林，需要我们共同植树造林。",
        "页面离家出走，就像离开森林的动物，保护生态，让生命和谐共生。",
        "页面似乎逃跑了，就像逃避环保责任的企业家，让我们共同担当。",
        "404错误，页面不在此！就像被遗忘的环保节日，让我们共同庆祝。",
        "页面出走了，就像被污染的小溪，还它一片纯净。",
        "哎呀，页面不见了！就像消失的彩虹桥，保护环境，连接美好未来。",
        "页面似乎迷路了，就像在沙漠中寻找希望的旅人，环保就是我们的绿洲梦。",
        "404，页面未找到！就像被忽视的环保建议，让我们共同倾听。",
        "页面离家出走，就像离开群体的鲸鱼，保护海洋生态，让生命不再孤单。",
        "页面似乎逃跑了，就像逃避环保改革的政策，让我们共同抵制这种不爱护环境的行为。",
        "404错误，页面不在服务区！就像远离环保的旅行，让我们选择绿色出行。",
        "页面出走了，就像被遗忘的环保承诺，让我们用行动兑现。",
        "哎呀，页面不见了！就像消失的绿色城市，保护环境，建设美好家园。",
        "页面似乎迷路了，就像在污染中迷失的航船，环保就是我们的灯塔。",
        "404，页面未找到！就像被破坏的自然保护区，需要我们共同守护。",
        "页面离家出走，就像离开大自然的怀抱，保护环境，让我们与自然共生。",
        "页面似乎逃跑了，就像逃避环保挑战的我们，面对它，我们勇往直前。",
        "404错误，页面不在此！就像被遗忘的环保使命，让我们共同肩负。",
        "页面出走了，但环保的种子永远不会消失，让我们共同播种。",
        "哎呀，页面不见了！就像消失的清新空气，保护环境，让呼吸更自由。",
        "页面似乎迷路了，就像在荒漠中寻找生命的奇迹，环保就是我们的希望之光。",
        "404，页面未找到！就像被忽视的环保问题，让我们共同关注并解决。",
        "页面离家出走，就像离开和谐社会的个体，保护环境，促进社会和谐。",
        "页面似乎逃跑了，就像逃避环保教育的我们，让我们共同学习成长。",
        "404错误，页面不在服务区！就像远离环保的科技发展，让我们选择绿色科技。",
        "页面出走了，就像被遗忘的环保行动，让我们重新发起并坚持。",
        "哎呀，页面不见了！就像消失的绿色田野，保护环境，让大地更肥沃。",
        "页面似乎迷路了，就像在污染中迷失的自我认知，环保就是我们的觉醒之路。",
        "404，页面未找到！就像被破坏的自然景观，需要我们共同修复并欣赏。",
        "页面离家出走，就像离开地球的宇航员，保护环境，让地球成为我们的永恒家园。",
        "页面似乎逃跑了，就像逃避环保责任的我们，但责任永远无法逃避。",
        "404错误，页面不在此！就像被遗忘的环保角落，让我们共同照亮并呵护。",
        "页面出走了，但环保的信念永远不会动摇，让我们共同坚守。",
        "哎呀，页面不见了！就像消失的绿色未来，保护环境，创造美好明天。",
        "页面似乎迷路了，就像在荒漠中寻找方向的旅者，环保就是我们的指南针。",
        "404，页面未找到！就像被忽视的环保声音，让我们共同倾听并响应。",
        "页面离家出走，就像离开环保大家庭的我们，让我们回归并贡献力量。",
        "页面似乎逃跑了，就像逃避环保挑战的企业，但挑战永远无法逃避。",
        "404错误，页面不在服务区！就像远离环保的生活方式，让我们选择绿色生活。",
        "页面出走了，但环保的行动永远不会停止，让我们携手共创绿色未来。"
      ],
      displayText: '',
      typingSpeed: 50,
      isDeleting: false,
      charIndex: 0,
      currentMessage: '',
      redirectTimer: null
    }
  },
  async mounted() {
    // 1秒缓冲加载Bing壁纸
    await this.loadWallpaper();
    
    // 随机选择一条消息
    this.currentMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
    
    // 开始打字机效果
    this.typeWriter();
    
    // 设置重定向
    this.redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 10000);
  },
  beforeUnmount() {
    clearTimeout(this.redirectTimer);
  },
  methods: {
    async loadWallpaper() {
      try {
        // 使用Bing壁纸API
        this.wallpaperUrl = 'https://bing.img.run/1920x1080.php?' + new Date().getTime();
        
        // 等待壁纸加载完成
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.src = this.wallpaperUrl;
        });
      } catch (error) {
        console.error('加载壁纸失败:', error);
        // 如果加载失败，使用默认背景色
        this.wallpaperUrl = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      }
    },
    typeWriter() {
      const fullText = this.currentMessage;
      
      if (!this.isDeleting && this.charIndex <= fullText.length) {
        this.displayText = fullText.substring(0, this.charIndex);
        this.charIndex++;
        
        if (this.charIndex === fullText.length + 1) {
          this.isDeleting = true;
          // 暂停8秒后开始删除
          setTimeout(() => {
            this.typeWriter();
          }, 8000);
          return;
        }
      } else if (this.isDeleting && this.charIndex >= 0) {
        this.displayText = fullText.substring(0, this.charIndex);
        this.charIndex--;
        
        if (this.charIndex === 0) {
          this.isDeleting = false;
          // 选择新消息
          this.currentMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
          // 暂停1秒后开始新消息
          setTimeout(() => {
            this.typeWriter();
          }, 1000);
          return;
        }
      }
      
      // 调整打字速度（删除时更快）
      const delay = this.isDeleting ? this.typingSpeed / 2 : this.typingSpeed;
      setTimeout(() => {
        this.typeWriter();
      }, delay);
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'MiSans';
  src: url('/MiSans-Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
}

.not-found {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0 50px;
  transition: background-image 0.5s ease;
}

.content {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: 'MiSans', sans-serif;
  font-size: 48px;
  line-height: 1.3;
  background: linear-gradient(to right, #6dd5fa 20%, #ff758c 60%, #ff7eb3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 30px;
  min-height: 120px; /* 防止文字跳动 */
}

.redirect-text {
  font-family: 'MiSans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-top: 20px;
}

/* 打字机光标效果 */
.typewriter::after {
  content: "|";
  display: inline-block;
  width: 2px;
  height: 40px;
  background: #ff758c;
  margin-left: 5px;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>