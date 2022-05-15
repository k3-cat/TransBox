# TransBox

啊&emsp;不知道中文叫什么啦&emsp;是起名废啦&emsp;就叫TransBox了啦&emsp;总的来说就是HRT相关的小工具啦

*这个app是为跨性别群体设计的&emsp;但并不局限在圈子内使用&emsp;如果你不是ta们中的一员&emsp;希望你能够正确的认识ta们 接纳ta们 支持身边的ta们

### [English](https://github.com/Pix-00/TransBox/wiki/README-(English))

# 安装

点 [-> 这里 <-](https://github.com/Pix-00/TransBox/releases/latest) 然后滚动到页面底部&emsp;再点那个`.apk`结尾的文件就可以下载安装了哦

小提示: 以`ota`结尾的版本名称&emsp;表示新增内容可以通过热更新推送&emsp;不必重新下载安装包

另外也可以直接通过 _~~某不存在的~~_ Google Play 安装&emsp;(可以自动更新 然后... 就 ... 没有什么不同了...)

<a href='https://play.google.com/store/apps/details?id=com.cybil.transbox&utm_source=github&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img height=70 alt='下载应用，请到 Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/zh-cn_badge_web_generic.png'/></a>

*因为买不起Apple的开发者账号所以在用iPhone的小伙伴们对不起啦 ...*

# 特性

- 捏他了拜尔爸爸的LOGO (希望不会有律师函)
- 在某神秘区域时加速 GitHub 的访问速度

## 单位转换

- 点击输入框可以从剪切板 **智能**粘贴

  可以识别是否有效&emsp;可以识别数字后跟的单位 (有没有空格都行 不要有其它的字符)&emsp;可以更正单位 比如`ug -> μg`

  _~~现在带点算法的东西就好意思叫智能 有些还要做成个商标 所以我也要带&emsp;哼唧~~_

- 长按结果可以复制到剪切板
- 可以把正在使用的单位组合(还有分子量)&emsp;保存为预设&emsp;方便快速选择
- 结果无效时给出明确的提示
- 内置了一些常见项目的分子量&emsp;方便从从诸如`pmol/mL`这样的单位转换
- **不建议**将`FSH`与`LH`的结果转换到质量单位 (缺少精确测定的分子量)

## 提醒

- 不用担心错过用药时间了
- 自然语言显示的倒计时
- 倒计时的颜色随时间变化由浅到深
- 在设置的提醒时间之后使用更醒目的颜色展示倒计时
- **不支持**一天内固定周期的多次提醒 (周期最小为1天)

## 纪念日

- 记录生活中的重要日期
- 记录已经经过的天数
- 距离纪念日不到两天时显示特别的应用内文字提醒
- 也可以完全关闭应用内文字提醒和系统通知 (单纯计数)

# 帮助我们完善这个app

- 如果你发现了一只bug
- 如果你在使用过程中遇到了问题 (包括访问性相关的问题)
- 如果你有相关的功能性建议或者反馈
- 如果你觉得文档或者app里的文本读起来怪怪的
- 如果你有任何关于页面布局或者配色的想法

欢迎联系我&emsp;在 [这里](https://github.com/Pix-00/TransBox/wiki/%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC-%7C-Contact-Us) 可以找到所有的联系方式

另外 ... 还可以 点一下Star 或者 [投喂我](https://github.com/Pix-00/TransBox/wiki/%E6%8A%95%E5%96%82%E7%8C%AB%E7%8C%AB)

# 一点点小历史

起因是因为一位叫`冷凝`的大佬在做HRT相关的科普&emsp;当时她在收集不同的`方案-6项结果`的样本做横向对比 需要进行大量的单位换算&emsp;然后就有了`HoUnits`(也就是`TransBox`的前身) [这里](https://github.com/Pix-00/HoUnits) 是以前的repo&emsp;她对这个app很感兴趣并且给了一些建议 _~~和投喂~~_&emsp;然后这个app就有了后续的这些更新&emsp;不过可惜的是后来发生了一些事情导致她退圈了.... (但人没事大家放心)

因为总体上变动太大&emsp;包括ui组件和状态管理从底层库到实现的方式都不同了&emsp;交互逻辑也有很大改动&emsp;项目结构也变了(git最不擅长的事)&emsp;加上之前那个太乱了(~~最开始甚至还有计算结果错误的bug&emsp;捂脸~~)&emsp;而且还加了两个平行的模块...&emsp;简单来讲除了算法和大体逻辑和组件结构没变 差不多相当于重写了一遍核心部分&emsp;所以就直接新开了这个repo

现在呢&emsp;有另一位的大佬`しず／shizu`做着类似的事&emsp;她写了一篇包含HRT相关方面的原理和常见方案之类的概述 放在 [docs.hrt.guide](https://docs.hrt.guide) 上&emsp; 另外qq群 (1075287432) 里有下载好的PDF

最后... 给别人打了那么多广告也要给我自己的群打广告 (1075287432)&emsp;总之就是没啥目的的闲聊群 (~~虽然一开始是想做成音游群的 结果就我一个人打音游...~~)&emsp;所以唯一的特点大概就是氛围好了吧.....
