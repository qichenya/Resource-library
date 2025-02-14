// 静态资源数据
const resources = [
    { id: 1, name: 'Minecraft', category: 'game', description: '一款沙盒游戏，支持多人在线', downloadLink: 'https://expover.iiu/minecraft' },
    { id: 2, name: 'Photoshop', category: 'software', description: '图像编辑软件，功能强大', downloadLink: 'https://expover.iiu/photoshop' },
    { id: 3, name: 'Notepad++', category: 'tool', description: '一个开源文本编辑器，适用于多种编程语言', downloadLink: 'https://expover.iiu/notepad' },
    { id: 4, name: 'The Witcher 3', category: 'game', description: '一款开放世界的角色扮演游戏', downloadLink: 'https://expover.iiu/witcher3' },
    // 更多资源...
];

// 动态加载资源到首页
function loadResources() {
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    resources.forEach(resource => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="resource.html?id=${resource.id}">${resource.name}</a>`;
        resourcesList.appendChild(li);
    });
}

// 分类页面
function loadCategoryResources() {
    const categoryName = new URLSearchParams(window.location.search).get('category');
    const resourcesList = document.getElementById('resources-list');
    const categoryTitle = document.getElementById('category-name');
    categoryTitle.innerText = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} 分类`;

    const filteredResources = resources.filter(resource => resource.category === categoryName);
    resourcesList.innerHTML = '';
    filteredResources.forEach(resource => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="resource.html?id=${resource.id}">${resource.name}</a>`;
        resourcesList.appendChild(li);
    });
}

// 搜索功能
function searchResources() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredResources = resources.filter(resource => resource.name.toLowerCase().includes(searchQuery));
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    filteredResources.forEach(resource => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="resource.html?id=${resource.id}">${resource.name}</a>`;
        resourcesList.appendChild(li);
    });
}

// 页面加载时调用相应的函数
if (document.getElementById('resources-list')) {
    if (document.getElementById('category-name')) {
        loadCategoryResources();
    } else {
        loadResources();
    }
}

if (document.getElementById('resource-name')) {
    loadResourceDetail();
}