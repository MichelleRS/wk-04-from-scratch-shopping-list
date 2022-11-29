// render user inputs of item and quantity
export function renderListItem(itemObject) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = `${itemObject.item}, quantity: ${itemObject.quantity}`;

    return listItemEl;
}
