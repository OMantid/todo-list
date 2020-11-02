//Get buttons
let saveBtn = document.getElementById('save-btn');
let cancelBtn = document.getElementById('cancel-btn');
let menuBtn = document.getElementById('menu-btn');

//Get drop down menu windown
let menu = document.getElementById('menu');

//Get modal window and input field
let modal = document.getElementById('myModal'); 
let inputField = document.getElementById('list-name');

// Get containers 
let header = document.getElementById('head-container');
let main = document.getElementById('main-container');

//Menu animation
//Apply a click event listener

//Save list name pop up
saveBtn.onclick = function() {
    modal.className = 'is-visuallyHidden';
    setTimeout(function() {
        header.className = 'is-blurred';
        main.className = 'is-blurred';
        modal.className = 'Modal';
    }, 100)
};

//Cancel Save List
cancelBtn.onclick = function() {
    modal.className = 'Modal is-hidden is-visuallyHidden';
    inputField.value = '';
    header.classList.remove('is-blurred');
    main.classList.remove('is-blurred');
}

