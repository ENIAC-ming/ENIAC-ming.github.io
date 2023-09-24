---
layout: default
title: 多种方式让你快速访问 GitHub
description: 转自 <a href="https://cloud.tencent.com/developer/article/2318226">腾讯云(汤青松)</a> 发布于 2023-08-26 19:44:22
---

平时工作中，你可能和笔者一样会遇到访问 GitHub 缓慢或者打不开的问题。这里我总结了一些方法或许可以帮助你快速访问 GitHub，下载大项目还是获取小型代码和文档项目都有不同方案。

## 一：使用镜像网站

如果需要下载大型项目，特别是下载耗时较长（超过5分钟）且文件较大（超过30MB）的项目，强烈推荐使用代理网站或者将项目转移到 Gitee 上进行下载。

国内有许多 GitHub 镜像网站可以加速访问，下面是一些常用的镜像网站：

-   [https://hub.fastgit.xyz/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DJ6bY3vyR7iEXYTC2%252BrsZfQ%253D%253D.wzXcIQFiCXTunNDMeUv1Oh1KeCOIQ5SVq9qVh3zF6%252Bg%253D)
-   [https://cdn.githubjs.cf/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DQTEG3Hdwv7u%252F9sDV6Gj4lg%253D%253D.H0PH3USakTinBIh9m5z7p%252FzT6PCK1DxE7NKz2HSg3Nc%253D)
-   [https://gitclone.com/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3D1CjeW3dsA%252B959nKI1%252FKxFg%253D%253D.5NW4nDExC45eTPay6Yo392DTiDYW729eYnp7ouQG%252F2U%253D)
-   [https://www.github.do/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DlFMRFFVPqe2gbDlCpCuuDQ%253D%253D.2HrKtYXKMTAYgHBvB%252BeGNejvVAokXW553iW2aKLPltU%253D)
-   [https://ghproxy.com/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DnGVKA9FKIGPm3EId5pe%252FfQ%253D%253D.3SFQbsyS7eVHIZ4ehsrN44FU%252FiXhOuul%252FIZ5q52Efz8%253D)

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

-   [https://ghproxy.com/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3D2CdTdT6jkHItjrWYbym9mA%253D%253D.%252FAeaTF4PKZHzeL3T2Y70T6Ls6MyZRv1LUbbd%252BbA38pU%253D)
-   [https://toolwa.com/github/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3D7m1SS%252BNziIiBHL0OZErk5g%253D%253D.zxIAtEgG1STJCcufdJ8%252B3IsiCYgt18cJfzmoA9%252FaWwc%253D)

## 三：CDN 加速（修改 Hosts 文件）

通过修改系统 Hosts 文件的方式，你可以绕过国内 DNS 解析，直接访问 GitHub 的 CDN 节点，从而实现访问加速。以下是实现这一方法的详细步骤：

1.  打开 [https://www.ipaddress.com/](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DylS4o4i4%252FLWd8g4XoNlPow%253D%253D.MHsmqwR0Ag7oQw%252B7NYJVtj4tMUIdFi9vR6QfSxCKZtw%253D) 查询以下四个链接的 DNS 解析地址：
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
2.  登录 [Gitee](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3D1B%252B48OZd96wb%252F0%252FKy1qiTQ%253D%253D.bJeqiZB0xFGenXBlq5TrJLWUESm6YqOc1ZgOIsSVCEM%253D) ，将刚刚 Fork 的项目导入到 Gitee 中。
3.  在 Gitee 上下载项目，你会感受到明显的下载加速。

## 五：安装浏览器插件

你还可以安装浏览器插件来加速访问 GitHub。例如，你可以尝试 [Fast-GitHub 插件](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DRVl%252BKyeJAiXwR2QokNavfQ%253D%253D.%252BgIajUsR%252BujwrpadQtnMOGcL6oPevs%252FHfx2ykUfW%252FWvtn2rqXZP2vZa6Od%252Fsafhb) 。

## 六：使用 FastGitHub 软件

如果你想要更稳定的加速解决方案，可以考虑安装 [FastGitHub 软件](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DkHU%252F1nOx3If9C658xFTKEQ%253D%253D.QIyYx6nW8%252F%252Bf%252FIlsHkZ99NewqwSlkokTclXaV248yEWP6IeitBAJ6lxRTa1wMvY2GOFx49zVVYcFNDvzc8sc1w%253D%253D) 。以下是软件的安装部署方式：

-   对于 Windows-x64 桌面用户，双击运行 `FastGithub.UI.exe` 。
-   对于 Windows-x64 服务用户，使用以下命令进行操作： arduinoCopy code \`fastgithub.exe start // 以 Windows 服务安装并启动 fastgithub.exe stop // 以 Windows 服务卸载并删除\`
-   对于 Linux-x64 终端用户，可以使用以下命令启动： bashCopy code `sudo ./fastgithub` 同样，你可以将系统的自动代理设置为 `http://127.0.0.1:38457` ，或手动代理设置为 `http/https` 为 `127.0.0.1:38457` 。
-   对于 macOS-x64 用户，双击运行 `fastgithub` 文件，并安装并设置 `fastgithub.cer` 证书。

## 七：使用 Dev-Sidecar 软件

另一个值得推荐的解决方案是使用 [Dev-Sidecar 软件](/developer/tools/blog-entry?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3DtKQ8O8NYiZ5%252Fdnc7hDAEGg%253D%253D.Jv6pGNSJ1XbQ6DyDvMc%252Be8V88xqEuXm5zEvm%252Fi3zlPb63mjx7zIIR8mx7yfBFXUc) 。它可以作为其他机器的代理，适用于 Ubuntu 和 Windows 操作系统。

**优点：** 可以作为其他机器的代理，适用于 Ubuntu 和 Windows 操作系统。

**缺点：** 稳定性不如 FastGitHub，但比起一些其他方法，仍然是一个不错的选择。