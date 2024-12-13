# React + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Sincro360

## Descripción

Sincro360 es una aplicación web dirigida para controlar de manera general y básica, un proyecto de reparación o supervisión de obra pequeña.
cuenta con diferentes secciones como proyectos (crear, editar, eliminar, agregar tareas, colocarles los estados y crear reportes o pdf; una sección de contactos en donde se podrán organizar por cliente, empresa, proveedor, subcontratista, trabajador y otras a quienes podrás llamar o enviar un email directamente pinchando en su nombre; podrás agregar pedidos (organizado por proyecto) y enviarlos por email al departamento de compras; además de llevar un control de las horas del personal y crear un reporte de las mismas según rango de tiempo solicitado), utiliza Node.js, MySQL, React, archivos subidos a cloudinary y /Docker/gitActions para el deployment en Hostinger.

#Nota:

este proyecto se encuentra en proceso de cambios y pruebas, entre ellos migración desde material ui hacia Bootstrap y mejoramiento de código en general. Encontrarás algunas bibliotecas como Leaflet o Konva, que han sido suspendidas por incompatibilidad con otras funcionalidades existentes, pero que serán usadas en el futuro, puedes eliminarlas si deseas al igual que sus correspondientes componentes.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Scripts](#scripts)
- [Configuración](#configuración)
- [Uso](#uso)
- [Dependencias](#dependencias)
- [Licencia](#licencia)

## Instalación

### Backend

1. Clona el repositorio:

   ```bash
   git clone <https://github.com/Veronicachase/sincro.git>
   cd <sincro/api>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

### Frontend

1. Navega al directorio del frontend:

   ```bash
   cd <sincro/client>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Scripts

### Backend

- `npm run dev`: Inicia el servidor utilizando Nodemon. ( modo developer)
- `npm start`: Inicia el servidor utilizando Nodemon.(modo production )
- `npm test`: Ejecuta las pruebas.

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Previsualiza la compilación de producción.

## Configuración

### Backend

Crea un archivo `.env` puede ser .env.development y .env.production en el directorio raíz del backend y añade tus variables de entorno necesarias. Aquí hay un ejemplo:

PORT="3001"

# MySQL

DB_PORT='3306'
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='xxxxxxxx'
DB_NAME='el nombre que le darás a tu base de datos'
JWT_SECRET='el secret de jtw (debes crearte uno)'

# URL Frontend

FRONTEND_URL=http://localhost:5174

# Cloudinary

## Debes crearte una cuenta en Cloudinary y buscar la siguiente información y agregarla aquí :

CLOUD_NAME=xxxxxx
API_KEY=xxxxxxxx
API_SECRET=xxxxxxxx
CLOUDINARY_URL=cloudinary://xxxxxxxx:xxxxxxxxxxxxxxxxxx

## Frontend

Crea un archivo `.env` puede ser .env.development y .env.production en el directorio raíz del Frontend y añade tus variables de entorno necesarias. Aquí hay un ejemplo:
VITE_API_URL=http://localhost:3001

##BASE DE DATOS MYSQL

tu base de datos debe contener lo siguientes campos: copia este script O EDITOR SQL si vas a usar este tipo de bd.

## -- Table structure for table `contacts`

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
`contactName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4*0900_ai_ci DEFAULT NULL,
`contactId` int NOT NULL AUTO_INCREMENT,
`category` enum('client','company','vendor','contractor','employee','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`company` varchar(100) DEFAULT NULL,
`address` varchar(100) DEFAULT NULL,
`email` varchar(100) DEFAULT NULL,
`phone` int DEFAULT NULL,
`comments` varchar(100) DEFAULT NULL,
`mobile` int DEFAULT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`contactId`),
KEY `contacts_users_FK` (`userId`),
CONSTRAINT `contacts_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `employees` (
`employeeId` int NOT NULL AUTO*INCREMENT,
`date` date DEFAULT NULL,
`name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`position` enum('Encargado','Ayudante','Principal','Becario','Otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`project` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`mandatoryEquipment` enum('Si','No','Incompleto') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`comments` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`filesId` int DEFAULT NULL,
`projectId` int DEFAULT NULL,
`hoursId` int DEFAULT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`employeeId`),
KEY `employee_files_FK` (`filesId`),
KEY `employee_projects_FK` (`projectId`),
KEY `employees_users_FK` (`userId`),
CONSTRAINT `employee_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `employees_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf16le;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `hours`
--

DROP TABLE IF EXISTS `hours`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `hours` (
`hoursId` int NOT NULL AUTO*INCREMENT,
`projectId` int DEFAULT NULL,
`employeeId` int DEFAULT NULL,
`extraHours` int DEFAULT NULL,
`regularHours` int DEFAULT NULL,
`regularMinutes` int DEFAULT NULL,
`extraMinutes` int DEFAULT NULL,
`date` date NOT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`hoursId`),
KEY `hours_employees_FK` (`employeeId`),
KEY `hours_projects_FK` (`projectId`),
KEY `hours_users_FK` (`userId`),
CONSTRAINT `hours_employees_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `hours_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `hours_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `orders` (
`orderId` int NOT NULL AUTO*INCREMENT,
`projectId` int DEFAULT NULL,
`productName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`provider` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`brand` varchar(100) DEFAULT NULL,
`amount` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`details` longtext,
`date` date DEFAULT NULL,
`status` enum('pendiente','recibido') DEFAULT NULL,
`image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
`projectName` varchar(100) DEFAULT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`orderId`),
KEY `orders_projects_FK` (`projectId`),
KEY `orders_users_FK` (`userId`),
CONSTRAINT `orders_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `orders_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `pendings`
--

DROP TABLE IF EXISTS `pendings`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `pendings` (
`pendingId` int NOT NULL AUTO*INCREMENT,
`details` varchar(200) DEFAULT NULL,
`date` date DEFAULT NULL,
`status` enum('pendiente','terminado') DEFAULT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`pendingId`),
KEY `pendings_users_FK` (`userId`),
CONSTRAINT `pendings_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `projects` (
`hiringCompany` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4*0900_ai_ci DEFAULT NULL,
`sections` json DEFAULT NULL,
`projectName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
`userId` int DEFAULT NULL,
`employeeId` int DEFAULT NULL,
`projectId` int NOT NULL AUTO_INCREMENT,
`block` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`unit` varchar(100) DEFAULT NULL,
`zipCode` int DEFAULT NULL,
`province` varchar(100) DEFAULT NULL,
`addressDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
`typeOfWork` enum('construction','finishings','installations','solarPanels','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`constructionType` enum('chalet','apartment','rural','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`startDate` date DEFAULT NULL,
`endDate` date DEFAULT NULL,
`projectDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
`reports` json DEFAULT NULL,
`image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
`status` enum('noIniciado','iniciado','terminado') DEFAULT 'noIniciado',
PRIMARY KEY (`projectId`),
KEY `projects_employee_FK` (`employeeId`),
KEY `projects_users_FK` (`userId`),
CONSTRAINT `projects_employee_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `projects_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `reports` (
`reportId` int NOT NULL AUTO*INCREMENT,
`reportName` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
`projectId` int DEFAULT NULL,
`employeeId` int DEFAULT NULL,
`hoursId` int DEFAULT NULL,
`reportDate` date NOT NULL,
`reportType` enum('project','hours','purchase') DEFAULT NULL,
`taskId` int DEFAULT NULL,
`filesId` int DEFAULT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`reportId`),
KEY `reports_files_FK` (`filesId`),
KEY `reports_employees_FK` (`employeeId`),
KEY `reports_hours_FK` (`hoursId`),
KEY `reports_projects_FK` (`projectId`),
KEY `reports_tasks_FK` (`taskId`),
KEY `reports_users_FK` (`userId`),
CONSTRAINT `reports_employees_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `reports_hours_FK` FOREIGN KEY (`hoursId`) REFERENCES `hours` (`hoursId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `reports_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `reports_tasks_FK` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`taskId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `reports_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `tasks` (
`taskId` int NOT NULL AUTO*INCREMENT,
`taskName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
`employeeName` varchar(100) DEFAULT NULL,
`employeeId` int DEFAULT NULL,
`taskDescription` varchar(100) DEFAULT NULL,
`startDate` date DEFAULT NULL,
`endDate` date DEFAULT NULL,
`projectId` int DEFAULT NULL,
`status` enum('noIniciado','iniciado','terminado') DEFAULT 'noIniciado',
`sectionKey` varchar(100) DEFAULT NULL,
`prevImages` json DEFAULT NULL,
`finalImages` json DEFAULT NULL,
`userId` int DEFAULT NULL,
PRIMARY KEY (`taskId`),
KEY `task_employee_FK` (`employeeId`),
KEY `task_projects_FK` (`projectId`),
KEY `tasks_users_FK` (`userId`),
CONSTRAINT `task_employee_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `task_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE RESTRICT,
CONSTRAINT `tasks_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `users` (
`userId` int NOT NULL AUTO_INCREMENT,
`email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
`password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
`name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`surname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`updateDate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`company` varchar(100) DEFAULT NULL,
PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
