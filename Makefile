run-server:
	cd backend && node index.js

run-migration:
	cd backend && npx knex migrate:latest

run-app:
	cd frontend && npm run start

install-deps:
	cd backend && npm install
	cd frontend && npm install