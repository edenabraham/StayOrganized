const base = "http://localhost:8083/api/";

    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const add = document.getElementById("add");
    const password = document.getElementById("password");
    const passwordAgain = document.getElementById("passwordAgain");
    const message = document.getElementById("message");
    const exists = document.getElementById("exists");

    username.addEventListener("keyup", e=>{
        fetch(base + "username_available/"+username.value).then(r => r.json()).then(result=>{
            exists.innerHTML = "Available:" + result.available
        });
    });

    function clearMessage() {
        message.innerHTML = "";
    }

    function showMessage(text) {
        message.innerHTML += text + "<br>";
    }

    function validatePassword() {
        let isValid = true;
        if (password.value.length < 1) {
            showMessage("The password must not be blank.")
            isValid = false;
        }
        if (password.value != passwordAgain.value) {
            showMessage("The passwords entered are not the same.")
            isValid = false;
        }
        return isValid;
    }

    function validateUsername() {
        let isValid = true;
        if (username.value.length < 1) {
            showMessage("Username must be more than 0 characters.");
            isValid = false;
        }
        return isValid;
    }

    add.addEventListener("click", e => {
        clearMessage();
        if (validateUsername() && validatePassword()) {
            //SAVE
            fetch(base + "users", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name.value,
                    username: username.value,
                    password: password.value
                })
            }).then(r => location = "todos.html")
        }
    }); //END ADD CLICK