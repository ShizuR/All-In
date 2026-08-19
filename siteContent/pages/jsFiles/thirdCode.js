// connect CRUD operations to backend

// await needs to be used inside async function
// create customer

async function createC(prison_id, Name, Age, Gender, Crime, danger_lvl){
        const response = await fetch('http://localhost:8888/criminals/'+prison_id+'/'+Name+'/'+Age+'/'+Gender+'/'+Crime+'/'+danger_lvl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prison_id: prison_id, Name: Name, Age: Age, Gender: Gender, Crime: Crime, danger_lvl: danger_lvl }),
    })
    const now = await response.json();
};

async function getC(){ // use entire url as backend and frontend on different ports
    const response = await fetch('http://localhost:8888/criminals')
    const data = await response.json();
    console.log(data)
    // to access a specific value for a criminal
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
    }
    document.getElementById('data').innerText = String(data[1].crime)
};

async function updateC(id, prison_id, Name, Age, Gender, Crime, danger_lvl){
        const response = await fetch('http://localhost:8888/criminals/'+id+'/'+prison_id+'/'+Name+'/'+Age+'/'+Gender+'/'+Crime+'/'+danger_lvl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, prison_id: prison_id, Name: Name, Age: Age, Gender: Gender, Crime: Crime, danger_lvl: danger_lvl }),
    })
    //const now = await response.json();
    //console.log(now);
};

async function deleteC(id){
        const response = await fetch('http://localhost:8888/criminals/'+id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
    })
};

getC();
deleteC(1);
getC();