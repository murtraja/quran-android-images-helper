const RECT_REGEX=/([0-9.]*), ?([^,]*), ?([^,]*), ?([^)]*)/mg

const regex = new RegExp(RECT_REGEX)

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawHighlight(minX, minY, maxX, maxY) {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath()
  // ctx.globalAlpha = 0.25
  ctx.fillStyle="rgba(70,148,166,0.25)"
  ctx.fillRect(minX, minY, maxX-minX, maxY-minY)
  // ctx.globalAlpha = 1.0
  // ctx.stroke()
  ctx.closePath();
}

function drawRectangle(minX, minY, maxX, maxY) {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath()
  ctx.strokeStyle = getRandomColor();
  // ctx.fillRect(minX, minY, maxX-minX, maxY-minY)
  ctx.rect(minX, minY, maxX-minX, maxY-minY)
  ctx.stroke()
  ctx.closePath();
}

const drawRectangleFromText = (text) => {
  const matchObj = regex.exec(text)
  drawRectangleFromMatch(matchObj)
}

drawRectangleFromMatch = (matchObj) => {
  const left = parseInt(matchObj[1])
  const top = parseInt(matchObj[2])
  const right = parseInt(matchObj[3])
  const bottom = parseInt(matchObj[4])
  drawRectangle(left, top, right, bottom)

}

const drawRectanglesFromText = () => {
  const textArea = document.getElementById("coords");
  const val = textArea.value
  let coords = null;
  while(coords = regex.exec(val)) {
    drawRectangleFromMatch(coords)
  }
}

const onRefreshPress = () => {
  initCanvas(onWindowLoaded)
}
