let books = [
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        image: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
        read: false
    },
    {
        id: 6,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        image: "https://covers.openlibrary.org/b/id/10521270-M.jpg",
        read: false
    },
    {
        id: 7,
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        image: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
        read: true
    },
    {
        id: 8,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        image: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
        read: false
    },
    {
        id: 9,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        image: "https://covers.openlibrary.org/b/id/14627597-M.jpg",
        read: false
    },
    {
        id: 10,
        title: "The Little Prince",
        author: "Antoine de Saint-Exupery",
        category: "Fiction",
        image: "https://covers.openlibrary.org/b/id/10521271-M.jpg",
        read: true
    },
    {
        id: 11,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        category: "Mystery",
        image: "https://covers.openlibrary.org/b/id/8225261-M.jpg",
        read: false
    },
    {
        id: 12,
        title: "The Book Thief",
        author: "Markus Zusak",
        category: "Historical Fiction",
        image: "https://covers.openlibrary.org/b/id/8231857-M.jpg",
        read: false
    },
    {
        id: 13,
        title: "The Fault in Our Stars",
        author: "John Green",
        category: "Romance",
        image: "https://covers.openlibrary.org/b/id/8231858-M.jpg",
        read: false
    },
    {
        id: 14,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Classic",
        image: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
        read: true
    }
];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const modal = document.getElementById("bookModal");
const addBookBtn = document.getElementById("addBookBtn");
const closeModal = document.getElementById("closeModal");
const bookForm = document.getElementById("bookForm");

function displayBooks(){

    bookList.innerHTML = "";

    let searchValue = searchInput.value.toLowerCase();
    let categoryValue = categoryFilter.value;

    let filteredBooks = books.filter(function(book){

        let matchSearch =
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue);

        let matchCategory =
            categoryValue === "All" ||
            book.category === categoryValue;

        return matchSearch && matchCategory;
    });

    document.getElementById("noBooks").style.display =
        filteredBooks.length === 0 ? "block" : "none";

    filteredBooks.forEach(function(book){

        let card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}"
            onerror="this.onerror=null;this.src='https://placehold.co/300x210/e8e5f8/5546b5?text=Book'">

            <div class="book-info">

                <h3>${book.title}</h3>

                <p>By ${book.author}</p>

                <span class="category">${book.category}</span>

                <p>${book.read ? "✓ Read" : "📖 Not Read"}</p>

                <div class="book-actions">

                    <button class="read-btn"
                    onclick="toggleRead(${book.id})">
                    ${book.read ? "Unread" : "Mark Read"}
                    </button>

                    <button class="delete-btn"
                    onclick="deleteBook(${book.id})">
                    Delete
                    </button>

                </div>

            </div>
        `;
        bookList.appendChild(card);
    });
    updateStats();
}
function updateStats() {

    document.getElementById("totalBooks").innerText = books.length;

    document.getElementById("readBooks").innerText = books.filter(book => book.read).length;

    document.getElementById("unreadBooks").innerText = books.filter(book => !book.read).length;
}
searchInput.addEventListener("input", displayBooks);
categoryFilter.addEventListener("change", displayBooks);
function toggleRead(id){
    books = books.map(function(book){
        if (book.id === id){
            book.read = !book.read;
        }
        return book;
    });
    displayBooks();
}
function deleteBook(id){
    if (confirm("Are you sure you want to delete this book?")){
        books = books.filter(function(book){
            return book.id !== id;
        });
        displayBooks();
    }
}
addBookBtn.addEventListener("click", function(){
    modal.style.display = "flex";
});
closeModal.addEventListener("click", function(){
    modal.style.display = "none";
});
window.addEventListener("click", function(event){
    if (event.target === modal){
        modal.style.display = "none";
    }
});
bookForm.addEventListener("submit", function(event){

    event.preventDefault();

    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;
    let category = document.getElementById("bookCategory").value;
    let image = document.getElementById("bookImage").value;

    let newBook = {

        id: Date.now(),
        title: title,
        author: author,
        category: category,

        image: image ||
        "https://placehold.co/300x210/e8e5f8/5546b5?text=Book",

        read: false
    };

    books.push(newBook);
    displayBooks();
    bookForm.reset();
    modal.style.display = "none";
    alert("Book added successfully!");
});
displayBooks();