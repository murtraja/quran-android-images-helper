window.onload = function() {
  
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  
  function drawRectangle(minX, minY, maxX, maxY) {
    ctx.beginPath()
    ctx.strokeStyle = getRandomColor();
    // ctx.fillRect(minX, minY, maxX-minX, maxY-minY)
    ctx.rect(minX, minY, maxX-minX, maxY-minY)
    ctx.stroke()
    ctx.closePath();
  }

  var image = new Image;
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    values = window.gValues
    for(let i=0; i<values.length; i++) {
      drawRectangle(...window.gValues[i])
    }
  }
  image.src = window.gPagePath
}
//databases (file://MOHAMMED-PC/Users/mohammed/Downloads/quran/images_1024/databases)
//sudo mount -t cifs //192.168.0.101/quran ~/share

