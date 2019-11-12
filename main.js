//TODO: Change zermelo landing page to use correct link

var calcBar;
var weekButton;

const left = new KeyboardEvent("keydown", {
    bubbles: true, cancelable: true, keyCode: 37
});
const right = new KeyboardEvent("keydown", {
    bubbles: true, cancelable: true, keyCode: 39
});

function changeSmallThings() {
    masterHolder = document.getElementsByClassName("masterHolder")[0];
    masterHolder.style = "flex: 2; width: 75%;";
    x = document.getElementsByClassName("title");
    for (let item of x) {
        item.innerText = item.innerText.replace("Zermelo", "BetterZermelo");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixMededelingen() { 
    await sleep(500);
    texts = document.getElementsByClassName('announcementText');  
    for (i = 0; i < texts.length; i++) {
        object = texts[i]; 
        object.innerHTML = object.innerHTML.replace(/\n/g, '<br />'); 
    }
}

async function calculateClasses() {
    await sleep(10);
    currentWeek = document.getElementsByClassName("weekSchedule")[1];
    // there are always three divs with className weekSchedule
    // which are the previous week, the current week, and the next week
    // we then pick the second item in the list, since thats the current week

    scheduleArea = currentWeek.childNodes[6].getElementsByClassName("appointmentlist")[0];
    // the sixth child of the currentWeek div is the scrollarea
    enrolledMandatory = scheduleArea.getElementsByClassName("enrolledMandatory");
    enrolledChoice = scheduleArea.getElementsByClassName("enrolledCanUnenroll");
    enrolledMultiple = scheduleArea.getElementsByClassName("multipleEnrolled");
    enrolledFixed = scheduleArea.getElementsByClassName("enrolledFixed")
    total = enrolledMandatory.length + enrolledChoice.length + enrolledMultiple.length + enrolledFixed.length;
    if (calcBar == undefined) {
        calcBar = document.getElementsByClassName("enrollmentStatusWidget problem")[0];
        calcBar.innerText = "Je hebt nu " + total + " uur";
    }
    else {
        calcBar.innerText = "Je hebt nu " + total + " uur";
    }
    if (total >= 37) {
        calcBar.style = "background-color: #77dd77";
    }
    else {
        calcBar.style = "background-color: #ff6961";
    }
}

function hideBar() {
    if (weekButton.className == "swipeSchedulePage showDay") {
        calcBar.style.display = "none";
    }
    else {
        calculateClasses();
    }
}

var checkExist = setInterval(() => {
    if (document.getElementsByClassName("swipeSchedulePage")[0] != undefined) {
        clearInterval(checkExist);

        titleBar = document.getElementsByClassName("navBar")[0];

        buttonLeft = document.createElement("button");
        buttonLeft.innerText = "<-";
        buttonLeft.addEventListener('click', function(event) {
            document.body.dispatchEvent(left);
          });
        buttonLeft.style = "max-width: 75px;\
                            height: 25px;\
                            position: relative;\
                            bottom: -10px;\
                            right: -250px;\
                            background-color:#e0e0e0 !important;\
                            border-radius: 10px;\
                            color: #1f1f1f !important;\
                            line-height: 0px;";
        titleBar.appendChild(buttonLeft);

        buttonRight = document.createElement("button");
        buttonRight.innerText = "->";
        buttonRight.addEventListener('click', function(event) {
            document.body.dispatchEvent(right);
          });
        buttonRight.style ="max-width: 75px;\
                            height: 25px;\
                            position: relative;\
                            bottom: -10px;\
                            right: -350px;\
                            background-color:#e0e0e0 !important;\
                            border-radius: 10px;\
                            color: #1f1f1f !important;\
                            line-height: 0px;";
        titleBar.appendChild(buttonRight);

        weekButton = document.getElementsByClassName("swipeSchedulePage")[0];
        var observerWeek = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                hideBar();
            });
        });
        observerWeek.observe(weekButton, { attributes: true } );

        var enrollmentText = document.getElementsByClassName("enrollmentText")[0];
        var observerEnroll = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                calculateClasses();
            });
        });
        observerEnroll.observe(enrollmentText, { attributes: false, childList: true, characterData: true,} );

        medButton = document.getElementsByClassName("master")[0];
        var observerMededeling = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                fixMededelingen();
            });
        });
        observerMededeling.observe(medButton, { attributes: true, childList: true, characterData: false,} );

        changeSmallThings();

    }
}, 100);