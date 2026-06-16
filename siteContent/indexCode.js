function desc(type) {
    switch(type) {
        case 'second.html':
            document.getElementById('desc').innerHTML = 'An online art application for vector based drawings. users are able to: change colour, erase vectors, and change brush size.'
            break;
        default:
            document.getElementById('desc').innerHTML = ''
    }
}