const onWindowLoaded = () => {
  const textArea = document.getElementById("coords");
  const text = textArea.value;
  if(window.gData.length > 0) {
    highlightAyah(text, window.gData)
    return;
  }
  else if(text) {
    drawRectanglesFromText();
    return;
  }
  values = window.gValues
  values.forEach((val) => {
    drawRectangle(...val)
  })
}


window.onload = function() {
  initCanvas(onWindowLoaded)
}

const initCanvas = (callback) => {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  canvas.width = 10;
  canvas.width = w;
  var image = new Image;
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    callback()
  }
  image.src = window.gPagePath
}

//databases (file://MOHAMMED-PC/Users/mohammed/Downloads/quran/images_1024/databases)
//sudo mount -t cifs //192.168.0.101/quran ~/share

