/**
 * Array of test questions with answers
 * */
var testQuestions = [
    { a: true, q: "Paper"                            },
    { a: true, q: "Tissue boxes"                     },
    { a: true, q: "Newspaper"                        },
    { a: true, q: "Food packaging"                   },
    { a: true, q: "Books"                            },
    { a: true, q: "Cardboard"                        },
    { a: true, q: "Shoeboxes"                        },
    { a: true, q: "Aluminum foil"                    },
    { a: true, q: "Kitchen cookware"                 },
    { a: true, q: "All colors glass bottles and jars"},
    { a: true, q: "Glass food containers"            },
    { a: true, q: "All plastic numbers 1-7"          },
    { a: true, q: "Plastic cups"                     },
    { a: true, q: "Plastic jugs"                     },
    { a: true, q: "Soap bootles"                     },
    { a: false, q: "Tissue paper"                    },
    { a: false, q: "Paper towels"                    },
    { a: false, q: "Motor oil cans"                  },
    { a: false, q: "Paint cans"                      },
    { a: false, q: "Light bulbs"                     },
    { a: false, q: "Ceramic or marble"               },
    { a: false, q: "Wax paper"                       }
];

/**
 * Currently displayed page number (0-based)
 * */
var currentPage = 0;

/**
 * Number of correctly answered questions
 * */
var correct = 0;

/**
 * Get the last page number (page count).
 * */
function getLastPage() {
    return Math.floor((testQuestions.length + 11) / 12);
}

/**
 * Switch to the next page
 * Displays questions and updates buttons: submit shown, reveal hidden
 * */
function moveNext() {
    var lastPage = getLastPage();

    if (currentPage + 1 >= lastPage) {
        showFinalScore();
        return false;
    }

    currentPage += 1;

    document.getElementById("button-next").className = "test-button hidden";
    document.getElementById("button-reveal").className = "test-button";
    document.getElementById("test-header").innerHTML = "Page " + (currentPage + 1) + "/" + lastPage;

    setQuestions(false);
    // this prevents page to reload
    return false;
}

/**
 * Display questions for the current page.
 * Updating each label and reset check box.
 * This also hides questions that are exeeding the source test array length
 * @param {boolean} hide hive all questions instead of showing them
 */
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
        } else {
            label.innerHTML = testQuestions[i].q;
            label.className = "";
            check.checked   = false;
            check.className = "test-check";
        }
    }
}

/**
 * Show the final score.
 * All questions hidden. Buttons hidden. Header shows the score.
 * */
function showFinalScore() {
    document.getElementById("test-header").innerHTML = "Your score is " + correct + " of " + testQuestions.length;

    document.getElementById("button-next").className = "test-button hidden";
    document.getElementById("button-reveal").className = "test-button hidden";

    setQuestions(true);
}

/** 
 * Reveal results for the current submission.
 * Apply red/green style to the labels.
 * */
function reveal() {
    var lastPage = getLastPage();
    console.log("LastPage=" + lastPage + " CurrentPage=" + currentPage);

    if (currentPage + 1 > lastPage) {
        showFinalScore();
        return false;
    }

    var i;
    for (i = currentPage * 12; i < currentPage * 12 + 12; i++) {
        var id = i - currentPage * 12 + 1;
        //console.log("Id=" + id + "/" + ("label" + id) +"/"+ document.getElementById("l" + id) + "/" + document.getElementById("t" + id));

        // question test
        var label = document.getElementById("l" + id);
        // answer checkbox
        var check = document.getElementById("t" + id);

        if (i < testQuestions.length) {
            // check if answer is correct
            if (check.checked === testQuestions[i].a) {
                correct += 1;
                label.className = "ans-correct";
            }
            else {
                label.className = "ans-incorrect";
            }
        }
    }

    document.getElementById("button-next").className = "test-button";
    document.getElementById("button-reveal").className = "test-button hidden"; 

    if (currentPage + 1 >= lastPage) {
        currentPage += 1;
    }
    // this prevents page to reload
    return false;
}

/**
 * Randomize questions.
 * Add field "order" with random value and sort by it.
 * */
function randomizeQuestions() {
    var i;
    for (i = 0; i < testQuestions.length; i++) {
        // JS allows to add fields to existing objects
        testQuestions[i].order = Math.random(); // add field called "order" and set it to random value
//        console.log("order=" + testQuestions[i].order + " " + testQuestions[i].q);
    }
    // (a - b) is greater than 0 if a > b
    testQuestions.sort(function (a, b) { return a.order - b.order; } ); // sort by "order" field

    //console.log("------------ sorted ----------------");

    //for (i = 0; i < testQuestions.length; i++) {
    //    console.log("order=" + testQuestions[i].order + " " + testQuestions[i].q);
    //}

}

/** 
 * Initialize the test.
 * Randomize questions and show the first page.
 * */
function init_test() {
    randomizeQuestions();
    currentPage = -1;
    correct = 0;
    moveNext();
}