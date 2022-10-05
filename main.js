

let exerciseList = [];



function addExercise() {
    
    if (document.getElementById('exercises').value != '') {
        // Empty ul and errorMessage
        document.getElementById('exerciseList').innerHTML = '';
        document.getElementById('messageContainer').innerHTML = '';
        

        // Get the exercise name from input field
        const exerciseInput = document.getElementById('exercises');
        console.log(exerciseInput.value);
        
        // Add exercise to array
        exerciseList.push(exerciseInput.value);
        console.log(exerciseList);

        // Export items froms array and add items as li element to exerciseList
        exerciseList.map((exercise) => {
            const listElement = document.createElement('li');
            listElement.textContent = exercise;
            document.getElementById('exerciseList').appendChild(listElement);
        });

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


