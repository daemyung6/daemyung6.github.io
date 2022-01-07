window.addEventListener('DOMContentLoaded', function () {
  const menuDiv = document.getElementById("menu");
  const menuItems = [
    document.getElementById("main-icon")
  ];
  for (let i = 0; i < menuDiv.getElementsByClassName('item').length; i++) {
    menuItems.push(menuDiv.getElementsByClassName('item')[i]);
  }

  function selectMenuItem(id) {
    lastmenuItem.classList.remove('active');
    menuItems[id].classList.add('active');
    lastmenuItem = menuItems[id];
  }
  let lastmenuItem = menuItems[0];
  let menuClickLink = [
    'main-page',
    'story-page-1',
    'choice-page',
    'view-360-page',
    'character-page',
    'city-page',
  ]
  for (let i = 0; i < menuItems.length; i++) {
    const id = i;
    menuItems[id].onclick = function () {
      view(menuClickLink[id], true);
    }
  }

  function scrollBlock(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  const storyPageMenuItems = document.getElementById("story-page-menu").getElementsByClassName("item");
  let lastStoryPageMenuItem = storyPageMenuItems[0];
  const storyPageText = document.getElementById("story-page-text");

  const pageList = [
    {
      id: "main-page",
      onClick: function () {
        selectMenuItem(0);
        onScroll = function (e) {
          if (e.wheelDeltaY < 0) {
            view('story-page-1', true);
          }

          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-1",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('main-page', true);
          }
          else {
            view('story-page-2', true);
          }
          scrollBlock(e);
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[0].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[0];
        storyPageText.innerText =
          `As the COVID-18 pandemic spread on the Earth in 2019,
people are dying at an alarming rate. Humanity had failed to develop
a treatment for COVID-18. Nations all around the world are helplessly collapsing
The one’s who survived scattered to try to live another day, leaving the cities that is rampant and ruined by the (infectious) disease.
The world’s social functions are now lost.`
      }
    },
    {
      id: "story-page-2",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-1', true);
          }
          else {
            view('story-page-3', true);
          }
          scrollBlock(e);
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[1].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[1];
        storyPageText.innerText =
          `It seems like there is no hope for humanity. But suddenly on October 2021,
few of the survivors finds an enormous tree that has a special berry with mysterious energy.
The few who found this, lured by its mysterious energy, takes a bite. What’s this?
The people who took the berries felt they were loaded with powerful energy for the first time in their lives.`
      }
    },
    {
      id: "story-page-3",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-2', true);
          }
          else {
            view('story-page-4', true);
          }
          scrollBlock(e);
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[2].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[2];
        storyPageText.innerText =
          `They were now tired of fear and hunger. They took a bite at the berry and shouted “HULL SHIT!”
Several days have passed, and their appearance started to change. They were given with new abilities.
They did not look like a human being anymore, but their abilities were beyond normal, without any limitations.
Including the first few who took the berry, the total number of berry reached 10,000.`
      }
    },
    {
      id: "story-page-4",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-3', true);
          }
          else {
            view('story-page-5', true);
          }
          scrollBlock(e);
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[3].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[3];
        storyPageText.innerText =
          `They are able to do whatever they want.
Nothing is impossible because they overcame the limitations of normal human capabilities.
They are amazed of themselves, and started to call themselves ‘HULLY’.
HULLY appears in front of the dying humanity. The hell for mankind is a playground for HULLY HULLY are invulnerable even in front of virus carriers.
HULLY shares the information about the HULLY TREE and HULLY BERRY.
The believers of this information, the ones who took and ate the berry becomes a HULLY.
They are now free from everything.`
      }
    },
    {
      id: "story-page-5",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-4', true);
          }
          else {
            view('story-page-6', true);
          }
          scrollBlock(e);
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[4].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[4];
        storyPageText.innerText =
          `The world is destroyed and cannot recover.
Now, there are no more berry left. Only Hully is a survivor.
Now people can be Hully for a short time
only if they get Hullyshot that Hully made`
      }
    },
    {
      id: "story-page-6",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-5', true);
          }
          else {
            view('choice-page', true);
          }
          scrollBlock(e);
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[5].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[5];
        storyPageText.innerText =
          `Hully gives information to desperate people,
and the people have a chance to go back to the time.
Do they decide to be Hully and enjoy all the freedom?
Or do they decide to remain as human beings and die?`
      }
    },
    {
      id: "choice-page",
      onClick: function () {
        selectMenuItem(2);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-6', true);
          }
          else {
            view('view-360-page', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "view-360-page",
      onClick: function () {
        selectMenuItem(3);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('choice-page', true);
          }
          else {
            view('character-page', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "character-page",
      onClick: function () {
        selectMenuItem(4);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('view-360-page', true);
            scrollBlock(e);
          }
          else {
            view('city-page', true);
          }

          return false;
        }
        if(!isChPlayerPlay) {
          chPlayer.currentTime = 0;
          chPlayer.play();
          isChPlayerPlay = true;
        }
      }
    },
    {
      id: "city-page",
      onClick: function () {
        selectMenuItem(5);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('character-page', true);
            scrollBlock(e);
            return false;
          }
          else {
            return true;
          }
        }
      }
    },
  ];

  const chPlayer = document.getElementById("ch-player");
  let isChPlayerPlay = false;
  chPlayer.onended = function() {
    chPlayer.currentTime = 0;
    chPlayer.play();
  }


  // const io = new IntersectionObserver((entries) => {
  //   for (let i = 0; i < entries.length; i++) {
  //     if (entries[i].intersectionRatio !== 0) {
  //       view(entries[i].target.id, false);
  //       return;
  //     }
  //   }
  // }, {
  //   rootMargin: "-50px -50px -50px -50px",
  //   threshold: 0
  // });

  let pages = {};

  function Page(data) {
    let element = document.getElementById(data.id);
    this.element = element;
    // io.observe(element);
    this.onClick = data.onClick;
  }

  for (let i = 0; i < pageList.length; i++) {
    pages[pageList[i].id] = new Page(pageList[i]);
  }

  console.log(pages);

  let lastMoveTime = new Date();

  const clickElement = document.createElement('a');
  function view(id, flag) {
    document.title = "HULLY - " + id;
    pages[id].onClick();
    function move() {
      lastMoveTime = new Date();
      clickElement.setAttribute("href", '#' + id);
      clickElement.click();
    }
    if (flag) {
      move();
      return;
    }
  }

  window.addEventListener("mousewheel", onScrollEvent, { passive: false });
  window.addEventListener("scroll", onScrollEvent, { passive: false });

  function onScroll() { }
  function onScrollEvent(e) {
    // console.log(e)
    if (new Date() - lastMoveTime < 800) {
      return scrollBlock(e);
    }
    else {

    }
    return onScroll(e);
  }

  let stepImgs = [];
  let stepImgFrameNum = 738;
  let stepImgLoadCount = 0;
  for (let i = 0; i < 738; i++) {
    let name = String(i + 1);
    name = (name.length === 1) ? '000' + name :
      (name.length === 2) ? '00' + name :
        (name.length === 3) ? '0' + name :
          (name.length === 4) ? name : name;
    let img = new Image();
    stepImgs.push(img);
    img.onload = stepImgOnloadCheck;
    img.src = './images/step/' + name + ".jpg?ver=2022-01-07-1";
  }

  function stepImgOnloadCheck() {
    stepImgLoadCount++;
    if (stepImgLoadCount >= stepImgFrameNum) {

      console.log("load done");
      draw()
    }
  }

  const canvas = document.getElementById("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  const storyPageOutter = document.getElementById("story-page-outter");
  let storyPageOutterTop = storyPageOutter.offsetTop;
  window.pages = pages;
  let stepStartTop;
  let stepEndTop;
  let stepHeightLength;

  function setStepContents() {
    stepStartTop = pages['story-page-1'].element.offsetTop + storyPageOutterTop;
    stepEndTop = pages['story-page-6'].element.offsetTop + storyPageOutterTop;
    stepHeightLength = stepEndTop - stepStartTop;
  }
  window.addEventListener('resize', setStepContents);
  setStepContents()

  function draw() {
    let top = window.scrollY - stepStartTop;
    top = top <= 0 ? 0 : top;

    let ratio = top / stepHeightLength;
    ratio = ratio <= 1 ? ratio : 1;

    let num = parseInt(stepImgFrameNum * ratio);
    num = stepImgFrameNum <= num ? stepImgFrameNum - 1 : num;
    ctx.drawImage(stepImgs[num], 0, 0, canvas.width, canvas.height);
    setTimeout(draw, 1000 / 60);
  }

  const fruitList = document.getElementById("fruit-list");
  fruitList.style.left = 0;
  const fruitArrowLeft = document.getElementById("fruit-arrow-left");
  const fruitArrowRight = document.getElementById("fruit-arrow-right");

  fruitArrowLeft.onclick = function() {
    fruitListMove(false);
  }
  fruitArrowRight.onclick = function() {
    fruitListMove(true);
  }

  function fruitListMove(flag) {
    let returnNum = (fruitList.offsetLeft + (flag ? -500 : 500));
    if(returnNum < (-(fruitList.offsetWidth - 1300))) {
      returnNum = -(fruitList.offsetWidth - 1300);
    }
    else if(returnNum > 0) {
      returnNum = 0;
    }
    fruitList.style.left = (returnNum) + "px";
  }


  function FruitBlock(data) {
    let div = document.createElement("div");
    div.classList.add("item");
    div.appendChild((function() {
      let div = document.createElement("div");
      div.classList.add("art");
      let stlye = "url(./images/fruit/detail/" + (data[0] + 1) + ".png),";
      stlye += "url(./images/fruit/fruit/" + (data[1] + 1) + ".png),";
      stlye += "url(./images/fruit/tail/" + (data[2] + 1) + ".png)";
      div.style.backgroundImage = stlye;
      return div;
    })());

    div.appendChild((function() {
      let div = document.createElement("div");
      div.classList.add("item-title");
      div.innerText = "Hully Berry";
      return div;
    })());

    div.appendChild((function() {
      let div = document.createElement("div");
      div.classList.add("item-description");
      div.innerText = "Mysterious Fruit";
      return div;
    })());
    return div;
  }
  let fruitdetailNum = 4;
  let fruitMainNum = 10;
  let fruittailNum = 9;


  let fruitDataList = [];
  for (let i = 0; i < fruitdetailNum; i++) {
    for (let j = 0; j < fruitMainNum; j++) {
      for (let k = 0; k < fruittailNum; k++) {
        fruitDataList.push([i, j, k])
      }
    }
  }
  fruitDataList.sort(function(a, b) {
    return Math.random() - 0.5;
  })
  

  for (let i = 0; i < 48; i++) {
    fruitList.appendChild(FruitBlock(fruitDataList[i]));
    
  }

  const characterPageBox = document.getElementById("character-page-box");
  const chItems = characterPageBox.getElementsByClassName("item");
  for (let i = 0; i < chItems.length; i++) {
    const id = i;
    chItems[id].onmouseover = function() {
      characterPageBox.style.backgroundImage = "url(./images/character/" + (id + 1) + ".png)";
    }
  }


  menuItems[0].click();
});

;(function() {
  var vrView;

  var scenes = {
      petra: {
          image: 'images/CastleWithTree360.png',
          preview: 'images/CastleWithTree360.png'
      }
  }
  
  function onLoad() {
      vrView = new VRView.Player('#vrview', {
          width: '100%',
          height: '100%',
          image: 'images/blank.png',
          is_stereo: false,
          is_autopan_off: true
      });
  
      vrView.on('ready', onVRViewReady);
      vrView.on('modechange', onModeChange);
      vrView.on('getposition', onGetPosition);
      vrView.on('error', onVRViewError);
  }
  
  
  function loadScene(id) {
      console.log('loadScene', id);
      // Set the image
      vrView.setContent({
          image: scenes[id].image,
          preview: scenes[id].preview,
          is_autopan_off: true,
          default_yaw: 180,
      });
  }
  
  function onVRViewReady(e) {
      console.log('onVRViewReady');
      loadScene('petra');
  }
  
  function onModeChange(e) {
      console.log('onModeChange', e.mode);
  }
  
  function onVRViewError(e) {
      console.log('Error! %s', e.message);
  }
  
  function onGetPosition(e) {
      console.log(e)
  }
  
  window.addEventListener('load', onLoad);
})();