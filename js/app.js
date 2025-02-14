// 静态资源数据

const space = "&nbsp&nbsp&nbsp&nbsp&nbsp";
const resources = [
    { id: 1, name: 'Minecraft', category: 'game', description: '一款沙盒游戏，支持多人在线', downloadLink: 'https://expover.iiu/minecraft', iconLink: 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/logos/Homepage_Gameplay-Trailer_MC-OV-logo_300x300.png' },
    { id: 2, name: 'Photoshop', category: 'software', description: '图像编辑软件，功能强大', downloadLink: 'https://expover.iiu/photoshop', iconLink: 'https://helpx.adobe.com/content/dam/help/mnemonics/ps_cc_app_RGB.svg' },
    { id: 3, name: 'Notepad++', category: 'tool', description: '一个开源文本编辑器，适用于多种编程语言', downloadLink: 'https://expover.iiu/notepad', iconLink: 'https://notepad.org.cn/zb_users/upload/2025/01/202501281738050571206544.png' },
    { id: 4, name: 'The Witcher 3', category: 'game', description: '一款开放世界的角色扮演游戏', downloadLink: 'https://expover.iiu/witcher3', iconLink: 'https://bkimg.cdn.bcebos.com/pic/d058ccbf6c81800a3f2cc205b63533fa838b47eb?x-bce-process=image/format,f_auto/quality,Q_70/resize,m_lfit,limit_1,w_536' },
    // 更多资源...
];

// 动态加载资源到首页
function loadResources() {
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    resources.forEach(resource => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.id = "content";
        var imagesrc = "";
        if(resource.iconLink.length > 0){imagesrc = resource.iconLink}
        else{imagesrc = "image/nullicon.png"}
        div.innerHTML = `<a href="resource.html?id=${resource.id}"><div id="content_pic"><img src="${imagesrc}" alt="${resource.name}" width=100px height=100px></div><div id="content_info"><h1>${resource.name}</h1></p>${space}${resource.description} </div></a>`;
        resourcesList.appendChild(div);
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
        const div = document.createElement('div');
        div.id = "content";
        var imagesrc = "";
        if(resource.iconLink.length > 0){imagesrc = resource.iconLink}
        else{imagesrc = "image/nullicon.png"}
        div.innerHTML = `<a href="resource.html?id=${resource.id}"><div id="content_pic"><img src="${imagesrc}" alt="${resource.name}" width=100px height=100px></div><div id="content_info"><h1>${resource.name}</h1></p>${space}${resource.description} </div></a>`;
        resourcesList.appendChild(div);
    });
}

// 搜索功能
function searchResources() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredResources = resources.filter(resource => resource.name.toLowerCase().includes(searchQuery));
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    filteredResources.forEach(resource => {
        const div = document.createElement('div');
        div.id = "content";
        var imagesrc = "";
        if(resource.iconLink.length > 0){imagesrc = resource.iconLink}
        else{imagesrc = "image/nullicon.png"}
        div.innerHTML = `<a href="resource.html?id=${resource.id}"><div id="content_pic"><img src="${imagesrc}" alt="${resource.name}" width=100px height=100px></div><div id="content_info"><h1>${resource.name}</h1></p>${space}${resource.description} </div></a>`;
        resourcesList.appendChild(div);
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