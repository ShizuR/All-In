// this code can run without docker
// used to customize the map
import * as route from './thirdCode.js';

let currentPick = 'home';
const allChoices = ['home', 'alterC', 'alterP'];
const allCountries = ['wales', 'northernI', 'scotland'];
const prisonerColumns = ['Name', 'Age', 'Gender', 'Crime', 'Danger Level'];

// since the svg separates england into smaller areas, group them into the england class and treat them as one entity
document.querySelectorAll('.england').forEach(function(e) {
    // hovering over england regions
    e.addEventListener('mouseover', e => {
        // change header
        if (e.target.classList.contains(e.target.id + 'Hover')) {
            changeHeader('England');
            document.querySelectorAll('.england').forEach(function(f){
                f.setAttribute('style', 'fill: rgb(69, 162, 205)');
            })
        }
    })

    e.addEventListener('mouseout', e => {
        if (e.target.classList.contains(e.target.id + 'Hover')) {
            changeHeader('Prisoners');
            document.querySelectorAll('.england').forEach(function(f){
                f.setAttribute('style', 'fill: rgb(100, 191, 233)');
            })
        }
    })
    
});

// on hover countries
document.querySelectorAll('.country').forEach(function(e) {
    e.addEventListener('mouseover', e => {
        if (e.target.classList.contains(e.target.id + 'Hover')) {
            changeHeader(document.getElementById(e.target.id).getAttribute('title'));
        }
    })

    e.addEventListener('mouseout', e => {
        if (e.target.classList.contains(e.target.id + 'Hover')) {
            changeHeader('Prisoners');
        }
    })
});

function changeHeader(country) {
    document.getElementById('dataHeader').innerHTML = country;
};

function choiceClicked(name) {
    currentPick = name;
    if (currentPick != 'home') {
        allCountries.forEach(e => {
            if (document.getElementById(e).classList.contains(e + 'Hover') == true) {
                document.getElementById(e).classList.remove(e + 'Hover')
            }
        })
        document.querySelectorAll('.england').forEach(function(e) {
            if (e.classList.contains('englandHover') == true) {
                e.classList.remove('englandHover')
            }
        })
    }
    else {
        allCountries.forEach(e => {
            if (document.getElementById(e).classList.contains(e + 'Hover') == false) {
                document.getElementById(e).classList.add(e + 'Hover')
            }
        })
        document.querySelectorAll('.england').forEach(function(e) {
            if (e.classList.contains('englandHover') == false) {
                e.classList.add('englandHover')
            }
        })
    }
    allChoices.forEach(e => {
        document.getElementById(e).removeAttribute('disabled');
    });
    document.getElementById(name).setAttribute('disabled', 'True');
    if (name == 'home') {
        document.getElementById('dataHeader').innerText = 'Prisoners';
        
    }
    else {
        document.getElementById('dataHeader').innerText = document.getElementById(name).innerText;
    }
}

function changeData(mode) {
    // display data as a table
    let tb = document.createElement("TABLE");
    document.body.appendChild(tb);

    switch(mode) {
        case 'allC':
            let data = route.getC();
            let head = document.createElement("TR");
            head.setAttribute("id", "myTr");
            document.getElementById("myTable").appendChild(head);

            data.forEach(e => {
            })
    }
}

document.body.classList.add("disableScroll");