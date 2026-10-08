# investigatorzcy 的博客

使用 Obsidian 写 Markdown，通过 GitHub Desktop 同步；GitHub Actions 负责构建并发布。日常写作不需要安装 Hugo 或使用命令行。

## 新电脑：只需设置一次

1. 安装 Obsidian 和 GitHub Desktop，在 GitHub Desktop 登录自己的 GitHub 账号。
2. 用 GitHub Desktop 的 **File → Clone repository → URL** 克隆 `https://github.com/Crosser-of-River/investigatorzcy`。保存到容易找到的本地文件夹。
3. 在 Obsidian 选择 **打开本地仓库 / Open folder as vault**，选择刚下载的项目里的 **content 文件夹**。
4. 在 Obsidian 的核心插件中确认“模板”已启用。模板目录为 `_templates`；配置已随仓库保存。

旧电脑上未提交、未上传的笔记和图片不会自动出现，需要另外复制。不要把另一个私人笔记库整体复制到本项目中。

## 每次写作和发布

1. 开始前在 GitHub Desktop 点 **Fetch origin**，有更新时点 **Pull origin**。
2. 在 Obsidian 的 `posts/Crosser-of-River`、`posts/math` 或 `posts/diaries` 中新建一个文章文件夹，例如 `my-new-post`。文件夹名会成为网址的一部分，发布后尽量保持不变。
3. 在这个文件夹里新建 `index.md`，用命令面板执行“模板：插入模板”，选择对应栏目的模板（或通用的“新文章”）。填写标题，保留 `draft: true` 开始写作。
4. 图片可以直接粘贴到文章里，会放入文章旁的 `attachments` 文件夹。保持标准 Markdown 图片链接，连同图片一起提交。文章文件夹的示例结构：`posts/math/my-new-post/index.md` 和 `posts/math/my-new-post/attachments/image.png`。
5. 写完后把文章属性中的 `draft` 关闭（即 `draft: false`）。
6. 在 GitHub Desktop 检查要上传的文件，填写简短说明，点 **Commit to main**，再点 **Push origin**。
7. 在 [Actions](https://github.com/Crosser-of-River/investigatorzcy/actions) 等待本次部署变绿，然后打开 [博客](https://crosser-of-river.github.io/)。

旧文章继续在原来的文件中修改即可，不必迁移目录。旧文章开头的 `+++` 是 Hugo 支持的 TOML 格式；新模板用 `---` YAML 格式，方便 Obsidian 显示属性。

**草稿只是不出现在网站中。此源码仓库公开，推送后的草稿仍然能在 GitHub 上读到。** 不要提交不想公开的文字。Obsidian 的双链 `[[笔记]]`、嵌入 `![[图片]]` 和专用语法不保证在 Hugo 中显示；本项目已为新链接启用标准 Markdown，但不会自动转换旧链接。

## 栏目与标签规则

| 栏目 | 写什么 | Obsidian 目录 | 推荐模板 |
| --- | --- | --- | --- |
| 数学笔记 | 概念、证明、习题、学习总结 | `posts/math` | 数学笔记 |
| 渡河者说 | 围绕一个主题展开的随笔 | `posts/Crosser-of-River` | 渡河者说 |
| 日记 | 按日期记录日常生活 | `posts/diaries` | 日记 |

每篇文章通过所在目录归入一个主栏目，不需要重复填写 `categories`。标签用于跨文章查找主题：

- 数学笔记：优先用完整学科名，例如“交换代数”“代数拓扑”“微分几何”；不要同时使用“代拓”和“代数拓扑”等同义写法。
- 渡河者说：按需选“饮食”“校园”“阅读”“思考”等主题。
- 通常每篇选 1–3 个标签；日记可以不填。已有合适标签时优先复用，不为每篇文章单独造标签。
- 日记标题统一为“2026 年 10 月日记”等年月格式；文件名和已发布的网址不随标题更改。
- PDF 放在对应文章的文件夹里，通过标准 Markdown 链接提供下载，并在文章中说明内容；仍按文章主题归入栏目。

首页集中显示三个栏目和“时间线”；知乎与友情链接单列在下方。顶部“文章”按时间列出全部文章，“标签”按主题查找，“时间线”保留现有归档页面，“关于”说明栏目用途。

## 一次性启用评论

采用 giscus，读者使用 GitHub 账号留言。当前仓库已完成配置，以下步骤仅供以后重新配置时参考。

1. 在本仓库 **Settings → General → Features** 启用 **Discussions**。
2. 访问 <https://giscus.app/zh-CN>，按页面提示安装 giscus GitHub App，仅授权本仓库。
3. 仓库填 `Crosser-of-River/investigatorzcy`，分类选择实际存在的公告类型分类（通常是 `Announcements`）。选择 `pathname` 映射、严格匹配和简体中文。
4. 从页面生成的代码中取得 `data-repo-id` 和 `data-category-id`，填入 `hugo.toml` 的 `[params.giscus]` 下的 `repoID` 和 `categoryID`，`category` 填实际分类名，再把 `enabled` 改成 `true`。
5. 提交并推送配置，部署后用 GitHub 账号在一篇正式文章下测试留言。

这些 ID 不是密码；不要填写个人访问令牌。尚未配置时评论区隐藏，不会显示无效的登录框。单篇文章设 `comments: false` 可关闭评论。评论按文章路径关联，后续改网址前需规划评论迁移。

## 一次性启用背景音乐

1. 把要公开使用的音频放在项目根目录的 `static/music/`，例如 `static/music/background.mp3`，文件尽量小。
2. 在 `hugo.toml` 的 `[params.music]` 下设置 `enabled = true`、`src = "/music/background.mp3"`，并填写 `title`。
3. 提交并推送音频与配置。

播放器出现在页脚，由访客点击播放，支持循环和暂停；使用浏览器原生控制，音量操作取决于设备。默认不自动播放、不预先下载音频。站内点击链接时，同一首音乐会继续播放；新页面指定另一首时切换曲目并保留播放／暂停状态；新页面关闭音乐时停止并隐藏播放器。首次进入仍需手动播放。

### 给不同页面设置不同音乐

每个页面可以有自己的 `music` 配置：有页面配置时使用整组页面配置；没有时使用 `hugo.toml` 中的全站默认值；页面设 `enabled: false` 时隐藏播放器。页面音乐可以在全站音乐关闭时单独开启。

新文章使用 YAML 格式，在文件开头已有的 `---` 属性区域中添加（不要另建第二个属性区域）：

```yaml
music:
  enabled: true
  src: "/music/song-a.mp3"
  title: "这篇文章的配乐"
```

音频文件需上传至项目的 `static/music/song-a.mp3`。不同页面填不同音频地址即可。单篇关闭音乐：

```yaml
music:
  enabled: false
```

不填写 `music` 就沿用全站默认；换回默认时删除整个 `music` 属性块。Obsidian 若不能在属性面板编辑嵌套配置，请切换到源码模式编辑。

旧文章如果以 `+++` 开头，使用 TOML。在原有标题、日期、草稿等属性之后、结束的 `+++` 之前添加：

```toml
[music]
enabled = true
src = "/music/song-a.mp3"
title = "这篇文章的配乐"
```

旧文章关闭音乐可写 `[music]` 后加 `enabled = false`。TOML 的 `[music]` 后面只放音乐字段，避免把原有文章属性误归入音乐配置。

栏目页面：编辑对应的 `content/posts/栏目/_index.md`，在开头属性中添加相同配置。它只控制栏目页面本身，不会自动应用到栏目内每篇文章。首页可通过 `content/_index.md` 的属性单独设置；没有该文件时可新建，并使用 `---` 包围 YAML 属性。刷新网页、关闭标签页、跳往其他网站或遇到需要完整加载的特殊页面时，音乐仍会中断。站内前进／后退也遵循页面音乐配置；经过关闭音乐的页面后，再进入有音乐的页面需要手动播放。

## 发布配置与排查

- 源码位于本仓库，发布成品位于 `Crosser-of-River/Crosser-of-River.github.io` 的 `main` 分支；保留现有博客网址。
- 每次向 `main` 推送或手动触发 Actions，会使用固定的 Hugo `0.147.9` 和仓库锁定的 PaperMod 子模块版本，从干净的临时目录构建。拉取请求只构建，不发布。
- 跨仓库部署仍使用原有 Actions secret `PERSONAL_TOKEN`。如果构建成功、部署失败，检查令牌是否过期、是否有写入目标仓库的权限；只在 GitHub Secrets 中设置，不把令牌写进文件或发给别人。
- 不再跟踪生成的 `public/` 目录；旧文件可能只存在于旧构建结果而没有 Markdown 源文，删除这些产物前已保留在 Git 历史中。新部署会按当前源码生成页面，缺少源文的旧页面不会继续保留；如需恢复，先从旧提交找回正文并补成文章。
- 已发现“理论力学一”缺少 Markdown 源文，额外保存了 `docs/legacy-pages/theoretical-mechanics.html` 供恢复正文（外观引用的旧样式可能不可用）。已按作者要求仅保留备份，不恢复展示；此备份不会发布到博客。
- 若文章没出现，先检查 `draft` 是否为 `false`、日期是否在未来，以及 Actions 是否成功。

## 可选：本地预览

日常发布不需要此步骤。需要离线预览时安装 Hugo `0.147.9`，在项目根目录运行：

```sh
git submodule update --init --recursive
hugo server -D
```

`-D` 会在本地显示草稿，不改变正式发布规则。此版本评论与音频接入需完成上面的配置后才能在正式站点验证。
