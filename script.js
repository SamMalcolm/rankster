var items = [];
var testInProgress = false;

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
    } else if (e.which == 8 && this.value.length == 0 && items.length > 0) {
        e.preventDefault();
        let poppedItem = items.pop();
        populateList();
        this.value = poppedItem.name;
    }
});

document.querySelector("button.btn-success").addEventListener("click", function (e) {
    e.preventDefault();
    if (items.length < 2) {
        (items.length == 1) ? alert("You must add more than 1 item to rank") : alert("You must add items to rank")
    } else {
        if (!testInProgress) {
            testInProgress = true;
            beginTest();
        }
    }
});

function findPairedScore() {
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
            let superiorIndex = items[arrayIndex].superiors[i];
            items[superiorIndex].score++;
            if (items[superiorIndex].superiors.length > 0) {
                handleSuperiors(superiorIndex);
            }
        }
    }
    
}

function handleClick(arrayIndex, superiorIndex) {
    if (items[superiorIndex].superiors.indexOf(arrayIndex) == -1) {
        items[superiorIndex].superiors.push(arrayIndex);
    }
    if (items[arrayIndex].superiors.length > 0) {
        handleSuperiors(arrayIndex);
    }
    return items[arrayIndex].score++;
}

function testPair(pair) {
    let itemOneIndex = pair[0];
    let itemTwoIndex = pair[1];
    let testButton = document.createElement("button");
    testButton.setAttribute("class","btn btn-primary");
    let compareButton = document.createElement("button");
    compareButton.setAttribute("class","btn btn-primary");
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
    document.querySelector("button.clearForm").style.display = "none";
    let pair;
    if (pair = findPairedScore()) {
        testPair(pair);
    } else {
        endTest();
    }
}

document.querySelector("button.clearForm").addEventListener("click", function (e) {
    e.preventDefault();
    items = [];
    populateList();
    document.querySelector("span.ranked-area").innerHTML = "";
});


function endTest() {
    document.querySelector("button.clearForm").style.display = "block";
    testInProgress = false;
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

    var retakeTestButton = document.createElement("button");
    retakeTestButton.setAttribute("class","btn btn-secondary retake");
    let text = document.createTextNode("Retake Same Test");
    retakeTestButton.appendChild(text);

    retakeTestButton.addEventListener("click", function (e) {
        e.preventDefault();
        this.outerHTML = "";
        for (let i = 0; i < items.length; i ++) {
            items[i].score = 0;
            items[i].superiors = [];
        }
        document.querySelector("span.ranked-area").innerHTML = "";
        beginTest();
    });

    document.querySelector("span.controls").appendChild(retakeTestButton);
}
