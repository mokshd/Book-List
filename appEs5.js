//book constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//ui constuctor
function UI(){}

//store constructor
function Store(){}

//store in ls
Store.prototype.getBooks=function(){
    let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
}
//display store
Store.prototype.display = function(){
    const store = new Store();
    const books = store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to ui
            ui.addBookToList(book);
        });
}
//add to store
Store.prototype.add = function(book){
    const store = new Store();
    const books = store.getBooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
}

//remove ls
Store.prototype.remove = function(isbn){
    const store = new Store();
    const books = store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
}


//add book to list
UI.prototype.addBookToList = function(book){
    const list = document.querySelector('#book-list')
    //create new element
    const row = document.createElement('tr')
    //ins col
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class = "delete">X</a></td>
    `
    list.appendChild(row);
}

//clearfields
UI.prototype.clearFields = function(){
     document.querySelector('#title').value = '';
     document.querySelector('#author').value = '';
     document.querySelector('#isbn').value = '';

}
// delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
    

}

//showAlert
UI.prototype.showAlert =  function ( message , className){
    //create div
    const div = document.createElement('message');
    //add class
    div.className = `alert u-full-width ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //grt form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div,form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// dom load event
document.addEventListener('DOMContentLoaded',function(e){
    //Instantiate store
    const store = new Store();

    store.display();
    e.preventDefault();

})

//add event listener
document.querySelector('#book-form').addEventListener('submit', function(e){
    // get form values
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    //Instantiate book
    const book = new Book(title,author,isbn);

    //Instantiate ui
    const ui = new UI();

    //Instantiate store
    const store = new Store();
    
    //validate
    if(title === '',author === '',isbn === ''){

        //show alert
        ui.showAlert('please fill all the fields', 'error');
    }
    else{
         //add book yo list
        ui.addBookToList(book);

        //clear fields
        ui.clearFields();

        //add ls
        store.add(book);

        //show alert
        ui.showAlert('Book Added, Success', 'success');
    }

   

    e.preventDefault();
})

//event listener for delete
document.querySelector('#book-list').addEventListener('click',function(e){
    //instantiate ui
    const ui = new UI();

    //Instantiate store
    const store = new Store();
    
    //delete book
    ui.deleteBook(e.target);
    //Remove from ls
    store.remove(e.target.parentElement.previousElementSibling.textContent)
    //show alert
    ui.showAlert('Book Deleted','success');
e.preventDefault();
 
});