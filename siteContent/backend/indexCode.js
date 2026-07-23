// indexCode called inside body rather than in head so that DOM can load first
// to allow the elements to load and become available for animation etc.

// TODO:
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

const pics = ['../artRes/cat.png', '../artRes/alien.png', '../artRes/shark.png']
const artPicDesc = ['simple drawing of a cat playing', 'excellent drawing of aliens cruising through an asteroid belt', 'quick drawing of a shark visiting the dentist']

function switchPhotos(endId, beforeId, descList, picList, artDesc) {
    let eSrc = document.getElementById(endId).src
    let eClass = document.getElementById(endId).classList[0]
    // to change description, get the index of the description from the image class
    if (descList != null) {
        document.getElementById(artDesc).innerHTML = artPicDesc[document.getElementById(beforeId).classList[0]]
    }
    // swap image source and classlist
    document.getElementById(endId).src = document.getElementById(beforeId).src
    document.getElementById(beforeId).src = eSrc
    document.getElementById(endId).classList = document.getElementById(beforeId).classList
    document.getElementById(beforeId).classList = eClass
}

function artDesc() {
    const d = document.getElementById('desc')
    // photo display ///
    // header
    let header = document.createElement('p')
    header.innerHTML = 'Art examples'
    header.classList = 'header'
    d.appendChild(header)

    // display photos using grid layout
    // adapted from https://www.reddit.com/r/css/comments/18esjnz/adding_an_image_inside_a_grid/
    const di = document.createElement('div')
    di.id = 'imageSlide'
    di.classList = 'gridPhoto'
    d.appendChild(di)

    // photos to display
    // wrap in div to correctly size and position them according to grid using div classes
    // use image classes to store index of art description
    // center image
    const dc = document.createElement('div')
    dc.classList = 'photo'
    dc.id = 'cImg'
    const img1 = document.createElement('img')
    img1.src = pics[0]
    img1.setAttribute('id', 'center')
    img1.classList = '0 figure'
    document.getElementById('imageSlide').appendChild(dc)
    document.getElementById('cImg').appendChild(img1)

    // bottom right image
    const dbr = document.createElement('div')
    dbr.classList = 'b-photo'
    dbr.id = 'bImg'
    const img3 = document.createElement('img')
    img3.src = pics[2]
    img3.setAttribute('id', 'bott')
    img3.classList = '2'
    document.getElementById('imageSlide').appendChild(dbr)
    document.getElementById('bImg').appendChild(img3)
    
    // top right image
    const dt = document.createElement('div')
    dt.classList = 't-photo'
    dt.id = 'tImg'
    const img2 = document.createElement('img')
    img2.src = pics[1]
    img2.setAttribute('id', 'top')
    img2.classList = '1'
    document.getElementById('imageSlide').appendChild(dt)
    document.getElementById('tImg').appendChild(img2)

    const artDesc = document.createElement('p')
    artDesc.innerHTML = artPicDesc[0]
    artDesc.setAttribute('id', 'artDesc')
    artDesc.classList = 'figure-caption text-center'
    d.appendChild(artDesc)

    // declare onclick after append to ensure all elements exist first
    // don't directly pass sources, elements etc.., let javascript find them to avoid hardcoding
    document.getElementById('bott').setAttribute('onclick', 'switchPhotos("center", "bott", artPicDesc, pics, "artDesc")')
    document.getElementById('top').setAttribute('onclick', 'switchPhotos("center", "top", artPicDesc, pics, "artDesc")')

    // app description: toolkit ///
    // make each gris section a 'carasoul', where the user clicks a button to move to the next desc of that group
    // todo: insert button to go to next photo, when maximizing the iframe for the art application, make it lock to the top of the screen and prevent scrolling
    // dictionary Map to store info. lists of lists -> [description, image for that description]
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections
    const descList = new Map([
        ['Toolkit', [['first desc', pics[0]], ['second desc', pics[1]]]],
        ['Bottom Toolkit', [['here', pics[2]], ['there', pics[0]]]], 
        ['extra to test alternate', [['extra', pics[1]], ['wow', pics[2]]]]
    ])

    console.log(descList)
    const alternate = ['left para', 'right para']
    const alternateP = ['r-photo', 'l-photo']
    let i = 0
    
    // loop through to automatically create the info grids
    for (const [key, value] of descList) {
        if (i > 1) {
            i = 0
        }
        const appdiv = document.createElement('div')
        appdiv.id = key
        appdiv.classList = 'gridText'

        let heading = document.createElement('p')
        heading.innerHTML = key
        heading.classList = 'mt-5'

        let appDesc = document.createElement('p')
        appDesc.innerHTML = value[0][0]
        appDesc.classList = alternate[i]

        let picDiv = document.createElement('div')
        picDiv.classList = alternateP[i]
        picDiv.id = key + 'PhotoDiv'

        let imgGrid = document.createElement('img')
        imgGrid.src = value[0][1]
        imgGrid.id = key + 'Photo'
        d.appendChild(heading)
        d.appendChild(appdiv)
        document.getElementById(key).appendChild(appDesc)
        document.getElementById(key).appendChild(picDiv)
        document.getElementById(key + 'PhotoDiv').appendChild(imgGrid)
        i = i + 1
    }
    // make a button to go to the next functionality of the toolkit
}

function desc(type) {
    // automatically reveal description when project selected
    if (descReveal == false) {
        descToggle()
    }
    // reset description html to prevent duplication or appending to existing desc
    document.getElementById('desc').innerHTML = ''
    switch(type) {
        case 'second.html':
            newUnderNavHeight = 5000
            artDesc()
            break;
        default:
            newUnderNavHeight = underNavHeight
    }
    document.getElementById('underNav').style.height = '' + newUnderNavHeight + 'px'
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
        document.body.classList.add("disableScroll")
    }
    else {
        //document.getElementById('fr').animate(frameMin, frameTime)
        document.getElementById('forTrans').classList.remove('fullscreen')
        document.getElementById('forTrans').classList.add('containFrame')
        document.getElementById('replace').style.zIndex = 'auto'
        frameState = 'max'
        window.scrollTo(pageScroll[0], pageScroll[1])
        document.body.classList.remove("disableScroll")
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
// for the desc height to be transitioned when clicking the button, need to instantiate underNav height since html cannot work from auto
function measureUnderNavHeight() {
    // https://johnkavanagh.co.uk/articles/element-dimensions-in-javascript-width-and-height/
    // client to measure element, inner/outer to measure window
    underNavHeight = document.getElementById('underNav').clientHeight
    newUnderNavHeight = underNavHeight
    document.getElementById('underNav').style.height = ''+ underNavHeight + 'px'
    console.log('initial height: ' + String(underNavHeight))
}
