// 静态资源数据

const space = "&nbsp&nbsp&nbsp&nbsp&nbsp";
const resources = [
    { id: 1, name: 'Blibili', description: 'bilibili是国内知名的视频弹幕网站', downloadLink: 'https://app.bilibili.com/', officialLink: "https://www.bilibili.com/", iconLink: 'https://th.bing.com/th/id/R.5f7657549f4bd16d08b56ccad794f01a?rik=%2bXBzOkKWIBMU8A&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f07-20%2f89190%2fwater_89190_698_698_.png&ehk=b6FaBHz%2bTBstG7fZg%2fGSVXCcCSqOw3pUcMIZr6QUdZg%3d&risl=&pid=ImgRaw&r=0' },
    { id: 2, name: 'Ollama', description: 'Get up and running with large language models.', downloadLink: '/ruanjian/2.html', officialLink: "https://ollama.com/", iconLink: 'https://ollama.com/public/ollama.png' },
    { id: 3, name: 'EncryptSynaptics', description: '针对于Synaptics蠕虫的杀毒工具', downloadLink: '/ruanjian/3.html', officialLink: "/ruanjian/null.html", iconLink: '' },
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
        div.innerHTML = `<a href="resource.html?id=${resource.id}"><div id="content_pic"><img src="${imagesrc}" alt="${resource.name}" width=100px height=100px></div><div id="content_info"><h1>${resource.name}</h1></p>${space}${resource.description} </div></a><div id=“linkbox”><a href="${resource.downloadLink}"><div id="download"><h2>点击下载</h2></div></a><a href="${resource.officialLink}"><div id="download"><h2>前往官网</h2></div></a>`;
        resourcesList.appendChild(div);
    });
}

// 搜索功能
function searchResources(categoryfilter) {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const queryedResources = resources.filter(resource => resource.name.toLowerCase().includes(searchQuery));
    const resourcesList = document.getElementById('resources-list');
    var filteredResources,categoryName;
    if(categoryfilter == "category"){
        categoryName = new URLSearchParams(window.location.search).get('category');
        filteredResources = queryedResources.filter(resource => resource.category == categoryName)
    }
    else if(categoryfilter == ""){
        filteredResources = queryedResources
    }
    resourcesList.innerHTML = '';
    filteredResources.forEach(resource => {
        const div = document.createElement('div');
        div.id = "content";
        var imagesrc = "";
        if(resource.iconLink.length > 0){imagesrc = resource.iconLink}
        else{imagesrc = "image/nullicon.png"}
        div.innerHTML = `<a href="resource.html?id=${resource.id}"><div id="content_pic"><img src="${imagesrc}" alt="${resource.name}" width=100px height=100px></div><div id="content_info"><h1>${resource.name}</h1></p>${space}${resource.description} </div></a><div id=“linkbox”><a href="${resource.downloadLink}"><div id="download"><h2>点击下载</h2></div></a><a href="${resource.downloadLink}"><div id="download"><h2>前往官网</h2></div></a>`;
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