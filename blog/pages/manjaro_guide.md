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

### 扫描（参考自[[经验分享] UOS/Deepin安装兄弟Brother打印机扫描驱动及配置文件的方法](https://bbs.chinauos.com/zh/post/11443)）

相比打印，扫描就来得简单多了。参考 [SANE - ArchWiki](https://wiki.archlinux.org/title/SANE) 只需要安装几个软件即可，GNOME 桌面甚至提供了一个非常简洁美观的 GUI 界面方便使用。

*此处对于部分操作针对**arch/manjaro**作了修改，请注意*

**1、下载扫描驱动Scanner Driver、扫描配置文件Scan-key-tool**

前往兄弟中文官网查找、下载相应型号的扫描驱动Scanner Driver、扫描配置文件Scan-key-tool。网址：https://support.brother.com/g/b/productsearch.aspx?c=cn&lang=zh

注意，本教程以Brother DCP-7195DW为例，其他型号打印机的用户，请下载对应型号的Scanner Driver、Scan-key-tool

![截图_选择区域_20220306115928.jpg](https://storage.deepin.org/thread/202203061202163237_%E6%88%AA%E5%9B%BE_%E9%80%89%E6%8B%A9%E5%8C%BA%E5%9F%9F_20220306115928.jpg)

**2、安装扫描驱动Scanner Driver**

可以双击运行deb包，或者在deb包所在文件夹——右键——在终端中打开——输入：

```shell
# 注意更换文件名
debtap brscan4-0.4.11-1.amd64.deb
sudo pacman -U brscan4-0.4.11-1-x86_64.pkg.tar.zst
```

如Brother DCP7195DW的扫描驱动deb包名称为brscan4-0.4.11-1.amd64.deb，那么这行代码为sudo dpkg -i --force-all brscan4-0.4.11-1.amd64.deb。在此提醒一下，UOS用户需要开启开发者模式才能使用sudo权限。

**3、安装扫描配置文件Scan-key-tool**

可以双击运行deb包，或者在deb包所在文件夹——右键——在终端中打开——输入：

```shell
# 注意更换文件名
debtap brscan-skey-0.3.2-0.amd64.deb
sudo pacman -U brscan-skey-0.3.2-1-x86_64.pkg.tar.zst
```

**4、检查安装情况**

终端中输入:

```shell
dpkg -l | grep Brother
```

查看列表中是否有Scanner S-KEY tool和Scanner Driver

![img](https://storage-bbs.chinauos.com/thread/202203271518533920_%E6%88%AA%E5%9B%BE_deepin-terminal_20220327151844.jpg)

**5、添加网络扫描仪**

终端中输入以下两行命令：

第一行命令（用于注册扫描仪）：

```shell
brsaneconfig4 -a name=(name your device) model=(model name) ip=xx.xx.xx.xx
```

**注意，这条命令括号中的内容以及IP地址需要用户自己替换完整**

比如我的Brother DCP-7195DW打印机，name（随意）我填写为Brother，model（根据打印机型号填写，我填写DCP-7195DW），我的打印机的IP地址为192.168.1.108，那么这行命令完整应为：brsaneconfig4 -a name=Brother model=DCP-7195DW ip=192.168.1.108

第二行命令（用于查看注册结果）：

```shell
brsaneconfig4 -q | grep (name of your device)
```

注意，括号中的内容需要用户自己根据上一条命令的name替换完整

比如我上一条命令name我命名为Brother，所以这条命令完整为：brsaneconfig4 -q | grep Brother

![img](https://storage-bbs.chinauos.com/thread/202203271523288374_%E6%88%AA%E5%9B%BE_%E9%80%89%E6%8B%A9%E5%8C%BA%E5%9F%9F_20220327152316.jpg)

**6、配置一键扫描功能**

终端中输入以下两行命令：

第一行命令（运行scan-key-tool）：

```shell
brscan-skey 
```

第二行命令（查看scan-key-tool是否检测到你的扫描仪）：

```shell
brscan-skey -l
```

![img](https://storage-bbs.chinauos.com/thread/202203271540244401_%E6%88%AA%E5%9B%BE_%E9%80%89%E6%8B%A9%E5%8C%BA%E5%9F%9F_20220327153945.jpg)

若检测出状态为Active，说明已经检测到扫描仪。如果检测不出结果，可以注销电脑，重新进入系统执行本行命令。如果仍检测不出结果，可以考虑重新执行上一行命令甚至重新执行本教程。