---
layout: default
title: manjaro避坑指南
description: 2023.9.3
---

> 1. 换源
> 2. 更新系统
> 3. 修改主目录为英文
> 4. 重启
> 5. 安装微信QQ

## 换源

```shell
sudo pacman-mirrors -i -c China -m rank
```

## 开始

```shell
# 更新系统
sudo pacman -Syu
# 安装软件
sudo pacman -S xxx
# 搜索软件
sudo pacman -Ss xxx
# 彻底卸载软件
sudo pacman -Rns xxx
```

## 代理

### 临时代理

```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=https://127.0.0.1:7890
```

## 微信
> 可能遇到的问题：
> 
> [安装错误](https://github.com/vufa/deepin-wine-wechat-arch/issues/271)
> 
> [在文件夹中显示](https://github.com/vufa/deepin-wine-wechat-arch/issues/273)

```shell
sudo pacman -S yay
yay -S deepin-wine-wechat
```

## QQ

[官网下载](https://im.qq.com)

安装debtap
```shell
yay -S debtap
sudo debtap -u
sudo debtap xxx.deb
sudo pacman -U xxx.zst
```

## Manjaro修改主目录为英文

```shell
sudo pacman -S xdg-user-dirs-gtk
export LANG=en_US
xdg-user-dirs-gtk-update
#然后会有个窗口提示语言更改，更新名称即可
export LANG=zh_CN.UTF-8
#然后重启电脑如果提示语言更改，保留旧的名称即可
```

## Edge浏览器

```shell
yay -S microsoft-edge-stable-bin
# 配置代理
/usr/bin/microsoft-edge-stable --proxy-server="http://192.168.3.2:7890,direct://" --proxy-bypass-list="*.microsoft.com;*.cn;*.baidu.com;127.0.0.1"
```
[参考链接](https://learn.microsoft.com/zh-cn/deployedge/edge-learnmore-cmdline-options-proxy-settings)

## emoji

[[HowTo] Enable emoji fonts](https://forum.manjaro.org/t/howto-enable-emoji-fonts/36695)