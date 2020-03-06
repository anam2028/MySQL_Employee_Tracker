
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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

/*  Inquirer prompt for command line prompt */

inquirer.prompt([
  
  {
      type: "list",
      name: "choose",
      message: "Please choose:",
      choices: ['Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager',
      'View All Employees','View All Employess by Department','View All Employees by Manager']
  }
])
  .then(function (answers) {

      if (answers.choose === "Add Employee") {
          addEmployee();

      }
      else if (answers.choose === "View All Employees") {
          joinById();

      }
      else if (answers.choose === 'Remove Employee')
      {
        joinById();
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
      else if (answers.choose === "View All Employees by Manager"){
          joinByManagerId();
      }

      else {
          console.log("Thanks You for using this program!")
      }

  })

