const inquirer = require('inquirer').default;
const Database = require('./models/queries');
require('console.table');

async function mainMenu() {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'View Employees By Manager',
            'View Department Managers',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role',
            'Exit'
        ]
    });

    switch (choice) {
        case 'View All Departments':
            console.table(await Database.viewDepartments());
            break;

        case 'View All Roles':
            console.table(await Database.viewRoles());
            break;

        case 'View All Employees':
            console.table(await Database.viewEmployees());
            break;

        case 'View Employees By Manager':
            console.table(await Database.viewEmployeesByManager());
            break;

        case 'View Department Managers':
            console.table(await Database.viewDepartmentManagers());
            break;

        case 'Add A Department':
            const { departmentName } = await inquirer.prompt([
                { type: 'input', name: 'departmentName', message: 'Enter the department name:' }
            ]);
            await Database.addDepartment(departmentName);
            console.log(`✅ ${departmentName} department added to the database!`);
            break;

        case 'Add A Role':
            const departments = await Database.viewDepartments();
            if (departments.length === 0) {
                console.log("❌ ERROR: No departments found! Add a department first.");
                break;
            }

            const departmentChoices = departments.map(d => ({ name: d.name, value: d.id }));

            const { title, salary, department_id } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:' },
                { type: 'input', name: 'salary', message: 'Enter salary (numbers only):', validate: input => /^\d+$/.test(input) ? true : "Please enter a valid number" },
                { type: 'list', name: 'department_id', message: 'Select the department:', choices: departmentChoices }
            ]);

            await Database.addRole(title, salary, department_id);
            console.log(`✅ "${title}" role added successfully to the ${departments.find(d => d.id === department_id).name} department!`);
            break;

        case 'Add An Employee':
            const roles = await Database.viewRoles();
            if (roles.length === 0) {
                console.log("❌ ERROR: No roles found! Add a role first.");
                break;
            }

            const employees = await Database.viewEmployees();
            const roleChoices = roles.map(r => ({ name: r.title, value: r.id }));

            const { isManager } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'isManager',
                    message: 'Is this employee a manager?',
                    choices: [
                        { name: 'Yes', value: true },
                        { name: 'No', value: false }
                    ]
                }
            ]);

            let manager_id = null; 
            if (!isManager && employees.length > 0) {
                const managerChoices = employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }));

                const managerResponse = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Select a manager for this employee:',
                        choices: managerChoices
                    }
                ]);
                manager_id = managerResponse.manager_id;
            }

            const { first_name, last_name, role_id } = await inquirer.prompt([
                { type: 'input', name: 'first_name', message: 'Enter first name:' },
                { type: 'input', name: 'last_name', message: 'Enter last name:' },
                { type: 'list', name: 'role_id', message: 'Select role:', choices: roleChoices }
            ]);

            await Database.addEmployee(first_name, last_name, role_id, manager_id);
            console.log(`✅ "${first_name} ${last_name}" added to the employee roster${isManager ? ' as a manager' : ''}!`);
            break;


        case 'Update An Employee Role':
            const allEmployees = await Database.viewEmployees();
            if (allEmployees.length === 0) {
                console.log("❌ ERROR: No employees found! Add employees first.");
                break;
            }

            const employeeChoices = allEmployees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }));

            const allRoles = await Database.viewRoles();
            if (allRoles.length === 0) {
                console.log("❌ ERROR: No roles found! Add roles first.");
                break;
            }

            const roleOptions = allRoles.map(r => ({ name: r.title, value: r.id }));

            const { employee_id, new_role_id } = await inquirer.prompt([
                { type: 'list', name: 'employee_id', message: 'Select an employee to update:', choices: employeeChoices },
                { type: 'list', name: 'new_role_id', message: 'Select the new role:', choices: roleOptions }
            ]);

            await Database.updateEmployeeRole(employee_id, new_role_id);
            console.log(`✅ Employee role updated successfully!`);
            break;

        case 'Exit':
            console.log('👋 Goodbye!');
            process.exit();
    }

    mainMenu();
}

mainMenu();
