# 项目部署指南

## 1. 本地验证

项目已在本地成功启动，您可以通过以下地址访问：
- 本地访问：http://localhost:44996
- 网络访问：http://169.254.153.95:44996

## 2. GitHub Pages部署步骤

### 2.1 创建GitHub仓库

1. 登录GitHub账户（https://github.com）
2. 点击右上角的「+」按钮，选择「New repository」
3. 填写仓库信息：
   - Repository name: 建议使用 `web-university-website` 或其他有意义的名称
   - Description: 可选，如「Web技术大学官网项目」
   - Visibility: 选择「Public」（公开）
   - 不要勾选「Add a README file」等其他选项
4. 点击「Create repository」

### 2.2 关联本地仓库与GitHub仓库

在GitHub仓库页面，复制仓库的SSH或HTTPS地址，然后在本地仓库目录下执行以下命令：

```bash
# 使用HTTPS
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 或使用SSH
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

### 2.3 推送代码到GitHub

执行以下命令将本地代码推送到GitHub仓库：

```bash
git push -u origin master
```

### 2.4 启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击「Settings」选项卡
3. 在左侧菜单中选择「Pages」
4. 在「Build and deployment」部分：
   - Source: 选择「Deploy from a branch」
   - Branch: 选择「gh-pages」，然后点击「Save」

### 2.5 访问部署后的网站

部署成功后，您可以通过以下地址访问网站：
```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME
```

GitHub Pages部署可能需要几分钟时间，请耐心等待。

## 3. 自动化部署

项目已配置GitHub Actions，当您将代码推送到`master`分支时，会自动触发部署流程：

1. GitHub Actions会自动运行部署脚本
2. 将代码部署到`gh-pages`分支
3. GitHub Pages会自动从`gh-pages`分支构建网站

## 4. 其他部署选项

### 4.1 使用Netlify部署

1. 访问Netlify官网（https://www.netlify.com）
2. 点击「Sign up」注册账户
3. 选择「Import an existing project」
4. 选择「GitHub」并授权
5. 选择您的项目仓库
6. 点击「Deploy site」

### 4.2 使用Vercel部署

1. 访问Vercel官网（https://vercel.com）
2. 点击「Sign up」注册账户
3. 选择「Import Project」
4. 选择「GitHub」并授权
5. 选择您的项目仓库
6. 点击「Deploy」

## 5. 故障排除

### 5.1 本地服务器无法访问

- 检查端口是否被占用：`netstat -ano | findstr :8000`
- 尝试使用其他端口：`serve -s -l 8080`

### 5.2 GitHub Pages部署失败

- 检查GitHub Actions日志，查看具体错误信息
- 确保仓库中有`index.html`文件
- 检查`gh-pages`分支是否存在

### 5.3 网站样式或功能异常

- 检查浏览器控制台是否有错误信息
- 确保所有资源文件路径正确
- 清除浏览器缓存后重新访问

## 6. 项目结构

```
web-university-website/
├── assets/              # 静态资源
│   ├── css/            # CSS样式文件
│   ├── images/         # 图片资源
│   └── js/             # JavaScript文件
├── pages/              # 页面文件
│   ├── about/          # 关于学校
│   ├── admissions/     # 招生就业
│   ├── alumni/         # 校友总会
│   ├── campus/         # 校园文化
│   ├── departments/    # 院系设置
│   ├── library/        # 图书馆
│   └── news/           # 新闻中心
├── .github/            # GitHub配置
│   └── workflows/      # GitHub Actions工作流
├── index.html          # 首页
├── README.md           # 项目说明
└── PROJECT_DOCUMENTATION.md  # 项目文档
```

## 7. 联系方式

如果您在部署过程中遇到问题，可以通过以下方式获取帮助：

- 查看GitHub Pages官方文档：https://docs.github.com/cn/pages
- 参考GitHub Actions官方文档：https://docs.github.com/cn/actions

祝您部署顺利！