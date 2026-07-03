// import returns CORS error, so run in docker
// look into canvas API for drawing?
// do error messages when an action is not available?
// redo undo?
// eraser
// save
// tutorial when press a button on tool kit

const msg = new BroadcastChannel('frame')
const toolList = ['eraseBtn', 'penBtn']
const fileRead = new FileReader()
const newRef = document.getElementById('refBtn')

// GSAP IMPORTS LOADING BUT GSAP STILL NOT DEFINED??

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
            newWidth = img.naturalWidth
            newHeight = img.naturalHeight
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
        Draggable.create('#image')
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
    zoomIn.style = 'position: fixed;'

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