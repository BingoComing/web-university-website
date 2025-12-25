const fs = require("fs");
const path = require("path");

// 定义页面目录
const pagesDir = path.join(__dirname, "pages");

// 修复导航链接的函数
function fixNavigationLinks(filePath) {
  console.log(`正在修复文件: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");

  // 修复导航链接
  // 首页链接
  content = content.replace(/href="sy\.html"/g, 'href="../index.html"');
  content = content.replace(/href="index\.html"/g, 'href="../index.html"');

  // 顶部导航链接
  content = content.replace(/href="login\.html"/g, 'href="../login.html"');
  content = content.replace(
    /href="alumni\.html"/g,
    'href="../alumni/alumni.html"'
  );

  // 新闻相关链接
  content = content.replace(
    /href="news_media\.html"/g,
    'href="../news/news_media.html"'
  );
  content = content.replace(
    /href="news_past\.html"/g,
    'href="../news/news_past.html"'
  );
  content = content.replace(
    /href="activities\.html"/g,
    'href="../campus/activities.html"'
  );

  // 关于我们相关链接
  content = content.replace(
    /href="intro\.html"/g,
    'href="../about/intro.html"'
  );
  content = content.replace(
    /href="leaders\.html"/g,
    'href="../about/leaders.html"'
  );
  content = content.replace(
    /href="history\.html"/g,
    'href="../about/history.html"'
  );
  content = content.replace(
    /href="honors\.html"/g,
    'href="../about/honors.html"'
  );

  // 院系设置相关链接
  content = content.replace(
    /href="dept_literature\.html"/g,
    'href="../departments/dept_literature.html"'
  );
  content = content.replace(
    /href="dept_science\.html"/g,
    'href="../departments/dept_science.html"'
  );
  content = content.replace(
    /href="dept_engineering\.html"/g,
    'href="../departments/dept_engineering.html"'
  );
  content = content.replace(
    /href="dept_art\.html"/g,
    'href="../departments/dept_art.html"'
  );

  // 图片新闻和视频集锦
  content = content.replace(
    /href="news_photos\.html"/g,
    'href="../news/news_photos.html"'
  );
  content = content.replace(
    /href="news_videos\.html"/g,
    'href="../news/news_videos.html"'
  );

  // 招生就业相关链接
  content = content.replace(
    /href="admission_guide\.html"/g,
    'href="../admissions/admission_guide.html"'
  );
  content = content.replace(
    /href="employment\.html"/g,
    'href="../admissions/employment.html"'
  );
  content = content.replace(
    /href="graduates\.html"/g,
    'href="../admissions/graduates.html"'
  );
  content = content.replace(
    /href="apply_guide\.html"/g,
    'href="../admissions/apply_guide.html"'
  );

  // 科学研究相关链接
  content = content.replace(
    /href="research_projects\.html"/g,
    'href="../research/research_projects.html"'
  );
  content = content.replace(
    /href="achievements\.html"/g,
    'href="../research/achievements.html"'
  );
  content = content.replace(
    /href="teams\.html"/g,
    'href="../research/teams.html"'
  );
  content = content.replace(
    /href="journals\.html"/g,
    'href="../research/journals.html"'
  );

  // 校园文化相关链接
  content = content.replace(
    /href="clubs\.html"/g,
    'href="../campus/clubs.html"'
  );
  content = content.replace(
    /href="art_show\.html"/g,
    'href="../campus/art_show.html"'
  );

  // 联系我们
  content = content.replace(/href="contact\.html"/g, 'href="../contact.html"');

  // 保存修复后的内容
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`文件修复完成: ${filePath}`);
}

// 遍历所有HTML文件
function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // 递归遍历子目录
      traverseDirectory(fullPath);
    } else if (file.endsWith(".html")) {
      // 修复HTML文件
      fixNavigationLinks(fullPath);
    }
  }
}

// 修复根目录下的index.html文件
function fixRootIndex() {
  const indexPath = path.join(__dirname, "pages", "index.html");
  console.log(`正在修复首页文件: ${indexPath}`);

  let content = fs.readFileSync(indexPath, "utf8");

  // 首页的链接应该是正确的，只需确保指向其他页面的链接正确
  // 这里不需要特殊修复，因为首页的链接已经是正确的

  fs.writeFileSync(indexPath, content, "utf8");
  console.log(`首页修复完成: ${indexPath}`);
}

// 执行修复
console.log("开始修复导航链接...");
fixRootIndex(); // 先修复根目录的index.html
traverseDirectory(pagesDir); // 然后遍历修复所有子目录的HTML文件
console.log("所有导航链接修复完成!");
