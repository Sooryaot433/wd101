const dobInput = document.getElementById('dob');
const today = new Date();
const minYear = today.getFullYear() - 55;
const maxYear = today.getFullYear() - 18;
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
dobInput.max = `${maxYear}-${month}-${day}`;
dobInput.min = `${minYear}-${month}-${day}`;
renderTable(); // Render table on page load

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !email || !password || !dob || !terms) {
        alert('Please fill in all fields and accept the Terms and Conditions.');
        return;
    }

    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years.');
        return;
    }

    const user = {
        name,
        email,
        password,
        dob,
        terms
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('registerForm').reset();
    renderTable(); // Render table after each submission
});

function renderTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Always show the table header row
    let table = '<table>';
    table += '<caption style="font-size:1.5em;"><b>Entries</b></caption>';
    table += '<tr><th>Name</th><th>Email</th><th>Password</th><th>DOB</th><th>Accepted terms?</th></tr>';

    if (users.length === 0) {
        // No users, just show the header row and caption
        table += '</table>';
        document.getElementById('tableContainer').innerHTML = table;
        return;
    }

    users.forEach(user => {
        table += `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.terms ? 'True' : 'False'}</td>
        </tr>`;
    });

    table += '</table>';
    document.getElementById('tableContainer').innerHTML = table;
}