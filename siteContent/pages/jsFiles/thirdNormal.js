// this code can run without docker
// used to customize the map
let currentPick = 'home';
const allChoices = ['home', 'alterC', 'alterP']

// since the svg separates england into smaller areas, group them into the england class and treat them as one entity
document.querySelectorAll('.england').forEach(function(e) {
    // hovering over england regions
    e.addEventListener('mouseover', m => {
        // change header
        changeHeader('England');
        document.querySelectorAll('.england').forEach(function(f){
            f.setAttribute('style', 'fill: rgb(69, 162, 205)');
        })
    })

    e.addEventListener('mouseout', m => {
        changeHeader('Prisoners');
        document.querySelectorAll('.england').forEach(function(f){
            f.setAttribute('style', 'fill: rgb(100, 191, 233)');
        })
    })
});

// change header on hover
document.querySelectorAll('.country').forEach(function(e) {
    e.addEventListener('mouseover', e => {
        changeHeader(document.getElementById(e.target.id).getAttribute('title'));
    })

    e.addEventListener('mouseout', e => {
        changeHeader('Prisoners');
    })
});

function changeHeader(country) {
    document.getElementById('dataHeader').innerHTML = country;
};

function choiceClicked(name) {
    currentPick = name;
    allChoices.forEach(e => {
        document.getElementById(e).removeAttribute('disabled');
    });
    document.getElementById(name).setAttribute('disabled', 'True');
}


document.body.classList.add("disableScroll");