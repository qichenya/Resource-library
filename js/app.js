// 静态资源数据

const space = "";
let resources = [];

async function getJSON() {
    const response = await fetch("meta.json");
    const resourcesinput= await response.json();
    resources = Array.from(resourcesinput.resources);
    console.warn(resources);
}
// 动态加载资源到首页
function loadResources() {
    const resourcesList = document.getElementById("resources-list");
    resourcesList.innerHTML = "";
    resources.forEach(resource => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.id = "content";
        var imagesrc = "";
        if (resource.iconLink.length > 0) {
            imagesrc = resource.iconLink;
        } else {
            imagesrc = "image/nullicon.png";
        }
        if (!resource.website){resource.website = "/null.html"}
        div.innerHTML = `<a href="resource.html?id=${resource.id}" target="_blank"><div id="content_pic"><img src="${imagesrc}" alt="${resource.displayName}" width=100px height=100px></div><div id="content_info"><h1>${resource.displayName}</h1></p>${space}${resource.detailTitle} </div></a><div id=“linkbox”><a href="${resource.downloadLink}" target="_blank"><div id="download"><h2>点击下载</h2></div></a><a href="${resource.website}" target="_blank"><div id="download"><h2>前往官网</h2></div></a>`;
        resourcesList.appendChild(div);
    });
}

// 搜索功能
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
        var imagesrc = "";
        if (resource.iconLink.length > 0) {
            imagesrc = resource.iconLink;
        } else {
            imagesrc = "image/nullicon.png";
        }
        div.innerHTML = `<a href="resource.html?id=${resource.id}" target="_blank"><div id="content_pic"><img src="${imagesrc}" alt="${resource.displayName}" width=100px height=100px></div><div id="content_info"><h1>${resource.displayName}</h1></p>${space}${resource.detailTitle} </div></a><div id=“linkbox”><a href="${resource.downloadLink}" target="_blank"><div id="download"><h2>点击下载</h2></div></a><a href="${resource.website}" target="_blank"><div id="download"><h2>前往官网</h2></div></a>`;
        resourcesList.appendChild(div);
    });
}

getJSON().then(() => {
    // 页面加载时调用相应的函数
    if (document.getElementById("resources-list")) {
        if (document.getElementById("category-name")) {
            loadCategoryResources();
        } else {
            loadResources();
        }
    }

    if (document.getElementById("resource-name")) {
        loadResourceDetail();
    }
});