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
let underNavHeight = 0 // original div height before description expansion

// resources for art app
const pics = ['../artRes/cat.png', '../artRes/alien.png', '../artRes/shark.png']
const artPicDesc = ['simple drawing of a cat playing', 'excellent drawing of aliens cruising through an asteroid belt', 'quick drawing of a shark visiting the dentist']
// dictionary Map to store info. lists of lists -> [description, image for that description]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections
// &nbsp; was used to avoid splicing texts into multiple <p> elements to ensure simplicity when looping through descriptions, although it's originally meant to prevent word wrapping 
const descList = new Map([
    ['Toolkit', [
        ["Drag<br><br>An inactive button that gives the user a 'ledge' to more easily drag the Toolkit around. GSAP, an external CDN plugin for animations, was used to make this possible.", pics[0]], 
        [`Pen<br><br>Path2D was used to continually create new lines from the last and current position whenever the left mouse button was held down and moving. When released, a list of Path2Ds (a drawing path) is created to represent a single stroke and is appended to the drawingPaths stack.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Limits were placed to reduce bugs when drawing, such as: the current stroke ending when the mouse leaves the canvas, empty drawing paths (where the user was holding down but not moving) being discarded instead of added to drawingPaths, and .<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As an EventListener was used to continually monitor the mouse's state, lines vary in length depending on the mouse's movement speed.`, pics[2]],
        [`Erase<br><br>Allows the user to 'remove' individual, small lines. It packs the erased line into a list containing an indicator pointing to which drawing path it was part of originally. The list is appended to the drawingPaths stack and its original instance is removed.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When the user undoes and pops this list off drawingPaths, it's pushed onto the redo stack and the line is reinserted into its original drawing path as a separate list (to indicate a once erased path). 
            Redo operates similarly; the instance is popped off into drawingPaths and the first erased line found in the indicated drawing path is removed.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This structure results in a linear timeline, ensuring that when whole strokes are removed, their individual lines are also cleared.`, pics[1]],
        [`Reference<br><br>This triggers a prompt for the user to choose an image. That image is displayed in a separate pop up window `, pics[0]]
    ]],
    ['Bottom Toolkit', [
        ['here', pics[2]], 
        ['there', pics[0]]
    ]], 
    ['extra to test alternate', [['extra', pics[1]], ['wow', pics[2]]]]
])

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
    artDesc.classList = 'figure-caption text-center mb-5'
    d.appendChild(artDesc)

    // declare onclick after append to ensure all elements exist first
    // don't directly pass sources, elements etc.., let javascript find them to avoid hardcoding
    document.getElementById('bott').setAttribute('onclick', 'switchPhotos("center", "bott", artPicDesc, pics, "artDesc")')
    document.getElementById('top').setAttribute('onclick', 'switchPhotos("center", "top", artPicDesc, pics, "artDesc")')

    // app description: toolkit ///
    // TODO:

    const alternate = ['left para', 'right para']
    const alternateP = ['r-photo', 'l-photo']
    let i = 0
    // index of the key e.g Toolkit is 0
    let indexKey = 0
    
    // loop through to automatically create the info grids
    // for a list that is not initialized as map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // since already a map, use foreach https://www.w3schools.com/jsref/jsref_map_foreach.asp
    descList.forEach(function(value, key) {
        if (i > 1) {
            i = 0
        }
        newKey = key.replaceAll(' ', '') // remove whitespaces to ensure that the onclick function later works
        // this div encapsulates elements within into the grid
        const appdiv = document.createElement('div')
        appdiv.id = newKey + 'Grid'
        appdiv.classList = 'gridText mb-5'
        // heading for this grid
        let heading = document.createElement('p')
        heading.innerHTML = key
        // div to hold the current description and the button to navigate descriptions
        let paraBtn = document.createElement('div')
        // https://getbootstrap.com/docs/4.0/utilities/flex/ use flex to make div fill whole grid space, and to space out the para from the button
        // to ensure para starts at top and button always anchored to bottom of the GRID using align-items-start
        paraBtn.classList = alternate[i] + ' d-flex align-items-start flex-column m-3 gap-2'
        paraBtn.id = newKey + 'Div'
        // description
        let appDesc = document.createElement('p')
        appDesc.innerHTML = value[0][0]
        appDesc.classList = 'mb-auto' // mb-auto helps ensure button stays at bottom of grid
        appDesc.id = newKey + 'Desc'
        // next button
        let nextButton = document.createElement('button')
        nextButton.innerHTML = 'next'
        nextButton.id = newKey+'Btn'
        //nextButton.classList = 'btn btn-secondary btn-lg'
        nextButton.setAttribute('type', 'button')
        // div that holds and resizes the photo to fit the grid
        let picDiv = document.createElement('div')
        picDiv.classList = alternateP[i] + ' m-2'
        picDiv.id = newKey + 'PhotoDiv'
        // current photo
        let imgGrid = document.createElement('img')
        imgGrid.src = value[0][1]
        imgGrid.id = newKey + 'Photo'
        // again, use classList to store info about current desc
        // use integer to indicate the index of current value for the key
        imgGrid.classList = '0'

        d.appendChild(heading)
        d.appendChild(appdiv)
        document.getElementById(newKey + 'Grid').appendChild(paraBtn)
        document.getElementById(newKey + 'Div').appendChild(appDesc)
        document.getElementById(newKey + 'Div').appendChild(nextButton)
        document.getElementById(newKey + 'Grid').appendChild(picDiv)
        document.getElementById(newKey + 'PhotoDiv').appendChild(imgGrid)
        // passing parameters is tricky. no spaces allowed, so make lists non local instead, and use image id to keep track of current desc
        // despite being a variable, pass descList as a string since it is non local and can be accessed by any function
        // if an item's id is the key, that element is passed instead of the key variable, so important to distinguish name
        console.log(newKey)
        document.getElementById(newKey+'Btn').setAttribute(
            'onclick', 'nextPhoto(' + indexKey +', '+ newKey + 'Photo, '+ newKey +'Desc, descList' +')'
        )
        i = i + 1
        indexKey = indexKey + 1
    })
}

function nextPhoto(key, img, para, list) {
    // since you cannot get the index of a value in a Map through function, loop through instead
    // convert map to array list and only get the row for the key using the key index
    let k = Array.from(list)[key][1]
    console.log(k)
    // imgId is the actual element, so no need to fetch
    console.log(img)
    let currentSlide = parseInt(img.classList[0]) // convert string index to integer
    let newSlide = currentSlide + 1
    if (newSlide > k.length-1) {
        newSlide = 0
    }
    // change image and text! also change classlist to keep track of current slide of information
    img.src = k[newSlide][1]
    para.innerHTML = k[newSlide][0]
    img.classList = newSlide
}

function desc(type) {
    // reset description html to prevent duplication or appending to existing desc
    document.getElementById('desc').innerHTML = ''
    switch(type) {
        case 'second.html':
            artDesc()
            //document.getElementById('underNav').style.borderRadius = '5% / ' + underNavHeight + ''
            break;
        default:
            console.log('unreachable code as other project button unavailable')
    }
    document.getElementById('underNav').style.height = 'auto'
    // automatically reveal description when project selected
    if (descReveal == false) {
        descToggle()
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
        document.getElementById('desc').classList.remove('hideDesc') // show description first so that height auto can work
        document.getElementById('underNav').style.height = 'auto'
    }
    console.log('descReveal: ', descReveal)
    //console.log(document.getElementById('desc').innerHTML)
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
    document.getElementById('underNav').style.height = ''+ underNavHeight + 'px'
    console.log('initial height: ' + String(underNavHeight))
}
