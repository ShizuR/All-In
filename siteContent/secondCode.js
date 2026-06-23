// import returns CORS error, so run in docker
//import { gsap } from "gsap";
//import Draggable from "gsap/Draggable";
const msg = new BroadcastChannel('frame')
const toolList = ['eraseBtn', 'penBtn']

// drag and drop using gsap, an animation framework
// PROBLEM HERE
gsap.registerPlugin(Draggable)
gsap.Draggable.create('#toolGroup')

function sendmsg() {
    msg.postMessage({type: 'change'});
    if (document.getElementById('changeButtText').innerText == 'Enlarge') {
        document.getElementById('changeButtText').innerText = 'Shrink';
    }
    else {
        document.getElementById('changeButtText').innerText = 'Enlarge';
    }
    
}

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
}