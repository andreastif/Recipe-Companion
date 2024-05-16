# Recipe Companion

Recipe Companion is a web application where users can register, generate recipes with the help of AI by either providing a title or a list of ingredients, save their favorite recipes, and attach pictures to them. This project uses Firebase for user authentication and uses several API's for storing pictures and handling recipes, built with React.

## Features

- User registration and login
- AI-generated recipes by title or ingredients
- Save favorite recipes
- Discover other recipes generated
- Attach pictures to your recipes
- Responsive design with Material-UI and Bootstrap, designed for mobile first

## Technologies Used

- **Frontend:**
    - React
    - React Router
    - Material-UI (MUI) for UI components
    - Bootstrap for additional styling
- **Backend:**
    - Firebase for authentication and data storage 
    - Rust Actix API, CRUD recipes in MongoDB
    - Java Webflux API (Reactive non-blocking) for media storage, PostgreSQL
- **AI:**
    - Integration with a Java Langchain API for recipe generation
- **Utilities:**
    - Axios for API calls
    - React Query for data fetching and state management
    - SweetAlert2 for alerts
    - React Loader Spinner for loading indicators
