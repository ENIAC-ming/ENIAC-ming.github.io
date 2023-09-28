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

```shell
yay -S linuxqq
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

## 打印机（参考自[在 Arch Linux 上使用兄弟（Brother）打印机](https://blog.gimo.me/posts/using-brother-printer-on-linux/)）

### 安装

首先参考 [CUPS - ArchWiki](https://wiki.archlinux.org/title/CUPS) 安装必要的软件 cups，并启动相应的服务。

```bash
sudo pacman -S cups
sudo systemctl enable --now cups
```

#### 配置

访问 http://localhost:631/ 添加打印机即可。但我卡在这一步很久，虽然 CUPS 可以自动发现机器但是不知道为什么添加完打印机就是无法成功打印，由于官方并没有提供给 Arch Linux 的驱动安装包，不过也有 deb 和 rpm 包，我通过解压出里面的驱动程序，照道理应该可以使用才对，但就是不如愿，最后想要放弃的时候，通过手动配置 ipp 地址竟然成功添加并打印成功了，下面附上详细的步骤，以供后人参考。

![选择 Other Network Printers 中的 Internet Printing Protocol（ipp）](https://blog.gimo.me/posts/using-brother-printer-on-linux/CUPS_Add_Printer_1_hu5fe08531ddde13eea07ec4e98d254e63_105553_1020x802_resize_q75_h2_box_3.webp)选择 Other Network Printers 中的 Internet Printing Protocol（ipp）

![输入 ipp://192.168.2.143/ipp/port1，注意替换 IP 地址](https://blog.gimo.me/posts/using-brother-printer-on-linux/CUPS_Add_Printer_2_hubb4ee942e046868eedc02027805076d8_80651_1020x802_resize_q75_h2_box_3.webp)输入 ipp://192.168.2.143/ipp/port1，注意替换 IP 地址

![任意填写名称及描述](https://blog.gimo.me/posts/using-brother-printer-on-linux/CUPS_Add_Printer_3_hu0dc100d7ade6311147510fcc67c3f3fa_80544_1020x802_resize_q75_h2_box_3.webp)任意填写名称及描述

![Make 选择 Brother，Model 选择 IPP Everywhere™](https://blog.gimo.me/posts/using-brother-printer-on-linux/CUPS_Add_Printer_4_hu3b77e3cb8179cb23905fa61b97ce212d_89291_1020x802_resize_q75_h2_box_3.webp)Make 选择 Brother，Model 选择 IPP Everywhere™

![最后在 GNOME 设置界面里看到打印机成功添加](https://blog.gimo.me/posts/using-brother-printer-on-linux/GNOME_Settings_Printers_hu986723f6be26005212c65202a8917e13_58100_1181x790_resize_q75_h2_box_3.webp)最后在 GNOME 设置界面里看到打印机成功添加

### 扫描

相比打印，扫描就来得简单多了。参考 [SANE - ArchWiki](https://wiki.archlinux.org/title/SANE) 只需要安装几个软件即可，GNOME 桌面甚至提供了一个非常简洁美观的 GUI 界面方便使用。

#### 安装

```bash
sudo pacman -S sane sane-airscan simple-scan
```

#### GUI 程序

打开 Document Scanner（simple-scan），稍等片刻扫描仪设备便会出现，然后就可以扫描了。

另外通过比较，一般来说文字扫描有个 300 dpi，图片扫描最多 600 dpi 已经非常好了。往上除了徒增文件尺寸外似乎并没有太大用处。

![Document Scanner 主界面](https://blog.gimo.me/posts/using-brother-printer-on-linux/Document_Scanner_hu9b10475b0f1a26ab7cd7fa777ecc9839_27875_890x760_resize_q75_h2_box_3.webp)Document Scanner 主界面