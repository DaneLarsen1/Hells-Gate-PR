async function newFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('#lift-title').value;
    const liftWeight = document.querySelector('#lift-weight').value;
    const liftUnit = document.querySelector('#unit').value;

    console.log('Title', title);
    console.log('Weight', liftWeight);
    console.log('Unit', liftUnit);

    const description = {
        weight: liftWeight,
        unit: liftUnit
    };

    console.log('Description', description)
    
    const response = await fetch('/api/lift/userLifts', {    //* is this lifts or posts????
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(response)
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};



document.querySelector('.new-lift-form').addEventListener('submit', newFormHandler);