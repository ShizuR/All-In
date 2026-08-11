// connect CRUD operations to backend

// await needs to be used inside async function
// create customer

async function create(nameP, emailP){
        const response = await fetch('/'+nameP+'/'+emailP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameP, email: emailP }),
    })
};

async function get(){ // use entire url as backend and frontend on different ports
    const response = await fetch('http://localhost:8888/customers')
    const data = await response.json();
    console.log(data);
};

get();
create('tester', 'test@example.com');