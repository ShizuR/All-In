const msg = new BroadcastChannel('frame')

function sendmsg() {
    msg.postMessage({type: 'change'})
}