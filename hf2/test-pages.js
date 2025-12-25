// 测试HTML文件的语法和资源引用
const fs = require('fs');
const path = require('path');

// 遍历目录并获取所有HTML文件
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (path.extname(file).toLowerCase() === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 获取所有HTML文件
const htmlFiles = getAllHtmlFiles('./pages');
console.log(`Found ${htmlFiles.length} HTML files`);

// 测试每个HTML文件
let totalErrors = 0;
let totalWarnings = 0;

htmlFiles.forEach(filePath => {
  console.log(`\nTesting: ${filePath}`);
  
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查CSS引用
    const cssMatches = content.match(/href="[^"]+\.css"/g);
    if (cssMatches) {
      cssMatches.forEach(match => {
        const cssPath = match.match(/href="([^"]+)"/)[1];
        const fullCssPath = path.join(path.dirname(filePath), cssPath);
        if (!fs.existsSync(fullCssPath)) {
          console.error(`  ❌ CSS not found: ${cssPath}`);
          totalErrors++;
        } else {
          console.log(`  ✅ CSS found: ${cssPath}`);
        }
      });
    }
    
    // 检查JS引用
    const jsMatches = content.match(/src="[^"]+\.js"/g);
    if (jsMatches) {
      jsMatches.forEach(match => {
        const jsPath = match.match(/src="([^"]+)"/)[1];
        const fullJsPath = path.join(path.dirname(filePath), jsPath);
        if (!fs.existsSync(fullJsPath)) {
          console.error(`  ❌ JS not found: ${jsPath}`);
          totalErrors++;
        } else {
          console.log(`  ✅ JS found: ${jsPath}`);
        }
      });
    }
    
    // 检查图片引用
    const imgMatches = content.match(/src="[^"]+\.(jpg|jpeg|png|gif|svg)"/gi);
    if (imgMatches) {
      imgMatches.forEach(match => {
        const imgPath = match.match(/src="([^"]+)"/)[1];
        // 跳过外部图片
        if (imgPath.startsWith('http')) {
          return;
        }
        const fullImgPath = path.join(path.dirname(filePath), imgPath);
        if (!fs.existsSync(fullImgPath)) {
          console.error(`  ❌ Image not found: ${imgPath}`);
          totalWarnings++;
        } else {
          console.log(`  ✅ Image found: ${imgPath}`);
        }
      });
    }
    
  } catch (error) {
    console.error(`  ❌ Error reading file: ${error.message}`);
    totalErrors++;
  }
});

console.log(`\n=== Test Summary ===`);
console.log(`Total files tested: ${htmlFiles.length}`);
console.log(`Total errors: ${totalErrors}`);
console.log(`Total warnings: ${totalWarnings}`);

if (totalErrors === 0 && totalWarnings === 0) {
  console.log(`🎉 All tests passed!`);
} else {
  console.log(`⚠️  Some tests failed. Please check the errors above.`);
}