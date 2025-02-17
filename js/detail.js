// 根据 key 获取资源信息的函数
async function getResourceByKey(key) {
    // 获取 meta.json 的数据
    const response = await fetch("/meta.json");
    const { resources } = await response.json();

    // 根据 key 查找匹配的资源
    return resources.find(resource => resource.key === key);
}

// 获取 URL 参数
const params = new URLSearchParams(window.location.search);
console.log(params);

document.addEventListener("DOMContentLoaded", () => {
    // 获取 DOM
    elements = {
        title: document.querySelector(".header > h1"),
        downloadBtn: document.querySelector(".header > .download-btn"),
        info: document.querySelector(".info-box > span"),
        warning: document.querySelector(".warning"),
    };

    // 获取资源信息
    getResourceByKey(params.get("key"))
        .then(resource => {
            if (resource) {
                console.log("Resource metadata:", resource);

                // 替换元素内容
                elements.title.innerText = resource.displayName;
                elements.downloadBtn.href = resource.downloadLink;
                elements.info.innerText = resource.detailTitle;
                console.log(resource.info);
                if (resource.overrideWarning) {
                    elements.warning.innerText = resource.overrideWarning;
                }
            } else {
                console.log("Resource not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching resource:", error);
        });
});
