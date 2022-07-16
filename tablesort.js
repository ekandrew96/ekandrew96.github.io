/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending or not (descending)
 * 
 */

function sortTableByColumn(table, column, asc = true){
    //is asc? then 1. else -1
    const dirModifier = asc ? 1 : -1;
    //usable with only one tBody
    const tBody = table.tBodies[0];
    //receives "tr"s instead of list nodes
    console.log(tBody);
    const unsortedRows = Array.from(tBody.querySelectorAll("tr"));
    console.log(unsortedRows);
    //Sort each row
    const sortedRows = unsortedRows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    //Remove all existing TRs from the table
    while(tBody.firstChild){
        tBody.removeChild(tBody.firstChild);
    }

    //Re-add the newly sorted rows
    tBody.append(...sortedRows);

    //Remember how the column is currently sorted
    //clear out previous classes added
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    //record "th-sort-asc" class to selected header if ascending
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    //record "th-sort-desc" class to selected header if descending
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table_sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        //retrieve table (th -> tr -> thead -> table)
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        //retrieve column (index)
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        //retrieve direction
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    })
})