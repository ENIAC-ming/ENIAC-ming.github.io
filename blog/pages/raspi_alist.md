---
layout: default
title: Raspberry Pi × Alist
description: 何不在家组装一台美妙的NAS呢？
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [安装](#安装)
- [配置](#配置)
  - [美化](#美化)
  - [搜索](#搜索)
  - [aria2](#aria2)
  - [内网穿透（前提是你已经配置好了FastTunnel服务端）](#内网穿透small前提是你已经配置好了fasttunnel服务端small)
    - [dotnet](#dotnet)
    - [安装](#安装-1)
    - [配置](#配置-1)
- [参考链接](#参考链接)

<!-- /code_chunk_output -->


## 安装

在开始之前，保证软件包最新 。

```bash
sudo apt update && sudo apt upgrade -y
```

获取Alist一键脚本安装（仅适用于 Linux amd64/arm64 平台）。

```bash
sudo curl -fsSL "https://alist.nn.ci/v3.sh" | sudo bash -s install
```

<details><summary>其它操作</summary> 
  
更新：

```bash
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s update
```


卸载：

```bash
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s uninstall
```

</details>

<details><summary>服务配置</summary> 
  
启动: `systemctl start alist`

关闭: `systemctl stop alist`

配置开机自启: `systemctl enable alist`

取消开机自启: `systemctl disable alist`

状态:` systemctl status alist`

重启: `systemctl restart alist`

</details>

安装完成后，会显示管理员信息，其中

```
username: admin
password: dDEm4150
```

是默认用户和密码，默认端口号为`5244`。

## 配置

### 美化

在`管理-设置-全局-自定义头部`中设置

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.replaceAll"></script>
<script>
function uinit()
{
let target = document.getElementsByClassName("hope-anchor hope-c-iHuheP hope-c-PJLV hope-c-PJLV-idrWMwW-css")[0];
target.href = "https://blog.enming.top/home/";
target.innerText = "ENIAC_ming";
}
window.onload = setTimeout(uinit, 3000 );
</script>
<style>
body { background-image: url(https://bing.shangzhenyang.com/api/1080p); background-size: cover; background-position: center; background-attachment: fixed;}
.hope-c-PJLV-igScBhH-css {background-color: #FFFFFFb2 !important;}
.hope-c-PJLV-iigjoxS-css {background-color: #202425b2 !important;}
.hope-c-PJLV-ihQbspH-css {padding: var(--hope-space-2) !important; border-radius: var(--hope-radii-md) !important; background: var(--hope-colors-neutral4); width: auto !important;}
.hope-c-cPYwgm {background-color: #FFFFFFb2 !important; border-radius: var(--hope-radii-xl) !important; padding: var(--hope-space-2) !important;}
</style>
```

### 搜索

按照以下步骤开启搜索:

1. 转到`索引`页，选择一个搜索索引，并单击`保存`;
2. 保存索引后，单击`构建索引`来构建索引;
3. 现在你可以通过点击页面右上角的搜索块或使用快捷键`Ctrl + K`来搜索文件。

若不按照上述提示开启会提示：**Search not available**。

|                | 数据库（全文搜索） | 数据库（非全文搜索）       | bleve    |
| -------------- | ------------------ | -------------------------- | -------- |
| 搜索结果       | 中文基本上搜不到   | 比全文搜索准，可以搜索中文 | 模糊匹配 |
| 搜索速度       | 快                 | 比全文搜索慢               | 快       |
| 指定文件夹搜索 | 支持               | 支持                       | 不支持   |
| 硬盘占用       | 低                 | 低                         | 高       |
| 自动增量更新   | 支持               | 支持                       | 不支持   |

请参照[不同搜索索引之间的差异](https://alist.nn.ci/zh/guide/advanced/search.html#%E4%B8%8D%E5%90%8C%E6%90%9C%E7%B4%A2%E7%B4%A2%E5%BC%95%E4%B9%8B%E9%97%B4%E7%9A%84%E5%B7%AE%E5%BC%82)。

### aria2

安装aria2。

```bash
sudo apt install aria2 -y
```

用你喜欢的编辑器编辑`/etc/rc.local `，在`exit 0`前添加以下内容：

```bash
exec aria2c --enable-rpc -D
```

或者可以使用`--rpc-secret`添加RPC密钥，如：

```
exec aria2c --enable-rpc -D --rpc-secret YOUR_PASSWORD
```

然后在`管理-设置-全局-自定义头部`中设置Aria2密钥。

### 内网穿透<small>（前提是你已经配置好了FastTunnel服务端）</small>

此处使用[FastTunnel](https://gitee.com/Hgui/FastTunnel)作为内网穿透的服务端和客户端，[文档见此处](https://docs.suidao.io/)。

#### dotnet

安装 .NET 7.0 Runtime。

```bash
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
sudo chmod +x ./dotnet-install.sh
./dotnet-install.sh --channel 7.0 --runtime aspnetcore
```

编辑`~/.bashrc`，加入：

```bash
export DOTNET_ROOT=$HOME/.dotnet
```

#### 安装

下载客户端

```bash
wget https://gitee.com/Hgui/FastTunnel/releases/download/v2.1.2/FastTunnel.Client.tar.gz
tar -zxvf FastTunnel.Client.tar.gz
cd FastTunnel.Client/
```

编辑配置文件`appsettings.json`

#### 配置

建议启用守护进程：

编辑`/usr/lib/systemd/system/FastTunnel.service`，将`/root/FastTunnel.Client/`更改为你自己的安装位置，dotnet最好使用绝对路径（我直接将[dotnet](https://dotnet.microsoft.com/zh-cn/download/dotnet/7.0)解压至同一文件夹下，一并解决了dotnet版本问题）。

```bash
[Unit]
Description=fasttunnel
[Service]
Type=simple
WorkingDirectory=/root/FastTunnel.Client/
Restart=on-failure
RestartSec=10
ExecStart=/root/FastTunnel.Client/dotnet FastTunnel.Client.dll
ExecReload=/root/FastTunnel.Client/dotnet FastTunnel.Client.dll
[Install]
WantedBy=multi-user.target
```

然后，执行 `systemctl daemon-reload` 重载配置

然后，执行 `systemctl enable FastTunnel.service` 开机自启

## 参考链接

[Alist官网](https://alist.nn.ci/)
