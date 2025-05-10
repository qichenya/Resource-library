// 全局变量
let resources = [];
let categories = [];
let currentCategory = 'all';

// DOM 元素
const categoryList = document.getElementById('categoryList');
const resourceGrid = document.getElementById('resourceGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// 初始化
async function init() {
    try {
        const response = await fetch('data/resources.json');
        const data = await response.json();
        resources = data.resources;
        categories = data.categories;
        
        renderCategories();
        renderResources();
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// 渲染分类列表
function renderCategories() {
    const allCategories = [
        { id: 'all', name: '全部资源' },
        ...categories
    ];

    categoryList.innerHTML = allCategories.map(category => `
        <li>
            <a href="#" data-category="${category.id}" class="${category.id === currentCategory ? 'active' : ''}">
                ${category.name}
            </a>
        </li>
    `).join('');

    // 添加分类点击事件
    categoryList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            currentCategory = e.target.dataset.category;
            renderCategories();
            renderResources();
        }
    });
}

// 渲染资源卡片
function renderResources(filteredResources = null) {
    const resourcesToRender = filteredResources || resources;
    const filteredByCategory = currentCategory === 'all' 
        ? resourcesToRender 
        : resourcesToRender.filter(resource => resource.category === currentCategory);

    resourceGrid.innerHTML = filteredByCategory.map(resource => `
        <div class="resource-card">
            <img src="${resource.image}" alt="${resource.title}" onerror="this.src='https://via.placeholder.com/300x160?text=No+Image'">
            <div class="resource-card-content">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <div class="tags">
                    ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${resource.url}" target="_blank" class="resource-link">访问资源</a>
            </div>
        </div>
    `).join('');
}

// 搜索功能
function searchResources() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderResources();
        return;
    }

    const filteredResources = resources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    renderResources(filteredResources);
}

// 事件监听
searchButton.addEventListener('click', searchResources);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchResources();
    }
});

// 初始化应用
init(); 