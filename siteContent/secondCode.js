// import returns CORS error, so run in docker
// look into canvas API for drawing?
// do error messages when an action is not available?
// redo undo?
// eraser
// save
// tutorial when press a button on tool kit
// layers?

const msg = new BroadcastChannel('frame')
const toolList = ['eraseBtn', 'penBtn']
const fileRead = new FileReader()
const newRef = document.getElementById('refBtn')

// variables for drawing on canvas
const ctx = document.getElementById('drawHere').getContext("2d") // for drawing
const canvas = document.getElementById('drawHere').getBoundingClientRect() // to calculate mouse's actual position inside canvas get position and size of canvas relative to viewport
let drawingPaths = [] // collection of all strokes
let currentPath = null // current stroke
let currentDraw = [] // current path2D instance
let pointerCurrentlyDown = false // to alert when to start creating paths
let pointerMoving = true // to get position of strokes

// when a new reference photo is chosen, 
// create a new window for that reference with adjustable dimensions 
// and the option to zoom in
// inspiration from
// https://medium.com/@KeithAlpichi/vanilla-js-building-an-image-selector-and-image-previewer-151cddc939e
fileRead.onload = e => {
    let ref = window.open("", "", "width=400,height=400")

    let boot = ref.document.createElement('link')
    boot.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    boot.rel = 'stylesheet'
    boot.integrity = "sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
    boot.crossOrigin = 'anonymous'
    ref.document.querySelector('head').appendChild(boot)
    
    let code = ref.document.createElement('script')
    // used to use var for the height and width variables 
    // -> don't use as it is global, therefore doesn't instantiate when opening new windows and leads to them being set to 0
    // additionally, since image may load at a later time than the variables (which would then be set to 0), instantiate them as 0 first
    // then assign them the original dimensions when the function is called to ensure that the page is loaded before code runs
    code.innerHTML = `
    let img = document.getElementById('image')
    console.log(img)
    let newWidth = 0
    let newHeight = 0
    let loadedScripts = 0

    function imgZoom(inout) {
        if (newWidth == 0) {
            newWidth = img.naturalWidth
            newHeight = img.naturalHeight
        }

        if (inout == 'in') {
            newWidth = newWidth - (newWidth * 0.15)
            newHeight = newHeight - (newHeight * 0.15)
        }
        else if (inout == 'out') {
            newWidth = newWidth + (newWidth * 0.15)
            newHeight = newHeight + (newHeight * 0.15)
        }
        else {
            // reset image to original width, height, and position using gsap
            newWidth = img.naturalWidth
            newHeight = img.naturalHeight
            gsap.set("#image", {x: 0, y: 0})
        }
        img.width = String(Math.floor(newWidth))
        img.height = String(Math.floor(newHeight))
        console.log(img.height)
        console.log(img.width)
    }

    function checkLoadedGsap(text) {
        loadedScripts = loadedScripts + 1
        console.log(text)
        if (loadedScripts == 2) {
            loadGsap()
        }
    }

    function loadGsap() {
        console.log('loading gsap draggable')
        gsap.registerPlugin(Draggable)
        Draggable.create('#image', {zIndexBoost:false})
    }
    `
    // the onload and DOMcontentloaded already fired before script fully loaded, so those events won't work in script
    // so can use document.readystate instead https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
    // but gsap cdn imports execute after this main script
    // so ensure imports loaded first by making them both call same function checkLoadedGsap()
    let underDiv = ref.document.createElement('div')
    underDiv.id = 'imgUnder'
    underDiv.style = 'position: relative;'
    ref.document.querySelector('body').appendChild(underDiv)
    
    let reference = ref.document.createElement('IMG')
    reference.setAttribute('src', e.target.result) 
    reference.setAttribute('id', 'image')
    reference.style = 'position: absolute;'
    ref.document.getElementById('imgUnder').appendChild(reference)
    
    // onclick not created yet, so use setAtribute to automatically create
    let zoomIn = ref.document.createElement('button')
    zoomIn.innerHTML = 'in'
    zoomIn.id = 'inBtn'
    zoomIn.setAttribute('onclick', "imgZoom('in')")
    zoomIn.style = 'position: fixed; top: 0;'

    let zoomOut = ref.document.createElement('button')
    zoomOut.innerHTML = 'out'
    zoomOut.id = 'outBtn'
    zoomOut.setAttribute('onclick', "imgZoom('out')")
    zoomOut.style = 'position: fixed; top: 30;'

    let reset = ref.document.createElement('button')
    reset.innerHTML = 'reset'
    reset.id = 'resBtn'
    reset.setAttribute('onclick', "imgZoom('reset')")
    reset.style = 'position: fixed; top: 60;'

    // gsap cdn imports load after the embedded script in the html
    // only execute loadgsap after these scripts load
    let gsapImport = ref.document.createElement('script')
    gsapImport.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js'
    gsapImport.setAttribute('onload', 'checkLoadedGsap("gsap import")')
    let dragImport = ref.document.createElement('script')
    dragImport.src = 'https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/Draggable.min.js'
    dragImport.setAttribute('onload', 'checkLoadedGsap("drag import")')

    ref.document.querySelector('div').appendChild(zoomIn)
    ref.document.querySelector('div').appendChild(zoomOut)
    ref.document.querySelector('div').appendChild(reset)
    ref.document.querySelector('body').appendChild(gsapImport)
    ref.document.querySelector('body').appendChild(dragImport)
    ref.document.querySelector('body').appendChild(code)
}

newRef.addEventListener('change', e => {
    const file = e.target.files[0]
    fileRead.readAsDataURL(file) // get the url of the file
    document.getElementById('refBtn').value = null // resets value to allow choosing same photo in succession
})

function toolClick(tool) {
    // deactivate the other buttons so they don't appear active
    for (let i = 0; i < toolList.length; i++) {
        if (tool != toolList[i]) {
            let currentBtn = document.getElementById(toolList[i]).classList
            if (currentBtn.contains('active')) {
                currentBtn.remove('active')
            }
        }
    }
    // make the pressed button appear active
    document.getElementById(tool).classList.add('active')
};

function sendmsg() {
    msg.postMessage({type: 'change'});
    if (document.getElementById('changeButtText').innerText == 'Enlarge window') {
        document.getElementById('changeButtText').innerText = 'Shrink window'
    }
    else {
        document.getElementById('changeButtText').innerText = 'Enlarge window'
    }
    
};

// allow the user to draw using canvas API path2D //
// get current mouse position to mark the start of drawing https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
// path2D to connect points https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D

// TO DO: 
// 

function createPath(x, y) {
    ctx.beginPath()
    currentPath = new Path2D()
    currentPath.moveTo(x, y)
}

// to calculate actual mouse pos on canvas https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/ 
function mousePos(e) {
    let x = e.pageX - canvas.left
    let y = e.pageY - canvas.top
    return [x, y]
}

function endDrawing() {
    // if the pointer was still holding when released and was drawing on the canvas
    if (currentPath != null & currentDraw.length > 0) {
        drawingPaths.push(currentDraw)
        console.log('draw end')
        // reset variables
        currentDraw = []
        currentPath = null
        console.log('endDrawing called')
    }
    // these below statements prevent clogging drawingPath with empty strokes
    // this one occurs when you simply click the canvas
    else if (currentDraw.length == 0) {
        console.log('empty path -> nothing appended to drawingPaths')
    }
    else {
        console.log('pointer released but was not drawing -> nothing appended to drawingPaths')
    }
    console.log(drawingPaths)
    pointerCurrentlyDown = false
}

// use pointer down instead of mouse down to allow other devices such as pens to interact with canvas
document.getElementById('drawHere').addEventListener('pointerdown', e => {
    // if this is the start of pointer down, create new draw path
    if (pointerCurrentlyDown != true) {
        let [x, y] = mousePos(e)
        createPath(x, y)
        pointerCurrentlyDown = true
        console.log('draw start')
    }
})

// while dragging, draw line along path
document.getElementById('drawHere').addEventListener('pointermove', e => {
    if (pointerCurrentlyDown == true) {
        // draw movement of line from previous starting position to current position
        let [x, y] = mousePos(e)
        currentPath.lineTo(x, y)
        currentPath.closePath()
        ctx.stroke(currentPath)
        currentPath = null
        currentDraw.push(currentPath)
        // create new path at current position
        createPath(x, y)
        console.log('drawing')
    }
})

// end current line drawing when pointer leaves canvas bounds
document.getElementById('drawHere').addEventListener('pointerleave', e => {
    console.log('pointer left')
    if (pointerCurrentlyDown == true) {
        endDrawing()
    }
})

// end current line drawing when pointer not on hold
document.getElementById('drawHere').addEventListener('pointerup', e => {
    console.log('pointer stopped')
    endDrawing()
})