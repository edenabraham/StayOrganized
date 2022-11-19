const filter = document.getElementById("filter");
const users = document.getElementById("users");
    const results = document.getElementById("results");
    const base = "http://localhost:8083/api/";
    const usersEndpoint = base + "users";
    const byUserEndpoint = base + "todos/byuser/"; //append user id

    filter.addEventListener("keyup",e=>{
        [...users.children].forEach(c=>{
            const needle = filter.value.toUpperCase();
            const haystack = c.innerHTML.toUpperCase();
            const isMatch = haystack.includes(needle);
            c.style.display = isMatch ? "block" : "none";
        });
    });


    function onTodoData(todoList) {
        results.innerHTML = "";
        todoList.forEach(t=>{
            const x = t.completed ? "X" : "&nbsp;&nbsp;";
            const sticky = document.createElement("div");
            sticky.classList.add("sticky");
            sticky.innerHTML = `<div class="description">${t.description}</div>`;
            sticky.innerHTML += `<div class="complete">[${x}] Complete</div>`;
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
        users.size = userList.length;
        userList.forEach(u => {
            users.innerHTML += `<option value="${u.id}">${u.name}</option>`
        })
        users.addEventListener("click", onUserSelect)
    }

    fetch(usersEndpoint).then(r => r.json()).then(onUserData);


