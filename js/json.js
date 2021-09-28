const container = document.getElementById("api-container");
const url = "https://jsonplaceholder.typicode.com/todos/";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((todo) => {
      createTask(todo);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function createTask({ id, title, completed }) {
  const divApi = document.createElement("div");
  divApi.classList.add("api-card");

  if (completed == true) {
    divApi.classList.add("tachado");
  }

  divApi.innerHTML = `
        <h2 class="api-id">${id}</h2>
        <p class="api-title">${title}</p>
    `;
  container.appendChild(divApi);
}

/* FUNÇÃO DARK MODE */
function mudarCor(checkbox) {
  document.body.style.backgroundColor = checkbox.checked ? "#202124" : "";
  document.body.style.color = checkbox.checked ? "#e8eaed" : "";
  container.style.color = checkbox.checked ? "#202124" : "";
}

/* SEARCH INPUT */
let search = document.getElementById("searchInput");
search.onkeyup = () => {
  let filter = search.value.toUpperCase();
  let p = document.getElementsByTagName("p");

  for (i = 0; i < p.length; i++) {
    txtValue = p[i].textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      p[i].parentElement.style.display = "";
    } else {
      p[i].parentElement.style.display = "none";
    }
  }
};

search.addEventListener("click", function (e) {
  document.getElementById("searchInput").classList.add("active");
});

document.addEventListener("click", function (e) {
  if (!e.target.closest("#search")) {
    if (search.value > "") {
      return null;
    } else {
    document.getElementById("searchInput").classList.remove("active");
    }
  }
});
