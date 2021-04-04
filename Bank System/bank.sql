DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS administrator;

CREATE TABLE account (
  accountId decimal(12,0) NOT NULL,
  identificationNumber varchar(45) NOT NULL,
  clientId decimal(12,0) NOT NULL,
  type varchar(45) NOT NULL,
  balance float NOT NULL,
  creationDate date NOT NULL,
  PRIMARY KEY (accountId)
); 

CREATE TABLE administrator (
  administratorId decimal(12,0) NOT NULL,
  name varchar(45) NOT NULL,
  username varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  PRIMARY KEY (administratorId)
);

CREATE TABLE client (
  clientId decimal(12,0) NOT NULL,
  name varchar(45) NOT NULL,
  identityCardNumber decimal(12,0) NOT NULL,
  cnp varchar(45) NOT NULL,
  address varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  PRIMARY KEY (clientId)
); 

CREATE TABLE employee (
  employeeId decimal(12,0) NOT NULL,
  name varchar(45) NOT NULL,
  username varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  PRIMARY KEY (employeeId)
);  


INSERT INTO administrator(administratorId, name, username, password, email) VALUES(100,'Moldovan Vlad', 'admin','admin','admin123@yahoo.com');

INSERT INTO employee(employeeId, name, username, password, email) VALUES(300,'Vasile Alexandru','vasile123','alexandru123','vasile123@yahoo.com');
INSERT INTO employee(employeeId, name, username, password, email) VALUES(301,'Muresan Teodor','muresan123','teodor123','muresan199@yahoo.com');
INSERT INTO employee(employeeId, name, username, password, email) VALUES(302,'Dorian Andrei','dorian99','ddorian01','doriand@yahoo.com');
INSERT INTO employee(employeeId, name, username, password, email) VALUES(303,'Dordoi Mihai','doroc','mmihi','turbomihai@yahoo.com');
INSERT INTO employee(employeeId, name, username, password, email) VALUES(304,'Gavris Alin','ggalin','aavris','gavris98@yahoo.com');

INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(400,'Becali Marian',123456,'1890508320355','Str. 1 Mai nr.5', 'becalim@yahoo.com');
INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(401,'Dumitru Dragomir',123457,'1910710370249','Str. Observatorului nr.81','dumitru123@yahoo.com');
INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(402,'Daniel Cioaca',123458,'1991028459403','Str. Observatorului nr.83','danielc@yahoo.com');
INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(403,'Crisan Mircea',123459,'1871025269136','Str. Fantanele nr.27','mircea@yahoo.com');
INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(404,'Horatiu Calin',123441,'1920506356521','Str. 21 Decembrie nr. 80','horatiuc@yahoo.com');
INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(405,'Georgiu Catalin',123442,'1970210428357','Str. Vlad Tepes nr. 100','georgiucat@yahoo.com');
INSERT INTO client(clientId, name, identityCardNumber, cnp, address, email) VALUES(406,'Maria Ioana',123443,'2880130305329','Str. Stefan cel mare nr.3','mariaio@yahoo.com');

INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(500,'4400991188880000',400,'Savings',10000.5,STR_TO_DATE('05-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(501,'4400991188880001',401,'Current',20000.5,STR_TO_DATE('06-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(502,'4400991188880002',402,'Savings',40030.5,STR_TO_DATE('05-JUN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(503,'4400991188880003',403,'Current',100000.5,STR_TO_DATE('29-JUN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(504,'4400991188880004',404,'Savings',20000.9,STR_TO_DATE('15-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(505,'4400991188880005',405,'Savings',50000.5,STR_TO_DATE('16-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(506,'4400991188880006',406,'Savings',70000.2,STR_TO_DATE('17-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(507,'4400991188880007',406,'Current',100000.2,STR_TO_DATE('17-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(600,'1111111111111110',0,'Gas',0,STR_TO_DATE('01-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(601,'1111111111111110',0,'Electricity',0,STR_TO_DATE('01-JAN-2020','%d-%b-%Y'));
INSERT INTO account(accountId, identificationNumber, clientId, type, balance, creationDate) VALUES(602,'1111111111111110',0,'Internet',0,STR_TO_DATE('01-JAN-2020','%d-%b-%Y'));

