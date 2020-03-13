var testQuestions = [
    { a:true,  q:"qq1" },
    { a:false, q:"qq1" },
    { a:true,  q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
    { a:false, q:"qq1" },
]

var currentPage = 0;
var correct = 0;

function getLastPage() {
    return Math.floor((testQuestions.length + 11) / 12);
}

function moveNext() {
    var lastPage = getLastPage();

    if (currentPage + 1 >= lastPage)
        return false;

    currentPage += 1;

    document.getElementById("button-next").className = "test-button hidden";
    document.getElementById("button-reveal").className = "test-button";
    document.getElementById("test-header").innerHTML = "Page " + (currentPage + 1) + "/" + lastPage;

    setQuestions(false);
    // this prevents page to reload
    return false;
}

function setQuestions(hide) {
//    console.log("hidden=" + hide);
    var i;
    for (i = currentPage * 12; i < currentPage * 12 + 12; i++) {
        var id = i - currentPage * 12 + 1;
        //console.log("Id=" + id + "/" + ("label" + id) +"/"+ document.getElementById("l" + id) + "/" + document.getElementById("t" + id));

        var label = document.getElementById("l" + id);
        var check = document.getElementById("t" + id);

        if (i >= testQuestions.length || hide) {
            label.innerHTML = "";
            label.className = "hidden";
            check.checked = false;
            check.className = "hidden";
        }
        else {
            label.innerHTML = testQuestions[i].q;
            label.className = "";
            check.checked   = false;
            check.className = "test-check";
        }
    }
}

function reveal() {
    var lastPage = getLastPage();

    var i;
    for (i = currentPage * 12; i < currentPage * 12 + 12; i++) {
        var id = i - currentPage * 12 + 1;
        //console.log("Id=" + id + "/" + ("label" + id) +"/"+ document.getElementById("l" + id) + "/" + document.getElementById("t" + id));

        var label = document.getElementById("l" + id);
        var check = document.getElementById("t" + id);

        if (i < testQuestions.length) {
            if (check.checked == testQuestions[i].a) {
                correct += 1;
                label.className = "ans-correct";
            }
            else {
                label.className = "ans-incorrect";
            }
        }
    }

    if (currentPage + 1 >= lastPage) {
        document.getElementById("test-header").innerHTML = "Your score is " + correct + " of " + testQuestions.length;

        document.getElementById("button-next").className = "test-button hidden";
        document.getElementById("button-reveal").className = "test-button hidden";

        setQuestions(true);
        return false;
    }
    else {
        document.getElementById("button-next").className = "test-button";
        document.getElementById("button-reveal").className = "test-button hidden"; 
    }

    // this prevents page to reload
    return false;
}

function init_test() {
    currentPage = -1;
    correct = 0;
    moveNext();
}