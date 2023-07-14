# TodoList Application

This is a simple TodoList application built with Node.js, Express, and EJS. It allows users to create, view, and check-box tasks in a todo list.

## Prerequisites

Before running this application, make sure you have the following software installed on your system:

- Node.js (version >= 12.0.0)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/todo-list.git
```

2. Navigate to the project directory:

```
cd todo-list
```

3. Install the dependencies:

```
npm install
```

## Configuration


```
PORT=3000    // Port number on which the application will run
```

## Usage

1. Start the application:

```
npm start
```

2. Open a web browser and visit `http://localhost:3000` (or the port number you configured) to access the TodoList application.

## Features

- Create a new task with a title and description.
- View all tasks in the todo list.
- Update the status of a task (e.g., mark as completed).
- Edit the title and description of a task.
- Delete a task from the todo list.

## Project Structure

The project structure follows the conventional MVC (Model-View-Controller) pattern.

- `app.js`: Entry point of the application.
- `public/`: Contains static files such as stylesheets and client-side JavaScript.
- `views/`: Contains the EJS templates for rendering dynamic web pages.

## Dependencies

The following packages are used in this application:

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `ejs`: Embedded JavaScript templates for generating dynamic HTML pages.
- `body-parser`: Parses incoming request bodies in a middleware.
- `nodemon`: Monitors changes in the source code and automatically restarts the server.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to use, modify, and distribute the code as per the license terms.
