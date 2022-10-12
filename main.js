

let exerciseList = [];


// Validation
function validateInput(validationId, messageTargetId, message) {

    if (document.getElementById(validationId).value == '') {
        document.getElementById(messageTargetId).innerHTML = message;
    } else {
        document.getElementById(messageTargetId).innerHTML = '';
    }

}


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

    console.log(exerciseList);
    
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

        // Testings for li element activation
            console.log(exerciseList);


            console.log("length: " +  (document.getElementById('exerciseList').getElementsByTagName('li').length - 1));

            //console.log(document.getElementById('exerciseList'));
            //console.log(document.getElementById('exerciseList').getElementsByTagName('li'));
            console.log(document.getElementById('exerciseList').getElementsByTagName('li')[0]);

document

    } else {

        validateInput('exercises', 'messageContainer', 'You need to enter exercise!')
        
        /*
        Tulisiko validation funktion ottaa mallia tästä?
        - Nyt HTML:n sekaan on määritelty tyhjiä p -elementtejä.
        - Tulisiko ne lisätä ja poistaa aina tarpeen mukaan? 
        
        // Empty error message
        document.getElementById('messageContainer').innerHTML = '';
        
        // Create new p element for error message and add it to errorMessageContainer
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'You need to enter exercise!';
        document.getElementById('messageContainer').appendChild(errorMessage);
        */

    } 

}


// Variables for timer
let seconds;
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


// Active exercise indicator
const activeIndicator = 'ACTIVE EXERCISE'
const activeElement = document.createElement('p');
activeElement.textContent = activeIndicator;

let index = 0;

// Timer function
function timer() {

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

    // Take action when timer phase is done
    if (seconds <= -1) {

        isPaused = true;

            if (currentPhase === 'active') {
                document.getElementById('timer').innerHTML = `Workout done! Time to rest`;
                // If current phase is active lets change the it to rest    
                currentPhase = 'rest';
                console.log(`current phase changed to ${currentPhase}`);
                
                // Set up seconds to rest seconds and reset milliseconds    
                seconds = restTimeInSeconds;
                milliSeconds = 0;
                setTimeout(() => {
                    // Set value for isPaused to false so timer starts running
                    isPaused = false;
                }, "1000")
            }

            else if (currentPhase === 'rest') {
                document.getElementById('timer').innerHTML = `Rest done! Get ready for next excercise.`;
                // If current phase is rest lets change the it to active
                currentPhase = 'active';
                console.log(`current phase changed to ${currentPhase}`);

                
                // Set next exercise active
                // Check if index grows bigger than list has items return it to starting position
                if (document.getElementById('exerciseList').getElementsByTagName('li').length <= (index + 1)) {
                    index = -1;
                }
                // Bump up the index
                index++;
                // Add active indicator into the element
                document.getElementById('exerciseList').getElementsByTagName('li')[index].appendChild(activeElement);

                // Set up seconds to active seconds and reset milliseconds
                seconds = activeTimeInSeconds;
                milliSeconds = 0;
                
                setTimeout(() => {
                    // Set value for isPaused to false so timer starts running
                    isPaused = false;
                }, "1000")
            }

    }
    
}


// Start timer function
function start() {

    validateInput('activeTime', 'activeTimeError', 'You must add active time!');
    validateInput('restTime', 'restTimeError', 'You must add rest time!');

    if (activeTime.value == '') {
        return;
    } else if (restTime.value == '') {
        return;
    } else {
        if (isEnded) {
            seconds = activeTimeInSeconds;
            milliSeconds = 0;
            currentPhase = 'active';
            isEnded = false;
        }
        if (isPaused) {
            // Check if timer is used first time
            if (currentPhase === 'active' && seconds === undefined) {

                seconds = activeTimeInSeconds;
                
                if (document.getElementById('exerciseList').getElementsByTagName('li').length > 0) {
                    // Activating first exercise from the list
                    document.getElementById('exerciseList').getElementsByTagName('li')[0].appendChild(activeElement);                    
                }
                
            }
            isPaused = false;
            console.log('Timer started');
            console.log("current phase: " + currentPhase);
        }
    }
}


// Pause timer function
function pause() {
    if(!isPaused) {
        isPaused = true;
        console.log('Timer paused');
        console.log("current phase: " + currentPhase);
    }
}


// End timer function
function end() {
    isPaused = true;
    isEnded = true;
    document.getElementById('timer').innerHTML = `Timer ended!`;
}


// Function that runs timer after every 10 milliseconds if timer is not paused
const timerInterval = setInterval(() => {
    if(!isPaused) {
        timer();
    }
}, 10);