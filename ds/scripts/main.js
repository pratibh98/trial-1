// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${import.meta.env.REACT_APP_JSON_SERVER_PORT
  }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const bookURL = `${baseServerURL}/books`;
let mainSection = document.getElementById("data-list-wrapper");

// book
let bookTitleInput = document.getElementById("book-title");
let bookImageInput = document.getElementById("book-image");
let bookCategoryInput = document.getElementById("book-category");
let bookAuthorInput = document.getElementById("book-author");
let bookPriceInput = document.getElementById("book-price");
let bookCreateBtn = document.getElementById("add-book");

// Update book
let updateBookIdInput = document.getElementById("update-book-id");
let updateBookTitleInput = document.getElementById("update-book-title");
let updateBookImageInput = document.getElementById("update-book-image");
let updateBookAuthorInput = document.getElementById("update-book-author");
let updateBookCategoryInput = document.getElementById("update-book-category");
let updateBookPriceInput = document.getElementById("update-book-price");
let updateBookBtn = document.getElementById("update-book");

//Update price
let updatePriceBookId = document.getElementById("update-price-book-id");
let updatePriceBookPrice = document.getElementById("update-price-book-price");
let updatePriceBookPriceButton = document.getElementById("update-price-book");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterClassic = document.getElementById("filter-Classic");
let filterFantasy = document.getElementById("filter-Fantasy");
let filterMystery = document.getElementById("filter-Mystery");

//Search by title/author

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//Books Data
let booksData = [];

fetch(bookURL)
  .then(response => response.json())
  .then(data => {
    // Set the book list to the fetched data
    booksData = data;

    // Render the book list
    renderBookList(booksData);
  })
  .catch(error => console.error(error));

// Render the book list
function renderBookList(bookList) {
  // Clear the current book list
  mainSection.innerHTML = "";

  // Render each book in the book list
  bookList.forEach(book => {
    let card = document.createElement("div");
    card.className = "card";
    card.dataset.id = book.id;

    let cardImage = document.createElement("div");
    cardImage.className = "card-image";
    let image = document.createElement("img");
    image.src = book.image;
    cardImage.appendChild(image);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h4");
    title.className = "card-title";
    title.textContent = book.title;
    cardBody.appendChild(title);

    let author = document.createElement("p");
    author.className = "card-author";
    author.textContent = book.author;
    cardBody.appendChild(author);

    let category = document.createElement("p");
    category.className = "card-category";
    category.textContent = book.category;
    cardBody.appendChild(category);

    let price = document.createElement("p");
    price.className = "card-price";
    price.textContent = book.price;
    cardBody.appendChild(price);

    let editLink = document.createElement("a");
    editLink.className = "card-link";
    editLink.href = "#";
    editLink.textContent = "Edit";
    editLink.dataset.id = book.id;
    cardBody.appendChild(editLink);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "card-button";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = book.id;
    deleteBtn.addEventListener("click", () => {
      let bookId = book.id;
      fetch(`${bookURL}/${bookId}`, {
        method: "DELETE",
      })
        .then(() => {
          let card = deleteBtn.closest(".card");
          card.remove();

          // Remove the deleted book from both book lists
          bookList = bookList.filter(book => book.id !== bookId);
          filteredBookList = filteredBookList.filter(book => book.id !== bookId);
        })
        .catch(error => console.error(error));
    });
    cardBody.appendChild(deleteBtn);

    card.appendChild(cardImage);
    card.appendChild(cardBody);

    // Append the book card to the div#data-list-wrapper
    mainSection.appendChild(card);
  });
}


// Create Book
bookCreateBtn.addEventListener("click",async  event => {
  event.preventDefault();

  // Collect the book data
  let book = {
    title: bookTitleInput.value,
    image: bookImageInput.value,
    category: bookCategoryInput.value,
    author: bookAuthorInput.value,
    price: bookPriceInput.value,
  };

  try {
    let response = await fetch(bookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then(response => response.json())
      .then(data => {
        booksData.push(data);

        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = data.id;

        let cardImg = document.createElement("div");
        cardImg.classList.add("card-img");

        let img = document.createElement("img");
        img.src = data.image;
        img.alt = data.title;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let title = document.createElement("h4");
        title.classList.add("card-title");
        title.textContent = data.title;

        let author = document.createElement("p");
        author.classList.add("card-author");
        author.textContent = data.author;

        let category = document.createElement("p");
        category.classList.add("card-category");
        category.textContent = data.category;

        let price = document.createElement("p");
        price.classList.add("card-price");
        price.textContent =data.price;

        let editLink = document.createElement("a");
        editLink.classList.add("card-link");
        editLink.href = "#";
        editLink.dataset.id = data.id;
        editLink.textContent = "Edit";

        editLink.forEach(link => {
          link.addEventListener("click", e => {
            e.preventDefault();
            let bookId = link.dataset.id;
        
            let book = booksData.find(book => book.id === bookId);
        
            updateBookIdInput.value = book.id;
            updateBookTitleInput.value = book.title;
            updateBookImageInput.value = book.image;
            updateBookAuthorInput.value = book.author;
            updateBookCategoryInput.value = book.category;
            updateBookPriceInput.value = book.price;
          });
        });



        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-button");
        deleteBtn.dataset.id = data.id;
        deleteBtn.textContent = "Delete";

        // Append the elements to the card
        cardImg.appendChild(img);

        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(category);
        cardBody.appendChild(price);
        cardBody.appendChild(editLink);
        cardBody.appendChild(deleteBtn);

        card.appendChild(cardImg);
        card.appendChild(cardBody);

        // Append the card to the main section
        mainSection.appendChild(card);
      })
      .catch(error => console.error(error));

    // Clear the input fields
    bookTitleInput.value = "";
    bookImageInput.value = "";
    bookCategoryInput.value = "";
    bookAuthorInput.value = "";
    bookPriceInput.value = "";

  } catch (error) {
    console.error(error);
  }
});

// Update all the field
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-link")) {
    event.preventDefault();
    let bookId = event.target.dataset.id;
    fetch(`${baseServerURL}/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        // Populate update fields with book data
        updateBookIdInput.value = data.id;
        updateBookTitleInput.value = data.title;
        updateBookImageInput.value = data.image;
        updateBookAuthorInput.value = data.author;
        updateBookCategoryInput.value = data.category;
        updateBookPriceInput.value = data.price;
      })
      .catch((error) => console.error(error));
  }
});

// Add event listener to update button
updateBookBtn.addEventListener("click", () => {
  let bookId = updateBookIdInput.value;
  fetch(`${baseServerURL}/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updateBookTitleInput.value,
      image: updateBookImageInput.value,
      author: updateBookAuthorInput.value,
      category: updateBookCategoryInput.value,
      price: updateBookPriceInput.value,
    }),
  })
    .then(() => {
      // Update book card with new data
      let card = document.querySelector(`.card[data-id="${bookId}"]`);
      let title = card.querySelector(".card-title");
      let author = card.querySelector(".card-author");
      let category = card.querySelector(".card-category");
      let price = card.querySelector(".card-price");
      title.textContent = updateBookTitleInput.value;
      author.textContent = "By " + updateBookAuthorInput.value;
      category.textContent = updateBookCategoryInput.value;
      price.textContent = "$" + updateBookPriceInput.value;
      // Reset update fields
      updateBookIdInput.value = "";
      updateBookTitleInput.value = "";
      updateBookImageInput.value = "";
      updateBookAuthorInput.value = "";
      updateBookCategoryInput.value = "";
      updateBookPriceInput.value = "";
    })
    .catch((error) => console.error(error));
});


// Price
mainSection.addEventListener("click", event => {
  if (event.target.classList.contains("card-link")) {
    let bookId = event.target.dataset.id;
    let card = event.target.closest(".card");
    let bookPriceElement = card.querySelector(".card-price");
    let bookPrice = bookPriceElement ? bookPriceElement.textContent.replace("$", "") : "";

    updatePriceBookId.value = bookId;
    updatePriceBookPrice.value = bookPrice;
  }
});

// add event listener to update button

updatePriceBookPriceButton.addEventListener("click", () => {
  let bookId = updatePriceBookId.value;
  let bookPrice = updatePriceBookPrice.value;

  fetch(`${baseServerURL}/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      price: bookPrice
    })
  })
    .then(response => response.json())
    .then(updatedBook => {
      let card = mainSection.querySelector(`.card[data-id="${updatedBook.id}"]`);
      card.querySelector(".card-price").textContent = "$" + updatedBook.price;
    })
    .catch(error => console.error(error));
});

// sort and filter
function sortBooksByPrice(order) {
  booksData.sort((a, b) => {
    if (order === "sort-low-to-high") {
      return a.price - b.price;
    } else if (order === "sort-high-to-low") {
      return b.price - a.price;
    }
  });
  renderBookList(booksData);
}

sortAtoZBtn.addEventListener("click", () => sortBooksByPrice("sort-low-to-high"));
sortZtoABtn.addEventListener("click", () => sortBooksByPrice("sort-high-to-low"));

// filter
filterClassic.addEventListener("click", () => {
  let classicBooks = booksData.filter(book => book.category === "Classic");
  renderBookList(classicBooks);
});

filterFantasy.addEventListener("click", () => {
  let fantasyBooks = booksData.filter(book => book.category === "Fantasy");
  renderBookList(fantasyBooks);
});

filterMystery.addEventListener("click", () => {
  let mysteryBooks = booksData.filter(book => book.category === "Mystery");
  renderBookList(mysteryBooks);
});


// search
searchByButton.addEventListener("click", () => {
  const searchCategory = searchBySelect.value;
  const searchTerm = searchByInput.value.toLowerCase();

  let filteredList = booksData;

  if (searchCategory === "title") {
    filteredList = filteredList.filter(book => book.title.toLowerCase().includes(searchTerm));
  } else if (searchCategory === "author") {
    filteredList = filteredList.filter(book => book.author.toLowerCase().includes(searchTerm));
  }

  renderBookList(filteredList);
});
