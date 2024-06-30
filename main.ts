#! /usr/bin/env node
import inquirer from "inquirer";

// Define the type for todos
type Todo = string;

let todos: Todo[] = [];

(async () => {
    let exit = false;
    do {
        let todotask = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: ["Add", "Replace", "View", "Delete", "Exit"]
        });

        if (todotask.select === "Add") {
            let addtodo = await inquirer.prompt({
                message: "What do you want to add to the todo list?",
                type: "input",
                name: "item"
            });
            todos.push(addtodo.item);
            console.log(todos);
        } else if (todotask.select === "Replace") {
            let Replacetodo = await inquirer.prompt({
                message: "Replace item in the todo list",
                type: "list",
                name: "item",
                choices: todos.map(item => item)
            });
            let addtodo = await inquirer.prompt({
                message: "Add item",
                type: "input",
                name: "item"
            });
            let newtodo: Todo[] = todos.filter(val => val !== Replacetodo.item);
            todos = [...newtodo, addtodo.item];
            console.log(todos);
        } else if (todotask.select === "View") {
            console.log(todos);
        } else if (todotask.select === "Delete") {
            let deletetodo = await inquirer.prompt({
                message: "Delete item in the todo list",
                type: "list",
                name: "item",
                choices: todos.map(item => item)
            });
            let newtodo: Todo[] = todos.filter(val => val !== deletetodo.item);
            todos = [...newtodo];
            console.log(todos);
        } else if (todotask.select === "Exit") {
            exit = true;
            console.log("Exiting the program. Goodbye!");
        }
    } while (!exit);
})();
