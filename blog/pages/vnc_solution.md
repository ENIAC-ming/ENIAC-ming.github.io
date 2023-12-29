---
layout: default
title: 网页端VNC解决方案
description: 随时随地远程玩电脑
---

## TigerVNC

我们在这里使用的是`tigervnc`，当然你也可以使用其他的VNC服务端。

```console
kali@kali:~$ sudo apt update
kali@kali:~$ sudo apt install -y tigervnc-standalone-server
kali@kali:~$
kali@kali:~$ mkdir -p ~/.vnc/
kali@kali:~$
kali@kali:~$ wget https://gitlab.com/kalilinux/nethunter/build-scripts/kali-nethunter-project/-/raw/master/nethunter-fs/profiles/xstartup -O ~/.vnc/xstartup
kali@kali:~$
kali@kali:~$ vncserver :1
```

如果连接不上`gitlab.com`，可以手动将下面内容编辑到`~/.vnc/xstartup`文件中，注意修改你所需要的如`SHELL`等变量：

```sh
#!/bin/sh

#############################
##          All            ##
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
export SHELL=/bin/bash

#############################
##          Gnome          ##
#[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
#[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
#vncconfig -iconic &
#dbus-launch --exit-with-session gnome-session &


############################
##           LXQT         ##
####exec openbox-session
#exec startlxqt


############################
##          KDE           ##
#exec /usr/bin/startkde


############################
##          XFCE          ##
startxfce4
```

> 在最新版本中的xfce4中 `startxfce4` 后没有`&`符号，尚未测试其它桌面环境兼容性

注意：我们使用的是 `display :1`，以创建一个新的桌面。

我们可以检查一下 VNC 使用的端口：

```console
kali@kali:~$ ss -antp | grep vnc
LISTEN 0      5                  127.0.0.1:5901                 0.0.0.0:*     users:(("Xtigervnc",pid=996,fd=9))
LISTEN 0      5                      [::1]:5901                    [::]:*     users:(("Xtigervnc",pid=996,fd=10))
```

我们可以看到它使用的是 5901 端口。

我们还可以设置服务，让它在开机时运行。

编辑`/etc/systemd/system/vncserver@.service`：

```
[Unit]
Description=Start TightVNC server at startup
After=syslog.target network.target
 
[Service]
Type=forking
User=root
Group=root
WorkingDirectory=/root
 
PIDFile=/root/.vnc/%H:%i.pid
ExecStartPre=-/usr/bin/vncserver -kill :%i > /dev/null 2>&1
ExecStart=/usr/bin/vncserver -depth 24 -geometry 1280x800 :%i
ExecStop=/usr/bin/vncserver -kill :%i
 
[Install]
WantedBy=multi-user.target
```

然后，设置开机自启：

```sh
systemctl daemon-reload
systemctl enable vncserver@1.service
```

## noVNC

安装noVNC
```
kali@kali:~$ sudo apt update
kali@kali:~$ sudo apt install -y novnc
```


然后我们让 noVNC 运行（这会打开 `8081/TCP`）：

```console
kali@kali:~$ /usr/share/novnc/utils/novnc_proxy --listen 8081 --vnc localhost:5901
```

![](https://www.kali.org/docs/general-use/novnc-kali-in-browser/novnc-kali-in-browser-1.png)

我们还可以设置服务，让它在开机时运行。

编辑`/etc/systemd/system/novnc@.service`：

```
[Unit]
Description=NoVnc
After=syslog.target network.target
 
[Service]
Type=simple
User=root
Group=root
WorkingDirectory=/root

ExecStart=/usr/share/novnc/utils/novnc_proxy --listen 808%i --vnc localhost:590%i
KillMode=process
 
[Install]
WantedBy=multi-user.target
```

然后，设置开机自启：

```sh
systemctl daemon-reload
systemctl enable novnc@1.service
```

## 连接

更好的方法是，启用 SSH：

```console
kali@kali:~$ sudo systemctl enable ssh --now
kali@kali:~$
```

然后在远程的机器上，SSH 连接到你的 Kali 设置 _(你可能需要先启用端口转发)_

```console
$ ssh kali@192.168.13.37 -L 8081:localhost:8081
```

![](https://www.kali.org/docs/general-use/novnc-kali-in-browser/novnc-kali-in-browser-2.png)

- - -

参考文献：
[Kali In The Browser (noVNC)](https://www.kali.org/docs/general-use/novnc-kali-in-browser/)