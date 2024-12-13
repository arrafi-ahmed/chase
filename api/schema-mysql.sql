CREATE OR REPLACE TABLE users (
    userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) DEFAULT NULL,
    surname VARCHAR(100) DEFAULT NULL,
    updateDate VARCHAR(100) DEFAULT NULL,
    company VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (userId)
);

CREATE OR REPLACE TABLE contacts (
    contactId INT NOT NULL AUTO_INCREMENT,
    contactName VARCHAR(100) DEFAULT NULL,
    category ENUM ('client', 'company', 'vendor', 'contractor', 'employee', 'other') DEFAULT NULL,
    company VARCHAR(100) DEFAULT NULL,
    address VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    phone INT DEFAULT NULL,
    comments VARCHAR(100) DEFAULT NULL,
    mobile INT DEFAULT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (contactId),
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE employees (
    employeeId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(300) DEFAULT NULL,
    position ENUM ('Encargado', 'Ayudante', 'Principal', 'Becario', 'Otro') DEFAULT NULL,
    project VARCHAR(100) DEFAULT NULL,
    mandatoryEquipment ENUM ('Si', 'No', 'Incompleto') DEFAULT NULL,
    comments VARCHAR(300) DEFAULT NULL,
    filesId INT DEFAULT NULL,
    projectId INT DEFAULT NULL,
    hoursId INT DEFAULT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (employeeId),
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE projects (
    projectId INT NOT NULL AUTO_INCREMENT,
    projectName VARCHAR(100) NOT NULL,
    userId INT DEFAULT NULL,
    employeeId INT DEFAULT NULL,
    addressDescription TEXT DEFAULT NULL,
    block VARCHAR(255) DEFAULT NULL, -- New column for block
    unit VARCHAR(255) DEFAULT NULL, -- New column for unit
    zipCode VARCHAR(20) DEFAULT NULL, -- New column for zipCode (VARCHAR for flexibility)
    province VARCHAR(255) DEFAULT NULL, -- New column for province
    startDate DATE DEFAULT NULL,
    endDate DATE DEFAULT NULL,
    projectDescription TEXT DEFAULT NULL, -- New column for project description
    typeOfWork ENUM ('construction', 'finishings', 'installations', 'solarPanels', 'other') DEFAULT NULL,
    constructionType ENUM ('chalet', 'apartment', 'rural', 'other') DEFAULT NULL,
    sections JSON DEFAULT NULL, -- New column for sections (JSON)
    hiringCompany VARCHAR(255) DEFAULT NULL, -- New column for hiring company
    image VARCHAR(255) DEFAULT NULL, -- New column for image (VARCHAR for file paths)
    status ENUM ('noIniciado', 'iniciado', 'terminado') DEFAULT 'noIniciado',
    reports JSON DEFAULT NULL, -- New column for reports (JSON)
    PRIMARY KEY (projectId),
    FOREIGN KEY (employeeId) REFERENCES employees (employeeId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

-- Drop the existing foreign key constraint if it exists
ALTER TABLE employees
    ADD CONSTRAINT fk_projectId FOREIGN KEY (projectId) REFERENCES projects (projectId) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE OR REPLACE TABLE hours (
    hoursId INT NOT NULL AUTO_INCREMENT,
    projectId INT DEFAULT NULL,
    employeeId INT DEFAULT NULL,
    extraHours INT DEFAULT NULL,
    regularHours INT DEFAULT NULL,
    regularMinutes INT DEFAULT NULL,
    extraMinutes INT DEFAULT NULL,
    date DATE NOT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (hoursId),
    FOREIGN KEY (employeeId) REFERENCES employees (employeeId) ON DELETE CASCADE,
    FOREIGN KEY (projectId) REFERENCES projects (projectId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE orders (
    orderId INT NOT NULL AUTO_INCREMENT,
    projectId INT DEFAULT NULL,
    productName VARCHAR(100) DEFAULT NULL,
    provider VARCHAR(100) DEFAULT NULL,
    brand VARCHAR(100) DEFAULT NULL,
    amount VARCHAR(200) DEFAULT NULL,
    details LONGTEXT DEFAULT NULL,
    date DATE DEFAULT NULL,
    status ENUM ('pendiente', 'recibido') DEFAULT NULL,
    projectName VARCHAR(100) DEFAULT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (orderId),
    FOREIGN KEY (projectId) REFERENCES projects (projectId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE pendings (
    pendingId INT NOT NULL AUTO_INCREMENT,
    details VARCHAR(200) DEFAULT NULL,
    date DATE DEFAULT NULL,
    status ENUM ('pendiente', 'terminado') DEFAULT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (pendingId),
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE tasks (
    taskId INT NOT NULL AUTO_INCREMENT,
    taskName VARCHAR(200) NOT NULL,
    employeeName VARCHAR(100) DEFAULT NULL,
    employeeId INT DEFAULT NULL,
    taskDescription VARCHAR(100) DEFAULT NULL,
    startDate DATE DEFAULT NULL,
    endDate DATE DEFAULT NULL,
    projectId INT DEFAULT NULL,
    status ENUM ('noIniciado', 'iniciado', 'terminado') DEFAULT 'noIniciado',
    sectionKey VARCHAR(100) DEFAULT NULL,
    prevImages JSON DEFAULT NULL,
    finalImages JSON DEFAULT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (taskId),
    FOREIGN KEY (employeeId) REFERENCES employees (employeeId) ON DELETE CASCADE,
    FOREIGN KEY (projectId) REFERENCES projects (projectId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE reports (
    reportId INT NOT NULL AUTO_INCREMENT,
    reportName VARCHAR(250) NOT NULL,
    projectId INT DEFAULT NULL,
    employeeId INT DEFAULT NULL,
    hoursId INT DEFAULT NULL,
    reportDate DATE NOT NULL,
    reportType ENUM ('project', 'hours', 'purchase') DEFAULT NULL,
    taskId INT DEFAULT NULL,
    filesId INT DEFAULT NULL,
    userId INT DEFAULT NULL,
    PRIMARY KEY (reportId),
    FOREIGN KEY (employeeId) REFERENCES employees (employeeId) ON DELETE CASCADE,
    FOREIGN KEY (hoursId) REFERENCES hours (hoursId) ON DELETE CASCADE,
    FOREIGN KEY (projectId) REFERENCES projects (projectId) ON DELETE CASCADE,
    FOREIGN KEY (taskId) REFERENCES tasks (taskId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);
