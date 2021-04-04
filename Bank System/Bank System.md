## Objective
The objective of this assignment is to allow students to become familiar with architectural patterns.

## Application Description
Use JAVA/C# API to design and implement an application for the front desk employees of a bank. The application should have two types of users (a regular user represented by the front desk employee and an administrator user) which have to provide a username and a password in order to use the application.

The regular user can perform the following operations:
- Add/update/view client information (name, identity card number, personal numerical code, address, etc.).
- Create/update/delete/view client account (account information: identification number, type, amount of money, date of creation).
- money between accounts.
- Process utilities bills (represented as money transfer to some predefined accounts of utility companies - e.g., gas, electricity, internet).

The administrator user can perform the following operations:
- CRUD on employees’ information.

## Application Constraints
- The data will be stored in a database. Use the Layers architectural pattern to organize your application. Use a domain logic pattern (transaction script or domain model) / a data source hybrid pattern (table module, active record) and a data source pure pattern (table data gateway, row data gateway, data mapper) most suitable for the application.
- do not use an Object Relational Mapper framework. Write the queries against the database in SQL.
- SQL script for creating and populating the database with initial values.
- the inputs of the application will be validated against invalid data before submitting the data and saving it in the database.
