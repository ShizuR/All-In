// this code can run without docker
// used to customize the map
import * as route from './thirdCode.js';

let currentPick = 'home';
const allChoices = ['home', 'alterC', 'alterP'];
const allCountries = ['wales', 'northernI', 'scotland'];
const criminalColumns = ['Name', 'Age', 'Gender', 'Crime', 'Danger Level', 'Prison'];
let currentClick = 'Prisoners';

// since the svg separates england into smaller areas, group them into the england class and treat them as one entity
document.querySelectorAll('.england').forEach(function(e) {
    // hovering over england regions
    e.addEventListener('mouseover', e => {
        // change div
        if (e.target.classList.contains(e.target.id + 'Hover')) {
            document.querySelectorAll('.england').forEach(function(f){
                f.setAttribute('style', 'fill: rgb(69, 162, 205)');
            })
        }
    })

    e.addEventListener('mouseout', e => {
        if (e.target.classList.contains(e.target.id + 'Hover')) {
            document.querySelectorAll('.england').forEach(function(f){
                f.setAttribute('style', 'fill: rgb(100, 191, 233)');
            })
        }
    })

    e.addEventListener('click', e=> {
        if (currentPick == 'home') {
            if (currentClick != 'England') {
                changeHeader('England');
                changeDisplayData('England');
                currentClick = 'England';
            }
            else {
                currentClick = 'Prisoners';
                changeHeader('Prisoners');
                changeDisplayData('allC');
            }
        }
        
    })
    
});

// on hover countries
document.querySelectorAll('.country').forEach(function(e) {

    e.addEventListener('click', e=> {
        if (currentPick == 'home') {
            if (currentClick != document.getElementById(e.target.id).getAttribute('title')) {
                changeHeader(document.getElementById(e.target.id).getAttribute('title'));
                changeDisplayData(document.getElementById(e.target.id).getAttribute('title'));
                currentClick = document.getElementById(e.target.id).getAttribute('title');
            }
            else {
                currentClick = 'Prisoners';
                changeHeader('Prisoners');
                changeDisplayData('allC');
            }
            console.log('click')
        }
        
    })
});

function changeHeader(country) {
    document.getElementById('dataHeader').innerHTML = country;
};

function choiceClicked(name) {
    document.getElementById('data').innerHTML = '';
    currentPick = name;
    // adjust hover in classlist
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
        changeDisplayData('allC')
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

    // disable and enable buttons
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
};

// either get all criminals or criminals by country
function changeDisplayData(mode) {
    document.getElementById('data').innerHTML = ''; // clear div
    let data = null;

    // get the data and insert values
    switch(mode) {
        // all criminals
        case 'allC':
            data = route.getC();
            break;
        
        // get prisoners by country
        default:
            data = route.getCC(mode);
    }

    console.log(data)

    // display data as a table
    let tb = document.createElement("TABLE");
    tb.setAttribute("id", "myTable");
    document.getElementById('data').appendChild(tb);
    let head = document.createElement("TR");
    head.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(head);
    // instantiate the column names
    criminalColumns.forEach(e => {
        let d = document.createElement('TH');
        d.appendChild(document.createTextNode(e));
        document.getElementById('myTr').appendChild(d)
    });
    // access returned values from the promise
    data.then(e => {
        // loop through objects in the array
        for (let i = 0; i < e.length; i++) {
            let row = document.getElementById("myTable").insertRow();

            row.insertCell().innerHTML = e[i].name;
            row.insertCell().innerHTML = e[i].age;
            row.insertCell().innerHTML = e[i].gender;
            row.insertCell().innerHTML = e[i].crime;
            row.insertCell().innerHTML = e[i].danger_lvl;
            row.insertCell().innerHTML = e[i].prison;

            document.getElementById('myTable').appendChild(row)
        }
    })
}

function showForm() {
    document.getElementById('data').innerHTML = '';
}

document.body.classList.add("disableScroll");
changeDisplayData('allC');
document.getElementById('home').addEventListener('click', e => {choiceClicked('home')});
document.getElementById('alterC').addEventListener('click', e => {choiceClicked('alterC')});
document.getElementById('alterP').addEventListener('click', e => {choiceClicked('alterP')});