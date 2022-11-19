const users = document.getElementById("users");
    const results = document.getElementById("results");
    const base = "http://localhost:8083/api/";
    const usersEndpoint = base + "users";
    const byUserEndpoint = base + "todos/byuser/"; //append user id

    function onTodoData(todoList) {
        results.innerHTML = "";
        todoList.forEach(t=>{
            const x = t.completed ? "X" : "&nbsp;&nbsp;";
            const sticky = document.createElement("div");
            sticky.classList.add("sticky");
            sticky.innerHTML = `${t.description}<br>[${x}] Complete`;
            sticky.addEventListener("click", e=>{
                fetch(base + "todos/" + t.id, {method:"PUT"}).then(r => refreshData());
            });
            results.appendChild(sticky);
        })
    }

    function refreshData(){
        const id = users.selectedOptions[0].value;
        fetch(byUserEndpoint + id).then(r => r.json()).then(onTodoData);
    }

    function onUserSelect() {
        refreshData();
    }

    function onUserData(userList) {
        userList.forEach(u => {
            users.innerHTML += `<option value="${u.id}">${u.name}</option>`
        })
        users.addEventListener("click", onUserSelect)
    }

    fetch(usersEndpoint).then(r => r.json()).then(onUserData);


