// indexCode called inside body rather than in head so that DOM can load first
// to allow the elements to load and become available for animation etc.

let frameState = 'max'
let pageScroll = []
// https://www.telerik.com/blogs/ultimate-guide-broadcast-channel-api 
const msg = new BroadcastChannel('frame')

const frameMax = [
    {transform: 'scale(1)'},
    {transform: 'scale(1.5)'}
]

const frameMin = [
    {transform: 'scale(1.5)'},
    {transform: 'scale(1)'}
]

const introAnim = {
    transform: ['translateY(100px)','translateY(0)'], opacity: [0, 1]
}

const frameTime = {duration: 5000, iterations: 1}

function checkScroll() {
    console.log(window.scrollX)
    console.log(window.scrollY)
}

function desc(type) {
    switch(type) {
        case 'second.html':
            document.getElementById('desc').innerHTML = 'An online art application for vector based drawings. users are able to: change colour, erase vectors, and change brush size.'
            break;
        default:
            document.getElementById('desc').innerHTML = ''
    }
}

function frameResize() {
    if (frameState == 'max') {
        //document.getElementById('fr').animate(frameMax, frameTime)
        pageScroll = [window.scrollX, window.scrollY]
        console.log(window.scrollX)
        console.log(window.scrollY)
        console.log(pageScroll)
        document.getElementById('fr').id = 'fullScreen'
        document.getElementById('replace').style.zIndex = '100'
        frameState = 'min'
    }
    else {
        //document.getElementById('fr').animate(frameMin, frameTime)
        document.getElementById('fullScreen').id = 'fr'
        document.getElementById('replace').style.zIndex = 'auto'
        frameState = 'max'
        window.scrollTo(pageScroll[0], pageScroll[1])
        console.log(pageScroll)
    }
}

msg.onmessage = (event) => {
  if (event.data.type === 'change') {
    frameResize()
  }
}

function pageIntro() {
    // Source - https://stackoverflow.com/a/17531533
    document.getElementById('underNav').animate(introAnim, 500)
}

pageIntro()
// https://stackoverflow.com/questions/17530756/disable-scrolling-when-the-animation-of-scrolling-is-taking-place