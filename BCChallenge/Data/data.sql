IF EXISTS (SELECT 1 FROM sys.databases WHERE name = 'TRANSPORTATION')
BEGIN
    -- Drop the existing TRANSPORTATION database
    USE master; -- Switch to master database before dropping
    ALTER DATABASE TRANSPORTATION SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE TRANSPORTATION;
END

-- Create a new TRANSPORTATION database
CREATE DATABASE TRANSPORTATION;

-- Use the TRANSPORTATION database
USE TRANSPORTATION;

-- Create TRANSPORTATION_OPTIONS table
CREATE TABLE TRANSPORTATION_OPTIONS(
	ID INT IDENTITY(1,1) NOT NULL,
    	DESCRIPTION NVARCHAR(255),
    	PROVIDER_NAME NVARCHAR(100),
    	VEHICLE_TYPE NVARCHAR(50),
    	PRICE DECIMAL(10, 2),
    	DURATION NVARCHAR(20),
	ORIGIN NVARCHAR(255) NULL,
	DESTINATION nvarchar(255) NULL,
	DATE DATE NULL,
	TIME TIME(7) NULL,
);


-- Enable IDENTITY_INSERT for TRANSPORTATION_OPTIONS
SET IDENTITY_INSERT TRANSPORTATION_OPTIONS ON;

-- Insert sample data into TRANSPORTATION_OPTIONS
INSERT INTO TRANSPORTATION_OPTIONS (ID, DESCRIPTION, PROVIDER_NAME, VEHICLE_TYPE, PRICE, DURATION, ORIGIN, DESTINATION, DATE, TIME)
VALUES
    (1, 'BC FERRIES from Vancouver to Victoria', 'BC FERRIES', 'Sea bus', 80.00, '90 minutes', 'Vancouver', 'Victoria', '2024-01-21', '8:00AM'),
	(2, 'BC FERRIES from Vancouver to Victoria', 'BC FERRIES', 'Sea bus', 80.00, '90 minutes', 'Vancouver', 'Victoria', '2024-01-21', '9:00AM'),
	(3, 'BC FERRIES from Vancouver to Victoria', 'BC FERRIES', 'Sea bus', 80.00, '90 minutes', 'Vancouver', 'Victoria', '2024-01-21', '10:00AM'),
	(4, 'BC FERRIES from Vancouver to Victoria', 'BC FERRIES', 'Sea bus', 80.00, '90 minutes', 'Vancouver', 'Victoria', '2024-01-21', '11:00AM'),
	(5, 'BC FERRIES from Vancouver to Victoria', 'BC FERRIES', 'Sea bus', 80.00, '90 minutes', 'Vancouver', 'Victoria', '2024-01-21', '12:00PM'),
	(6, 'COMMERCIAL AIRLINES from Vancouver to Victoria', 'AIR CANADA', 'Air plane', 150.00, '30 minutes', 'Vancouver', 'Victoria', '2024-01-21', '8:10AM'),
	(7, 'COMMERCIAL AIRLINES from Vancouver to Victoria', 'AIR CANADA', 'Air plane', 150.00, '30 minutes', 'Vancouver', 'Victoria', '2024-01-21', '9:10AM'),
	(8, 'COMMERCIAL AIRLINES from Vancouver to Victoria', 'AIR CANADA', 'Air plane', 150.00, '30 minutes', 'Vancouver', 'Victoria', '2024-01-21', '10:10AM'),
	(9, 'COMMERCIAL AIRLINES from Vancouver to Victoria', 'AIR CANADA', 'Air plane', 150.00, '30 minutes', 'Vancouver', 'Victoria', '2024-01-21', '11:10AM'),
	(10, 'COMMERCIAL AIRLINES from Vancouver to Victoria', 'AIR CANADA', 'Air plane', 150.00, '30 minutes', 'Vancouver', 'Victoria', '2024-01-21', '12:10PM'),
	(11, 'FLOATPLANE from Vancouver to Victoria', 'Harbour Air seaplane', 'Air seaplane', 200.00, '40 minutes', 'Vancouver', 'Victoria', '2024-01-21', '8:20AM'),
	(12, 'FLOATPLANE from Vancouver to Victoria', 'Harbour Air seaplane', 'Air seaplane', 200.00, '40 minutes', 'Vancouver', 'Victoria', '2024-01-21', '9:20AM'),
	(13, 'FLOATPLANE from Vancouver to Victoria', 'Harbour Air seaplane', 'Air seaplane', 200.00, '40 minutes', 'Vancouver', 'Victoria', '2024-01-21', '10:20AM'),
	(14, 'FLOATPLANE from Vancouver to Victoria', 'Harbour Air seaplane', 'Air seaplane', 200.00, '40 minutes', 'Vancouver', 'Victoria', '2024-01-21', '11:20AM'),
	(15, 'FLOATPLANE from Vancouver to Victoria', 'Harbour Air seaplane', 'Air seaplane', 200.00, '40 minutes', 'Vancouver', 'Victoria', '2024-01-21', '12:20PM'),
	(16, 'HELICOPTER from Vancouver to Victoria', 'Hekijet', 'Helicopter', 250.00, '35 minutes', 'Vancouver', 'Victoria', '2024-01-21', '8:30AM'),
	(17, 'HELICOPTER from Vancouver to Victoria', 'Hekijet', 'Helicopter', 250.00, '35 minutes', 'Vancouver', 'Victoria', '2024-01-21', '9:30AM'),
	(18, 'HELICOPTER from Vancouver to Victoria', 'Hekijet', 'Helicopter', 250.00, '35 minutes', 'Vancouver', 'Victoria', '2024-01-21', '10:30AM'),
	(19, 'HELICOPTER from Vancouver to Victoria', 'Hekijet', 'Helicopter', 250.00, '35 minutes', 'Vancouver', 'Victoria', '2024-01-21', '11:30AM'),
	(20, 'HELICOPTER from Vancouver to Victoria', 'Hekijet', 'Helicopter', 250.00, '35 minutes', 'Vancouver', 'Victoria', '2024-01-21', '12:30PM'),
	(21, 'MOTOR COACH from Vancouver to Victoria', 'BC Ferries Connector', 'Motor coach', 300.00, '50 minutes', 'Vancouver', 'Victoria', '2024-01-21', '8:40AM'),
	(22, 'MOTOR COACH from Vancouver to Victoria', 'BC Ferries Connector', 'Motor coach', 300.00, '50 minutes', 'Vancouver', 'Victoria', '2024-01-21', '9:40AM'),
	(23, 'MOTOR COACH from Vancouver to Victoria', 'BC Ferries Connector', 'Motor coach', 300.00, '50 minutes', 'Vancouver', 'Victoria', '2024-01-21', '10:40AM'),
	(24, 'MOTOR COACH from Vancouver to Victoria', 'BC Ferries Connector', 'Motor coach', 300.00, '50 minutes', 'Vancouver', 'Victoria', '2024-01-21', '11:40AM'),
	(25, 'MOTOR COACH from Vancouver to Victoria', 'BC Ferries Connector', 'Motor coach', 300.00, '50 minutes', 'Vancouver', 'Victoria', '2024-01-21', '12:40PM');

GO
