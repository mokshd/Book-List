class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{

addBookToList(book){
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

showAlert(message,className){
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
clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';

}

deleteBook(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }

}
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static display(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to ui
            ui.addBookToList(book);
        });

    }
    static add(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static remove(isbn ){
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
// dom load event
document.addEventListener('DOMContentLoaded',Store.display)
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
    
    //validate
    if(title === '',author === '',isbn === ''){

        //show alert
        ui.showAlert('please fill all the fields', 'error');
    }
    else{
         //add book yo list
        ui.addBookToList(book);

        //add ls
        Store.add(book);

        //clear fields
        ui.clearFields();

        

        //show alert
        ui.showAlert('Book Added, Success', 'success');



    }

   

    e.preventDefault();
});

//event listener for delete
document.querySelector('#book-list').addEventListener('click',function(e){
    //instantiate ui
    const ui = new UI();
    //delete book
    ui.deleteBook(e.target);
    //Remove from ls
    Store.remove(e.target.parentElement.previousElementSibling.textContent)
    //show alert
    ui.showAlert('Book Deleted','success');
e.preventDefault();
 
});