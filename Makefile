.DEFAULT_GOAL := run

.PHONY: run run-frontend run-backend
.PHONY: build up down clean
.PHONY: start-frontend stop-frontend start-backend stop-backend start stop

run:
	@echo "Running the application locally"
	pnpm dev

run-frontend:
	@echo "Running the client locally"
	pnpm frontend dev

run-backend:
	@echo "Running the server locally"
	pnpm backend dev

build:
	@echo "Building the application"
	sudo docker compose build

up:
	@echo "Building and starting the application"
	sudo docker compose up

down:
	@echo "Stopping the application"
	sudo docker compose down

start-frontend:
	@echo "Starting the client"
	sudo docker compose start frontend

stop-frontend:
	@echo "Stopping the client"
	sudo docker compose stop frontend

start-backend:
	@echo "Starting the server"
	sudo docker compose start backend

stop-backend:
	@echo "Stopping the server"
	sudo docker compose stop backend

start:
	@echo "Starting the application"
	sudo docker compose start

stop:
	@echo "Stopping the application"
	sudo docker compose stop

clean:
	@echo "Cleaning the application"
	sudo docker system prune -f --volumes
	sudo docker image prune -f
