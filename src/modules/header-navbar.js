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

}, 250);