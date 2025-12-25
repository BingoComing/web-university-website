const fs = require("fs");
const path = require("path");

// 定义页面目录
const pagesDir = path.join(__dirname, "pages");

// 修复导航链接的函数
function fixNavigationLinks(filePath) {
  console.log(`正在修复文件: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");

  // 计算文件相对于pages目录的路径
  const relativePath = path.relative(pagesDir, filePath);
  const pathParts = relativePath.split(path.sep);

  // 计算需要返回的上级目录层数
  // 例如: index.html 在根目录，返回 0
  // about/intro.html 在一级目录，返回 1
  const parentLevels = pathParts.length - 1;

  // 生成正确的上级目录前缀
  const parentPrefix = parentLevels === 0 ? "" : "../".repeat(parentLevels);

  // 修复导航链接
  // 首页链接
  content = content.replace(
    /href="\.\.\/index\.html"/g,
    `href="${parentPrefix}index.html"`
  );
  content = content.replace(
    /href="sy\.html"/g,
    `href="${parentPrefix}index.html"`
  );

  // 顶部导航链接
  content = content.replace(
    /href="\.\.\/login\.html"/g,
    `href="${parentPrefix}login.html"`
  );
  content = content.replace(
    /href="\.\.\/alumni\/alumni\.html"/g,
    `href="${parentPrefix}alumni/alumni.html"`
  );

  // 新闻相关链接
  content = content.replace(
    /href="\.\.\/news\/news_media\.html"/g,
    `href="${parentPrefix}news/news_media.html"`
  );
  content = content.replace(
    /href="\.\.\/news\/news_past\.html"/g,
    `href="${parentPrefix}news/news_past.html"`
  );
  content = content.replace(
    /href="\.\.\/campus\/activities\.html"/g,
    `href="${parentPrefix}campus/activities.html"`
  );

  // 关于我们相关链接
  content = content.replace(
    /href="\.\.\/about\/intro\.html"/g,
    `href="${parentPrefix}about/intro.html"`
  );
  content = content.replace(
    /href="\.\.\/about\/leaders\.html"/g,
    `href="${parentPrefix}about/leaders.html"`
  );
  content = content.replace(
    /href="\.\.\/about\/history\.html"/g,
    `href="${parentPrefix}about/history.html"`
  );
  content = content.replace(
    /href="\.\.\/about\/honors\.html"/g,
    `href="${parentPrefix}about/honors.html"`
  );

  // 院系设置相关链接
  content = content.replace(
    /href="\.\.\/departments\/dept_literature\.html"/g,
    `href="${parentPrefix}departments/dept_literature.html"`
  );
  content = content.replace(
    /href="\.\.\/departments\/dept_science\.html"/g,
    `href="${parentPrefix}departments/dept_science.html"`
  );
  content = content.replace(
    /href="\.\.\/departments\/dept_engineering\.html"/g,
    `href="${parentPrefix}departments/dept_engineering.html"`
  );
  content = content.replace(
    /href="\.\.\/departments\/dept_art\.html"/g,
    `href="${parentPrefix}departments/dept_art.html"`
  );

  // 图片新闻和视频集锦
  content = content.replace(
    /href="\.\.\/news\/news_photos\.html"/g,
    `href="${parentPrefix}news/news_photos.html"`
  );
  content = content.replace(
    /href="\.\.\/news\/news_videos\.html"/g,
    `href="${parentPrefix}news/news_videos.html"`
  );

  // 招生就业相关链接
  content = content.replace(
    /href="\.\.\/admissions\/admission_guide\.html"/g,
    `href="${parentPrefix}admissions/admission_guide.html"`
  );
  content = content.replace(
    /href="\.\.\/admissions\/employment\.html"/g,
    `href="${parentPrefix}admissions/employment.html"`
  );
  content = content.replace(
    /href="\.\.\/admissions\/graduates\.html"/g,
    `href="${parentPrefix}admissions/graduates.html"`
  );
  content = content.replace(
    /href="\.\.\/admissions\/apply_guide\.html"/g,
    `href="${parentPrefix}admissions/apply_guide.html"`
  );

  // 科学研究相关链接
  content = content.replace(
    /href="\.\.\/research\/research_projects\.html"/g,
    `href="${parentPrefix}research/research_projects.html"`
  );
  content = content.replace(
    /href="\.\.\/research\/achievements\.html"/g,
    `href="${parentPrefix}research/achievements.html"`
  );
  content = content.replace(
    /href="\.\.\/research\/teams\.html"/g,
    `href="${parentPrefix}research/teams.html"`
  );
  content = content.replace(
    /href="\.\.\/research\/journals\.html"/g,
    `href="${parentPrefix}research/journals.html"`
  );

  // 校园文化相关链接
  content = content.replace(
    /href="\.\.\/campus\/clubs\.html"/g,
    `href="${parentPrefix}campus/clubs.html"`
  );
  content = content.replace(
    /href="\.\.\/campus\/art_show\.html"/g,
    `href="${parentPrefix}campus/art_show.html"`
  );

  // 联系我们
  content = content.replace(
    /href="\.\.\/contact\.html"/g,
    `href="${parentPrefix}contact.html"`
  );

  // 其他链接
  content = content.replace(
    /href="\.\.\/news\/news_detail\.html"/g,
    `href="${parentPrefix}news/news_detail.html"`
  );
  content = content.replace(
    /href="\.\.\/news\/notice_holiday\.html"/g,
    `href="${parentPrefix}news/notice_holiday.html"`
  );
  content = content.replace(
    /href="\.\.\/news\/notice_teacher_award\.html"/g,
    `href="${parentPrefix}news/notice_teacher_award.html"`
  );
  content = content.replace(
    /href="\.\.\/news\/notice_job_fair\.html"/g,
    `href="${parentPrefix}news/notice_job_fair.html"`
  );
  content = content.replace(
    /href="\.\.\/news\/notice_library_hours\.html"/g,
    `href="${parentPrefix}news/notice_library_hours.html"`
  );

  // 搜索结果页链接
  content = content.replace(
    /href="\.\.\/search_result\.html"/g,
    `href="${parentPrefix}search_result.html"`
  );

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

// 执行修复
console.log("开始修复导航链接...");
traverseDirectory(pagesDir); // 遍历修复所有HTML文件
console.log("所有导航链接修复完成!");
