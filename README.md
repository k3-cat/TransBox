# TransBox

啊&emsp;不知道中文叫什么啦&emsp;是起名废啦&emsp;就叫TransBox了啦&emsp;总的来说就是HRT相关的小工具啦

*这个app是为跨性别群体设计的&emsp;但并不局限在圈子内使用&emsp;如果你不是ta们中的一员&emsp;希望你能够正确的认识ta们 接纳ta们 支持身边的ta们

# 安装

只要点 [-> 这里 <-](https://github.com/k3-cat/TransBox/releases/latest) 然后再点那个`.apk`结尾的文件就可以下载安装包了哦 之后在手机上直接安装就行

除此以外&emsp;也可以直接通过~~某不存在的~~ Google Play 安装 (但是目前那边出了点问题..&emsp;主要是我傻fufu的把 package id 写错了然后还非常迅速的直接发布到了Production...&emsp;在联系support了...等我搞好那边之前麻烦先不要用Google Play

*因为买不起Apple的开发者账号所以在用iPhone的小伙伴们对不起啦....*

# 特性

## 单位转换

- 点击输入框可以从剪切板 **智能**粘贴

  可以识别是否有效&emsp;可以识别数字后跟的单位 (有没有空格都行 不要有其它的字符)&emsp;可以更正单位 比如ug -> μg

  _~~现在带点算法的东西就好意思叫智能 有些还要做成个商标 所以我也要带&emsp;哼唧~~_

- 长按结果可以复制&emsp;以及在结果无效时给出提示
- 可以把正在使用的单位组合(还有分子量)&emsp;保存为预设&emsp;方便直接选择
- 对输入值进行清理和简单纠错
- 内置了一些常见项目的分子量&emsp;方便从从诸如`pmol/mL`这样的单位转换
- 捏他了拜尔爸爸的LOGO (皮

*GIF以后再补(咕咕咕) 现在满脑子都是先发布了再说*
*甚至因为这个项目发布了一个npm package*

## 提醒&纪念日

特性就是**还没写**(叉腰&emsp;~~被打爆~~

大概的说明其实app里对应的页面有简单介绍下&emsp;等具体写出来我才知道能实现什么现在想到的功能和现在没想到的好东西

# 一点点小历史

起因是因为一位叫`冷凝`的大佬在做HRT相关的科普&emsp;当时她在收集不同的`方案-6项结果`的样本做横向对比 需要进行大量的单位换算&emsp;然后就有了`HoUnits`(也就是`TransBox`的前身) [这里](https://github.com/k3-cat/HoUnits) 是以前的repo&emsp;她对这个app很感兴趣并且给了一些建议 _~~和投喂~~_&emsp;然后这个app就有了后续的这些更新&emsp;不过可惜的是后来发生了一些事情导致她退圈了.... (但人没事大家放心

因为总体上变动太大&emsp;包括ui组件和状态管理从底层库到实现的方式都不同了&emsp;交互逻辑也有很大改动&emsp;项目结构也变了(git最不擅长的事)&emsp;加上之前那个太乱了(~~最开始甚至还有计算结果错误的bug&emsp;捂脸~~)&emsp;而且还加了两个平行的模块...&emsp;简单来讲除了算法和大体逻辑和组件结构没变 差不多相当于重写了一遍核心部分&emsp;所以就直接新开了这个repo

另一位的大佬`しず／shizu`做着类似的事&emsp;她写了一篇包含HRT相关方面的原理和常见方案之类的概述 放在~~某不存在的~~ [Google Slides](https://docs.google.com/presentation/d/1PzE-rmtwBMOrgXcsI~~RIDAKTUIe3fx5h-PmEbzRgBBA/edit?usp=sharing) 上

最后... 给别人打了那么多广告也要给我自己的群打广告 (1075287432)&emsp;总之就是没啥目的的闲聊群 (~~虽然一开始是想做成音游群的 结果就我一个人打音游...~~)&emsp;所以唯一的特点大概就是氛围好了吧.....&emsp; 哦对  群里也有一些hrt相关的资料
