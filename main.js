

let exerciseList = [];


function exercisesToList() {

    // Export items froms array and add items as li element to exerciseList
    exerciseList.map((exercise) => {
    
        // Variables for li element
        const listElement = document.createElement('li');

        // Variable for p element. Inserts exercise name to p element
        const exerciseText = document.createElement('p');
        exerciseText.textContent = exercise;
        
        // Add delete button
        const btn = document.createElement('button');
        btn.innerHTML = 'Delete';
        btn.addEventListener('click', deleteExercise)
        
        // Adds p element and button to li element and after that adds li element to ul
        listElement.appendChild(exerciseText);
        listElement.appendChild(btn);
        document.getElementById('exerciseList').appendChild(listElement);

    });

}


function deleteExercise(e) {

    // Empty ul
    document.getElementById('exerciseList').innerHTML = '';

    // Checks the name of the exercise which is being deleted
    const targetLi = e.target.previousSibling.innerHTML;
    
    // Checks array index of the exercise which is being deleted
    const indexOfTarget = exerciseList.indexOf(targetLi);

    // Use array index to specify which exercise is going to be deleted
    exerciseList.splice(indexOfTarget, 1);

    // Export items froms array and add items as li element to exerciseList
    exercisesToList();

    // If there's no exercises after deleting exercise show message to user
    if (exerciseList.length <= 0) {

        // Creates p element for message and add some text into element
        const messageExerciseListEmpty = document.createElement('p');
        messageExerciseListEmpty.textContent = `You removed all list elements. Add new exercises.`;

        // Adds p element to ul
        document.getElementById('exerciseList').appendChild(messageExerciseListEmpty);
    }
    
}

function addExercise() {
    
    // Check is the input field filled
    if (document.getElementById('exercises').value != '') {

        // Empty ul and errorMessage
        document.getElementById('exerciseList').innerHTML = '';
        document.getElementById('messageContainer').innerHTML = '';
        

        // Get the exercise name from input field
        const exerciseInput = document.getElementById('exercises');
        
        // Add exercise to array
        exerciseList.push(exerciseInput.value);

        // Export items froms array and add items as li element to exerciseList
        exercisesToList();

        // Empty input field
        exerciseInput.value = '';

    } else {

        // Empty error message
        document.getElementById('messageContainer').innerHTML = '';
        
        // Create new p element for error message and add it to errorMessageContainer
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'You need to enter exercise!';
        document.getElementById('messageContainer').appendChild(errorMessage);
    }

}

// Variables for timer
let seconds = 0;
let milliSeconds = 0;

let activeTimePhase = false;
let activeTimeInSeconds = 0;

let restTimePhase = false;
let restTimeInSeconds = 0;

let currentPhase = 'active'

let isPaused = true;
let isEnded = false;



const activeTime = document.getElementById('activeTime')
activeTime.addEventListener('change', setActiveTime)

function setActiveTime() {
    activeTimeInSeconds = activeTime.value;
    console.log(activeTimeInSeconds);
}

const restTime = document.getElementById('restTime');
restTime.addEventListener('change', setRestTime);

function setRestTime() {
    restTimeInSeconds = restTime.value;
    console.log(restTimeInSeconds);
}


// Timer function
function timer() {

console.log("seconds: " + seconds);

    // Remove 1 millisecond
    milliSeconds -= 1;
    
    // When milliseconds hit 0 remove 1 second and set milliseconds to 99
    if (milliSeconds <= 0) {
        seconds--;
        milliSeconds = 99;
    }

    // Add time to html element
    // Checking when timer goes under 10 seconds and add leading 0 to seconds
    if (seconds > 9) {
        document.getElementById('timer').innerHTML = `${seconds}:${milliSeconds}`;
    } else {
        document.getElementById('timer').innerHTML = `0${seconds}:${milliSeconds}`;
    }

    // Take action when timer is done
    if (seconds <= -1) {
        running.objProperty = false;



            
            if (currentPhase === 'active') {
                document.getElementById('timer').innerHTML = `Workout done! Time to rest`;
                // If current phase is active lets change the it to rest    
                currentPhase = 'rest';
                console.log(`current phase changed to ${currentPhase}`);
                
                // Set up seconds to rest seconds and reset milliseconds    
                seconds = restTimeInSeconds;
                milliSeconds = 0;
                setTimeout(() => {
                    // Set value for running to true so timer is running
                    running.objProperty = true;
                }, "2000")
            }



            else if (currentPhase === 'rest') {
                document.getElementById('timer').innerHTML = `Rest done! Get ready for next excercise.`;
                // If current phase is rest lets change the it to active
                currentPhase = 'active';
                console.log(`current phase changed to ${currentPhase}`);

                // Set up seconds to active seconds and reset milliseconds
                seconds = activeTimeInSeconds;
                milliSeconds = 0;
                
                setTimeout(() => {
                    // Set value for running to true so timer is running
                    running.objProperty = true;
                }, "2000")
            }

    }
    
}






// Start timer function
function start() {

    console.log('seconds ' + seconds);

    if (activeTime.value == '') {
        document.getElementById('activeTimeHint').innerHTML = `You must add active time!`;
    } else if (restTime.value == '') {
        document.getElementById('restTimeHint').innerHTML = `You must add rest time!`;
    } else {
        if (isEnded) {
            seconds = activeTimeInSeconds;
            milliSeconds = 0;
            isEnded = false;
        }
        if (running.objProperty === false) {
            // running.prop is related to testing variable change monitoring
            running.objProperty = true;
            console.log("running: " + running.objProperty);
        }
    }
}


// Pause timer function
function pause() {
    if(running.objProperty === true) {
        // running.prop is related to testing variable change monitoring
        running.objProperty = false;
        console.log("running: " + running.objProperty);
    }
}


// End timer function
function end() {
    // running.prop is related to testing variable change monitoring
    running.objProperty = false;
    isEnded = true;
    document.getElementById('timer').innerHTML = `Timer ended!`;
}


//!!!!!!
// Testing function that would run every time if variable is changed
//!!!!!!

console.log("current phase: " + currentPhase);

const running = {};

let value = false;
console.log("value: " + value);

function fn(oldValue, newValue) {
    
    if (newValue === true) {
        console.log("Timer started");

        if (currentPhase === 'active' && seconds === 0) {
            seconds = activeTimeInSeconds;
        }
        

    }
    if (newValue === false) {
        
        console.log("Timer stopped");

    }

    console.log("seconds after: " + seconds);
    console.log("current phase: " + currentPhase);

}

Object.defineProperty(running, "objProperty", {
    get() {
        return value
    },
    set(val) {
        fn(value, val);
        value = val;
    }
});


// function that runs timer after every 10 milliseconds if timer is not paused
const timerInterval = setInterval(() => {
    if(value === true) {
        timer();
    }
}, 10);