const PIXEL_THRESHOLD = 10

const RECT_REGEX=/RectF\(([^,]*), ([^,]*), ([^,]*), ([^)]*)\)/
const regex = new RegExp(RECT_REGEX)

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
  const left = parseInt(matchObj[1])
  const top = parseInt(matchObj[2])
  const right = parseInt(matchObj[3])
  const bottom = parseInt(matchObj[4])
  drawRectangle(left, top, right, bottom)
}

function clear_canvas_width ()
{
  var s = document.getElementById ("myCanvas");
  var w = s.width;
  s.width = 10;
  s.width = w;
}

const drawRectanglesFromText = () => {
  const textArea = document.getElementById("coords");
  const val = textArea.value
  const coords = val.split('\n')
  coords.forEach((i) => {
    drawRectangleFromText(i)
  })
}

const onRefreshPress = () => {
  //debugger;
  initCanvas(drawRectanglesFromText)
}

//-------- EXPERIMENTATION --------


const normalizePageAyahs = (ayahCoordinates) => {
  let normalizedAyahCoordinates = {}
  Object.entries(ayahCoordinates).forEach(([key, value]) => {
    normalizedValue = normalizeAyahBounds(value)
    normalizedAyahCoordinates[key] = normalizedValue
  })
  return normalizedAyahCoordinates
}

const normalizeAyahBounds = (ayahBounds) => {
  const total = ayahBounds.length;
  if(total < 2) {
    return ayahBounds
  }
  if(total < 3) {
    const consolidated = consolidate(ayahBounds[0], ayahBounds[1])
    return consolidated
  }
}

const consolidate = (topR, bottomR) => {
  let middle = null;

}

class RectF {
  
  constructor(left, top, right, bottom) {
    this.set(left, top, right, bottom)
  }

  set(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  getRectFromRectF(rectf) {
    let r1 = new Rect()
    r1.x = this.left;
    r1.y = this.top;
    r1.height = Math.abs(this.bottom - this.top)
    r1.width = Math.abs(this.right - this.left)
    return r1;
  }

  getRectFFromRect(rect) {
    const left = rect.x
    const top = rect.y
    const bottom = top + rect.height
    const right = left + rect.width
    return new RectF(left, top, right, bottom)
  }
  
  union(rectf) {
    let r1 = this.getRectFromRectF(this)
    let r2 = this.getRectFromRectF(rectf)
    let unioned = r1.union(r2)
    unioned = this.getRectFFromRect(unioned)
    this.set(unioned)
  }
}

const getVersesBoundsForPage = (data) => {
  const ayahBounds = {}
  data.forEach(element => {
    const sura = element.sura
    const ayah = element.ayah
    element = getAyahBounds(element)
    const key = sura + ":" + ayah;
    let bounds = ayahBounds[key]
    if(!bounds) {
      ayahBounds[key] = []
      bounds = []
    }

    let last = null;
    let lastIndex = null
    if(bounds.length) {
      lastIndex = bounds.length - 1
      last = bounds[lastIndex]
    }

    if(last && last.line === element.line) {
      last = engulf(last, element)
      bounds[lastIndex] = last
    } else {
      bounds.push(element)
    }
    ayahBounds[key] = bounds
  });
  return ayahBounds
}

const getRectFFromBounds = (bounds) => {
  let rectf = new RectF(bounds.min_x, bounds.min_y, bounds.max_x, bounds.max_y)
  return rectf;
}

const getAyahBounds = (element) => {
  return {
    left: element.min_x,
    top: element.min_y,
    right: element.max_x,
    bottom: element.max_y,
    line: element.line,
    position: element.position,
  }
}

const engulf = (bounds1, bounds2) => {
  const engulfed = {
    ...bounds1,
    left: Math.min(bounds1.left, bounds2.left),
    top: Math.min(bounds1.top, bounds2.top),
    right: Math.max(bounds1.right, bounds2.right),
    bottom: Math.max(bounds1.bottom, bounds2.bottom),
  }
  return engulfed
}