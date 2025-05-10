document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/data/resources.json');
    const data = await response.json();
    
    // 初始化渲染
    renderResources(data.resources);
    
    // 搜索功能
    initSearch(data.resources);
    
    // 侧边栏过滤
    initSidebarFilter(data.resources);
    
  } catch (error) {
    console.error('资源加载失败:', error);
    alert('资源加载失败，请刷新页面重试');
  }
});

function initSearch(resources) {
  document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = resources.filter(res => 
      res.name.toLowerCase().includes(keyword)
    );
    renderResources(filtered);
  });
}

function initSidebarFilter(resources) {
  document.querySelectorAll('.nav-item').forEach(item => {
    // 在点击事件中添加位置计算
    item.addEventListener('click', function() {
      // 激活状态切换
      document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      // 执行过滤
      const filterType = this.querySelector('span').textContent;
      renderResources(getFilteredResources(resources, filterType));
      const itemTop = this.offsetTop;
      document.documentElement.style.setProperty('--current-top', `${itemTop}px`);
    });
  });
}

function getFilteredResources(resources, type) {
  switch(type) {
    case '精选推荐':
      return resources.filter(res => res.isRecommended);
    case '最近更新':
      return [...resources].sort((a,b) => new Date(b.date) - new Date(a.date));
    default:
      return resources;
  }
}

function renderResources(resources) {
  const container = document.querySelector('.resource-grid');
  container.innerHTML = resources.map(res => `
    <div class="resource-card">
      <img src="${res.icon}" alt="${res.name}图标">
      <h3>${res.name}</h3>
      <a href="${res.downloadLink}" class="download-btn">
        <i class="fas fa-download"></i>
        立即下载
      </a>
    </div>
  `).join('');
}