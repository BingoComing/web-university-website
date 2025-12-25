// 使用Node.js批量更新HTML文件中的资源引用路径
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

// 更新HTML文件中的资源引用
htmlFiles.forEach((filePath) => {
  console.log(`Processing: ${filePath}`);

  // 读取文件内容
  let content = fs.readFileSync(filePath, "utf8");

  // 确定文件相对于pages目录的深度
  const relativePath = path.relative("./pages", filePath);
  const depth = relativePath.split(path.sep).length - 1;

  // 确定相对路径前缀
  const prefix = "../".repeat(depth + 1);

  // 更新CSS引用
  content = content.replace(
    /href="sy.css"/g,
    `href="${prefix}assets/css/main.css"`
  );

  // 更新JS引用
  content = content.replace(/src="sy.js"/g, `src="${prefix}assets/js/main.js"`);

  // 更新轮播图图片引用
  content = content.replace(
    /src="hf1.jpg"/g,
    `src="${prefix}assets/images/banners/hf1.jpg"`
  );
  content = content.replace(
    /src="hf2.jpg"/g,
    `src="${prefix}assets/images/banners/hf2.jpg"`
  );
  content = content.replace(
    /src="hf3.jpg"/g,
    `src="${prefix}assets/images/banners/hf3.jpg"`
  );
  content = content.replace(
    /src="hf4.jpg"/g,
    `src="${prefix}assets/images/banners/hf4.jpg"`
  );

  // 更新新闻图片引用
  content = content.replace(
    /src="hy.jpg"/g,
    `src="${prefix}assets/images/news/hy.jpg"`
  );

  // 保存更新后的内容
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated: ${filePath}`);
});

console.log("All files updated successfully!");
