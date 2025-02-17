/* 2025-02-18 by:4c01   zako qichen*/
let sidebarConfig;
let contents = [];
let sidebarCategory;
// 加载sidebar config
async function getSidebar() {
    const response = await fetch("/config/sidebar.json");
    sidebarConfig = await response.json();
    sidebarCategory = Object.keys(sidebarConfig);
}
// 加载meta用于分类category
async function getJSON() {
    const response = await fetch("/config/meta.json");
    const resourcesinput = await response.json();
    contents = Array.from(resourcesinput.resources);
}
function openSidebar(){
    const sidebarButton = document.getElementById("open-sidebar-button");
    const sidebar = document.getElementById("sidebar");
    const title = document.createElement("h2");
    title.innerHTML = "Platform:";
    sidebar.style.width = "150px";
    sidebar.appendChild(title);
    sidebarCategory.forEach(type => {
        const div = document.createElement("div");
        div.id = "platform";
        div.innerHTML = `<button id="open-subbar-button" onclick="openSubbar('${type}')">${type}</button>`
        sidebar.appendChild(div);
    });
    sidebarButton.innerHTML = "x";
    sidebarButton.onclick = closeSidebar;
}
function closeSidebar(){
    const sidebarButton = document.getElementById("open-sidebar-button");
    const sidebar = document.getElementById("sidebar");
    const subbar = document.getElementById("subbar");
    sidebar.style.width = "0px";
    sidebar.innerHTML = "";
    subbar.style.width = "0px";
    subbar.innerHTML = "";
    sidebarButton.innerHTML = "☰";
    sidebarButton.onclick = openSidebar;
}
function openSubbar(type){
    const subbarContent = sidebarConfig[type];
    const subbar = document.getElementById("subbar");
    const emptydiv = document.createElement("div");
    subbar.innerHTML = "";
    emptydiv.style.height = "160px";
    subbar.style.width = "200px";
    subbarContent.forEach(category =>{
        const div = document.createElement("div");
        const filteredContents = contents.filter(content => (content.category == category.toLowerCase()) && (content[type.toLowerCase()] == true));
        div.className = "subbar-category";
        div.innerHTML = `<a href="/category.html?category=${category}"><h3>${category.toUpperCase()}:</h3></a>`
        subbar.appendChild(div);
        filteredContents.forEach(content =>{
            const contentdiv = document.createElement("div");
            contentdiv.className = "subbar-content";
            contentdiv.innerHTML = `<a href="/detail.html?key=${content.key}">${content.displayName}</a>`
            subbar.appendChild(contentdiv);
        })
    });
    subbar.appendChild(emptydiv)
}
getJSON();
getSidebar();