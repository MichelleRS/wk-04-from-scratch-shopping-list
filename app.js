/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, getListItems, editListItem, deleteList } from './fetch-utils.js';
import { renderListItem } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('#shopping-list-form');
const error = document.querySelector('#error');
const listEl = document.querySelector('#shopping-list');
const deleteListButton = document.querySelector('#delete-list-button');

/* State */

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

// listen for submit of form
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // form data instance to grab info we want from form
    const data = new FormData(form);
    // initialize variables for item and quantity using data.get to get user input
    const item = data.get('item');
    const quantity = data.get('quantity');

    // clear form on submit
    form.reset();

    // new item
    const newItem = await createListItem(item, quantity);

    if (newItem) {
        // display item
        // display whole list (clear old list and fetch it again)
        fetchAndDisplayList();
    } else {
        // error handling
        error.textContent =
            'Something went wrong with your input. Please check the item or quantity you entered and try again.';
    }
});

// create event listener for delete button
deleteListButton.addEventListener('click', async () => {
    await deleteList();
    await fetchAndDisplayList();
});

/* Display Functions */
async function fetchAndDisplayList() {
    // start with a clear list
    listEl.textContent = '';
    // call fetch to supabase
    const list = await getListItems();

    // loop, render, append
    // render differently if purchased is true
    if (list) {
        for (let item of list) {
            // initialize a variable to get the rendered inputs from renderListItem()
            const listItemEl = renderListItem(item);

            // add event listener so user can click each item
            listItemEl.addEventListener('click', async () => {
                // await editListItem
                await editListItem(item);
                // await fetchAndDisplayList
                await fetchAndDisplayList();
            });
            // add a class list to style purchased items
            if (item.purchased) {
                listItemEl.classList.add('purchased-true');
            }

            // take the rendered inputs and append to listEl DOM element
            listEl.append(listItemEl);
        }
    } else {
        // error handling
    }
}
