export function Text() {
  this.canvas = document.createElement('canvas');
  // this.canvas.style.cssText = `
  //   position : absolute;
  //   left : 0px;
  //   top : 0px;
  // `
  // document.body.appendChild(this.canvas);

  this.ctx = this.canvas.getContext('2d');

  this.setText = function(img, density, stageWidth, stageHeight) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    
    this.ctx.drawImage(img, 0, 0);
    console.log(this.canvas)
    return this.dotPos(density, stageWidth, stageHeight);

    // const myText = str;
    // const fontWidth = 700;
    // const fontSize = 800;
    // const fontName = "GyeonggiTitleBold"

    // this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    // this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    // this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    // this.ctx.textBaseline = `middle`;
    // const fontPos = this.ctx.measureText(myText);
    // this.ctx.fillText(
    //   myText,
    //   // (stageWidth - fontWidth) / 2,
    //   10,
    //   fontPos.actualBoundingBoxAscent + 
    //   // fontPos.actualBoundingBoxDescent + 
    //   ((stageHeight - fontSize) / 2)
    // );
  }
  this.dotPos = function(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(
      0, 0,
      stageWidth,
      stageHeight
    ).data;


    const paricles = [];
    let i = 0;
    let width = 0;
    let pixel;
    let r;
    let g;
    let b;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = (i % 2) == 0;
      width = 0;
      if(slide == 1) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        
        pixel = imageData[((width + (height * stageWidth)) * 4) - 1];
        if(
          (pixel != 0) &&
          (width > 0) &&
          (width < stageWidth) &&
          (height > 0) &&
          (height < stageHeight)
        )
        {
          r = imageData[((width + (height * stageWidth)) * 4) - 4]
          g = imageData[((width + (height * stageWidth)) * 4) - 3]
          b = imageData[((width + (height * stageWidth)) * 4) - 2]
          paricles.push({
            x : width,
            y : height,
            r : r,
            g : g,
            b : b,
          })
        }
      }
      
    }

    return paricles;
  }
}