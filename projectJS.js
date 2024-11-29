document.addEventListener('DOMContentLoaded', () => {
    const printButton = document.getElementById('print');
    const downloadButton = document.getElementById('download');
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const generatePageButton = document.getElementById('generatePage');
    
    //user validation
    function userValidate() {
        let email = document.getElementById('email').value;
        let name = document.getElementById('name').value;
        let goal = document.getElementById('goal').value;

        if (email=== '') {
            alert('Please enter a valid email address before proceeding.');
            return false;
        }
        else if (name ===''){
            alert('Please enter a name before proceeding.');
            return false;
        }
        else if (goal===''){
            alert('Please enter a meal goal before proceeding.');
            return false;
        }
        else {
            return true;
        }
        
    }


    // print function
    printButton.addEventListener('click', () => {
        if (userValidate()) {
            window.print();
        }
    });

    // download function
    downloadButton.addEventListener('click', () => {
        let email = document.getElementById('email').value;
        let name = document.getElementById('name').value;
        let goal = document.getElementById('goal').value;
        if (userValidate()) {

        let mealPlanText = `Meal Plan for: ${name}\nEmail: ${email}\nWeekly Goal: ${goal}\n\n`;

        // day loop
        const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
        days.forEach(day => {
            mealPlanText += `\n${capitalizeFirstLetter(day)}:\n`;
            const meals = ['breakfast', 'snack1','lunch', 'snack2', 'dinner'];
            meals.forEach(meal => {
                const mealInput = document.getElementById(`${day}_${meal}`);
                if (mealInput) {
                    mealPlanText += `${capitalizeFirstLetter(meal)}: ${mealInput.value}\n`;
                }
            });
        });

        const blob = new Blob([mealPlanText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name}_meal_plan.txt`;
        link.click();
    }
    });

    // form submit
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (userValidate()){
            alert('Meal Plan Submitted!');
            }
    });

    // reset form
    resetButton.addEventListener('click', () => {
        const formElements = document.querySelectorAll('input[type="text"], input[type="email"]');
        formElements.forEach(input => {
            input.value = '';
        });
    });
    // generate new page
    generatePageButton.addEventListener('click', () => {
        let email = document.getElementById('email').value;
        let name = document.getElementById('name').value;
        let goal = document.getElementById('goal').value;
        if (userValidate()) {
    
            let mealPlanHTML = `
                <html>
                    <head>
                        <title>${name}'s Meal Plan</title>
                        <style>
                            .body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
                            .h1 { text-align: center; color: #333; }
                            .h2 { color: #4CAF50; }
                            .ul { list-style-type: none; padding: 0; }
                            .li { margin: 5px 0; }
                            .meal-container { margin: 20px; }
                        </style>
                    </head>
                    <body>
                        <h1>${name}'s Meal Plan</h1>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Weekly Goal:</strong> ${goal}</p>
                        <div class="meal-container">
            `;
    
            const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
            days.forEach(day => {
                mealPlanHTML += `<h2>${capitalizeFirstLetter(day)}</h2><ul>`;
                const meals = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'];
                meals.forEach(meal => {
                    const mealInput = document.getElementById(`${day}_${meal}`);
                    if (mealInput && mealInput.value.trim() !== "") {
                        mealPlanHTML += `<li><strong>${capitalizeFirstLetter(meal)}:</strong> ${mealInput.value}</li>`;
                    }
                });
                mealPlanHTML += `</ul><br>`;
            });
    
            mealPlanHTML += `
                        </div>
                    </body>
                </html>
            `;
    
            const newWindow = window.open();
            newWindow.document.write(mealPlanHTML);
            newWindow.document.close();
        }
    });
    // Helps for readability
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
