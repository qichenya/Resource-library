const space = ""; 
let resources = [];

async function getJSON() {
    const response = await fetch("/config/meta.json");
    const resourcesinput = await response.json();
    resources = Array.from(resourcesinput.resources);
}

function loadResources() {
    const resourcesList = document.getElementById("resources-list");
    resourcesList.innerHTML = "";
    resources.forEach(resource => {
        const div = document.createElement("div");
        div.id = "content";
        // 修复无ico检测
        if (!resource.iconLink || resource.iconLink.trim().length <= 3) {
            resource.iconLink = "image/nullicon.png";
        }
        // 修复无官网检测 
        if (!resource.website || resource.website.trim().length <= 3) {
            resource.website = "/null.html";
        }
        if (resource.detailTitle.length >= 25) { 
            resource.detailTitle = resource.detailTitle.slice(0, 20).split(' ', 10).join(" ") + "..." 
        }

        div.innerHTML = `<a href="detail.html?key=${resource.key}" target="_blank">
        <div id="content_pic"><img src="${resource.iconLink}" onerror="this.src='image/nullicon.png'" alt="${resource.displayName}" width=80px height=80px></div>
        <div id="content_info"><h1>${resource.displayName}</h1></p>${space}${resource.detailTitle} </div></a>
        <div id=“linkbox”><a href="${resource.downloadLink}" target="_blank"><div id="download"><h2>点击下载</h2></div></a>
<a href="${resource.website}" target="_blank"><div id="download"><h2>前往官网</h2></div></a>`;
        resourcesList.appendChild(div);
    });
}

function loadCategoryResources() {
    const resourcesList = document.getElementById("resources-list");
    var filteredResources, categoryName;
    categoryName = new URLSearchParams(window.location.search).get("category");
    platformName = new URLSearchParams(window.location.search).get("platform");
    let h2category = document.getElementById("category-name");
    h2category.innerHTML = categoryName;
    filteredResources = resources.filter(resource => resource.category == categoryName.toLowerCase());
    if (platformName){
        filteredResources = filteredResources.filter(resource => resource[platformName].toLowerCase() == true);
        h2category.innerHTML = "在 " + platformName + " 上可用的 " + categoryName + ":";
    }
    resourcesList.innerHTML = "";
    filteredResources.forEach(resource => {
        const div = document.createElement("div");
        div.id = "content";
        // 统一图标链接检测 (应用在所有三个函数)
        if (!resource.iconLink || resource.iconLink.trim().length <= 3) {
            resource.iconLink = "image/nullicon.png";
        }
        // 统一官网链接检测
        if (!resource.website || resource.website.trim().length <= 3) {
            resource.website = "/null.html";
        }
        if (resource.detailTitle.length >= 25) { 
            resource.detailTitle = resource.detailTitle.slice(0, 20).split(' ', 10).join(" ") + "..." 
        }

        div.innerHTML = `<a href="detail.html?key=${resource.key}" target="_blank">
        <div id="content_pic"><img src="${resource.iconLink}" onerror="this.src='image/nullicon.png'" alt="${resource.displayName}" width=80px height=80px></div>
        <div id="content_info"><h1>${resource.displayName}</h1></p>${space}${resource.detailTitle} </div></a>
        <div id=“linkbox”><a href="${resource.downloadLink}" target="_blank"><div id="download"><h2>点击下载</h2></div></a>
        <a href="${resource.website}" target="_blank"><div id="download"><h2>前往官网</h2></div></a>`;
        resourcesList.appendChild(div);
    });
}

function searchResources(categoryfilter) {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const queryedResources = resources.filter(resource => resource.displayName.toLowerCase().includes(searchQuery));
    const resourcesList = document.getElementById("resources-list");
    var filteredResources, categoryName;
    if (categoryfilter == "category") {
        categoryName = new URLSearchParams(window.location.search).get("category");
        filteredResources = queryedResources.filter(resource => resource.category == categoryName);
    } else if (categoryfilter == "") {
        filteredResources = queryedResources;
    }
    resourcesList.innerHTML = "";
    filteredResources.forEach(resource => {
        const div = document.createElement("div");
        div.id = "content";
        // 修复无ico检测
        if (!resource.iconLink || resource.iconLink.trim().length <= 3) {
            resource.iconLink = "image/nullicon.png";
        }
        // 修复无官网检测
        if (!resource.website || resource.website.trim().length <= 3) {
            resource.website = "/null.html";
        }
        if (resource.detailTitle.length >= 25) { 
            resource.detailTitle = resource.detailTitle.slice(0, 20).split(' ', 10).join(" ") + "..." 
        }

        div.innerHTML = `<a href="detail.html?key=${resource.key}" target="_blank">
        <div id="content_pic"><img src="${resource.iconLink}" onerror="this.src='image/nullicon.png'" alt="${resource.displayName}" width=80px height=80px></div>
        <div id="content_info"><h1>${resource.displayName}</h1></p>${space}${resource.detailTitle} </div></a>
        <div id=“linkbox”><a href="${resource.downloadLink}" target="_blank"><div id="download"><h2>点击下载</h2></div></a>
        <a href="${resource.website}" target="_blank"><div id="download"><h2>前往官网</h2></div></a>`;
        resourcesList.appendChild(div);
    });
}

getJSON().then(() => {
    // 页面加载时调用相应的函数
    if (document.getElementById("resources-list")) {
        if (document.getElementById("category-name")) {
            document.title = (new URLSearchParams(window.location.search).get("category") + " - 七辰资源库");
            loadCategoryResources();
        } else {
            loadResources();
        }
    }

    if (document.getElementById("resource-name")) {
        loadResourceDetail();
    }
});

function renderResources(resources) {
  const list = document.getElementById('resources-list');
  
  resources.forEach(resource => {
    const li = document.createElement('li');
    // 添加字数限制逻辑
    const limitedDesc = resource.description.length > 20 ? 
      resource.description.substring(0, 20) + '...' : 
      resource.description;
    
    li.innerHTML = `
      <h3>${resource.title}</h3>
      <p>${limitedDesc}</p>
    `;
    list.appendChild(li);
  });
}