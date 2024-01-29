# Task Management Application

## Description

The application will allow users to create, update, and delete tasks. Tasks should have a title, description, and a status (e.g., "TO_DO," "IN_PROGRESS," "DONE"). Users are also able to view a list of tasks and filter them by status.

## Front-End

1. **User Interface:** A user-friendly interface for the task management application is created. It contains the following components:

   - A form to create a new task with fields for title, description, and status.
   - A list of tasks with the ability to update the status or delete a task.
   - A filter or dropdown to filter tasks by status (e.g., "All," "To Do," "In Progress," "Done").

2. **User Experience:** Implement smooth and responsive user interactions, including form validation to ensure that tasks cannot be created without a title. Use modern front-end technologies such as React

3. **Styling:** Styling of application is done using CSS or any CSS preprocessor, Sass, along with a CSS framework, Tailwind CSS.

4. **Responsive Design:** The application is responsive and works well on both desktop and mobile devices.

## Back-End

1. **API Development:** RESTful API is created to handle the CRUD (Create, Read, Update, Delete) operations for tasks. The API is built using Node.js with Express.js.

2. **Data Storage:** A database is used to store task data. PostgreSQL is used as the database.

3. **Validation:** Server-side validation is implemented to ensure that task data is valid before saving it to the database. Tasks must have a title and a valid status.

4. **Error Handling:** Errors are handled gracefully, returning useful error messages and status codes.

## Unit Testing

1. **Unit Tests:** Unit tests for critical parts of the application, such as API endpoints and data validation logic, are implemented using a testing framework such as Jest.

## Bonus Features

1. User authentication and authorization to restrict access to tasks.
2. Task due dates and reminders.
3. Task sorting and searching capabilities.
4. User profiles with avatars.

## Installation and Usage

1. Clone the repository and change the working directory to the project directory.

   ```bash
   git clone <repo-url> && cd <project-directory>
   ```

2. Change to the `client` directory and install the dependencies.

   ```bash
   cd client && npm install
   ```

3. Start the React development server.

   ```bash
   npm start
   ```

4. Start the PostgreSQL server and create a new database.

   ```bash
   createdb task_management
   ```

5. Migrate the database.

   ```bash
   npx prisma migrate dev --name init
   ```

6. Seed the database.

   ```bash
   npm run seed
   ```

7. Open a new terminal and change to the `server` directory and install the dependencies.

   ```bash
   cd server && npm install
   ```

8. Copy the `.env.example` file to `.env` and update the environment variables.

   ```bash
   cp .env.example .env
   ```

9. Start the Node.js server.

   ```bash
   npm start
   ```

10. Open the browser and navigate to `http://localhost:3000/` to view the application.
