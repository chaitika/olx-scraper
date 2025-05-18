run-server:
	cd backend && node index.js

run-migration:
	cd backend && npx knex migrate:latest