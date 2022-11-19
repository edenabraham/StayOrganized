const base = "http://localhost:8083/api/";

    //USERS
    const users = document.getElementById("users");
    function onUserData(userList) {
        userList.forEach(u => {
            users.innerHTML += `<option value="${u.id}">${u.name}</option>`
        })
    }
    fetch(base + "users").then(r => r.json()).then(onUserData);

    //CATEGORIES
    const category = document.getElementById("category");
    function onCategoryData(categoryList) {
        categoryList.forEach(u => {
            category.innerHTML += `<option value="${u.name}">${u.name}</option>`
        })
    }
    fetch(base + "categories").then(r => r.json()).then(onCategoryData);

    //Add/Save New Todo
    document.getElementById("add").addEventListener("click", e => {
        fetch(base + "todos", {method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify( {
            description: document.getElementById("description").value,
            deadline: document.getElementById("deadline").value,
            userid: document.getElementById("users").selectedOptions[0].value,
            category: document.getElementById("category").selectedOptions[0].value,
            priority: document.getElementById("priority").selectedOptions[0].value,
        })})
        .then(r=>r.json())
        .then(j => {
            console.log(j);
            location = "todos.html";
        })
    });
