// indexCode called inside body rather than in head so that DOM can load first
// to allow the elements to load and become available for animation etc.

// TODO:
// make Description an Accordian
// write description in general
// finish seasons
// add music

let frameState = 'max'
let pageScroll = []
const season = ['Summer', 'Autumn']
let currentSeasonInt = 0
// https://www.telerik.com/blogs/ultimate-guide-broadcast-channel-api 
const msg = new BroadcastChannel('frame')
const seasonChange = new BroadcastChannel('season')
let descReveal = true
let underNavHeight = 0
let newUnderNavHeight = 0

const frameMax = [
    {transform: 'scale(1)'},
    {transform: 'scale(1.5)'}
]

const frameMin = [
    {transform: 'scale(1.5)'},
    {transform: 'scale(1)'}
]

const frameTime = {duration: 5000, iterations: 1}

function checkScroll() {
    console.log(window.scrollX)
    console.log(window.scrollY)
}

function desc(type) {
    switch(type) {
        case 'second.html':
            document.getElementById('underNav').style.height = '1200px'
            newUnderNavHeight = '1200px'
            document.getElementById('desc').innerHTML = 'An online art application for vector based drawings. users are able to: change colour, erase vectors, and change brush size.\nbruh\nbruh\nruh\nbruh'
            break;
        default:
            newUnderNavHeight = underNavHeight
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
        document.getElementById('forTrans').classList.remove('containFrame')
        document.getElementById('forTrans').classList.add('scaleUp')
        //document.getElementById('forTrans').classList.add('fullScreen')
        document.getElementById('replace').style.zIndex = '100'
        frameState = 'min'
        window.scrollTo(0, 0)
    }
    else {
        //document.getElementById('fr').animate(frameMin, frameTime)
        document.getElementById('forTrans').classList.remove('fullscreen')
        document.getElementById('forTrans').classList.add('containFrame')
        document.getElementById('replace').style.zIndex = 'auto'
        frameState = 'max'
        window.scrollTo(pageScroll[0], pageScroll[1])
        console.log(pageScroll)
    }
}

// receive message to the drawingApplication code (second.js)
msg.onmessage = (event) => {
  if (event.data.type === 'change') {
    frameResize()
  }
}

function changeSeason() {
    currentSeasonInt = currentSeasonInt + 1
    if (currentSeasonInt > season.length - 1) {
        currentSeasonInt = 0
    }
    console.log(currentSeasonInt)
    document.getElementById('seasonHandle').innerHTML = season[currentSeasonInt]
    document.querySelector('body').className = season[currentSeasonInt].toLowerCase()
    seasonChange.postMessage({type: season[currentSeasonInt].toLowerCase()}) // send message to seasons.js to carry out animation transitions and changes excluding bg colour
}

// use js instead of css to adjust height when toggling desc to provide flexibility for the different descrition lengths
function descToggle() {
    // https://stackoverflow.com/questions/68728623/how-can-i-check-whether-innerhtml-is-empty
    if (descReveal == true && document.getElementById('desc').innerHTML.trim() != '') {
        descReveal = false
        document.getElementById('underNav').style.height = '' + underNavHeight + 'px'
        document.getElementById('desc').classList.add('hideDesc')
    }
    else {
        descReveal = true
        document.getElementById('underNav').style.height = newUnderNavHeight
        document.getElementById('desc').classList.remove('hideDesc')
    }
    console.log('descReveal: ', descReveal)
}

/*
function pageIntro() {
    // Source - https://stackoverflow.com/a/17531533
    document.getElementById('underNav').animate(introAnim, 500)
}

pageIntro()
// https://stackoverflow.com/questions/17530756/disable-scrolling-when-the-animation-of-scrolling-is-taking-place
*/

/* stops page from automatically scrolling due to css animations of seasons */
window.history.scrollRestoration = "manual"

/* get the height of the underNav div upon load
only call after underNav loaded*/
function measureUnderNavHeight() {
    // https://johnkavanagh.co.uk/articles/element-dimensions-in-javascript-width-and-height/
    // client to measure element, inner/outer to measure window
    underNavHeight = document.getElementById('underNav').clientHeight
    newUnderNavHeight = underNavHeight
    document.getElementById('underNav').style.height = ''+ underNavHeight + 'px'
    console.log('initial height: ' + String(underNavHeight))
}
