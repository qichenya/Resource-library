// 根据 key 获取资源信息的异步函数
async function getResourceByKey(key) {
    // 获取 meta.json 的数据（配置元数据）
    const response = await fetch("/config/meta.json"); // 发起网络请求获取元数据文件
    const { resources } = await response.json(); // 解析JSON并解构出resources数组
    
    // 在resources数组中查找与传入key匹配的资源对象
    return resources.find(resource => resource.key === key); // 使用Array.find进行精确匹配
}

// 获取 URL 查询参数（用于解析类似 ?key=value 的参数）
const params = new URLSearchParams(window.location.search); // 使用浏览器API解析当前URL参数
console.log(params); // 调试用：打印参数对象到控制台

// 当DOM加载完成后初始化页面元素
document.addEventListener("DOMContentLoaded", () => {
    // 获取页面关键DOM元素集合
    elements = {
        title: document.querySelector(".header > h1"),          // 主标题元素
        downloadBtn: document.querySelector(".header > .download-btn"), // 下载按钮
        info: document.querySelector(".info-box > span"),        // 信息展示区域
        warning: document.querySelector(".warning")             // 警告提示框
    };

    // 通过URL中的key参数获取对应资源数据
    getResourceByKey(params.get("key"))
        .then(resource => {
            if (resource) { // 成功找到资源的情况
                console.log("Resource metadata:", resource); // 调试输出资源元数据

                /* 动态更新页面内容 */
                elements.title.innerText = resource.displayName;       // 设置页面标题
                elements.downloadBtn.href = resource.downloadLink;    // 设置下载链接地址
                elements.info.innerText = resource.detailTitle;       // 设置详细信息标题
                
                console.log(resource.info); // 调试输出资源信息
                
                // 条件处理警告信息显示
                if (resource.overrideWarning) {
                    // 当存在自定义警告时显示指定内容
                    elements.warning.innerText = resource.overrideWarning;
                } else {
                    // 没有警告时隐藏警告框（通过修改样式）
                    elements.warning.style.borderRadius = "0px";
                    elements.warning.style.padding = "0px";
                }
            } else {
                // 未找到对应资源的情况
                console.log("Resource not found.");
            }
        })
        .catch(error => {
            // 错误处理：网络请求或数据处理异常
            console.error("Error fetching resource:", error);
        });
});