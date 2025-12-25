// 使用Node.js批量优化HTML文件，添加语义化标签
const fs = require("fs");
const path = require("path");

// 遍历目录并获取所有HTML文件
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (path.extname(file).toLowerCase() === ".html") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 获取所有HTML文件
const htmlFiles = getAllHtmlFiles("./pages");
console.log(`Found ${htmlFiles.length} HTML files`);

// 优化HTML文件
htmlFiles.forEach((filePath) => {
  console.log(`Processing: ${filePath}`);

  // 读取文件内容
  let content = fs.readFileSync(filePath, "utf8");

  // 优化语义化标签

  // 将特定div转换为section标签
  content = content.replace(
    /<div class="card-container">/g,
    '<section class="card-container">'
  );
  content = content.replace(
    /<\/div>\s*<!-- 校园美景 -->/g,
    "</section><!-- 校园美景 -->"
  );

  // 将特定div转换为article标签
  content = content.replace(
    /<div class="news-item">/g,
    '<article class="news-item">'
  );
  content = content.replace(
    /<\/div>\s*<ul class="news-list">/g,
    '</article>\n          <ul class="news-list">'
  );

  // 将特定div转换为aside标签
  content = content.replace(
    /<div class="content-right">/g,
    '<aside class="content-right">'
  );
  content = content.replace(/<\/div>\s*<\/main>/g, "</aside>\n    </main>");

  // 保存更新后的内容
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated: ${filePath}`);
});

console.log("All HTML files optimized successfully!");
