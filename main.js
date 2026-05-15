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


function removeBook(){

}

function showLibrary(){
    bookCardsContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");
        bookCard.dataset.id = book.id;
        const title = document.createElement("h2");
        const author = document.createElement("p");
        const totalPages = document.createElement("p");
        const readStatus = document.createElement("p");
        const removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove Book";
        removeBookButton.addEventListener("click", (event)=>{
            const parent = event.target.parentElement;
            const cardId = parent.dataset.id;
            
            const index = myLibrary.findIndex(book => book.id === cardId);
            if (index !== -1){
                myLibrary.splice(index,1);
            }

            showLibrary();
        });


        title.textContent = book.title;
        author.textContent = book.author;
        totalPages.textContent = book.totalPages;
        readStatus.textContent = book.isRead ? "already read" : "not read yet";

        bookCard.append(title,author,totalPages,readStatus,removeBookButton);
        bookCardsContainer.appendChild(bookCard);
    });
}


showLibrary();