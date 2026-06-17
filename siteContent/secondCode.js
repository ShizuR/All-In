const msg = new BroadcastChannel('frame')

function sendmsg() {
    msg.postMessage({type: 'change'});
    if (document.getElementById('changeButtText').innerText == 'Enlarge') {
        document.getElementById('changeButtText').innerText = 'Shrink';
    }
    else {
        document.getElementById('changeButtText').innerText = 'Enlarge';
    }
    
}