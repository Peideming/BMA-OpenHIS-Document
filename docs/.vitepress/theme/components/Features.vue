<!-- .vitepress/theme/components/Features.vue -->
<template>
  <div class="features-container">
    <div
      v-for="(item, index) in features"
      :key="index"
      class="feature-card"
      @click="navigateTo(item.link)"
    >
      <div class="icon">{{ item.icon }}</div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vitepress";

const router = useRouter();
const { features } = router.route.data.themeConfig;

const navigateTo = (path) => {
  router.go(path); // 跳转到指定路径
};
</script>

<style scoped>
.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 2rem 0;
}
.feature-card {
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.feature-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-5px);
}
.icon {
  font-size: 2rem;
  margin-bottom: 10px;
}
h3 {
  margin: 10px 0;
}
</style>