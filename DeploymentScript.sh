#!/bin/bash

echo "Pulling latest code..."
git pull origin main

read -p "Enter the database connection string: " DB_CONNECTION_STRING

echo "Building and starting Docker containers..."
docker-compose down
docker-compose up -d --build

echo "Deployment completed."