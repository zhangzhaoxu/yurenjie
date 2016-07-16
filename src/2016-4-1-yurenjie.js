'use strict';

var method = 0;
var num = 0;
var name = "";
var imageDatas = "";

$(document).ready(function () {
  preventScroll();

  new imageLoader();
  new sounds();
});

function preventScroll() {
  var body = document.querySelector('body');
  var y = 0;
  body.ontouchstart = function (e) {
    var touch = e.touches[0];
    y = touch.clientY;
    body.ontouchmove = function (e) {
      var touch_1 = e.touches[0];
      var a = touch_1.clientY;
      if (Math.abs(a - y) >= 10) {
        event.preventDefault();
      }
    }
  }
}


function toFirstChange() {
  $(".loadImage").addClass('toFirstChange');
  setTimeout(function () {
    $("#J_container-1").hide();
    $("#J_container-2").show();
    setTimeout(function () {
      $("#J_SwitchContainer-2").css("-webkit-transform", "translateZ(0px)");
    }, 10);
  }, 1000);

  $("#J_FocusDiv").on("click", function () {
    $("#J_StartInput").focus()
      .css("color", "#2a201f");
    $("#J_StartInput").val("");
  });

  $("#J_Start").on("click", function () {
    toSecondChange();
  })
};

function toSecondChange() {
  name = $('#J_StartInput').val();

  if (name && name != "请输入名字") {
    //切换动画
    $("#J_SwitchContainer-2").css("transform", "translateZ(-800px) translateX(-2000px)")
      .css("-webkit-transform", "translateZ(-800px) translateX(-2000px)")
    setTimeout(function () {
      $("#J_container-2").hide();
      $("#J_container-3").show();
      setTimeout(function () {
        $("#J_SwitchContainer-3").css("transform", "translateZ(0px) translateX(0px)")
          .css("-webkit-transform", "translateZ(0px) translateX(0px)")
      }, 10);
    }, 500);


    //添加舞动小人

    new animation($("#J_ShowGifContainer"), {
      framerate: 30,
      "images": [imageDatas.methodManImagesContainer[0]],
      "frames": {"regX": 0, "height": 268, "count": 8, "regY": 0, "width": 179},
      "animations": {
        loop: [0, 7, "loop", 0.3]
      }
    }, {width: 260, height: 280, x: 42, y: 0}, 0, function () {
      console.log("success");
    })

  } else {
    var input = $("#J_StartInput");
    input.val("请输入名字");
    input.css("color", "red");
  }


  //绑定方法选择事件
  $("#J_MethodContainer img").on("click", function (event) {
    method = event.target.attributes[1].value;
    toThirdChange();
  });
}

function toThirdChange() {
  advertisementAnimation();

  $("#J_SwitchContainer-3").css("transform", "translateZ(-800px) translateX(-2000px)")
    .css("-webkit-transform", "translateZ(-800px) translateX(-2000px)");

  setTimeout(function () {
    $("#J_container-3").hide();
    $("#J_container-4").show();
    setTimeout(function () {                   //为什么必须要加setTimeout才能正常执行
      $("#J_SwitchContainer-4").css("transform", "translateZ(0px) translateX(0px)")
        .css("-webkit-transform", "translateZ(0px) translateX(0px)")
    }, 10);
  }, 500);

  selectAnimation();
}

function toLastChange() {
  console.log("tolastChange");
  $('.j_AppCover').show();

  $('.j_BtmBlock').show();
  $("#J_container-4").hide();
  $("#J_container-5").show();

  var allText = [
    ["终于升到了F罩杯","夏天上街自信了","觉得做女人挺好"],
    ["从此戒掉辣条了","已经上瘾了","七窍流shi了"],
    ["说这个feel倍爽","已经不需要男朋友了","决定不再捡肥皂了"],
    ["哭着说还要","已经被夹弯了","已经高潮了"],
    ["爱上这种小游戏了","治好了多年的便秘","跪在地上唱征服"],
    ["终于体会到了躺枪滋味","喝水都会侧漏了","已经shi尿齐飞了"]
  ];

  var getText = function (id) {
    return allText[id][Math.floor(Math.random()*3)]
  };

  var container_1 = $("#J_NameContainer-1");
  var container_2 = $("#J_NameContainer-2");
  switch (parseInt(method)) {
    case 0:
      container_1.text("我揪了"+name+num+"次胸");
      container_2.text(name+getText(0));
      break;
    case 1:
      container_1.text("我喂"+name+"吃了"+num+"坨翔");
      container_2.text(name+getText(1));
      break;
    case 2:
      container_1.text("我戳了"+name+"的菊花"+num+"次");
      container_2.text(name+getText(2));
      break;
    case 3:
      container_1.text("我用门夹"+name+"的头"+num+"次");
      container_2.text(name+getText(3));
      break;
    case 4:
      container_1.text("我打"+name+"的屁股"+num+"次");
      container_2.text(name+getText(4));
      break;
    case 5:
      container_1.text("我打了"+name+num+"枪");
      container_2.text(name+getText(5));
      break;
  }

  $("#J_PlayAgain").on("touchstart", function () {
    window.location.reload();
  });
  $("#J_Share").on("touchstart", function () {
    $("#J_Mark-5").css("display","block");
  });
  $('#J_Mark-5').on('touchstart', function(){
    $('#J_Mark-5').hide();
  });

  wx.ready(function() {
    wx.showOptionMenu();

    if(container_1.text().length == 0){
      var shareData_1 = {
        title: '今天你想整谁',
        desc: "来愉快的整他吧~~",
        link: 'http://market.m.showjoy.com/activity/ctopic/40245.html',
        imgUrl: 'http://cdn1.showjoy.com/images/f9/f91983f585aa43ed9c8eaeeb31ed8262.png'
      };

      var shareData_2 = {
        title: "今天你要整谁?",
        link: 'http://market.m.showjoy.com/activity/ctopic/40245.html',
        imgUrl: 'http://cdn1.showjoy.com/images/f9/f91983f585aa43ed9c8eaeeb31ed8262.png'
      }
    }else{
      var shareData_1 = {
        title: '今天你想整谁',
        desc: container_1.text()+','+container_2.text(),
        link: 'http://market.m.showjoy.com/activity/ctopic/40245.html',
        imgUrl: 'http://cdn1.showjoy.com/images/f9/f91983f585aa43ed9c8eaeeb31ed8262.png'
      };

      var shareData_2 = {
        title: container_1.text()+','+container_2.text(),
        link: 'http://market.m.showjoy.com/activity/ctopic/40245.html',
        imgUrl: 'http://cdn1.showjoy.com/images/f9/f91983f585aa43ed9c8eaeeb31ed8262.png'
      }
    }
    wx.onMenuShareTimeline(shareData_2);
    wx.onMenuShareAppMessage(shareData_1);
  });
}


function advertisementAnimation() {
  var images = imageDatas.advertisementsContainer;
  var advertisementContainer = $("#J_advertisement");
  var img = images[0];
  img.className = "advertiseAnimation_1";
  advertisementContainer.append(img);
  var timer = setInterval(function () {
    advertisementContainer.empty();
    var img = images[0];
    img.className = "advertiseAnimation_1";
    advertisementContainer.append(img);
  }, 4000);
};

function selectAnimation() {
  var actionContainer = $("#J_ActionContainer");
  var animationContainer = $("#J_AnimationContainer");
  switch (parseInt(method)) {
    case 0:
      actionContainer.append(imageDatas.startMethodContainer[0]);
      new animation(animationContainer, {
        framerate: 30,
        "images": [imageDatas.jiunainaiContainer[0]],
        "frames": {"regX": 0, "height": 190, "count": 4, "regY": 0, "width": 168},
        "animations": {
          one: 0,
          loop: [0, 3, "one", 0.5]
        }
      }, {width: 335, height: 380, x: 80, y: 95}, 1, function () {
        toLastChange();
      });
      break;
    case 1:
      actionContainer.append(imageDatas.startMethodContainer[1]);
      new animation(animationContainer, {
        framerate: 30,
        "images": [imageDatas.gunKillContainer[0]],
        "frames": {"regX": 0, "height": 190, "count": 6, "regY": 0, "width": 168},
        "animations": {
          one: 0,
          loop: [0, 5, "one", 0.5]
        }
      }, {width: 335, height: 380, x: 70, y: 75}, 1, function () {
        toLastChange();
      });
      break;
    case 2:
      actionContainer.append(imageDatas.startMethodContainer[2]);
      new animation(animationContainer, {
        framerate: 30,
        "images": [imageDatas.dapiguContainer[0]],
        "frames": {"regX": 0, "height": 190, "count": 6, "regY": 0, "width": 168},
        "animations": {
          one: 0,
          loop: [0, 4, "one", 1]
        }
      }, {width: 335, height: 380, x: 95, y: 105}, 1, function () {
        toLastChange();
      });
      break;
    case 3:
      actionContainer.append(imageDatas.startMethodContainer[3]);
      new animation(animationContainer, {
        framerate: 30,
        "images": [imageDatas.eatShitContainer[0]],
        "frames": {"regX": 0, "height": 190, "count": 8, "regY": 0, "width": 168},
        "animations": {
          one: 0,
          loop: [2, 6, "one", 0.3]
        }
      }, {width: 335, height: 380, x: 80, y: 95}, 1, function () {
        toLastChange();
      });
      break;
    case 4:
      actionContainer.append(imageDatas.startMethodContainer[4]);
      new animation(animationContainer, {
        framerate: 30,
        "images": [imageDatas.baojuContainer[0]],
        "frames": {"regX": 0, "height": 190, "count": 5, "regY": 0, "width": 168},
        "animations": {
          one: 0,
          loop: [0, 2, "one", 0.5]
        }
      }, {width: 335, height: 380, x: 80, y: 95}, 1, function () {
        toLastChange();
      });
      break;
    case 5:
      actionContainer.append(imageDatas.startMethodContainer[5]);
      new animation(animationContainer, {
        framerate: 30,
        "images": [imageDatas.menjiaContainer[0]],
        "frames": {"regX": 0, "height": 190, "count": 5, "regY": 0, "width": 168},
        "animations": {
          one: 0,
          loop: [0, 2, "one", 0.5]
        }
      }, {width: 335, height: 380, x: 80, y: 95}, 1, function () {
        toLastChange();
      });
      break;
  }
}

//所有图片加载
function imageLoader() {
  var self = this;
  self.initDatas();
  self.loadImages();
}

var imageLoaderPrototype = imageLoader.prototype;

imageLoaderPrototype.initDatas = function () {
  var self = this;
  self.data = {
    methodManImages: [
      {src: "http://cdn1.showjoy.com/images/6f/6f516ca8efc54847a144d017f9949ecf.png"}
    ],
    methodManImagesContainer: [],
    startMethod: [
      {src: "http://cdn1.showjoy.com/images/db/dbea3ce42a2d41159dff36c883629102.png"},
      {src: "http://cdn1.showjoy.com/images/92/92cc12c632c548cc853d3281a71e0470.png"},
      {src: "http://cdn1.showjoy.com/images/21/211602b2594e454e865cff7811f070c6.png"},
      {src: "http://cdn1.showjoy.com/images/14/14683549b2e5445e8e1643ef2aae65ad.png"},
      {src: "http://cdn1.showjoy.com/images/3b/3bb63efc24a84a3e8f1a679e81cb8a8a.png"},
      {src: "http://cdn1.showjoy.com/images/9f/9f9054af5e124aefa2d7c098aeb63ac0.png"},
    ],
    startMethodContainer: [],
    timeImages : [
      {src: "http://cdn1.showjoy.com/images/5c/5cd12d605ead4b13bc46806695a065e4.png"},
      {src: "http://cdn1.showjoy.com/images/4a/4abf65484200416bbb79a7312b041214.png"},
      {src: "http://cdn1.showjoy.com/images/e1/e107a4c550664131bf1556fc3b6484d0.png"}
    ],
    timeImagesContainer : [],
    gunKill: [
      {src: "http://cdn1.showjoy.com/images/26/26da69786c2f42609ff85efa75947eb6.png"}
    ],
    gunKillContainer: [],
    eatShit: [
      {src: "http://cdn1.showjoy.com/images/d6/d6b01ca541f7417085108e45f57fd84c.png"}
    ],
    eatShitContainer: [],
    baoju: [
      {src: "http://cdn1.showjoy.com/images/4e/4e19b0dbecb84932a44cfb355e60f30c.png"}
    ],
    baojuContainer: [],
    jiunainai: [
      {src: 'http://cdn1.showjoy.com/images/b7/b7b42563d7c546f39d8e7cb6f884dce9.png'}
    ],
    jiunainaiContainer: [],
    dapigu: [
      {src: "http://cdn1.showjoy.com/images/9d/9dca9cb0700541d2b41daf7dc01b2073.png"}
    ],
    dapiguContainer: [],
    menjia: [
      {src: "http://cdn1.showjoy.com/images/b6/b647662e8e4d4c45a7f7c674d838776e.png"}
    ],
    menjiaContainer: [],
    advertisements: [
      {src: "http://cdn1.showjoy.com/images/3b/3bdabe70d76f436c94c7ba4d6385bd1e.png"}
    ],
    advertisementsContainer: []
  }
};

imageLoaderPrototype.loadImages = function () {
  var self = this;
  var data = self.data;

  self.load(data.startMethod, data.startMethodContainer, function () {
    num++;
    console.log("startMethod loaded");
    imageDatas = data;
  });
  self.load(data.methodManImages, data.methodManImagesContainer, function () {
    num++;
    console.log("methodManImages loaded")
  });
  self.load(data.timeImages, data.timeImagesContainer, function () {
    num++;
    console.log("timeImages loaded");
  });
  self.load(data.gunKill, data.gunKillContainer, function () {
    num++;
    console.log("gunKill loaded");
  });
  self.load(data.eatShit, data.eatShitContainer, function () {
    num++;
    console.log("eatShit loaded");
  });
  self.load(data.advertisements, data.advertisementsContainer, function () {
    num++;
    console.log("advertisement loaded");
  });
  self.load(data.baoju, data.baojuContainer, function () {
    num++;
    console.log("baoju loaded");
  });
  self.load(data.dapigu, data.dapiguContainer, function () {
    num++;
    console.log("dapigu loaded");
  });
  self.load(data.menjia, data.menjiaContainer, function () {
    num++;
    console.log("menjia loaded");
  });
  self.load(data.jiunainai, data.jiunainaiContainer, function () {
    num++;
    console.log("jiunainai loaded");
  })
};

imageLoaderPrototype.load = function (images, container, callback) {
  var self = this;
  var manifest = images;
  var preload = new createjs.LoadQueue(true, "");

  preload.on("fileload", function (event) { //每一张图片加载完成回调
    container.push(event.result);
  });

  preload.on("complete", function () { //所有图片加载完成回调
    callback();
    if (num === 12) {
      imageDatas = self.data;
      toFirstChange();
    }
  });

  preload.setMaxConnections(1);

  preload.loadManifest(manifest, true, "");
};


function sounds() {
  var self = this;
  self.init();
}

var soundsPrototype = sounds.prototype;

soundsPrototype.init = function (id) {
  var self = this;
  self.n = 0;
  self.status = false;
  if (!createjs.Sound.initializeDefaultPlugins()) {
    alert("你的设备不支持音频");
  }

  var assetsPath = "http://cdn1.showjoy.com/assets/event/zhaopin/";
  var sounds = [
    {src: "yurenjie.mp3", id: 1},
    {src: "daqiang1.m4a", id: 2},
    {src: "chishi1.m4a", id: 4},
    {src: "jianaodai1.m4a", id: 6},
    {src: "baoju1.m4a", id: 5},
    {src: 'dapigu1.m4a', id: 3}
  ];

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", createjs.proxy(self.soundsLoaded, this));
  createjs.Sound.registerSounds(sounds, assetsPath);
};

soundsPrototype.soundsLoaded = function () {
  var self = this;
  num++;
  self.n++;
  if (num === 12) {
    toFirstChange();
  }
  if (self.n === 6) {
    $("#J_ActionContainer").on("touchstart", function () {
      if(parseInt(method) === 0) {
        self.soundPlay(parseInt("3"));
        return;
      }
      self.soundPlay(parseInt(method) + 1);
    });
    $("#J_Start").on("touchstart", function () {
      if (self.status === false) {
        createjs.Sound.play(1, {loop: -1});
      }
    });
    $("#J_MethodContainer").on("click", function () {
      createjs.Sound.removeSound("1");
    });
    $("#J_Music")[0].addEventListener("touchstart", function () {

      self.status = !self.status;

      if (self.status) {
        createjs.Sound.stop("1");
        $("#J_MusicStart").hide();
        $("#J_MusicStop").show();
      } else {
        createjs.Sound.play(1, {loop: -1});
        $("#J_MusicStart").show();
        $("#J_MusicStop").hide();
      }
    })
  }
};

soundsPrototype.soundPlay = function (id) {
  var instance = createjs.Sound.play(id);
  if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
    console.log("playError");
    return;
  }
};


function animation(container, spriteSheet, position, n, callback) {
  var self = this;
  self.Sheet = spriteSheet;
  self.callback = callback;
  self.init(spriteSheet, container, position, n);
}

var animationPrototype = animation.prototype;

animationPrototype.init = function (spriteSheet, container, position, n) {
  var self = this;
  self.playStart = false;
  var canvas = document.createElement('canvas');
  canvas.width = position.width;
  canvas.height = position.height;
  var stage = new createjs.Stage(canvas);
  var spriteSheet = new createjs.SpriteSheet(spriteSheet);

  spriteSheet.on("complete", function () {
    console.log("complete");
  });

  spriteSheet.on("error", function () {
    console.log("error");
  });

  self.grant = new createjs.Sprite(spriteSheet, "one");
  self.grant.x = position.x;
  self.grant.y = position.y;

  self.play(n);

  stage.addChild(self.grant);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stage);

  container.append(canvas);
};

animationPrototype.play = function (judge) {
  var self = this;
  var n = 0;
  var m = 145;
  var h = 0;
  var count = self.Sheet.frames.count;
  self.ForceContainer = $("#J_ForceContainer");

  if (parseInt(judge) === 0) {
    self.grant.gotoAndPlay("loop");
  } else {
    self.grant.gotoAndPlay("one");
    $("#J_ActionContainer").on("touchstart", function () {
      if(self.playStart) {
        num++;
        self.grant.gotoAndPlay("loop");
        if(h<125) {
          self.ForceContainer.css('margin-top',m-=1)
            .css('height',h+=1)
        }
      } else {
        self.showMark();
      }
    })
  }
};

animationPrototype.showMark = function () {
  var i = 0;
  var mark = $("#J_Mark");
  var images = imageDatas.timeImagesContainer;
  var container = $("#J_SwitchContainer-4");
  var self = this;

  images.forEach(function (image) {
    image.className = "time-img";
  });

  mark.show();

  var timer = setInterval(function () {
    if(i>2) {
      self.GameStart = true;
      self.timeLeft();
      mark.hide();
      self.playStart = true;
      clearInterval(timer);
    }else{
      mark.empty();
      mark.append(images[i]);
      images[i].className += " markImgAnimation";
      i++;
    }
  },1000);
};

animationPrototype.timeLeft  = function () {
  var self = this;
  var time_left = $("#J_Time");
  var i = 0;
  var timer = setInterval(function () {
    if(i>9){
      clearInterval(timer);
      self.callback();
    }else{
      i++;
      time_left.html((10-i)+'<span>s</span>');
    }
  },1000)
};