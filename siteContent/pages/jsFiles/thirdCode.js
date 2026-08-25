// connect CRUD operations to backend using restful apis
// await needs to be used inside async function

// criminals

export async function createC(prison_id, Name, Age, Gender, Crime, danger_lvl){
    const response = await fetch('http://localhost:8888/criminals/'+prison_id+'/'+Name+'/'+Age+'/'+Gender+'/'+Crime+'/'+danger_lvl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prison_id: prison_id, Name: Name, Age: Age, Gender: Gender, Crime: Crime, danger_lvl: danger_lvl }),
    })
    let now = await response.json();
    now = JSON.stringify(now)
    alert(now)
};

export async function getC(){ // use entire url as backend and frontend on different ports
    const response = await fetch('http://localhost:8888/criminals')
    const data = await response.json();
    console.log(data)
    // to access a specific value for a criminal
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
    }
    return data;
};

export async function getCC(country) {
    const response = await fetch('http://localhost:8888/criminals/' + country, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: country }),
    })
    const data = await response.json();
    console.log(data)
    return data;
}

export async function searchC(text) {
    const response = await fetch('http://localhost:8888/criminals/' + text, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text }),
    })
    const data = await response.json();
    console.log(data)
    return data;
}

export async function updateC(id, prison_id, Name, Age, Gender, Crime, danger_lvl){
        const response = await fetch('http://localhost:8888/criminals/'+id+'/'+prison_id+'/'+Name+'/'+Age+'/'+Gender+'/'+Crime+'/'+danger_lvl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, prison_id: prison_id, Name: Name, Age: Age, Gender: Gender, Crime: Crime, danger_lvl: danger_lvl }),
    })
    let now = await response.json();
    now = JSON.stringify(now)
    alert(now)
};

export async function deleteC(id){
        const response = await fetch('http://localhost:8888/criminals/'+id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
    })
    let now = await response.json();
    now = JSON.stringify(now)
    alert(now)
};

// prisons
export async function createP(Name, Country, security_lvl, max_prisoners, prisoner_count, Gender){
        const response = await fetch('http://localhost:8888/prisons/'+Name+'/'+Country+'/'+security_lvl+'/'+max_prisoners+'/'+prisoner_count+'/'+Gender, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: Name, Country: Country, security_lvl: security_lvl, max_prisoners: max_prisoners, prisoner_count: prisoner_count, Gender: Gender }),
    })
    const now = await response.json();
};

export async function getP(){
    const response = await fetch('http://localhost:8888/prisons')
    const data = await response.json();
    return data
};

export async function getPSingle(name) {
    const response = await fetch('http://localhost:8888/prisons/' + name, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name }) // ensure the key matches the constant retrieved in thirdbackendscripts
    })
    const data = await response.json()
    return data
};

export async function updateP(prison_id, Name, Country, security_lvl, max_prisoners, prisoner_count, Gender){
        const response = await fetch('http://localhost:8888/prisons/'+prison_id+'/'+Name+'/'+Country+'/'+security_lvl+'/'+max_prisoners+'/'+prisoner_count+'/'+Gender, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prison_id: prison_id, Name: Name, Country: Country, security_lvl: security_lvl, max_prisoners: max_prisoners, prisoner_count: prisoner_count, Gender: Gender }),
    })
};

export async function deleteP(prison_id){
        const response = await fetch('http://localhost:8888/prisons/'+prison_id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prison_id: prison_id }),
    })
};

