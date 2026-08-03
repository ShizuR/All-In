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
let currentTool = null

// variables for drawing on canvas
const ctx = document.getElementById('drawHere').getContext("2d") // for drawing
let canvas = document.getElementById('drawHere').getBoundingClientRect() // to calculate mouse's actual position inside canvas get position and size of canvas relative to viewport
let drawingPaths = [] // collection of arrays of strokes in one pointer down movement. this is to undo and redo whole strokes when pressing those respective buttons. for erasing need to access individual strokes
let redoPath = [] // collection of strokes hidden by the undo button
let currentPath = null // current stroke
let currentDraw = [] // current path2D instance
let pointerCurrentlyDown = false // to alert when to start creating paths
let pointerMoving = true // to get position of strokes
const canvasEditList = [document.getElementById('undo'), document.getElementById('redo'), document.getElementById('clear')]

// when a new reference photo is chosen, 
// create a new window for that reference
// with the option to zoom in and out
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
    //let scaleImg = 1
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

    /* attempted to use scale so that the image shrunk/zoomed inwards rather than towards a corner, but drag movement was sluggish when shrunken, so stuck with above function
    function imgZoom(inout) {
        if (inout == 'in') {
            scaleImg = scaleImg - (scaleImg * 0.15)
        }
        else if (inout == 'out') {
            scaleImg = scaleImg + (scaleImg * 0.15)
        }
        else {
            // reset image to original width, height, and position using gsap
            scaleImg = 1
            gsap.set("#image", {x: 0, y: 0})
        }
        img.style.scale = scaleImg
    }
    */

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
    zoomIn.innerHTML = 'shrink'
    zoomIn.id = 'inBtn'
    zoomIn.setAttribute('onclick', "imgZoom('in')")
    zoomIn.style = 'position: fixed; top: 0;'

    let zoomOut = ref.document.createElement('button')
    zoomOut.innerHTML = 'zoom'
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
    currentTool = tool
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
// path2D to connect points as it retains paths https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
// for saving canvas try https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore

// TO DO: 

// for changes in the variables drawingPath and redoPaths, make separate functions when buttons are clicked
// since unable to clear specific path2D strokes, clear and redraw canvas everytime
function adjustDrawingPath(path) {
    // path being null indicates adding a stroke to the list
    if (path != null) {
        //console.log(path)
        drawingPaths.push(path)
        if (document.getElementById('undo').classList.contains('disabled')) {
            document.getElementById('undo').classList.remove('disabled')
            document.getElementById('clear').classList.remove('disabled')
        }
    }
    // a null path indicates an undo action, so add the most recent stroke to redoPath
    else {
        let lastPath = drawingPaths[drawingPaths.length - 1]
        //console.log(lastPath)
        if (lastPath[0] == 'erased') {
            console.log('last path detected erased!')
            drawingPaths[lastPath[2]].push(['revived', lastPath[1]])
        }
        console.log('undo chosen. drawingPath:')
        console.log(drawingPaths)
        redoPath.push(drawingPaths.pop())
        console.log('redoPath:')
        console.log(redoPath)
        ctx.clearRect(0, 0, document.getElementById('drawHere').width, document.getElementById('drawHere').height)
        drawingPaths.forEach(reDrawRefresh)
        //console.log(redoPath[redoPath.length - 1][0])
        console.log('drawingPath now:')
        console.log(drawingPaths)
        if (document.getElementById('redo').classList.contains('disabled')) {
            document.getElementById('redo').classList.remove('disabled')
        }
        if (drawingPaths.length < 1) {
            document.getElementById('undo').classList.add('disabled')
            document.getElementById('clear').classList.add('disabled')
        }
    }
}

// use when refreshing the page after a stroke. misses out the parts that are erased
function reDrawRefresh(stroke) {
    //console.log('refresh stroke: ' + stroke)
    if (stroke[0] == 'erased') {
        return
    }
    for (let i = 0; i < stroke.length; i++) {
        if (stroke[i][0] == 'revived') {
            try {
                ctx.stroke(stroke[i][1])
            }
            catch {
                console.log('failed stroke: ' + stroke[i][1])
            }
        }
        else {
            try {
                ctx.stroke(stroke[i])
            }
            catch {
                console.log('failed stroke: ' + stroke[i])
            }
        }
    }
}

// when the redo button is pressed, pop the most recent discarded stroke into drawingPaths
function adjustRedoPath() {
    let r = redoPath.pop()
    if (r[0] == 'erased') {
        console.log('redo detected erased stroke!')
        // use forloop to get the last instance
        for (let i = drawingPaths[r[2]].length - 1; i > 0; i--) {
            console.log(drawingPaths[r[2]][i])
            if (drawingPaths[r[2]][i][0] == 'revived') {
                drawingPaths[r[2]].splice(drawingPaths[r[2]].indexOf(drawingPaths[r[2]][i]), 1)
                break;
            }
        }
    }
    drawingPaths.push(r)
    console.log('redo chosen. drawingPaths:')
    console.log(drawingPaths)
    console.log('redoPaths:')
    console.log(redoPath)
    if (document.getElementById('undo').classList.contains('disabled')) {
        document.getElementById('undo').classList.remove('disabled')
    }
    if (document.getElementById('clear').classList.contains('disabled')) {
        document.getElementById('clear').classList.remove('disabled')
    }
    if (redoPath.length < 1) {
        document.getElementById('redo').classList.add('disabled')
    }
    ctx.clearRect(0, 0, document.getElementById('drawHere').width, document.getElementById('drawHere').height)
    drawingPaths.forEach(reDrawRefresh)
}

function clearCanvas() {
    ctx.clearRect(0, 0, document.getElementById('drawHere').width, document.getElementById('drawHere').height)
    for (let i = 0; i < canvasEditList.length; i++) {
        if (canvasEditList[i].classList.contains('disabled') == false) {
            canvasEditList[i].classList.add('disabled')
        }
    }
    drawingPaths = []
    redoPath = []
    currentPath = null
    currentDraw = []
}

function createPath(x, y) {
    //ctx.beginPath()
    currentPath = new Path2D()
    currentPath.moveTo(x, y)
    redoPath = []
    if (document.getElementById('redo').classList.contains('disabled') == false) {
        document.getElementById('redo').classList.add('disabled')
    }
}

// to calculate actual mouse pos on canvas https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/ 
function mousePos(e) {
    // bounding rect changes when window is resized, so call whenever it changes
    canvas = document.getElementById('drawHere').getBoundingClientRect()
    let x = e.clientX - canvas.left
    let y = e.clientY - canvas.top
    return [x, y]
}

function endDrawing() {
    // if the pointer was still holding when released and was drawing on the canvas
    if (currentPath != null & currentDraw.length > 0) {
        adjustDrawingPath(currentDraw)
        console.log(currentPath)
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
        pointerCurrentlyDown = true

        if (currentTool == 'penBtn') {
            [x, y] = mousePos(e)
            createPath(x, y)
            console.log('draw start')
        }
    }
})

// while dragging, draw line along path
// the same principle applies for both erasing and drawing
document.getElementById('drawHere').addEventListener('pointermove', e => {
    // conditions only apply when the user is holding down 
    if (pointerCurrentlyDown == true) {
        [x, y] = mousePos(e)

        if (currentTool == 'penBtn') {
            // draw movement of line from previous starting position to current position
            currentPath.lineTo(x, y)
            currentPath.closePath()
            ctx.stroke(currentPath)
            currentDraw.push(currentPath)
            currentPath = null
            // create new path at current position
            createPath(x, y)
            console.log('drawing')
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
        else if (currentTool == 'eraseBtn' & drawingPaths.length > 0) {
            // detect whether the pointer is above any visible strokes
            // convert x and y coordinates of pointer to whole number as required format
            // pushing inside the for loop -> infinite loop, so do it outside
            let erased = []
            for (let i = 0; i < drawingPaths.length; i++) {
                for (let j = 0; j < drawingPaths[i].length; j++) {
                    //console.log(drawingPaths[i])
                    //console.log(drawingPaths[i][j])
                    if (drawingPaths[i][j] == 'erased') {
                        break;
                    }
                    else if (drawingPaths[i][j][0] == 'revived') {
                        const isPointInPath = ctx.isPointInStroke(drawingPaths[i][j][1], x, y)
                        if (isPointInPath == true) {
                            // put that path into a tuple to show that it's erased
                            // put i as the index for drawingPaths
                            erased = ['erased', drawingPaths[i][j][1], i]
                            //console.log(erased)
                            drawingPaths[i].splice(drawingPaths[i].indexOf(drawingPaths[i][j]), 1)
                            // push the tuple at the end of the whole list to capture the moment that the stroke was erased
                            ctx.clearRect(0, 0, document.getElementById('drawHere').width, document.getElementById('drawHere').height)
                            drawingPaths.forEach(reDrawRefresh)
                            //console.log(drawingPaths[drawingPaths.length - 1])
                            console.log('removed!')
                        }
                        //break;
                    }
                    else {
                        const isPointInPath = ctx.isPointInStroke(drawingPaths[i][j], x, y)
                        if (isPointInPath == true) {
                            // put that path into a list to show that it's erased
                            // put i as the index for drawingPaths
                            erased = ['erased', drawingPaths[i][j], i]
                            //console.log(erased)
                            drawingPaths[i].splice(drawingPaths[i].indexOf(drawingPaths[i][j]), 1)
                            // push the list at the end of the whole list to capture the moment that the stroke was erased
                            ctx.clearRect(0, 0, document.getElementById('drawHere').width, document.getElementById('drawHere').height)
                            drawingPaths.forEach(reDrawRefresh)
                            //console.log(drawingPaths[drawingPaths.length - 1])
                            console.log('removed!')
                        }
                    }
                    
                }
            }
            if (erased.length > 0) {
                drawingPaths.push(erased)
                //console.log(drawingPaths)
                redoPath = []
                if (document.getElementById('redo').classList.contains('disabled') == false) {
                    document.getElementById('redo').classList.add('disabled')
                }
            }
            
        }
    }
})

// end current line drawing when pointer leaves canvas bounds
document.getElementById('drawHere').addEventListener('pointerleave', e => {
    console.log('pointer left')
    if (pointerCurrentlyDown == true & currentTool == 'penBtn') {
        endDrawing()
    }
    else if (pointerCurrentlyDown == true){
        pointerCurrentlyDown = false
    }
})

// end current line drawing when pointer not on hold
document.getElementById('drawHere').addEventListener('pointerup', e => {
    console.log('pointer stopped')
    if (currentTool == 'penBtn') {
        endDrawing()
    }
    else if (currentTool == 'eraseBtn') {
        pointerCurrentlyDown = false
    }
})