

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


