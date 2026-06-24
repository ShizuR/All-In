// import returns CORS error, so run in docker

const msg = new BroadcastChannel('frame')
const toolList = ['eraseBtn', 'penBtn']

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