window.addEventListener('DOMContentLoaded', function () {
  let allDownloadCount = 0;
  let donwloadCountNum = 0;
  function donwloadCount() {
    ++donwloadCountNum;

  }

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

  for (let i = 0; i < storyPageMenuItems.length; i++) {
    const id = i;
    storyPageMenuItems[id].onclick = function () {
      view('story-page-' + (id + 1), true);
    }
  }

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
            scrollBlock(e);
          }
          else {
            // view('story-page-2', true);
            // scrollBlock(e);
          }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[0].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[0];
        storyPageText.innerText =
          `As the COVID-18 pandemic spread on the Earth in 2019, people are dying at an alarming rate. Humanity had failed to develop a treatment for COVID-18. Nations all around the world are helplessly collapsing The one’s who survived scattered to try to live another day, leaving the cities that is rampant and ruined by the (infectious) disease. The world’s social functions are now lost.`
      }
    },
    {
      id: "story-page-2",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          // if (e.wheelDeltaY > 0) {
          //   view('story-page-1', true);
          //   scrollBlock(e);
          // }
          // else {
          //   view('story-page-3', true);
          //   scrollBlock(e);
          // }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[1].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[1];
        storyPageText.innerText =
          `It seems like there is no hope for humanity. But suddenly on October 2021, few of the survivors finds an enormous tree that has a special berry with mysterious energy. The few who found this, lured by its mysterious energy, takes a bite. What’s this? The people who took the berries felt they were loaded with powerful energy for the first time in their lives.`
      }
    },
    {
      id: "story-page-3",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          // if (e.wheelDeltaY > 0) {
          //   view('story-page-2', true);
          //   scrollBlock(e);
          // }
          // else {
          //   view('story-page-4', true);
          //   scrollBlock(e);
          // }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[2].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[2];
        storyPageText.innerText =
          `They were now tired of fear and hunger. They took a bite at the berry and shouted “HULL SHIT!” Several days have passed, and their appearance started to change. They were given with new abilities. They did not look like a human being anymore, but their abilities were beyond normal, without any limitations. Including the first few who took the berry, the total number of berry reached 10,000.`
      }
    },
    {
      id: "story-page-4",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          // if (e.wheelDeltaY > 0) {
          //   view('story-page-3', true);
          //   scrollBlock(e);
          // }
          // else {
          //   view('story-page-5', true);
          //   scrollBlock(e);
          // }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[3].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[3];
        storyPageText.innerText =
          `They are able to do whatever they want.Nothing is impossible because they overcame the limitations of normal human capabilities.They are amazed of themselves, and started to call themselves ‘HULLY’.HULLY appears in front of the dying humanity. The hell for mankind is a playground for HULLY HULLY are invulnerable even in front of virus carriers.HULLY shares the information about the HULLY TREE and HULLY BERRY.The believers of this information, the ones who took and ate the berry becomes a HULLY.They are now free from everything.`
      }
    },
    {
      id: "story-page-5",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          // if (e.wheelDeltaY > 0) {
          //   view('story-page-4', true);
          //   scrollBlock(e);
          // }
          // else {
          //   view('story-page-6', true);
          //   scrollBlock(e);
          // }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[4].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[4];
        storyPageText.innerText =
          `The world is destroyed and cannot recover. Now, there are no more berry left. Only Hully is a survivor. Now people can be Hully for a short timeonly if they get Hullyshot that Hully made`
      }
    },
    {
      id: "story-page-6",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          // if (e.wheelDeltaY > 0) {
          //   view('story-page-5', true);
          //   scrollBlock(e);
          // }
          // else {
          //   view('story-page-7', true);
          //   scrollBlock(e);
          // }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[5].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[5];
        storyPageText.innerText =
          `Hully gives information to desperate people,and the people have a chance to go back to the time.Do they decide to be Hully and enjoy all the freedom? Or do they decide to remain as human beings and die?`
      }
    },
    {
      id: "story-page-7",
      onClick: function () {
        selectMenuItem(1);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            // view('story-page-6', true);
            // scrollBlock(e);
          }
          else {
            view('choice-page', true);
            scrollBlock(e);
          }
          return false;
        }

        lastStoryPageMenuItem.classList.remove("active");
        storyPageMenuItems[5].classList.add("active");
        lastStoryPageMenuItem = storyPageMenuItems[5];
        storyPageText.innerText =
          `Hully gives information to desperate people, and the people have a chance to go back to the time. Do they decide to be Hully and enjoy all the freedom? Or do they decide to remain as human beings and die?`
      }
    },
    {
      id: "choice-page",
      onClick: function () {
        selectMenuItem(2);
        onScroll = function (e) {
          if (e.wheelDeltaY > 0) {
            view('story-page-7', true);
          }
          else {
            view('view-360-page', true);
          }
          scrollBlock(e);
          return false;
        }
        // if (!isChPlayerPlay) {
        //   chPlayer.currentTime = 0;
        //   chPlayer.play();
        //   isChPlayerPlay = true;
        // }
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
          }
          else {
            view('city-page', true);
          }
          scrollBlock(e);
          return false;
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
          }
          else {

          }
          return true;
        }
      }
    },
  ];

  const chPlayer = document.getElementById("ch-player");
  let isChPlayerPlay = false;
  // chPlayer.onended = function () {
  //   chPlayer.currentTime = 0;
  //   chPlayer.play();
  // }


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

      clickElement.setAttribute("href", '#' + id);
      clickElement.click();
    }
    if (flag) {
      lastMoveTime = new Date();
      setTimeout(function () {
        move();
      }, 200)
      return;
    }
  }

  window.addEventListener("mousewheel", onScrollEvent, { passive: false });

  function onScroll() { }
  function onScrollEvent(e) {
    if (typeof e.wheelDeltaY === 'undefined') { return }

    if (new Date() - lastMoveTime < 1000) {
      return scrollBlock(e);
    }
    return onScroll(e);
  }

  let stepImgs = [];
  window.stepImgs = stepImgs;
  // let stepImgIDs.length = 738;
  let stepImgLoadCount = 0;
  // for (let i = 0; i < 738; i++) {
  //   let name = String(i + 1);
  //   name = (name.length === 1) ? '000' + name :
  //          (name.length === 2) ? '00' + name :
  //          (name.length === 3) ? '0' + name :
  //          (name.length === 4) ? name : name;
  //   let img = new Image();
  //   stepImgs.push(img);
  //   img.onload = stepImgOnloadCheck;
  //   img.src = './images/step/' + name + ".jpg?ver=2022-01-11";
  // }

  let stepImgIDs = [
    '1.png?ver=2022-01-11',
    '2.png?ver=2022-01-11',
    '3.png?ver=2022-01-11',
    '4.png?ver=2022-01-11',
    '5.png?ver=2022-01-11',
    '6.png?ver=2022-01-11',
  ];

  for (let i = 0; i < stepImgIDs.length; i++) {
    let img = new Image();
    stepImgs.push(img);
    img.onload = stepImgOnloadCheck;
    img.src = './images/step2/' + stepImgIDs[i] + "?ver=2022-01-11";
  }
  for (let i = 0; i < 5; i++) {
    let img = new Image();
    let canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1920;
    stepImgs.push(canvas);
    let context = canvas.getContext("2d");
    img.onload = function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(360 * Math.random() * Math.PI / 180);
      context.drawImage(img, -img.width / 2, -img.height / 2);
      context.restore();
      console.log(1)
      stepImgOnloadCheck();
    };
    img.src = "./images/step2/loop.png?ver=2022-01-11";
  }

  function stepImgOnloadCheck() {
    stepImgLoadCount++;
    if (stepImgLoadCount >= stepImgIDs.length + 5) {

      donwloadCount();
      console.log("load done");
      draw()
    }
  }

  const canvas = document.getElementById("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  const storyPageOutter = document.getElementById("story-page-outter");
  let storyPageOutterTop;
  let stepStartTop;
  let stepEndTop;
  let stepHeightLength;


  function setStepContents() {
    storyPageOutterTop = storyPageOutter.offsetTop;
    stepStartTop = pages['story-page-1'].element.offsetTop + storyPageOutterTop;
    stepEndTop = pages['story-page-7'].element.offsetTop + storyPageOutterTop;
    stepHeightLength = stepEndTop - stepStartTop;
  }
  window.addEventListener('resize', setStepContents);
  setStepContents();

  let nowSeePage = pageList[0].id;
  function onChangeNowSeePage(id) {
    nowSeePage = id;
    console.log(id);
    pages[id].onClick();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let top = window.scrollY - stepStartTop;
    top = top <= 0 ? 0 : top;

    let ratio = top / stepHeightLength;
    ratio = ratio <= 1 ? ratio : 1;

    // 시작
    if (
      (ratio < 1 / 12)
    ) {


      let size = (0.2 + 0.8 * ratio * 12);
      ctx.drawImage(
        stepImgs[6],
        (canvas.width - stepImgs[6].width * size) / 2,
        (canvas.height - stepImgs[6].height * size) / 2,
        stepImgs[6].width * size,
        stepImgs[6].height * size
      );

    }
    // 중간
    if (
      (1 / 12 <= ratio) &&
      (ratio < 2 / 12)
    ) {
      let localRatio = ((ratio - 1 / 12) * 12);

      ctx.globalAlpha = localRatio;
      let imgSize = 0.2 + 0.8 * localRatio;
      ctx.drawImage(
        stepImgs[0],
        (canvas.width - stepImgs[0].width * imgSize) / 2,
        (canvas.height - stepImgs[0].height * imgSize) / 2,
        stepImgs[0].width * imgSize,
        stepImgs[0].height * imgSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let lockSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[6],
        (canvas.width - stepImgs[6].width * lockSize) / 2,
        (canvas.height - stepImgs[6].height * lockSize) / 2,
        stepImgs[6].width * lockSize,
        stepImgs[6].height * lockSize
      );

      ctx.globalAlpha = 1.0;
    }
    // #1
    if (
      (2 / 12 <= ratio) &&
      (ratio < 3 / 12)
    ) {
      let localRatio = ((ratio - 2 / 12) * 12);

      ctx.globalAlpha = 1;
      let lockSize = (0.0 + 1.0 * localRatio);
      ctx.drawImage(
        stepImgs[7],
        (canvas.width - stepImgs[7].width * lockSize) / 2,
        (canvas.height - stepImgs[7].height * lockSize) / 2,
        stepImgs[7].width * lockSize,
        stepImgs[7].height * lockSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let imgSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[0],
        (canvas.width - stepImgs[0].width * imgSize) / 2,
        (canvas.height - stepImgs[0].height * imgSize) / 2,
        stepImgs[0].width * imgSize,
        stepImgs[0].height * imgSize
      );


    }
    // 중간
    else if (
      (3 / 12 <= ratio) &&
      (ratio < 4 / 12)
    ) {
      let localRatio = ((ratio - 3 / 12) * 12);

      ctx.globalAlpha = localRatio;
      let imgSize = 0.5 + 0.5 * localRatio;
      ctx.drawImage(
        stepImgs[1],
        (canvas.width - stepImgs[1].width * imgSize) / 2,
        (canvas.height - stepImgs[1].height * imgSize) / 2,
        stepImgs[1].width * imgSize,
        stepImgs[1].height * imgSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let lockSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[7],
        (canvas.width - stepImgs[7].width * lockSize) / 2,
        (canvas.height - stepImgs[7].height * lockSize) / 2,
        stepImgs[7].width * lockSize,
        stepImgs[7].height * lockSize
      );

      ctx.globalAlpha = 1.0;
    }
    // #2
    else if (
      (4 / 12 <= ratio) &&
      (ratio < 5 / 12)
    ) {
      let localRatio = ((ratio - 4 / 12) * 12);

      ctx.globalAlpha = 1;
      let lockSize = (0.0 + 1.0 * localRatio);
      ctx.drawImage(
        stepImgs[8],
        (canvas.width - stepImgs[8].width * lockSize) / 2,
        (canvas.height - stepImgs[8].height * lockSize) / 2,
        stepImgs[8].width * lockSize,
        stepImgs[8].height * lockSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let imgSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[1],
        (canvas.width - stepImgs[1].width * imgSize) / 2,
        (canvas.height - stepImgs[1].height * imgSize) / 2,
        stepImgs[1].width * imgSize,
        stepImgs[1].height * imgSize
      );

    }
    // 중간
    else if (
      (5 / 12 <= ratio) &&
      (ratio < 6 / 12)
    ) {
      let localRatio = ((ratio - 5 / 12) * 12);

      ctx.globalAlpha = localRatio;
      let imgSize = 0.5 + 0.5 * localRatio;
      ctx.drawImage(
        stepImgs[2],
        (canvas.width - stepImgs[2].width * imgSize) / 2,
        (canvas.height - stepImgs[2].height * imgSize) / 2,
        stepImgs[2].width * imgSize,
        stepImgs[2].height * imgSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let lockSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[8],
        (canvas.width - stepImgs[8].width * lockSize) / 2,
        (canvas.height - stepImgs[8].height * lockSize) / 2,
        stepImgs[8].width * lockSize,
        stepImgs[8].height * lockSize
      );

      ctx.globalAlpha = 1.0;
    }
    // #3
    else if (
      (6 / 12 <= ratio) &&
      (ratio < 7 / 12)
    ) {
      let localRatio = ((ratio - 6 / 12) * 12);

      ctx.globalAlpha = 1;
      let lockSize = (0.0 + 1.0 * localRatio);
      ctx.drawImage(
        stepImgs[9],
        (canvas.width - stepImgs[9].width * lockSize) / 2,
        (canvas.height - stepImgs[9].height * lockSize) / 2,
        stepImgs[9].width * lockSize,
        stepImgs[9].height * lockSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let imgSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[2],
        (canvas.width - stepImgs[2].width * imgSize) / 2,
        (canvas.height - stepImgs[2].height * imgSize) / 2,
        stepImgs[2].width * imgSize,
        stepImgs[2].height * imgSize
      );
    }
    // 중간
    else if (
      (7 / 12 <= ratio) &&
      (ratio < 8 / 12)
    ) {
      let localRatio = ((ratio - 7 / 12) * 12);

      ctx.globalAlpha = localRatio;
      let imgSize = 0.5 + 0.5 * localRatio;
      ctx.drawImage(
        stepImgs[3],
        (canvas.width - stepImgs[3].width * imgSize) / 2,
        (canvas.height - stepImgs[3].height * imgSize) / 2,
        stepImgs[3].width * imgSize,
        stepImgs[3].height * imgSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let lockSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[9],
        (canvas.width - stepImgs[9].width * lockSize) / 2,
        (canvas.height - stepImgs[9].height * lockSize) / 2,
        stepImgs[9].width * lockSize,
        stepImgs[9].height * lockSize
      );

      ctx.globalAlpha = 1.0;
    }
    // #4
    else if (
      (8 / 12 <= ratio) &&
      (ratio < 9 / 12)
    ) {
      let localRatio = ((ratio - 8 / 12) * 12);

      ctx.globalAlpha = 1;
      let lockSize = (0.0 + 1.0 * localRatio);
      ctx.drawImage(
        stepImgs[10],
        (canvas.width - stepImgs[10].width * lockSize) / 2,
        (canvas.height - stepImgs[10].height * lockSize) / 2,
        stepImgs[10].width * lockSize,
        stepImgs[10].height * lockSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let imgSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[3],
        (canvas.width - stepImgs[3].width * imgSize) / 2,
        (canvas.height - stepImgs[3].height * imgSize) / 2,
        stepImgs[3].width * imgSize,
        stepImgs[3].height * imgSize
      );
    }
    // 중간
    else if (
      (9 / 12 <= ratio) &&
      (ratio < 10 / 12)
    ) {
      let localRatio = ((ratio - 9 / 12) * 12);

      ctx.globalAlpha = localRatio;
      let imgSize = 0.5 + 0.5 * localRatio;
      ctx.drawImage(
        stepImgs[4],
        (canvas.width - stepImgs[4].width * imgSize) / 2,
        (canvas.height - stepImgs[4].height * imgSize) / 2,
        stepImgs[4].width * imgSize,
        stepImgs[4].height * imgSize
      );

      ctx.globalAlpha = 1 - localRatio;
      let lockSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[10],
        (canvas.width - stepImgs[10].width * lockSize) / 2,
        (canvas.height - stepImgs[10].height * lockSize) / 2,
        stepImgs[10].width * lockSize,
        stepImgs[10].height * lockSize
      );

      ctx.globalAlpha = 1.0;
    }
    else if (
      (10 / 12 <= ratio) &&
      (ratio < 11 / 12)
    ) {
      let localRatio = ((ratio - 10 / 12) * 12);


      ctx.globalAlpha = 1 - localRatio;
      let imgSize = 1 + 1 * localRatio;
      ctx.drawImage(
        stepImgs[4],
        (canvas.width - stepImgs[4].width * imgSize) / 2,
        (canvas.height - stepImgs[4].height * imgSize) / 2,
        stepImgs[4].width * imgSize,
        stepImgs[4].height * imgSize
      );

      ctx.globalAlpha = 1;
      let lockSize = (0.0 + 1.0 * localRatio);
      ctx.drawImage(
        stepImgs[5],
        (canvas.width - stepImgs[5].width * lockSize) / 2,
        (canvas.height - stepImgs[5].height * lockSize) / 2,
        stepImgs[5].width * lockSize,
        stepImgs[5].height * lockSize
      );

      ctx.globalAlpha = 1;
    }
    // 끝
    else if (
      (11 / 12 <= ratio)
    ) {
      let localRatio = ((ratio - 11 / 12) * 12);

      let imgSize = 1 + 0.2 * localRatio;
      ctx.globalAlpha = 1;
      ctx.drawImage(
        stepImgs[5],
        (canvas.width - stepImgs[5].width * imgSize) / 2,
        (canvas.height - stepImgs[5].height * imgSize) / 2,
        stepImgs[5].width * imgSize,
        stepImgs[5].height * imgSize
      );
    }


    for (let i = 0; i < pageList.length; i++) {
      if (
        (new Date() - lastMoveTime > 1000) &&
        (
          pages[pageList[i].id].element.offsetTop +
          (pageList[i].id.substring(0, 5) === 'story' ? storyPageOutterTop : 0) < window.scrollY
        ) &&
        (window.scrollY <
          pages[pageList[i].id].element.offsetTop +
          pages[pageList[i].id].element.offsetHeight +
          (pageList[i].id.substring(0, 5) === 'story' ? storyPageOutterTop : 0) -
          10
        ) &&
        (nowSeePage !== pageList[i].id)
      ) {
        onChangeNowSeePage(pageList[i].id);
        break;
      }
    }

    setTimeout(draw, 1000 / 60);
  }

  // const fruitList = document.getElementById("fruit-list");
  // fruitList.style.left = 0;
  // const fruitArrowLeft = document.getElementById("fruit-arrow-left");
  // const fruitArrowRight = document.getElementById("fruit-arrow-right");

  // fruitArrowLeft.onclick = function () {
  //   fruitListMove(false);
  // }
  // fruitArrowRight.onclick = function () {
  //   fruitListMove(true);
  // }

  // function fruitListMove(flag) {
  //   let returnNum = (fruitList.offsetLeft + (flag ? -500 : 500));
  //   if (returnNum < (-(fruitList.offsetWidth - 1300))) {
  //     returnNum = -(fruitList.offsetWidth - 1300);
  //   }
  //   else if (returnNum > 0) {
  //     returnNum = 0;
  //   }
  //   fruitList.style.left = (returnNum) + "px";
  // }


  // function FruitBlock(data) {
  //   let div = document.createElement("div");
  //   div.classList.add("item");
  //   div.appendChild((function () {
  //     let div = document.createElement("div");
  //     div.classList.add("art");
  //     let stlye = "url(./images/fruit/detail/" + (data[0] + 1) + ".png?ver=2022-01-11),";
  //     stlye += "url(./images/fruit/fruit/" + (data[1] + 1) + ".png?ver=2022-01-11),";
  //     stlye += "url(./images/fruit/tail/" + (data[2] + 1) + ".png?ver=2022-01-11)";
  //     div.style.backgroundImage = stlye;
  //     return div;
  //   })());

  //   div.appendChild((function () {
  //     let div = document.createElement("div");
  //     div.classList.add("item-title");
  //     div.innerText = "Hully Berry";
  //     return div;
  //   })());

  //   div.appendChild((function () {
  //     let div = document.createElement("div");
  //     div.classList.add("item-description");
  //     div.innerText = "Mysterious Fruit";
  //     return div;
  //   })());
  //   return div;
  // }
  // let fruitdetailNum = 4;
  // let fruitMainNum = 10;
  // let fruittailNum = 9;


  // let fruitDataList = [];
  // for (let i = 0; i < fruitdetailNum; i++) {
  //   for (let j = 0; j < fruitMainNum; j++) {
  //     for (let k = 0; k < fruittailNum; k++) {
  //       fruitDataList.push([i, j, k])
  //     }
  //   }
  // }
  // fruitDataList.sort(function (a, b) {
  //   return Math.random() - 0.5;
  // })




  // for (let i = 0; i < 48; i++) {
  //   fruitList.appendChild(FruitBlock(fruitDataList[i]));
  // }

  const characterPageBox = document.getElementById("character-page-box");
  const chItems = characterPageBox.getElementsByClassName("item");
  for (let i = 0; i < chItems.length; i++) {
    const id = i;
    chItems[id].onmouseover = function () {
      characterPageBox.style.backgroundImage = "url(./images/character/" + (id + 1) + ".png?ver=2022-01-11)";
    }
  }


  menuItems[0].click();
});

; (function () {
  var vrView;

  var scenes = {
    CastleWithTree360: {
      image: 'images/CastleWithTree360.png?ver=2022-01-11',
      preview: 'images/blank.png?ver=2022-01-11'
    }
  }

  function onLoad() {
    vrView = new VRView.Player('#vrview', {
      width: '100%',
      height: '100%',
      image: 'images/blank.png?ver=2022-01-11',
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
    console.log(vrView);
  }

  function onVRViewReady(e) {
    console.log('onVRViewReady');
    loadScene('CastleWithTree360');
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
