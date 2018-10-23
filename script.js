
function createItem(index) {
    // Create input element
    let input = document.createElement("input");
    input.setAttribute("data-item",index);
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Item to rank");
    // Create Button element
    let button = document.createElement("button");
    button.setAttribute("data-item",index);
    button.setAttribute("class","btn btn-primary");
    let buttonText = document.createTextNode("Add Item");
    button.appendChild(buttonText);
    // Create list item and append input and button
    let listItem = document.createElement("li");
    listItem.setAttribute("data-item", index)
    listItem.appendChild(input);
    listItem.appendChild(button);
    // Add event listeners to the items
    let items = document.querySelectorAll("span.items ul li input");
    let lastItem = items[items.length-1];
    lastItem.focus();
    input.addEventListener("keypress", function (e) {
        if (e.which == 13 && this.value.length > 0) {
            // Remove button
            createItem(index+1);
        } else if (e.which == 8 && !this.value) {
            listItem.outerHTML = "";
            let prevButton = document.createElement("button");
            prevButton.setAttribute("data-item",index-1);
            prevButton.setAttribute("class","btn btn-primary");
            prevButton.addEventListener("click", function (e) {
                e.preventDefault();
                this.style.display = "none";
                createItem(index);
            });
            document.querySelector("li[data-item='"+index-1+"']").appendChild(prevButton);
            document.querySelector("input[data-item='"+index-1+"']").focus();
        }
    });
    button.addEventListener("click", function (e) {
        e.preventDefault();
        this.style.display = "none";
        createItem(index+1);
    });
    // Append list item to the list
    let list = document.querySelector("span.items ul");
    list.appendChild(listItem);
    
}

document.querySelector("button.btn-primary").addEventListener("click", function (e) {
    e.preventDefault();
    let index = parseInt(this.getAttribute("data-item"))+1;
    this.style.display = "none";
    createItem(index);
});

document.querySelector("input[type='text']").addEventListener("keypress", function (e) {
    let index = parseInt(this.getAttribute("data-item"))+1;
    if (e.which == 13 && this.value.length > 0) {
        createItem(index);
    }
});

document.querySelector("button.btn-success").addEventListener("click", function (e) {
    e.preventDefault();
    let items = document.querySelectorAll("span.items ul li");
    if (items.length <= 2) {
        (items.length == 2) ? alert("You must add more than 1 item to rank") : alert("You must add items to rank")
    } else {
        beginTest(items);
    }
})

function beginTest(items) {
    // gather items and form array of JSON objects, then start comparison via find pairedscore function
    console.log("Begin test");
    console.log(items);
}

function findPairedScore() {
    // return index of 2 items that are scored the same, if no item is scored the same return false and end test
}

function endTest() {

}
