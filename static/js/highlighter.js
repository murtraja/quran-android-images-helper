const PIXEL_THRESHOLD = 10

const highlightAyah = (ayahKey, data) => {
  bounds = getVersesBoundsForPage(data)
  normalizedBounds = normalizePageAyahs(bounds)
  normalizedBounds[ayahKey].forEach((b) => drawHighlight(b.left, b.top, b.right, b.bottom))
}

const normalizePageAyahs = (ayahCoordinates) => {
  let normalizedAyahCoordinates = {}
  Object.entries(ayahCoordinates).forEach(([key, value]) => {
    normalizedValue = normalizeAyahBounds(value, key)
    normalizedAyahCoordinates[key] = normalizedValue
  })
  return normalizedAyahCoordinates
}

const normalizeAyahBounds = (ayahBounds, key) => {
  const total = ayahBounds.length;
  if(total < 2) {
    return ayahBounds
  }
  if(total < 3) {
    const consolidated = consolidate(ayahBounds[0], ayahBounds[1])
    return consolidated
  } else {
    let middle = null
    middle = ayahBounds.slice(2, ayahBounds.length - 1).reduce((middle, curr) => engulf(middle, curr), ayahBounds[1])
    let top = consolidate(ayahBounds[0], middle)
    const topSize = top.length

    const bottom = consolidate(top[topSize-1], ayahBounds[total-1])
    const bottomSize = bottom.length

    let result = []
    if(topSize === 1) {
      return bottom;
    } else if(topSize + bottomSize > 4) {
      result = [...result, ...top, ...bottom]
      return result
    } else {
      top = consolidate(top[0], bottom[0])
      result = [...result, ...top]
      if(bottomSize > 1) {
        result = [...result, bottom[1]]
      }
      return result;
    }
  }
}

const consolidate = (top, bottom) => {
  firstRect = top;
  lastRect = bottom;
  let middle = null;
  const firstIsFullLine = Math.abs(firstRect.right - lastRect.right) < PIXEL_THRESHOLD
  const secondIsFullLine = Math.abs(firstRect.left - lastRect.left) < PIXEL_THRESHOLD
  if(firstIsFullLine && secondIsFullLine) {
    top = engulf(top, bottom)
    return [top]
  } else if(firstIsFullLine) {
    lastRect.top = firstRect.bottom
    const bestStartOfLine = Math.max(firstRect.right, lastRect.right);
    firstRect.right = bestStartOfLine
    lastRect.right = bestStartOfLine;
    top = withBounds(top, firstRect)
    bottom = withBounds(bottom, lastRect);
  } else if(secondIsFullLine) {
    firstRect.bottom = lastRect.top;
    const bestEndOfLine = Math.min(firstRect.left, lastRect.left);
    firstRect.left = bestEndOfLine;
    lastRect.left = bestEndOfLine;

    top = withBounds(top, firstRect);
    bottom = withBounds(bottom, lastRect)
  } else {
    if(lastRect.left < firstRect.right) {
      middle = withBounds(top, {
        left: lastRect.left,
        top: firstRect.bottom,
        right: firstRect.right,
        bottom: lastRect.top
      })
    }
  }
  result = [top]
  if(middle) {
    result.push(middle)
  }
  result.push(bottom)
  return result
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

const withBounds = (ayahBounds, bounds) => {
  return {
    ...ayahBounds,
    right: bounds.right,
    left: bounds.left,
    top: bounds.top,
    bottom: bounds.bottom,
  }
}