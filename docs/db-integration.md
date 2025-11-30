How to use this branch

1. Install Dependencies
npm install

2. Create a local .env.local

Copy the example file:

cp .env.example .env.local

Fill in your MySQL user and password.

3. Start the database

You must have:

MySQL running locally

phpMyAdmin OR CLI access

4. Import the SQL schema

Open phpMyAdmin → select micro_match → Import → choose SQL files from /sql.

5. Launch the app
npm run dev