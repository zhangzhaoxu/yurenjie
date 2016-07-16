## 愚人节整蛊活动开发文档

**开发目的**：借由愚人节整人噱头进行宣传引流<br/>

**游戏简介**:

- 用户输入整蛊人的名称
- 选择整蛊方式
- 进行整蛊
- 微信分享


![image](http://cdn1.showjoy.com/images/81/814e86f2e5ed4ba6a105ca3762cf491b.jpg)
![image](http://cdn1.showjoy.com/images/0d/0da21f40d2a846a3aef11b1d5bc582b6.jpg)
![image](http://cdn1.showjoy.com/images/4e/4e9bbe8a813c436680fa482e9ae366d5.jpg)
![image](http://cdn1.showjoy.com/images/5f/5fbe508db9534731aeb015866a46a2b5.jpg)
![image](http://cdn1.showjoy.com/images/d4/d41d785bcacf452c85a94b8a0b4d4f21.jpg)
**与上一游戏的不同之处**:

#### 音效
 
背景音效及用户快速点击音效，对于不同机型系统对音频做了优雅的降级， 在适用当前最先进的h5音频播放 **WebAudio** 的情况下，进行游戏最佳效果实现。 不适用的情况下，适用 **Audio** 做优雅的降级，保证安卓机等机型能进行正常的游戏。

#### 帧动画

因为用户每点击一下需要执行一次动画效果，对于在没有硬件加速的小游戏中对浏览器是种极大的负担，在这里使用了帧动画原理，所有状态都已备好，用户没点击一次，播放一帧动画，从而达到了用户整人爽快的效果。
