// connect CRUD operations to backend

// await needs to be used inside async function
// create customer

async function create(nameP, emailP){
        const response = await fetch('http://localhost:8888/customers/'+nameP+'/'+emailP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameP, email: emailP }),
    })
    //const now = await response.json();
    //console.log(now);
};

async function get(){ // use entire url as backend and frontend on different ports
    const response = await fetch('http://localhost:8888/customers')
    const data = await response.json();
    console.log(data);
};

async function update(nameP, emailP, idP){
        const response = await fetch('http://localhost:8888/customers/'+nameP+'/'+emailP+'/'+idP, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameP, email: emailP, id: idP }),
    })
    //const now = await response.json();
    //console.log(now);
};

get();
create('tester', 'test@example.com');
get();
update('updated', 'updated@email.com', 4);
get();