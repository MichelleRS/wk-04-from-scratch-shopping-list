# Week 04 From Scratch: Shopping List App

## Goal

Create a shopping list that allows logged in user to input and interact with data.

-   Users should be able to add items to their shopping list (CREATE)
-   Users should see a list of shopping items (READ)
-   Users should be able to mark items as bought (UPDATE)
-   Users should be able to delete all the items from their list (DELETE)

## Project Planning

### HTML - Shopping List Page

`main > section`:

-   `form`
    -   inputs for name of item and quantity
    -   button to "add item"
-   empty `ul` element that will be appended with each `li` rendered in render-utils.js
-   `button` to "delete list"

### Workflow

1. Database Setup

-   make a table in Supabase
-   foreign key relationship to users table (uuid) (so that another user can't be at another users favorite list)
-   rls for user_id = uid()

2. Create (form)

-   create function in fetch-utils
-   add submit event listener
-   grab data using new FormData and send it to Supabase

3. Read (list all items in ul)

-   fetch function in fetch-utils
-   write render function in render-utils
-   write a display function in app.js
-   call display function on page load

4. Update item (cross out item)

-   update function in fetch-utils
-   add event handler on `li` elements (when they are rendered, make them clickable)
-   re-display list (call display function again)

5. Delete (button)

-   delete function in fetch-utils
-   add event listener to call delete function (on button click)

## Rubric

### Shopping Page

-   [x] Succesful authentication should redirect to the shopping page 1
-   [x] Unauthenticated users trying to visit shopping page should be redirected to login 1
-   [x] Users should see a list of their shopping list items 2
-   [x] Users should be able to add an item to their shopping list 2
-   [x] When a user clicks on an item, it should be updated to `bought=true` 2
-   [x] When an item is bought, it should display differently on the page 2
-   [x] Users should be able to delete all shopping list items 3

### Functions

-   [x] ASYNC `createItem(item)` -- adds a new item 1
-   [x] ASYNC `deleteAllItems()` -- deletes all items 1
-   [x] ASYNC `fetchItems()` -- fetches all items 1
-   [x] ASYNC `buyItem(id)` -- udpates specific item to `bought=true` 1
-   [x] PURE `renderItem(item)` -- takes an item object and returns a DOM element 1
-   [x] IMPURE `displayListItems()` -- fetches the items from supabase, clears out the DOM, rerenders them 2
