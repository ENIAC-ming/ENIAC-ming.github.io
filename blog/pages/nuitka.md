---
layout: default
title: nuitka踩坑日记
description: 2023.10.14
---


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [注意事项](#注意事项)
- [环境配置](#环境配置)
  - [安装nuitka](#安装nuitka)
  - [例子](#例子)
- [附录](#附录)
  - [参考命令](#参考命令)
    - [常用选项](#常用选项)
    - [控制结果中包含的模块和包](#控制结果中包含的模块和包)
    - [控制到导入的模块](#控制到导入的模块)
    - [OneFile选项](#onefile选项)
    - [数据文件](#数据文件)
    - [DLL文件](#dll文件)
    - [控制Nuitka发出的警告](#控制nuitka发出的警告)
    - [编译后立即执行](#编译后立即执行)
    - [编译选项](#编译选项)
    - [输出选项](#输出选项)
    - [调试功能](#调试功能)
    - [后端C编译器选择](#后端c编译器选择)
    - [缓存控制](#缓存控制)
    - [PGO编译选项](#pgo编译选项)
    - [跟踪功能](#跟踪功能)
    - [操作系统通用选项](#操作系统通用选项)
    - [Windows特定控件](#windows特定控件)
    - [macOS特定控件](#macos特定控件)
    - [Linux特定控件](#linux特定控件)
    - [二进制版本信息](#二进制版本信息)

<!-- /code_chunk_output -->

## 注意事项

- 使用时nuitka并未支持Python 3.11，本文使用Python 3.10
- [官方用户手册](https://nuitka.net/doc/user-manual.html)

## 环境配置

- [Python 3.10.11](https://www.python.org/downloads/release/python-31011/)
- [MinGW64](https://github.com/niXman/mingw-builds-binaries/releases) 可以直接安装最新版 x86_64-13.2.0-release-win32-seh-ucrt-rt_v11-rev0
- [ccache-4.8.3-windows-x86_64](https://github.com/ccache/ccache/releases/download/v4.8.3/ccache-4.8.3-windows-x86_64.zip)
- [depends22_x64](https://dependencywalker.com/depends22_x64.zip)
- [upx](https://upx.github.io/)

ccache、depends和upx是单文件可执行文件，可以直接塞到`mingw64/bin/`里，然后配置环境变量。

官方编译器支持列表

| Visual C version | Redist Year | CPython                       |
| ---------------- | ----------- | ----------------------------- |
| 14.3             | 2022        | 3.11                          |
| 14.2             | 2019        | 3.5, 3.6, 3.7, 3.8, 3.9, 3.10 |
| 14.1             | 2017        | 3.5, 3.6, 3.7, 3.8            |
| 14.0             | 2015        | 3.5, 3.6, 3.7, 3.8            |
| 10.0             | 2010        | 3.3, 3.4                      |
| 9.0              | 2008        | 2.6, 2.7                      |

| MingGW64 version | Redist Year | CPython                             |
| ---------------- | ----------- | ----------------------------------- |
| 8.1.0            | 2015        | 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11 |

经测试8.1.0版本过低，建议直接安装最新版，安装过程参考[这篇文章](https://blog.csdn.net/B11050729/article/details/132176767)。

### 安装nuitka

**首先确保你的Python版本受支持！！！**

```shell
python --version
```

安装nuitka

```shell
python -m pip install nuitka
python -m nuitka --version #验证安装是否成功
```

### 例子

```shell
python -m nuitka --mingw64 --standalone --onefile --nofollow-imports --show-memory --show-progress --output-dir=out --windows-disable-console --windows-file-version=0.1.1 --file-version=0.1.1 --plugin-enable=upx .\timer_bg.py
```

## 附录

### 参考命令

参考自[详解nuitka打包](https://blog.csdn.net/qq_40597070/article/details/130919454)

```
Usage: __main__.py [--module] [--run] [options] main_module.py

Options:
--help                  显示此帮助消息并退出
--version               显示错误报告的版本信息和重要详细信息，然后退出。默认为关闭。
--module                创建一个可执行的扩展模块，而不是一个程序。默认为关闭。
--standalone            为输出启用独立模式。这允许您在不使用现有Python安装的情况下将创建的二进制文件传输到其他机器。这也意味着它将变得更大。它暗示了以下选项："--follow imports"和"--python flag=no_site"。默认为关闭。
--onefile               在独立模式之上，启用onefile模式。这意味着不是一个文件夹，而是一个压缩的可执行文件被创建和使用。默认为关闭。
--python-debug          是否使用调试版本。Default使用您正在使用的来运行Nuitka，很可能是非调试版本。
--python-flag=FLAG      要使用的Python标志。默认值是您用来运行Nuitka的内容，这会强制执行特定的模式。这些选项也存在于标准Python可执行文件中。当前支持："-S"（别名"no_site"）、"static_hashes"（不使用哈希随机化）、"no_warnings"（不给出Python运行时警告）、"-O"（别名为"no_assels"）、"no_docstring"（不使用文档字符串）、"-u"（别名为"unbuffered"）和"-m"。默认为空。
--python-for-scons=PATH  如果使用Python3.3或Python3.4，请提供用于Scons的Python二进制文件的路径。否则，Nuitka可以使用您运行Nuitka的软件，也可以使用Windows注册表中的Python安装。在Windows上，需要Python 3.5或更高版本。在非Windows上，Python 2.6或2.7也可以。
```

#### 常用选项

```
--mingw64 #默认为已经安装的vs2017去编译，否则就按指定的比如mingw(官方建议)
--standalone 独立环境，这是必须的(否则拷给别人无法使用)
--windows-disable-console 没有CMD控制窗口
--output-dir=out 生成exe到out文件夹下面去
--show-progress 显示编译的进度，很直观
--show-memory 显示内存的占用
--enable-plugin=pyside6  打包pyside6模块的刚需
--plugin-enable=tk-inter 打包tkinter模块的刚需
--plugin-enable=numpy 打包numpy,pandas,matplotlib模块的刚需
--plugin-enable=torch 打包pytorch的刚需
--plugin-enable=tensorflow 打包tensorflow的刚需
--windows-icon-from-ico=你的.ico 软件的图标
--windows-company-name=Windows下软件公司信息
--windows-product-name=Windows下软件名称
--windows-file-version=Windows下软件的信息
--windows-product-version=Windows下软件的产品信息
--windows-file-description=Windows下软件的作用描述
--windows-uac-admin=Windows下用户可以使用管理员权限来安装
--linux-onefile-icon=Linux下的图标位置
--onefile 像pyinstaller打包成单个exe文件
--include-package=复制比如numpy,PyQt5 这些带文件夹的叫包或者轮子
--include-module=复制比如when.py 这些以.py结尾的叫模块
–-include-package-data=包含给定软件包名称中的数据文件，等号后软件包名称。有的时候Nuitka并不能正确分析出一些Python软件包所需要使用的数据文件，在运行程序时提示FileNotFoundError等错误，此时就需要使用该选项。如：--include-package-data=ultralytics
–-include-data-files= 按文件名包含数据文件，等号后的格式为<SRC=DEST>。SRC指的是文件夹的路径，DEST指的是文件夹相对于打包结果的路径，其中DEST只能使用相对路径。如：--include-data-files=/Users/admin/Downloads/yolov5n.pt=./yolov5n.pt
-–include-data-dir= 包含文件夹中的数据文件，等号后的格式为<SRC=DEST>。使用方法与--include-data-files=相同。
--follow-import-to=MODULE/PACKAGE    如果使用该模块，请遵循该模块；如果是一个包，请遵循整个包。可以多次给定。默认为空。
```

在多文件打包时会自动寻找其他导入文件，可作以下尝试

#### 控制结果中包含的模块和包

```
--include-package=PACKAGE      包括整个包裹。作为Python命名空间，例如"some_package.sub_package"，然后Nuitka会找到它，并将它和在该磁盘位置下找到的所有模块包括在它创建的二进制或扩展模块中，并使其可供代码导入。为了避免不需要的子包，例如测试，您可以这样做"--nofollow import To=*.tests"。默认为空。
--include-module=MODULE       包括单个模块。将其作为Python命名空间，例如"some_package.some_module"，然后Nuitka会找到它，并将其包含在它创建的二进制或扩展模块中，并使其可由代码导入。默认为空。
--include-plugin-directory=MODULE/PACKAGE   还包括在该目录中找到的代码，将它们视为一个主文件。覆盖所有其他包含选项。您应该更喜欢其他包含选项，这些选项以名称而不是文件名命名，这些选项通过在"sys.path"中查找内容。此选项仅适用于非常特殊的用例。可以多次给定。默认为空。
--include-plugin-files=PATTERN      包括在与图案匹配的文件中。覆盖所有其他跟随选项。可以多次给定。默认为空。
--prefer-source-code        对于已经编译的扩展模块，其中既有源文件又有扩展模块，通常使用扩展模块，但最好从可用的源代码编译模块以获得最佳性能。如果不需要，则有--no-preferred源代码来禁用有关它的警告。默认为关闭。
```

#### 控制到导入的模块

```
--follow-imports         下降到所有导入的模块中。在独立模式下默认为打开，否则为关闭。
--follow-import-to=MODULE/PACKAGE    如果使用该模块，请遵循该模块；如果是一个包，请遵循整个包。可以多次给定。默认为空。
--nofollow-import-to=MODULE/PACKAGE    即使使用该模块名称，也不要跟随该模块名称；或者，如果包名称在任何情况下覆盖整个包，则覆盖所有其他选项。可以多次给定。默认为空。
--nofollow-imports       根本不要进入任何导入的模块，覆盖所有其他包含选项，并且不适用于独立模式。默认为关闭。
--follow-stdlib          还可以从标准库中导入模块。这将大大增加编译时间，而且目前还没有经过很好的测试，有时也无法工作。默认为关闭。
```

#### OneFile选项

```
--onefile-tempdir-spec=ONEFILE_TEMPDIR_SPEC    将其用作在一个文件模式下解压缩到的文件夹。默认为"%TEMP%/onefile_%PID%_%TIME%"，即用户临时目录，并且是非静态的，它将被删除。例如，使用"%CACHE_DIR%%COMPANY%/%PRODUCT%/%VERSION%"这样的字符串，这是一个良好的静态缓存路径，因此不会删除。
--onefile-child-grace-time=GRACE_TIME_MS     当停止子项时，例如由于CTRL-C或关机等原因，Python代码会得到一个"KeyboardInterrupt"，它可以处理该中断，例如刷新数据。这是以毫秒为单位的时间，在它以艰难的方式杀死孩子之前。单位为毫秒，默认为5000。
```

#### 数据文件

```
--include-package-data=PACKAGE      当停止子项时，例如由于CTRL-C或关机等原因，Python代码会得到一个"KeyboardInterrupt"，它可以处理该中断，例如刷新数据。这是以毫秒为单位的时间，在它以艰难的方式杀死孩子之前。单位为毫秒，默认为5000。
--include-data-files=DESC       在分发中按文件名包括数据文件。允许的形式有很多。使用"--include data files=/path/to/file/*.txt=folder_name/some.txt"，它将复制单个文件，如果是多个文件，则会抱怨。使用"--include data files=/path/to/files/*.txt=folder_name/"，它会将所有匹配的文件放入该文件夹。对于递归复制，有一个具有3个值的表单"--include data files=/path/to/scan=folder_name=**/*.txt"，将保留目录结构。默认为空。
--include-data-dir=DIRECTORY       在分发中包括完整目录中的数据文件。这是递归的。如果您想要非递归包含，请使用模式检查"--include data files"。一个例子是整个目录的"--include data dir=/path/some_dir=data/some_dir"（用于纯拷贝）。所有文件都将被复制，如果要排除文件，则需要事先将其删除，或者使用"--noinclude data files"选项将其删除。默认为空。
--noinclude-data-files=PATTERN     不要包含与给定文件名模式匹配的数据文件。这是针对目标文件名，而不是源路径。因此，要忽略包数据中的文件模式，"package_name"应匹配为"package_name/*.txt"。或者，对于整个目录，只需使用"packagename"。默认为空。
--list-package-data=LIST_PACKAGE_DATA    输出为给定包名称找到的数据文件。未完成默认设置。
```

#### DLL文件

```
--noinclude-dlls=PATTERN        不包括与文件名模式匹配的DLL文件鉴于这是针对目标文件名，而不是源文件名路径。因此，忽略包含在软件包"package_name"应匹配为"软件包名称/someDLL.*"。默认为空。            
--list-package-dlls=LIST_PACKAGE_DLLS    输出为给定程序包名称找到的DLL。未完成默认设置。
```

#### 控制Nuitka发出的警告

```
--warn-implicit-exceptions    对编译时检测到的隐式异常启用警告。
--warn-unusual-code      对编译时检测到的异常代码启用警告。
--assume-yes-for-downloads    如果需要，允许Nuitka下载外部代码，例如依赖walker、ccache，甚至Windows上的gcc。要禁用，请重定向来自nul设备的输入，例如"</dev/null"或"<nul:"。默认为提示。
--nowarn-mnemonic=MNEMONIC    禁用给定助记符的警告。这些是为了确保你了解某些主题，通常指向Nuitka网站。助记符是URL末尾的一部分，没有HTML后缀。可以多次给定并接受shell模式。默认为空。
```

#### 编译后立即执行

```
--run                  立即执行创建的二进制文件（或导入编译后的模块）。默认为关闭。
--debugger             在调试器内部执行，例如"gdb"或"lldb"，以自动获取堆栈跟踪。默认为关闭。
--execute-with-pythonpath    使用"--run"立即执行创建的二进制文件或模块时，不要重置"PYTHONPATH"环境。当所有模块都成功包含在内时，您应该不再需要PYTHONPATH，而且绝对不需要独立模式。
```

#### 编译选项

```
--user-package-configuration-file=YAML_FILENAME    用户提供的带有包配置的Yaml文件。您可以包括DLL、删除膨胀、添加隐藏的依赖项。有关要使用的格式的完整说明，请参阅《用户手册》。可以多次给定。默认为空。
--full-compat               强制执行与CPython的绝对兼容性。甚至不允许与CPython行为发生微小偏差，例如，没有更好的回溯或异常消息，这些消息并非真正不兼容，只是不同或更糟。这仅用于测试，不应使用。
--file-reference-choice=MODE         选择"__file__"的值。对于"运行时"（独立二进制模式和模块模式的默认值），创建的二进制文件和模块，使用其自身的位置来扣除"__file___"的值。包含的包假装在该位置下方的目录中。这允许您在展开中包含数据文件。如果您只是寻求加速，最好使用"原始"值，即将使用源文件位置的值。在"冻结"的情况下，会使用符号"＜冻结模块名称＞"。出于兼容性原因，"__file__"值将始终具有".py"后缀，而与实际值无关。
--module-name-choice=MODE         选择"__name__"和"__package__"的值。使用"运行时"（模块模式的默认值），创建的模块使用父包来推导"__package __"的数值，以完全兼容。值"original"（其他模式的默认值）允许进行更多的静态优化，但与通常可以加载到任何包中的模块不兼容。
```

#### 输出选项

```
--output-filename=FILENAME    指定应如何命名可执行文件。对于扩展模块没有选择，对于独立模式也没有选择，使用它将是一个错误。这可能包括需要存在的路径信息。在此平台上默认为"<program_name>"。执行
--output-dir=DIRECTORY     指定中间输出文件和最终输出文件的放置位置。DIRECTORY将填充构建文件夹、dist文件夹、二进制文件等。默认为当前目录。
--remove-output         生成模块或exe文件后删除生成目录。默认为关闭。
--no-pyi-file           不要为Nuitka创建的扩展模块创建".piy"文件。这用于检测隐式导入。默认为关闭。
```

#### 调试功能

```
--debug                          在Nuitka中执行所有可能的自检以查找错误，不用于生产。默认为关闭。
--unstripped                     在生成的对象文件中保留调试信息，以便更好地进行调试器交互。默认为关闭。
--profile                        启用基于vmprof的花费时间分析。当前不工作。默认为关闭。
--internal-graph                 创建优化过程内部的图形，不用于整个程序，而仅用于小型测试用例。默认为关闭。
--trace-execution                跟踪执行输出，在执行之前输出代码行。默认为关闭。
--recompile-c-only               这不是增量编译，而是仅用于Nuitka开发。获取现有文件，然后简单地将它们重新编译为C。允许编译经过编辑的C文件，以便快速调试对生成的源代码的更改，例如查看是否传递了代码、值输出等，默认为关闭。取决于编译Python源代码来确定应该查看哪些文件。
--xml=XML_FILENAME               将内部程序结构、优化结果以XML形式写入给定的文件名。
--generate-c-only                只生成C源代码，不将其编译为二进制或模块。这是为了调试和代码覆盖率分析，不会浪费CPU。默认为关闭。不要认为您可以直接使用此选项。
--experimental=FLAG              使用声明为"实验性"的功能。如果代码中没有实验特性，则可能没有任何效果。每个实验功能都使用秘密标签（检查源）。
--low-memory                     通过分叉更少的C编译作业和使用使用更少内存的选项，尝试使用更少的内存。用于嵌入式机器。在内存不足的情况下使用此选项。默认为关闭。
--create-environment-from-report=CREATE_ENVIRONMENT_FROM_REPORT   在给定的报告文件的不存在路径中创建一个新的virtualenv，例如"--report=compilation-report.xml"。默认情况下未完成。
```

#### 后端C编译器选择

```
--clang                强制使用叮当声。在Windows上，这需要一个工作的Visual Studio版本才能搭载。默认为关闭。
--mingw64              在Windows上强制使用MinGW64。除非使用带有MinGW Python的MSYS2，否则默认为禁用。
--msvc=MSVC_VERSION    在Windows上强制使用特定的MSVC版本。允许的值是例如"14.3"（MSVC 2022）和其他MSVC版本号，指定"list"作为已安装编译器的列表，或使用"latest"。如果已安装，则默认为使用的最新MSVC，否则使用MinGW64。
--jobs=N               指定允许的并行C编译器作业数。默认为系统CPU计数。
--lto=choice           使用链接时间优化（MSVC、gcc、clang）。允许的值有"是"、"否"和"自动"（当已知有效时）。默认为"自动"。
--static-libpython=choice   使用Python的静态链接库。允许的值有"是"、"否"和"自动"（当已知有效时）。默认为"自动"。
```

#### 缓存控制

```
--disable-cache=DISABLED_CACHES   禁用选定的缓存，为所有缓存指定"all"。当前允许的值为："all"、"ccache"、"bytecode"、"dll dependencies"。可以多次给定，也可以使用逗号分隔的值。默认为无。
--clean-cache=CLEAN_CACHES     在执行之前清除给定的缓存，为所有缓存指定"all"。当前允许的值为："all"、"ccache"、"bytecode"、"dll dependencies"。可以多次给定，也可以使用逗号分隔的值。默认为无。
--disable-bytecode-cache     不要重复使用作为字节码包含的模块的依赖性分析结果，特别是来自标准库的依赖性。与--disable-cache=字节码相同。
--disable-ccache         不要尝试使用ccache（gcc、clang等）或clcache（MSVC、clangcl）。与--disable-cache=cache相同。
--disable-dll-dependency-cache    禁用依赖项助行器缓存。将导致创建分发文件夹的时间更长，但可能会在怀疑缓存会导致错误的情况下使用。与--disable-cache=dll-依赖项相同。
--force-dll-dependency-cache-update  用于更新依赖项助行器缓存。将导致创建分发文件夹的时间更长，但可能会用于怀疑缓存会导致错误或已知需要更新的情况。
```

#### PGO编译选项

```
--pgo                   通过首先为分析运行执行专用构建，然后使用结果反馈到C编译中，启用C级配置文件引导优化（PGO）。注意：这是实验性的，还不适用于Nuitka的独立模式。默认为关闭。
--pgo-args=PGO_ARGS     在配置文件引导优化的情况下要传递的参数。在PGO分析运行期间，这些文件被传递给特殊构建的可执行文件。默认为空。
--pgo-executable=PGO_EXECUTABLE  收集配置文件信息时要执行的命令。仅当您需要通过准备运行的脚本启动它时才使用此选项。默认使用创建的程序。
```

#### 跟踪功能

```
--report=REPORT_FILENAME   XML输出文件中的报表模块、数据文件、编译、插件等详细信息。这对于问题报告也非常有用。例如，这些报告可以用于重新创建环境，使用"--从报告创建环境"很容易，但包含大量信息。默认为禁用。
--report-template=REPORT_DESC  通过模板进行报告。提供模板和输出文件名"template.rst.j2:output.rst"。对于内置模板，请查看《用户手册》中的内容。可以多次给定。默认值为空。
--quiet                禁用所有信息输出，但显示警告。默认为关闭。
--show-scons           使用详细信息运行C构建后端Scons，显示执行的命令和检测到的编译器。默认为关闭。
--no-progressbar       禁用进度条。默认为off.ted编译器。默认为关闭。
--show-progress        过时：提供进度信息和统计数据。禁用正常进度条。默认为关闭。
--show-memory          提供内存信息和统计信息。默认为关闭。
--show-modules         提供包含的模块和DLL的信息已过时：应改用"--report"文件。默认为关闭。
--show-modules-output=PATH   输出"--show modules"的位置应为文件名。默认为标准输出。
--verbose              输出所采取操作的详细信息，特别是在优化中。可以变得很多。默认为关闭。
--verbose-output=PATH    从"--verbose"输出的位置应该是一个文件名。默认为标准输出。
```

#### 操作系统通用选项

```
--disable-console         为Windows或macOS编译时，请禁用控制台窗口并创建GUI应用程序。默认为关闭。
--enable-console          为Windows或macOS编译时，请启用控制台窗口并创建控制台应用程序。这会禁用某些模块的提示，例如建议禁用它的"PySide"。默认值为true。
--force-stdout-spec=FORCE_STDOUT_SPEC    强制程序的标准输出到此位置。适用于禁用控制台的程序和使用Nuitka商业版Windows服务插件的程序。默认为非活动，例如使用"%PROGRAM%.out.txt"，即程序附近的文件。
--force-stderr-spec=FORCE_STDERR_SPEC    强制程序的标准错误到此位置。适用于禁用控制台的程序和使用Nuitka商业版Windows服务插件的程序。默认为非活动，例如使用"%PROGRAM%.err.txt"，即程序附近的文件。
```

#### Windows特定控件

```
--windows-icon-from-ico=ICON_PATH         添加可执行文件图标。对于不同的分辨率或内部有多个图标的文件，可以多次给定。在后面的情况下，您还可以使用#<n>后缀，其中n是从1开始的整数索引，指定要包括的特定图标，以及要忽略的所有其他图标。
--windows-icon-from-exe=ICON_EXE_PATH        从此现有可执行文件复制可执行文件图标（仅限Windows）。
--onefile-windows-splash-screen-image=SPLASH_SCREEN_IMAGE   为Windows和onefile编译时，请在加载应用程序时显示此信息。默认为关闭。
--windows-uac-admin            请求Windows用户控制，以在执行时授予管理员权限。（仅限Windows）。默认为关闭。
--windows-uac-uiaccess            请求Windows用户控制，以强制仅从几个文件夹运行，远程桌面访问。（仅限Windows）。默认为关闭。
```

#### macOS特定控件

```
--macos-target-arch=MACOS_TARGET_ARCH    这应该在什么架构上运行。默认和限制是运行Python所允许的。默认值为"native"，这是运行Python的体系结构。
--macos-create-app-bundle       为macOS编译时，请创建捆绑包，而不是纯二进制应用程序。目前是实验性的和不完整的。目前，这是解锁控制台禁用的唯一方法。默认为关闭。
--macos-app-icon=ICON_PATH       添加要使用的应用程序捆绑包的图标。只能给出一次。默认为Python图标（如果可用）。
--macos-signed-app-name=MACOS_SIGNED_APP_NAME  用于macOS签名的应用程序的名称。遵循"com.YourCompany.AppName"命名结果以获得最佳结果，因为这些结果必须是全局唯一的，并且可能会授予受保护的API访问权限。
--macos-app-name=MACOS_APP_NAME     要在macOS捆绑包信息中使用的产品的名称。默认为二进制文件的基本文件名。
--macos-app-mode=MODE        应用程序捆绑包的应用程序模式。当启动一个窗口，并希望出现在Docker中时，默认值"gui"非常适合。如果没有Window，应用程序就是一个"后台"应用程序。对于稍后显示的UI元素，"UI元素"介于两者之间。该应用程序不会出现在dock中，但在以后打开窗口时可以完全访问桌面。
--macos-sign-identity=MACOS_APP_VERSION   在macOS上登录时，默认情况下将使用特别标识，但通过此选项，您可以指定另一个要使用的标识。代码的签名现在在macOS上是强制性的，不能被禁用。如果未给出，则默认为"特别"。
--macos-sign-notarization       在签署公证时，使用苹果公司的正确TeamID身份，使用所需的运行时签名选项，以便可以接受。
--macos-app-version=MACOS_APP_VERSION    要在macOS捆绑包信息中使用的产品版本。如果未给定，则默认为"1.0"。
--macos-app-protected-resource=RESOURCE_DESC  请求访问macOS保护资源的权限，例如"NSMicrophoneUsageDescription:Microphone access for recording audio"。请求访问麦克风并为用户提供信息文本，说明为什么需要这样做。冒号之前是访问权限的操作系统标识符，然后是信息文本。法律价值可在https://developer.apple.com/documentation/bundleresources/information_property_list/p protected_resources和该选项可以指定多次。默认为空。
```

#### Linux特定控件

```
--company-name=COMPANY_NAME    要在版本信息中使用的公司的名称。默认为未使用。
--product-name=PRODUCT_NAME    要在版本信息中使用的产品的名称。默认为二进制文件的基本文件名。
--file-version=FILE_VERSION    要在版本信息中使用的文件版本。必须是最多4个数字的序列，例如1.0或1.0.0.0，不允许再有数字，不允许有字符串。默认为未使用。
--product-version=PRODUCT_VERSION   要在版本信息中使用的产品版本。与文件版本的规则相同。默认为未使用。
--file-description=FILE_DESCRIPTION  版本信息中使用的文件的说明。此时仅限Windows。默认为二进制文件名。
--copyright=COPYRIGHT_TEXT     版本信息中使用的版权。此时仅限Windows。默认为不存在。
--trademarks=TRADEMARK_TEXT    版本信息中使用的版权。此时仅限Windows。默认为不存在。
```

#### 二进制版本信息

```
--company-name=COMPANY_NAME    要在版本信息中使用的公司的名称。默认为未使用。
--product-name=PRODUCT_NAME    要在版本信息中使用的产品的名称。默认为二进制文件的基本文件名。
--file-version=FILE_VERSION    要在版本信息中使用的文件版本。必须是最多4个数字的序列，例如1.0或1.0.0.0，不允许再有数字，不允许有字符串。默认为未使用。
--product-version=PRODUCT_VERSION   要在版本信息中使用的产品版本。与文件版本的规则相同。默认为未使用。
--file-description=FILE_DESCRIPTION  版本信息中使用的文件的说明。此时仅限Windows。默认为二进制文件名。
--copyright=COPYRIGHT_TEXT     版本信息中使用的版权。此时仅限Windows。默认为不存在。
--trademarks=TRADEMARK_TEXT    版本信息中使用的版权。此时仅限Windows。默认为不存在。

#### 插件控件

```

--enable-plugin=PLUGIN_NAME   已启用插件。必须是插件名称。使用"--plugin-list"查询完整列表并退出。默认为空。
--disable-plugin=PLUGIN_NAME   禁用的插件。必须是插件名称。使用"--plugin-list"查询完整列表并退出。大多数标准插件都不是禁用的好主意。默认为空。
--plugin-no-detection     插件可以检测它们是否可能被使用，您可以通过"--disable-plugin=plugin-that warnings"禁用警告，也可以使用此选项完全禁用该机制，这当然也会稍微加快编译速度，因为一旦您确定要使用哪些插件，此检测代码就会徒劳运行。默认为关闭。
--plugin-list           显示所有可用插件的列表并退出。默认为关闭。
--user-plugin=PATH      用户插件的文件名。可以多次给定。默认为空。
--show-source-changes     在编译之前显示对原始Python文件内容的源代码更改。主要用于开发插件。默认为False。

```

##### 支持插件列表：

```

 anti-bloat        修补愚蠢的从广泛使用的库模块中导入的源代码。
 data-files        包括包配置文件指定的数据文件。
 delvewheel        需要在独立模式下使用包来"支持"delewheel。
 dill-compat       "dill"包兼容性所需。
 dll-files         根据程序包配置文件包括DLL。
 enum-compat       Python2和'enum'包需要。
 eventlet          支持包含"eventlet"依赖项及其对"dns"包monkey补丁的需求。
 gevent            "gevent"包所需。
 gi                支持GI包typelib依赖项。
 glfw              OpenGL和"glfw"软件包在独立模式下需要。
 implicit-imports  根据包配置文件提供包的隐式导入。
 kivy              "kivy"包所需。
 matplotlib        "matplotlib"模块需要。
 multiprocessing   Python的"多处理"模块所需。
 no-qt             禁用独立模式的所有Qt绑定。
 options-nanny     根据软件包配置文件通知用户潜在的问题。
 pbr-compat        "pbr"包在独立模式下需要。
 pkg-resources     "pkg_resources"的解决方案。
 pmw-freezer       "Pmw"包所需。
 pylint-warnings   支持PyLint/PyDev linting源标记。
 pyqt5             PyQt5软件包所需。
 pyqt6             PyQt6包在独立模式下所需。
 pyside2           PySide2程序包所需。
 pyside6           PySide6包在独立模式下需要。
 pywebview         "webview"包（PyPI上的pywebview）所需。
 tk-inter          Python的Tk模块所需。
 trio              "trio"套餐所需。
 upx               使用UPX自动压缩创建的二进制文件。

```

#### upx插件说明

- 先开启upx压缩：`--plugin-enable=upx`

- 一般将下载好的upx放在解释器的Scripts目录下会自动寻找，也可以通过补充--upx-binary=upx_dir指定目录，upx选项到文件目录就可以，不用具体到文件
