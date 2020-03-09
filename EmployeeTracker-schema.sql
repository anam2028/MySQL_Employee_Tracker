DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

/* Create tables in order department, roles and then employee to avoid error for foreign key
*/

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,4) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(department_id) REFERENCES department(id) ON UPDATE cascade 
    ON DELETE cascade;
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE cascade 
    ON DELETE cascade;,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM employee;
select * from department;
select * from role;
