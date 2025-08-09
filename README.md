# BMA-OpenHIS-Document 开发者文档更新指引与注意事项

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Peideming/BMA-OpenHIS-Document)
![GitHub last commit](https://img.shields.io/github/last-commit/Peideming/BMA-OpenHIS-Document)

本指引面向所有文档贡献者，确保文档结构统一、内容规范、更新流程清晰。仓库采用纯 Markdown 结构，直接编辑即可，无需构建工具。

---

## 🚀 快速开始

```bash
git clone https://github.com/Peideming/BMA-OpenHIS-Document.git
cd BMA-OpenHIS-Document
git checkout -b docs/feat-医保入院流程
# 编辑文档后提交
git add .
git commit -m "docs(医保): 增补入院流程与注意事项"
git push -u origin docs/feat-医保入院流程
```

发起 Pull Request，说明变更内容、影响范围与自查结果。

---

## 📂 内容新增规范

### 📁 文件放置路径

仅以下三类文章可直接放在 `docs/` 根目录：

- `quick-start.md` 快速开始  
- `contact-us.md` 联系我们  
- `special-thanks.md` 特别感谢  

其他内容必须放在模块目录下，格式如下：

```
docs/模块英文名/文章英文名.md
```

示例：

```
docs/yibao/admission-overview.md
docs/inpatient/fee-export-guide.md
```

---

### 🧭 Sidebar 注册

所有新增文章必须在 `docs/.vitepress/config.mts` 的 `sidebar` 配置中注册，否则不会显示在侧边栏。

示例：

```ts
sidebar: [
  {
    text: '快速开始',
    items: [
      { text: '快速开始', link: '/quick-start' },
      { text: '快速部署', link: '/run-server' },
      { text: '修改配置', link: '/setting-his' },
    ]
  },
  {
    text: '开发文档',
    items: [
      { text: '医保模块说明', link: '/yibao/admission-overview' },
      { text: '住院费用导出', link: '/inpatient/fee-export-guide' },
    ]
  }
]
```

注意：

- `link:` 为文档路径，不含 `.md` 后缀  
- `text:` 为侧边栏显示名称，简洁清晰  
- 同模块文档建议按业务流程排序：流程 → 操作 → FAQ

---

### 🖼 图片与静态资源规范

- 图片请放置在：
  ```
  docs/public/image/
  ```
- 视频请放置在（如需使用）：
  ```
  docs/public/video/
  ```
- 其他静态资源（如 PDF、附件）放置在：
  ```
  docs/public/
  ```

引用时使用相对路径，不包含 `/public/` 前缀，VitePress 会自动识别：

```markdown
![医保入院示例](/image/yibao-admission-example.png)
```

---

### ✍️ Emoji 与贡献者说明

文档中可适量使用 emoji 提升可读性：

- ✅ 操作成功  
- ⚠️ 注意事项  
- 🛠 技术说明  
- 📎 附件/示意图  
- 💡 提示  

文章末尾可添加贡献者信息（可选）：

```markdown
---

## 👥 本文贡献者（按贡献时间排序）

- 撰写人姓名（撰写初稿）
- 校对人姓名（内容校对）
```

---

## 📁 目录结构建议

```
docs/
├── modules/        # 按业务模块组织（如医保、住院）
├── tutorials/      # 实操教程与操作指引
├── faq/            # 常见问题
├── references/     # 术语、规范、数据字典
├── public/         # 所有静态资源（图片、视频、附件）
└── assets/         # 保留旧资源，逐步迁移至 public/
```

---

## ✏️ 写作规范

- 使用简体中文，语句简洁，指令明确  
- 每页聚焦一个主题，标题包含关键词  
- 段落控制在 3–5 句，步骤用有序列表，注意事项用无序列表  
- 文件名使用短横线小写：`yibao-admission-overview.md`  
- 图片命名：`模块-主题-要点.png`，如 `yibao-admission-example.png`  
- 图片插入示例：
  ```markdown
  ![医保入院示例界面](/image/yibao-admission-example.png)
  ```
- 链接使用相对路径：
  ```markdown
  [医保入院流程](../modules/yibao/admission-overview.md)
  ```

---

## 🔒 合规与信息安全

- 禁止出现真实患者、医生、机构等可识别信息  
- 示例数据必须匿名化并标注“示例数据”  
- 不得暴露生产域名、IP、密钥、令牌等敏感信息  
- 高风险操作需说明前置条件、影响与回滚方案

---

## 🔁 提交流程与规范

1. 新建分支：`docs/feat-短描述` 或 `docs/fix-短描述`  
2. 自查内容是否完整、无敏感信息、链接有效  
3. 提交信息建议格式：
   ```
   docs(模块): 简要描述
   ```
   示例：`docs(住院): 补充费用导出限制说明`

4. Pull Request 说明包括：
   - 变更前后对比  
   - 动机与影响范围  
   - 验证方式（截图或关键步骤）  
   - 是否涉及重命名或引用更新

---

## ✅ PR 检查清单

- 内容正确、步骤可复现  
- 无敏感信息，示例数据已脱敏  
- 链接与图片路径有效  
- 术语统一，命名规范  
- sidebar 已更新，未遗漏引用

---

## 🧪 本地查看与排错

- 推荐使用 VS Code 预览 Markdown  
- GitHub 网页端也可直接查看渲染效果

常见问题：

- 图片不显示：检查路径与大小写  
- 表格错位：使用标准 Markdown 表格语法  
- 链接 404：检查是否遗漏 sidebar 注册或引用路径错误  
- 乱码：确保 UTF-8 编码，无非法字符

---

## 🕒 版本标注与变更记录

- 如文档与系统版本相关，请在文首注明“适用版本”或“更新时间”  
- 可在 `docs/changelog.md` 维护变更摘要（如团队同意）

---

## 📮 沟通与反馈

- 请在 Issues 提交问题或建议，建议包含：
  - 期望行为  
  - 当前现象  
  - 重现步骤  
  - 截图或示例

- 重要讨论结论请沉淀到文档中，避免仅留在评论区

---

## 📄 许可证说明

本仓库文档遵循 CC BY-NC-SA 4.0 协议：

| 条款 | 含义 | 要求 |
|------|------|------|
| BY（署名） | 使用者必须署名原作者 | 包括作者姓名、原始链接、协议说明 |
| NC（非商业性使用） | 禁止商业用途 | 包括广告、销售、盈利性服务等 |
| SA（相同方式共享） | 派生作品需使用相同协议 | 即改编后仍需采用 CC BY-NC-SA 4.0 授权 |

协议详情请参考：[Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## ⚠️ GitHub Actions 与缓存更新提醒

- 文档上传后可能触发 GitHub Actions 报错，导致 Pages 显示异常或服务中断  
- 请及时检查构建状态：[查看 Actions 状态](https://github.com/Peideming/BMA-OpenHIS-Document/actions)  
- 如服务异常，请尽快修复，避免影响他人查阅  
- 每次更新后请发送通知邮件至：`peideming132@163.com`  
  - 作者可能因学业未及时回复，但看到邮件会尽快更新 Cloudflare 缓存

---

让文档真实、清晰、可复现。每一次更新，都是在为一线实施和维护争取确定性与效率。
