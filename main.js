

let exerciseList = [];


function exercisesToList() {
    // Export items froms array and add items as li element to exerciseList
    exerciseList.map((exercise) => {
    
        const listElement = document.createElement('li');
        const exerciseText = document.createElement('p');
        exerciseText.textContent = exercise;
        
        // Delete button
        const btn = document.createElement('button');
        btn.innerHTML = 'Delete';

        // Tämä ei toimi!!!
        //btn.setAttribute("onclick","deleteExercise(e)");
        
        // Miksi tämä toimii???
        //btn.onclick = function (e) {console.log(e.target)}

        btn.addEventListener('click', deleteExercise)
        
        listElement.appendChild(exerciseText);
        listElement.appendChild(btn);
        document.getElementById('exerciseList').appendChild(listElement);

    });
}


function deleteExercise(e) {

    // Empty ul
    document.getElementById('exerciseList').innerHTML = '';

    const targetLi = e.target.previousSibling.innerHTML;
    console.log(`Exercise ${targetLi} deleted!`);
    
    const indexOfTarget = exerciseList.indexOf(targetLi);
    console.log(indexOfTarget);

    exerciseList.splice(indexOfTarget, 1);

    // Export items froms array and add items as li element to exerciseList
    exercisesToList();
    
}

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


