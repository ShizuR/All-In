let frameState = 'max'
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

const frameTime = {duration: 1000, iterations: 1}

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
        document.getElementById('fr').className = 'fullScreen'
        frameState = 'min'
        //document.getElementById('b').appendChild(minButt)
    }
    else {
        //document.getElementById('fr').animate(frameMin, frameTime)
        document.getElementById('fr').className = 'containFrame'
        frameState = 'max'
        //document.getElementById('b').removeChild(minButt)
    }
}

msg.onmessage = (event) => {
  if (event.data.type === 'change') {
    frameResize()
  }
};