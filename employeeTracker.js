
var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Mysql123",                                            //process.env.MYSQL_KEY,    
  database: "employee_trackerDB"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //connection.end();
});

function afterConnection() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

/*  Inquirer for command line prompt */

inquirer.prompt([

  {
    type: "list",
    name: "choose",
    message: "What would you like to do?:",
    choices: ['Add Department', 'Add Employee Role','Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager',
      'View All Employees', 'View All Employess by Department', 'View All Employees by Manager']
  }
])
  .then(function (answers) {

    if (answers.choose === "Add Department") {
      addDepartment();
    }
    else if (answers.choose === "Add Employee Role") {
      addEmployeeRole();
    }
    else if (answers.choose === "Add Employee") {
      addEmployee();
    }
    else if (answers.choose === "View All Employees") {
      readEmployees();
    }
    else if (answers.choose === 'Remove Employee') {
      removeEmployee();
    }
    else if (answers.choose === "Update Employee Role") {
      updateRole();
    }
    else if (answers.choose === "Update Employee Manager") {
      updateEmployee();
    }
    else if (answers.choose === "View All  Employees by Department") {
      joinByDepartmentId();
    }
    else if (answers.choose === "View All Employees by Manager") {
      joinByManagerId();
    }
    else {
      console.log("Thanks You for using this program!")
    }
  })


// Write a function for selections
// refer iceCreamCRUD activity

// write a function to add department

function addDepartment() {
  inquirer.prompt([

    {
      type: "list",
      name: "adddept",
      message: "What department to add",
      choices: ['Sales','Engineering','IT','legal','Finance']
    }
  ])
    .then(function (answers) {
  console.log("Adding department for a employee...\n");
  var query = connection.query(
    "INSERT INTO department SET ?",
    {
      id:3,
      name: answers.adddept
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Department added for employee!\n");
     addEmployeeRole();
    })
    })
  }
  // console.log(query.sql);
  
//write a function to add employee roles

function addEmployeeRole() {
  inquirer.prompt([
    {
      type: "list",
      name: "addrole",
      message: "What is the role for employee",
      choices: ['Sales Lead', 'Sales Person','Lead Engineer','Software Engineer','Accountant','Legal Team Lead', 'Lawyer']
    }
  ])
    .then(function (answers) {
  console.log("Adding employee role for a employee...\n");
  var query = connection.query(
    "INSERT INTO role SET ?",
    {
      id: 7,
      department_id:1,
      title: answers.addrole,
      salary: 100000
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Employee role added!\n");
      // Call updateEmployee AFTER the ADD completes
      addEmployee();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
    })
}

// functions for employee table

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "fname",
      message: "What is the first name of employee",
    },
    {
      type: "input",
      name: "lname",
      message: "What is the last name of employee",
    },
    {
      type: "input",
      name: "rid",
      message: "What is the role id of employee",
    },
    {
      type: "input",
      name: "mid",
      message: "What is the manager id of employee",
    }
  ])
    .then(function (answers) {
  console.log("Adding a new employee...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      role_id: 1,
      manager_id: 1
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " New employee added!\n");
      // Call updateEmployee AFTER the ADD completes
      updateEmployeeRole();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
})

}
function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "list",
      name: "updaterole",
      message: "Select the role to be updated for employee",
      choices: ['Sales Lead', 'Sales Person','Lead Engineer','Software Engineer','Accountant','Legal Team Lead', 'Lawyer']
    }
  ])
  console.log("Updating employee role...\n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        id: 8
      },
      {
        role_id: 2
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee role updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      removeEmployee();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function removeEmployee() {
  inquirer.prompt([
    {
    type:"input",
    id: 1
    }
  ])
  console.log("Removing the employee from database...\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      id: 1
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee removed from database!\n");
      // Call readEmployee AFTER the DELETE completes
      readEmployees();
    }
  );
}

function readEmployees() {
  console.log("Selecting all employess...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
   //connection.end();
  });
}

