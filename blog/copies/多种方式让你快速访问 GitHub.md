---
layout: default
title: 多种方式让你快速访问 GitHub
description: 转自 <a href="https://cloud.tencent.com/developer/article/2318226">腾讯云(汤青松)</a> 发布于 2023-08-26 19:44:22
---

平时工作中，你可能和笔者一样会遇到访问 GitHub 缓慢或者打不开的问题。这里我总结了一些方法或许可以帮助你快速访问 GitHub，下载大项目还是获取小型代码和文档项目都有不同方案。

## 一：使用镜像网站

如果需要下载大型项目，特别是下载耗时较长（超过5分钟）且文件较大（超过30MB）的项目，强烈推荐使用代理网站或者将项目转移到 Gitee 上进行下载。

国内有许多 GitHub 镜像网站可以加速访问，下面是一些常用的镜像网站：

-   [https://hub.fastgit.xyz/](https://hub.fastgit.xyz/)
-   [https://cdn.githubjs.cf/](https://cdn.githubjs.cf/)
-   [https://gitclone.com/](https://gitclone.com/)
-   [https://www.github.do/](https://www.github.do/)
-   [https://ghproxy.com/](https://ghproxy.com/)

对于较小的项目，如代码或文档类项目，你可以尝试使用 CDN 加速以获得适当的下载速度。

#### 示例：使用 GitHub 镜像网站

GitHub 镜像网站是一个方便的选择，只需要将项目地址中的 `github.com` 替换为 `github.com.cnpmjs.org` 即可：

原地址：

arduinoCopy code

`https://github.com/xxx.git`

替换为：

arduinoCopy code

`https://github.com.cnpmjs.org/xxx.git`

然后使用以下命令进行下载：

bashCopy code

`git clone https://github.com.cnpmjs.org/xxx.git`

你还可以尝试使用其他镜像网站，如 [https://hub.fastgit.xyz/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DIBqMb%252BlUPxWU8G5MNCtDAA%253D%253D.kXXuoVlR%252Bym0ilQNQ2zlhFLT86Tp5dSmBVrk0s5yEh0%253D) 。

## 二：代理网站下载

如果需要下载 GitHub Release 中的大文件，推荐使用代理网站。这些代理网站可以显著提升下载速度，而且无需注册。

以下是一些推荐的代理网站：

-   [https://ghproxy.com/](https://ghproxy.com/)
-   [https://toolwa.com/github/](https://toolwa.com/github/)

## 三：CDN 加速（修改 Hosts 文件）

通过修改系统 Hosts 文件的方式，你可以绕过国内 DNS 解析，直接访问 GitHub 的 CDN 节点，从而实现访问加速。以下是实现这一方法的详细步骤：

1.  打开 [https://www.ipaddress.com/](https://www.ipaddress.com/) 查询以下四个链接的 DNS 解析地址：
    -   github.com
    -   assets-cdn.github.com
    -   github.global.ssl.fastly.net
    -   raw.githubusercontent.com
2.  打开系统的 Hosts 文件，路径为 `C:\Windows\System32\drivers\etc` ，并添加以下内容（需管理员权限）：

```js
140.82.114.3 github.com
185.199.108.153 assets-cdn.github.com
199.232.69.194  github.global.ssl.fastly.net
185.199.108.133 raw.githubusercontent.com`
```

请注意，对于 macOS 或其他 Linux 系统，需要进入 `/etc` 目录下的 Hosts 文件进行修改，并确保保存后刷新 DNS 缓存。

## 四：转入 Gitee 加速

如果你在 GitHub 上下载速度较慢，不妨尝试将项目转移到 Gitee，下载速度会显著提升。以下是实现这一方法的步骤：

1.  找到想要下载的项目在 GitHub 上的地址，点击 "Fork "按钮将项目复制到你自己的 GitHub 账号下。
2.  登录 [Gitee](https://gitee.com/) ，将刚刚 Fork 的项目导入到 Gitee 中。
3.  在 Gitee 上下载项目，你会感受到明显的下载加速。

## 五：安装浏览器插件

你还可以安装浏览器插件来加速访问 GitHub。例如，你可以尝试 [Fast-GitHub 插件](/https://github.com/fhefh2015/Fast-GitHub) 。

## 六：使用 FastGitHub 软件

如果你想要更稳定的加速解决方案，可以考虑安装 [FastGitHub 软件](https://github.com/dotnetcore/FastGithub/) 。以下是软件的安装部署方式：

-   对于 Windows-x64 桌面用户，双击运行 `FastGithub.UI.exe` 。
-   对于 Windows-x64 服务用户，使用以下命令进行操作： arduinoCopy code \`fastgithub.exe start // 以 Windows 服务安装并启动 fastgithub.exe stop // 以 Windows 服务卸载并删除\`
-   对于 Linux-x64 终端用户，可以使用以下命令启动： bashCopy code `sudo ./fastgithub` 同样，你可以将系统的自动代理设置为 `http://127.0.0.1:38457` ，或手动代理设置为 `http/https` 为 `127.0.0.1:38457` 。
-   对于 macOS-x64 用户，双击运行 `fastgithub` 文件，并安装并设置 `fastgithub.cer` 证书。

## 七：使用 Dev-Sidecar 软件

另一个值得推荐的解决方案是使用 [Dev-Sidecar 软件](https://github.com/docmirror/dev-sidecar) 。它可以作为其他机器的代理，适用于 Ubuntu 和 Windows 操作系统。

**优点：** 可以作为其他机器的代理，适用于 Ubuntu 和 Windows 操作系统。

**缺点：** 稳定性不如 FastGitHub，但比起一些其他方法，仍然是一个不错的选择。