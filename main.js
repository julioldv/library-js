const form = document.querySelector(".book-form");
const bookCardsContainer = document.querySelector(".book-cards-container");

const myLibrary = [];


function Book(title, author, totalPages, isRead,id){
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.isRead = isRead;
    this.id = id;

    this.info = function (){
        const readStatus = this.isRead ? "already read" : "not read yet";
        


        return `${this.title} by ${this.author}, ${this.totalPages} pages, ${readStatus}, ${id}`;
    }

}

function addBookToLibrary(title, author, totalPages, isRead){
    let id = crypto.randomUUID();
    let book = new Book (title, author, totalPages, isRead, id);
    myLibrary.push(book);
}


addBookToLibrary("Atomic Habits", "James Clear",200,false);
addBookToLibrary("The Hobbit", "Tolkien",400,true);
addBookToLibrary("Pedro Paramo", "Juan Rulfo",200,false);

function showLibrary(){
    bookCardsContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");
        const title = document.createElement("h2");
        const author = document.createElement("p");
        const totalPages = document.createElement("p");


        title.textContent = book.title;
        author.textContent = book.author;
        totalPages.textContent = book.totalPages;

        bookCard.append(title,author,totalPages);
        bookCardsContainer.appendChild(bookCard);
    });
}


showLibrary();
showLibrary();
showLibrary();