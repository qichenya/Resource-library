// 全局状态变量
let sidebarConfig;    // 存储侧边栏配置数据
let contents = [];    // 存储所有资源内容数据
let sidebarCategory;  // 存储侧边栏分类目录

// 加载侧边栏配置
async function getSidebar() {
    const response = await fetch("/config/sidebar.json");
    sidebarConfig = await response.json();
    sidebarCategory = Object.keys(sidebarConfig); // 提取分类键名（如：Platforms）
}

// 加载资源元数据
async function getJSON() {
    const response = await fetch("/config/meta.json");
    const resourcesinput = await response.json();
    contents = Array.from(resourcesinput.resources); // 转换资源数据为数组
}

// 打开主侧边栏
function openSidebar(){
    const sidebarButton = document.getElementById("open-sidebar-button");
    const sidebar = document.getElementById("sidebar");
    
    // 创建标题元素
    const title = document.createElement("h2");
    title.innerHTML = "&nbsp可用平台:";
    
    // 设置侧边栏样式
    sidebar.style.width = "150px";
    sidebar.appendChild(title);

    // 动态生成分类按钮
    sidebarCategory.forEach(type => {
        const div = document.createElement("div");
        div.id = "platform"; // 为CSS样式设置标识
        
        // 创建可展开子菜单的按钮
        div.innerHTML = `<button id="open-subbar-button" 
            onclick="openSubbar('${type}')">${type}</button>`
        sidebar.appendChild(div);
    });

    // 更新开关按钮状态
    sidebarButton.innerHTML = "x";
    sidebarButton.onclick = closeSidebar;
}

// 关闭侧边栏系统
function closeSidebar(){
    const sidebarButton = document.getElementById("open-sidebar-button");
    const sidebar = document.getElementById("sidebar");
    const subbar = document.getElementById("subbar");

    // 重置侧边栏状态
    sidebar.style.width = "0px";
    sidebar.innerHTML = "";  // 清空DOM元素
    
    // 重置子侧边栏状态
    subbar.style.width = "0px";
    subbar.innerHTML = "";

    // 恢复按钮初始状态
    sidebarButton.innerHTML = "☰";
    sidebarButton.onclick = openSidebar;
}

// 打开子侧边栏
function openSubbar(type){
    const subbarContent = sidebarConfig[type]; // 获取当前类型的配置数据
    const subbar = document.getElementById("subbar");
    const emptydiv = document.createElement("div"); // 底部留空div
    
    // 初始化子侧边栏
    subbar.innerHTML = "";
    emptydiv.style.height = "160px"; // 底部留白高度
    subbar.style.width = "200px";

    // 遍历每个分类生成内容
    subbarContent.forEach(category =>{
        const div = document.createElement("div");
        div.className = "subbar-category"; // CSS样式类

        // 过滤符合条件的内容资源
        const filteredContents = contents.filter(content => 
            (content.category == category.toLowerCase()) && 
            (content[type.toLowerCase()] == true)
        );

        // 创建分类标题链接（带URL参数）
        div.innerHTML = `<a href="/category.html?category=${category}&amp;platform=${type}">
            <h2>${category}:</h2></a>`
        subbar.appendChild(div);

        // 生成具体内容项链接
        filteredContents.forEach(content =>{
            const contentdiv = document.createElement("div");
            contentdiv.className = "subbar-content";
            // 创建带资源key参数的详情页链接
            contentdiv.innerHTML = `<a href="/detail.html?key=${content.key}">
                ${content.displayName}</a>`
            subbar.appendChild(contentdiv);
        })
    });
    
    subbar.appendChild(emptydiv); // 添加底部留空
}

// 初始化数据加载
getJSON();     // 加载资源元数据
getSidebar();  // 加载侧边栏配置
