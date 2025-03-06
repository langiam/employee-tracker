const inquierer = require('inquirer');
const Database = require('./models/queries');
const cTable = require('console.table');
const { type } = require('os');

async function mainMenu() {
    const { choice } = await inquierer.prompt({
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
        console.table(await Database.viewManagers());
        break;

    case 'Add A Department':
        const { departmentName } = await inquierer.prompt([
            { type: 'input', name: 'departmentName', message: 'Enter the department name:' }
       ]);
        await Database.addDepartment(departmentName);
        console.log(`✅ ${departmentName} department to the database!   `);
        break;


        case 'Add a role':
            const { title, salary, department_id } = await inquirer.prompt([
              { type: 'input', name: 'title', message: 'Enter role title:' },
              { type: 'input', name: 'salary', message: 'Enter salary:' },
              { type: 'input', name: 'department_id', message: 'Enter department ID:' }
            ]);
            await Database.addRole(title, salary, department_id);
            console.log(`✅ "${title}" role added!`);
            break;
      
          case 'Add an employee':
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
              { type: 'input', name: 'first_name', message: 'Enter first name:' },
              { type: 'input', name: 'last_name', message: 'Enter last name:' },
              { type: 'input', name: 'role_id', message: 'Enter role ID:' },
              { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank for none):' }
            ]);
            await Database.addEmployee(first_name, last_name, role_id, manager_id || null);
            console.log(`✅ "${first_name} ${last_name}" added to employee roster!`);
            break;
      
          case 'Update an employee role':
            const { employee_id, new_role_id } = await inquirer.prompt([
              { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
              { type: 'input', name: 'new_role_id', message: 'Enter new role ID:' }
            ]);
            await Database.updateEmployeeRole(employee_id, new_role_id);
            console.log(`✅ Employee role updated!`);
            break;
      
          case 'Exit':
            console.log('👋 Goodbye!');
            process.exit();
        }
      
        // Loop back to the menu after completing an action
        mainMenu();
      }