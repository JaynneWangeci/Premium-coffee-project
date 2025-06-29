function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.style.display = "none");
  document.getElementById(pageId).style.display = "block";
}
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.sampleapis.com/coffee/hot")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayCoffees(data);
      document.getElementById("search-btn").addEventListener("click", function () {
        const searchTerm = document.getElementById("coffee-search").value.toLowerCase();
        const filteredCoffees = data.filter((coffee) =>
          (coffee.title || coffee.name).toLowerCase().includes(searchTerm)
        );
        displayCoffees(filteredCoffees);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      const errorElement = document.createElement("p");
      errorElement.textContent = "Failed to load coffee data. Please try again later.";
      errorElement.style.color = "red";
      document.getElementById("coffee-products").appendChild(errorElement);
    });

  function displayCoffees(coffees) {
    const coffeeSection = document.getElementById("coffee-products");
    coffeeSection.innerHTML = '<h2>Our Premium Coffee Selection</h2><div class="coffees-list"></div>';

    const coffeesList = document.querySelector(".coffees-list");

    if (coffees.length === 0) {
      coffeesList.innerHTML = "<p>No coffees found matching your search.</p>";
      return;
    }

    coffees.forEach((coffee) => {
      const coffeeCard = document.createElement("div");
      coffeeCard.className = "coffee-card";
      coffeeCard.innerHTML = `
        <h3>${coffee.title || coffee.name}</h3>
        ${coffee.image ? `<img src="${coffee.image}" alt="${coffee.title}" style="width:200px; height:auto; border-radius:10px;">` : ''}
        ${coffee.description ? `<p>${coffee.description}</p>` : ""}
        ${coffee.ingredients ? `<p><strong>Ingredients:</strong> ${Array.isArray(coffee.ingredients) ? coffee.ingredients.join(", ") : coffee.ingredients}</p>` : ""}
      `;
      coffeesList.appendChild(coffeeCard);
    });
  }
});