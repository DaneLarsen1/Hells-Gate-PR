async function newFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('input [name="lift-title"]').value;
    const content = document.querySelector('#lift-content').value;
    
    const response = await fetch(`/api/lift/userLifts`, {    //* is this lifts or posts????
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-lift-form').addEventListener('submit', newFormHandler);