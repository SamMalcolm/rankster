var items = [];

function createItem(itemName) {
    let item = {};
    item.name = itemName;
    item.score = 0;
    items.push(item);
    populateList();
}

function populateList() {
    let list = document.querySelector("span ul");
    list.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        let listItem = document.createElement("li");
        listItem.setAttribute("data-item",i);
        let title = document.createTextNode(items[i].name);
        listItem.appendChild(title);
        let destroy = document.createItem("button");
        destroy.setAttribute("class","btn btn-danger");
        destroy.appendChild("Remove");
        destroy.addEventListener("click", function (e) {
            e.preventDefault();
            // remove item i
            // recursively call populate list
        })
        listItem.appendChild(destroy);
        list.appendChild(listItem); 
    }
}

document.querySelector("button.btn-primary").addEventListener("click", function (e) {
    e.preventDefault();
    let inputElement = document.querySelector("input[type='text']");
    let itemName = inputElement.value;
    inputElement.value = "";
    createItem(itemName);
});

document.querySelector("input[type='text']").addEventListener("keypress", function (e) {
    if (e.which == 13 && this.value.length > 0) {
        let itemName = this.value;
        this.value = "";
        createItem(itemName);
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
