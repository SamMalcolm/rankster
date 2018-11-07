var items = [];

function createItem(itemName) {
    let item = {};
    item.name = itemName;
    item.score = 0;
    item.superiors = [];
    items.push(item);
    populateList();
}

function populateList() {
    let list = document.querySelector("span ul");
    list.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        let listItem = document.createElement("li");
        listItem.setAttribute("data-item",i);
        let title = document.createTextNode(" "+items[i].name);
        let destroy = document.createElement("button");
        destroy.setAttribute("class","btn btn-danger");
        let buttonText = document.createTextNode("X");
        destroy.appendChild(buttonText);
        destroy.addEventListener("click", function (e) {
            e.preventDefault();
            items.splice(i,1);
            populateList();
        })
        listItem.appendChild(destroy);
        listItem.appendChild(title);
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
    if (items.length < 2) {
        (items.length == 1) ? alert("You must add more than 1 item to rank") : alert("You must add items to rank")
    } else {
        beginTest();
    }
})

function findPairedScore() {
    // return index of 2 items that are scored the same, if no item is scored the same return false and end test
    let pair = [];
    for (let i = 0; i < items.length; i++) {
        let testItem = items[i];
        for (let a = 0; a < items.length; a++) {
            if (a !== i) {
                if (testItem.score == items[a].score) {
                    pair.push(i);
                    pair.push(a);
                    return pair;
                }
            }
        }
    }
    return false;
}

function handleSuperiors(arrayIndex) {
    if (items[arrayIndex].superiors.length > 0) {
        for (let i = 0; i < items[arrayIndex].superiors.length; i ++) {
            let supi = items[arrayIndex].superiors[i];
            items[supi].score++;
            if (items[supi].superiors.length > 0) {
                handleSuperiors(supi);
            }
        }
    }
    
}

function handleClick(arrayIndex, superiorIndex) {
    console.log(arrayIndex);
    if (items[superiorIndex].superiors.indexOf(arrayIndex) == -1) {
        items[superiorIndex].superiors.push(arrayIndex);
    }
    handleSuperiors(arrayIndex);
    return items[arrayIndex].score++;
}

function testPair(pair) {
    let itemOneIndex = pair[0];
    let itemTwoIndex = pair[1];
    let testButton = document.createElement("button");
    testButton.setAttribute("class","btn btn-primary");
    let compareButton = document.createElement("button");
    compareButton.setAttribute("class","btn btn-primary");
    compareButton.setAttribute("data-array-index",itemTwoIndex);
    testButton.setAttribute("data-array-index",itemOneIndex);
    let testText = document.createTextNode(items[itemOneIndex].name);
    let compareText = document.createTextNode(items[itemTwoIndex].name);
    testButton.appendChild(testText);
    compareButton.appendChild(compareText);
    testButton.addEventListener("click", function (e) {
        e.preventDefault();
        handleClick(itemOneIndex, itemTwoIndex);
        this.outerHTML = "";
        compareButton.outerHTML = "";
        if (pair = findPairedScore()) {
            testPair(pair);
        } else {
            endTest();
        }
    });
    compareButton.addEventListener("click", function (e) {
        e.preventDefault();
        handleClick(itemTwoIndex, itemOneIndex);
        this.outerHTML = "";
        testButton.outerHTML = "";
        if (pair = findPairedScore()) {
            testPair(pair);
        } else {
            endTest();
        }
    });
    document.querySelector("span.test-area").appendChild(testButton);
    document.querySelector("span.test-area").appendChild(compareButton);

}

function beginTest() {
    // gather items and form array of JSON objects, then start comparison via find pairedscore function
    console.log("Begin test");
    console.log(items);
    let pair;
    if (pair = findPairedScore()) {
        testPair(pair);
    } else {
        endTest();
    }
}



function endTest() {
    items.sort(function (a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
    });
    for (let i = 0; i < items.length; i++) {
        let alert = document.createElement("div");
        alert.setAttribute("class", "alert alert-primary");
        let no = i+1;
        let text = document.createTextNode(no+": "+items[i].name);
        alert.appendChild(text);
        document.querySelector("span.ranked-area").appendChild(alert);
    }
}
