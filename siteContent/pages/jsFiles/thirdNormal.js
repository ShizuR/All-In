// this code can run without docker
// used to customize the map
import * as route from './thirdCode.js';

let currentPick = 'home';
const allChoices = ['home', 'alterC', 'alterP'];
const allCountries = ['wales', 'northernI', 'scotland'];
const criminalColumns = ['Name', 'Age', 'Gender', 'Crime', 'Danger Level', 'Prison'];
let currentClick = 'Prisoners';
const dataDiv = document.getElementById('data');
let currentForm = null;

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
                changeDisplayData('England', dataDiv);
                currentClick = 'England';
            }
            else {
                currentClick = 'Prisoners';
                changeHeader('Prisoners');
                changeDisplayData('allC', dataDiv);
            }
        }
        
    })
    
});

// on click countries
document.querySelectorAll('.country').forEach(function(e) {

    e.addEventListener('click', e=> {
        if (currentPick == 'home') {
            if (currentClick != document.getElementById(e.target.id).getAttribute('title')) {
                changeHeader(document.getElementById(e.target.id).getAttribute('title'));
                changeDisplayData(document.getElementById(e.target.id).getAttribute('title'), dataDiv);
                currentClick = document.getElementById(e.target.id).getAttribute('title');
            }
            else {
                currentClick = 'Prisoners';
                changeHeader('Prisoners');
                changeDisplayData('allC', dataDiv);
            }
            console.log('click')
        }
        
    })
});

function changeHeader(country) {
    document.getElementById('dataHeader').innerHTML = country;
};

function choiceClicked(name) {
    dataDiv.innerHTML = '';
    currentPick = name;
    currentForm = null;
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
        showForm();
    }
    else {
        changeDisplayData('allC', dataDiv)
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
function changeDisplayData(mode, div) {
    div.innerHTML = ''; // clear div
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
    div.appendChild(tb);
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

function clickFormBtn(btn) {
    if (btn == 'selectB' & currentForm != 'selectB') {
        currentForm = 'selectB'
        // make search bar
        changeDisplayData('allC', document.getElementById('belowDiv'));
    }
    else if (btn == 'createB' & currentForm != 'createB') {
        currentForm = 'createB'
        document.getElementById('belowDiv').innerHTML = '';
        makeForm('create');
    }
    
}

function makeForm(mode) {
    if (mode == 'create') {
        let form = `
        <br>
        <form id='createCrim'>
            <fieldset>
                <legend>Create Criminal</legend>
                <p>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="Name" maxlength="25" required/>
                </p>
                <p>
                    <label for="age">Age (18-100):</label>
                    <input type='number' id="age" name="Age" min='18' max='100' required></textarea>
                </p>
                <p>
                    <label for="gender">Gender:</label>
                    <select id='gender' name='Gender' required>
                        <option value='F'>Female</option>
                        <option value='M'>Male</option>
                    </select>
                </p>
                <p>
                    <label for='crime'>Crime:</label>
                    <input type='text' id='crime' name='Crime' maxlength="25" required></textarea>
                </p>
                <p>
                    <label for='danger'>Danger level:</label>
                    <select id='danger' name='danger_lvl' required>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                </p>
                <input type="submit" value="Complete">
            </fieldset>
        </form>
        `
        const formP = `
        <br>
        <form id='choosePrison'>
            <fieldset>
                <Legend>Choose Prison</Legend>
                <p>
                    <label for="prison">Prison:</label>
                    <select id='prison' name='prison_id' required>
                    </select>
                </p>
                <input type="submit" value="Submit All">
            </fieldset>
        </form>
        `
        let otherDiv = document.createElement('div')
        otherDiv.id = 'prisonDiv'
        document.getElementById('belowDiv').insertAdjacentHTML('beforeend', form);
        document.getElementById('belowDiv').appendChild(otherDiv)

        document.getElementById('createCrim').addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById('prisonDiv').innerHTML = '';

            // retrieve form data 
            const formData = new FormData(document.getElementById('createCrim'))
            document.getElementById('prisonDiv').insertAdjacentHTML('beforeend', formP);

            // make prison drop down menu
            let prisons = route.getP()
            // make each prison an option as a drop down menu
            // only return prisons danger level >= criminal danger level
            prisons.then(e => {
                for (let i = 0; i < e.length; i++) {
                    if (e[i].security_lvl >= formData.get('danger_lvl')) {
                        let option = document.createElement('option')
                        option.setAttribute('value', e[i].prison_id)
                        option.innerHTML = e[i].name
                        document.getElementById('prison').appendChild(option)
                    }
                }
            })

            document.getElementById('choosePrison').addEventListener('submit', (event) => {
                event.preventDefault()
                const prisonData = new FormData(document.getElementById('choosePrison'))
                formData.append('prison_id', prisonData.get('prison_id'))
                sendData('create', formData)
            })
        });

        // if values change before submitting, alert
    }
}

// https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript#building_a_formdata_object_manually
function sendData(mode, values){
    if (mode == 'create') {
        route.createC(values.get('prison_id'), values.get('Name'), values.get('Age'), values.get('Gender'), values.get('Crime'), values.get('danger_lvl'));
    }
}

function showForm() {
    dataDiv.innerHTML = '';
    let d = document.createElement('div');
    let createB = document.createElement('button');
    createB.innerHTML = 'Create Criminal';
    createB.id = 'createB';
    createB.style.marginRight = '5px';
    createB.addEventListener('click', e => {clickFormBtn('createB')});

    let selectB = document.createElement('button');
    selectB.innerHTML = 'Select Criminal';
    selectB.id = 'selectB';
    selectB.addEventListener('click', e => {clickFormBtn('selectB')});

    let belowDiv = document.createElement('div');
    belowDiv.id = 'belowDiv';

    d.append(createB, selectB, belowDiv);
    dataDiv.appendChild(d);
}

document.body.classList.add("disableScroll");
changeDisplayData('allC', dataDiv);
document.getElementById('home').addEventListener('click', e => {choiceClicked('home')});
document.getElementById('alterC').addEventListener('click', e => {choiceClicked('alterC')});
document.getElementById('alterP').addEventListener('click', e => {choiceClicked('alterP')});