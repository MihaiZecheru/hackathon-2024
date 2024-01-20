function register(username, password, confirm_password) {
    const uuid = window.crypto.randomUUID();
    fetch(`https://lifetracker-mads-default-rtdb.firebaseio.com/users/${uuid}.json`, {
        method: 'PUT',
        body: JSON.stringify({
            username,
            password,
            uuid
        })
    }).then(() => {
        fetch("/login",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(() => {
            window.location.href = "/";
        })
    })
}

function login(username, password) {
    fetch("/login",  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then((r) => r.text())
    .then((d) => {
        console.log()
        if (d == "Login successful") {
            window.location.href = "/";
        } else {
            document.getElementById("login-username-box").value = "";
            document.getElementById("login-password-box").value = "";
        }
    });
}

setTimeout(() => {

    document.getElementById("modalbtn").addEventListener("click", () => {
        new mdb.Modal(document.getElementById('exampleModal')).show();
    })
    
    const dropdown = document.getElementById('navbarDropdown');
    dropdown.addEventListener("click", () => {
        new mdb.Dropdown(dropdown).toggle();
    });

    const register_tab = document.getElementById('register-tab');
    register_tab.addEventListener("click", () => {
        new mdb.Tab(register_tab).show();
    });

    const login_tab = document.getElementById('login-tab');
    login_tab.addEventListener("click", () => {
        new mdb.Tab(login_tab).show();
    });

    const register_redirect = document.getElementById("register-redirect");
    register_redirect.addEventListener("click", () => {
        new mdb.Tab(register_tab).show();
    });

    const login_redirect = document.getElementById("login-redirect");
    login_redirect.addEventListener("click", () => {
        new mdb.Tab(login_tab).show();
    });

    const register_btn = document.getElementById("register-btn");
    register_btn.addEventListener("click", () => {
        register(
            document.getElementById("register-username-box").value,
            document.getElementById("register-password-box").value,
            document.getElementById("register-password-confirm-box").value
        )
    });

    const login_btn = document.getElementById("login-btn");
    login_btn.addEventListener("click", () => {
        login(
            document.getElementById("login-username-box").value,
            document.getElementById("login-password-box").value
        )
    });

}, 250);