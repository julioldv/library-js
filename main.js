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

Book.prototype.toggleReadState = function (){
    this.isRead = !this.isRead;
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

function renderLibrary(){
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
        const toggleReadState = document.createElement("button");
        removeBookButton.textContent = "Remove Book";
        removeBookButton.addEventListener("click", (event)=>{
            const parent = event.target.parentElement;
            const cardId = parent.dataset.id;
            
            const index = myLibrary.findIndex(book => book.id === cardId);
            if (index !== -1){
                myLibrary.splice(index,1);
            }

            renderLibrary();
        });

        
        toggleReadState.textContent = book.isRead ? "Mark as not read" : "Mark as read";
        toggleReadState.addEventListener("click",(event)=>{
            const parent = event.target.parentElement;
            const cardId = parent.dataset.id;

            myLibrary.forEach(book =>{
                if(cardId === book.id){
                    book.toggleReadState();
                }
            });
            renderLibrary();
        });




        title.textContent = book.title;
        author.textContent = book.author;
        totalPages.textContent = book.totalPages;
        readStatus.textContent = book.isRead ? "Already read" : "Not read yet";

        bookCard.append(title,author,totalPages,readStatus,removeBookButton,toggleReadState);
        bookCardsContainer.appendChild(bookCard);
    });
}


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const totalPages = Number(document.querySelector("#total-pages").value);
    const selected = document.querySelector('input[name="read-status"]:checked');
    let isRead = false;
    
    if(selected){
        if(selected.value === "read"){
            isRead = true;
        }else{
            isRead = false;
        }
    }

    addBookToLibrary(title,author,totalPages,isRead);
    form.reset();
    renderLibrary();
});

renderLibrary();