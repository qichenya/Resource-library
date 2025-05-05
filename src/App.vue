<script setup>
import ResourceList from './components/ResourceList.vue'
import { ref } from 'vue'

const searchText = ref('')
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="search-container">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="搜索资源..." 
            v-model="searchText"
            @keyup.enter="$event.target.blur()"
          />
          <button @click="$event.target.blur()">搜索</button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <ResourceList :searchQuery="searchText" />
    </main>

    <footer class="app-footer">
      <p>© 2025 七辰工作室 - 版权所有</p>
    </footer>
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.search-container {
  width: 100%;
  max-width: 600px; /* 控制搜索框最大宽度 */
}

.search-bar {
  display: flex;
  width: 100%; /* 占据容器全部宽度 */
}

.search-bar input {
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 25px 0 0 25px; /* 增大左侧圆角半径 */
}

.search-bar button {
  padding: 15px 25px; /* 增大内边距 */
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 25px 25px 0; /* 增大右侧圆角半径 */
  cursor: pointer;
  font-size: 1.1rem; /* 增大字体 */
}

.app-main {
  flex: 1;
}

.app-footer {
  padding: 20px 0;
  text-align: center;
  color: #666;
  border-top: 1px solid #eee;
  margin-top: 30px;
}
</style>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
