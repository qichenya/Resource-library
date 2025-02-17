/* 2025-02-16 by:4c01   zako qichen*/
const space = ""; //这玩意是description的前面空格,被七辰删了说不好看qwq
let resources = [];
// 动态资源数据
async function getJSON() {
    const response = await fetch("meta.json");
    const resourcesinput = await response.json();
    resources = Array.from(resourcesinput.resources);
}
// 动态加载资源到首页
function loadResources() {
    const resourcesList = document.getElementById("resources-list");
    resourcesList.innerHTML = "";
    resources.forEach(resource => {
        const div = document.createElement("div");
        div.id = "content";
        // 无ico或无官网检测
        if ((!resource.iconLink.length) || (resource.iconLink.length <= 3)) { resource.iconLink = "image/nullicon.png" }
        if ((!resource.website) || (resource.website.length <= 3)) { resource.website = "/null.html" }
        if (resource.detailTitle.length >= 25) { resource.detailTitle = resource.detailTitle.slice(0, 24).split(' ', 10).join(" ") + "..." }

        div.innerHTML = `<a href="detail.html?key=${resource.key}" target="_blank">
        <div id="content_pic"><img src="${resource.iconLink}" alt="${resource.displayName}" width=80px height=80px></div>
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
    let h2category = document.getElementById("category-name");
    h2category.innerHTML = categoryName;
    filteredResources = resources.filter(resource => resource.category == categoryName);
    resourcesList.innerHTML = "";
    filteredResources.forEach(resource => {
        const div = document.createElement("div");
        div.id = "content";
        // 无ico或无官网检测
        if ((!resource.iconLink.length) || (resource.iconLink.length <= 3)) { resource.iconLink = "image/nullicon.png" }
        if ((!resource.website) || (resource.website.length <= 3)) { resource.website = "/null.html" }
        if (resource.detailTitle.length >= 25) { resource.detailTitle = resource.detailTitle.slice(0, 24).split(' ', 10).join(" ") + "..." }

        div.innerHTML = `<a href="detail.html?key=${resource.key}" target="_blank">
       <div id="content_pic"><img src="${resource.iconLink}" alt="${resource.displayName}" width=80px height=80px></div>
       <div id="content_info"><h1>${resource.displayName}</h1></p>${space}${resource.detailTitle} </div></a>
       <div id=“linkbox”><a href="${resource.downloadLink}" target="_blank"><div id="download"><h2>点击下载</h2></div></a>
       <a href="${resource.website}" target="_blank"><div id="download"><h2>前往官网</h2></div></a>`;
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
        // 无ico或无官网检测
        if ((!resource.iconLink.length <= 3) || (resource.iconLink.length <= 3)) { resource.iconLink = "image/nullicon.png" }
        if ((!resource.website) || (resource.website.length <= 3)) { resource.website = "/null.html" }
        if (resource.detailTitle.length >= 25) { resource.detailTitle = resource.detailTitle.slice(0, 24).split(' ', 10).join(" ") + "..." }

        div.innerHTML = `<a href="detail.html?key=${resource.key}" target="_blank">
      <div id="content_pic"><img src="${resource.iconLink}" alt="${resource.displayName}" width=80px height=80px></div>
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
            loadCategoryResources();
        } else {
            loadResources();
        }
    }

    if (document.getElementById("resource-name")) {
        loadResourceDetail();
    }
});
