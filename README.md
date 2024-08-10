# Book Management Frontend

This project is a frontend application for managing books, authors, and book genres. It's built with Next.js, React, and Material-UI.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Getting Started

Follow these steps to set up and run the project on your local machine:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/book-management-frontend.git
   cd book-management-frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory of the project.
   - Add the following line to the file, replacing `your-api-url` with the URL of your backend API:
     ```
     NEXT_PUBLIC_API_BASE_URL=your-api-url
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the built app in production mode.
- `npm run lint`: Runs the linter to check for code style issues.

## Project Structure

- `app/`: Contains the main application code and pages.
- `components/`: Reusable React components.
- `styles/`: Global styles and styled components.
- `public/`: Static files like images and fonts.

## Features

- View, create, update, and delete books
- Manage authors and book genres
- Responsive design for various screen sizes

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.