<script setup>
import { computed } from 'vue'

const props = defineProps({
  searchQuery: String
})

const resources = [
  {
    id: 1,
    name: 'Vue.js官方文档',
    description: 'Vue.js的完整官方文档',
    downloadLink: 'https://vuejs.org/guide/introduction.html',
    fileSize: '2.5MB'
  },
  {
    id: 2,
    name: 'JavaScript高级教程',
    description: '深入理解JavaScript高级概念',
    downloadLink: '#',
    fileSize: '3.1MB'
  },
  {
    id: 3,
    name: 'CSS3动画指南',
    description: 'CSS3动画效果完全指南',
    downloadLink: '#',
    fileSize: '1.8MB'
  }
]

const filteredResources = computed(() => {
  if (!props.searchQuery) return resources
  return resources.filter(resource => 
    resource.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(props.searchQuery.toLowerCase())
  ) // 这里添加了缺失的右括号
})
</script>

<template>
  <div class="resource-list">
    <div v-for="resource in filteredResources" :key="resource.id" class="resource-card">
      <div class="card-content">
        <h3>{{ resource.name }}</h3>
        <p class="description">{{ resource.description }}</p>
        <div class="resource-meta">
          <span class="file-size">大小: {{ resource.fileSize }}</span>
          <a :href="resource.downloadLink" class="download-btn">下载资源</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.resource-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s ease;
  background: white;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.description {
  flex-grow: 1;
  color: #555;
  margin: 15px 0;
}

.resource-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.file-size {
  color: #666;
  font-size: 0.9em;
}

.download-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.download-btn:hover {
  background-color: #3aa876;
}
</style>