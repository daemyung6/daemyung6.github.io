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
    menuItems[id].onclick = function() {
      view(menuClickLink[id], true);
    }
  }

  function scrollBlock(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  const pageList = [
    {
      id: "main-page",
      onClick : function() {
        selectMenuItem(0);
        onScroll = function(e) {
          if(e.wheelDeltaY < 0) {
            view('story-page-1', true);
          }
          
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-1",
      onClick : function() {
        selectMenuItem(1);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('main-page', true);
          }
          else {
            view('story-page-2', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-2",
      onClick : function() {
        selectMenuItem(1);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('story-page-1', true);
          }
          else {
            view('story-page-3', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-3",
      onClick : function() {
        selectMenuItem(1);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('story-page-2', true);
          }
          else {
            view('story-page-4', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-4",
      onClick : function() {
        selectMenuItem(1);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('story-page-3', true);
          }
          else {
            view('story-page-5', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-5",
      onClick : function() {
        selectMenuItem(1);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('story-page-4', true);
          }
          else {
            view('story-page-6', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "story-page-6",
      onClick : function() {
        selectMenuItem(1);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('story-page-5', true);
          }
          else {
            view('choice-page', true);
          }
          scrollBlock(e);
          return false;
        }
      }
    },
    {
      id: "choice-page",
      onClick : function() {
        selectMenuItem(2);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
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
      onClick : function() {
        selectMenuItem(3);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
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
      onClick : function() {
        selectMenuItem(4);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
            view('view-360-page', true);
            scrollBlock(e);
          }
          else {
            view('city-page', true);
          }
          
          return false;
        }
      }
    },
    {
      id: "city-page",
      onClick : function() {
        selectMenuItem(5);
        onScroll = function(e) {
          if(e.wheelDeltaY > 0) {
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
  for (let i = 0; i < pageList.length; i++) {



  }

  let pages = {};

  function Page(data) {
    let element = document.getElementById(data.id);
    this.element = element;
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
    if(flag) {
      move();
      return;
    }
  }

  window.addEventListener("mousewheel", onScrollEvent, { passive: false });
  window.addEventListener("scroll", onScrollEvent, { passive: false });

  function onScroll() {}
  function onScrollEvent(e) {
    if(new Date() - lastMoveTime < 800) {
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
    img.src = './images/step/' + name + ".jpg";
  }

  function stepImgOnloadCheck() {
    stepImgLoadCount++;
    if(stepImgLoadCount >= stepImgFrameNum) {
      console.log("load done");
      console.log(stepImgs[0])
      draw()
    }
  }

  const canvas = document.getElementById("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');


  let stepStartHeight = pages['story-page-1'].element.offsetTop;

  function draw() {
    
    ctx.drawImage(stepImgs[0], 0, 0);
    setTimeout(draw, 60);
  }
  

  menuItems[0].click();
})