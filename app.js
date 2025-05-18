const express = require('express');
const fs = require('fs');
const path = require('path');

const RESOURCES_FILE = path.join(__dirname, 'data', 'resources.json');
const app = express();

app.set('view engine', 'ejs');

// 数据操作函数
function getResources() {
  try {
    return JSON.parse(fs.readFileSync(RESOURCES_FILE));
  } catch (err) {
    return [];
  }
}

function initializeSampleData() {
  const sampleData = [{
    title: "MDN Web Docs",
    description: "Mozilla开发者网络文档",
    category: "文档",
    url: "https://developer.mozilla.org",
    createdAt: new Date().toISOString()
  }];
  fs.writeFileSync(RESOURCES_FILE, JSON.stringify(sampleData, null, 2));
}

// 路由配置
app.get('/get-resources', (req, res) => {
  try {
    const resources = getResources();
    res.set('Content-Type', 'application/json');
    res.json(resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ error: "资源加载失败" });
  }
});

app.get('/', (req, res) => {
  try {
    if (!fs.existsSync(path.dirname(RESOURCES_FILE))) {
      fs.mkdirSync(path.dirname(RESOURCES_FILE), { recursive: true });
    }
    
    let resources = getResources();
    if (resources.length === 0) {
      initializeSampleData();
      resources = getResources();
    }

    res.render('index', {
      resources: resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    console.error('完整错误信息:', error.stack);
    res.redirect('/error?msg=' + encodeURIComponent(error.message));
  }
});

app.get('/error', (req, res) => {
  res.render('error', { message: req.query.msg || "未知错误" });
});

app.get('/version', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ 
    version: fs.existsSync(RESOURCES_FILE) ? 
      fs.statSync(RESOURCES_FILE).mtimeMs : 
      Date.now()
  });
});

app.post('/search', (req, res) => {
  try {
    const { keyword } = req.body;
    const resources = getResources().filter(r => 
      r.title.includes(keyword) || 
      r.description.includes(keyword) ||
      r.category.includes(keyword)
    );
    
    res.render('index', {
      resources: resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    res.redirect('/error?msg=搜索失败');
  }
});

// 服务启动
process.on('uncaughtException', (err) => {
  console.error('全局未捕获异常:', err.stack);
  process.exit(1);
});

app.listen(3000, (err) => {
  if (err) {
    console.error('服务器启动失败:', err);
    process.exit(1);
  }
  console.log('Server running on port 3000');
});