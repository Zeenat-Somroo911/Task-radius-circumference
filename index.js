import inquirer from 'inquirer';
import chalk from 'chalk';
let developerName; // Define developerName at a higher scope
// Function to calculate the area of a circle
function calculateArea(radius) {
    return Math.PI * radius * radius;
}
// Function to calculate the circumference of a circle
function calculateCircumference(radius) {
    return 2 * Math.PI * radius;
}
// Function to prompt the user for the developer's name
function askDeveloperName() {
    return inquirer.prompt({
        type: 'input',
        name: 'developerName',
        message: 'What is your name?',
    }).then((answers) => {
        developerName = answers.developerName; // Assign developerName after getting the input
    });
}
// Function to display a welcome message
function displayWelcomeMessage(name) {
    console.log(chalk.yellow(`Welcome, ${name}! Let's calculate the area and circumference of a circle.`));
}
// Function to display a thank you message
function displayThankYouMessage(name) {
    console.log(chalk.yellow(`Thank you, ${name}, for using this program!`));
}
// Prompt the user for the developer's name
askDeveloperName()
    .then(() => {
    displayWelcomeMessage(developerName);
    // Prompt the user to enter the radius
    return inquirer.prompt([
        {
            type: 'input',
            name: 'radius',
            message: 'Enter the radius of the circle:',
            validate: (input) => {
                const parsedRadius = parseFloat(input);
                if (isNaN(parsedRadius) || parsedRadius <= 0) {
                    return 'Please enter a valid positive number for the radius.';
                }
                return true;
            },
        },
    ]);
})
    .then((answers) => {
    const radius = parseFloat(answers.radius);
    const area = calculateArea(radius);
    const circumference = calculateCircumference(radius);
    console.log(chalk.green(`Area of the circle: ${area.toFixed(2)}`));
    console.log(chalk.blue(`Circumference of the circle: ${circumference.toFixed(2)}`));
    // Prompt the user with a thank you message
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'thankYou',
            message: 'Would you like to display a thank you message?',
            default: true,
        },
    ]);
})
    .then((answers) => {
    if (answers.thankYou) {
        displayThankYouMessage(developerName);
    }
})
    .catch((error) => {
    console.error(chalk.red('An error occurred:', error.message));
});
