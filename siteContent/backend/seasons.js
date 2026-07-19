const seasonChangeJs = new BroadcastChannel('season')
let currentSeason = 'summer'
const Import = `
<head>
    <meta charset="UTF-8">
    <link href="../cssFiles/seasonCSS.css" rel="stylesheet">
</head>

<div class="corner-In" id="cornerWrapper">
    <img src="../artRes/sun.png" class="sun rotateInf" id="sunId">
</div>
`
// wrap the rotating image inside a separate div to prevent the rotation from affecting the translation transformation, meaning the img moves in the same path everytime

document.querySelector('body').insertAdjacentHTML('afterbegin', Import)

// triggered after season change
document.getElementById('cornerWrapper').onanimationend = () => {
  if (currentSeason == 'autumn') {
    // art doesn't load quickly enough before classList is changed
    // in animation, the forwards property helps hide this by forcing the image to stay in the animation end position until we change the class to animate the image back on screen
    document.getElementById('sunId').src = "../artRes/tree.png"
    document.getElementById('sunId').classList = ""
    document.getElementById('cornerWrapper').classList = "corner-In"
  }
  else if (currentSeason == 'summer') {
    document.getElementById('sunId').src = "../artRes/sun.png"
    document.getElementById('sunId').classList = "sun rotateInf"
    document.getElementById('cornerWrapper').classList = "corner-In"
  }
};

// receive message of new current season
seasonChangeJs.onmessage = (event) => {
    currentSeason = event.data.type
    document.getElementById('cornerWrapper').classList.remove('corner-In')
    document.getElementById('cornerWrapper').classList.add('corner-Out')
}