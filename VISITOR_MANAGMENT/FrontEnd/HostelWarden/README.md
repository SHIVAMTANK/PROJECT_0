# Project Strucuture

## Directory and File Organization:


## File Structure
```
└── 📁HostelWarden
    └── .DS_Store
    └── .eslintrc.cjs
    └── .gitignore
    └── README.md
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── 📁src
        └── App.css
        └── App.jsx
        └── 📁Assets
            └── LoginImg.png
            └── Logo.png
            └── qr-frame.svg
        └── 📁Components
            └── Button.jsx
            └── FormModal.jsx
            └── InputField.jsx
            └── Navbar.jsx
            └── StickyFooterMobile.jsx
        └── 📁Services
            └── Api.js
            └── AuthContext.jsx
            └── CommonRequest.js
            └── Helpers.js
        └── 📁Views
            └── Dashboard.jsx
            └── Login.jsx
            └── 📁ParentVisit
                └── index.jsx
            └── ResetPassword.jsx
            └── 📁StudentRecords
                └── Student.jsx
                └── StudentRecordsList.jsx
            └── 📁Vehicle
                └── VehicleList.jsx
                └── index.jsx
        └── index.css
        └── main.jsx
    └── tailwind.config.js
    └── vite.config.js
```

### Directory Structure
- **Assets:** Contains static files like images.
- **Components:** Contains core reusable components like Button, FormModal, InputField, Navbar, and StickyFooterMobile.
- **Services:** Includes service files like API for handling authentication and other common requests.
- **Views:** Contains main views/components of the webApp such as Login, Dashboard, ParentVisit, ResetPassword, StudentRecords, and Vehicle.

## Critical Directories and Files
- **App.jsx:** The main entry point for the React web-app.
- **package.json:** Lists dependencies and scripts necessary for building and running the project.
- **Services Directory:** Contains key service files like API, AuthContext, CommonRequest, and Helpers.

## Main Entry Point of the Application
**App.jsx** is the main entry point, setting up routing and providing authentication context.

# Key Technologies and Libraries

## State Management Solution and Overview

### Routing Mechanism
**React Router:** `react-router-dom` is used for client-side routing. The main routes are defined in `App.jsx` using `Routes` and `Route` components.

### Styling Approach
**Tailwind CSS:** Utilized for styling the web-app, as indicated by the dependency in `package.json`.

### APIs and Services Used
- **axios:** For making HTTP requests.
- **js-cookie:** For handling cookies, specifically for storing authentication tokens.
- **react-hook-form:** For managing form state and validation.
- **ag-grid-react:** For displaying and managing data in a grid format.
- **react-tabs:** For implementing tabbed interfaces.

# Component Structure

## Component Hierarchy and Key Components

### App.jsx
The root component.

### Routes
- **Login:** Public route for the login page.
- **PrivateRoutes:** Wrapper for routes that require authentication.
- **Dashboard:** Protected route for displaying the dashboard.
- **Vehicle:** Routes for adding and viewing vehicle records.
- **ParentVisit:** Route for managing parent visits.
- **StudentRecords:** Route for viewing student records.
- **ResetPassword:** Public route for resetting passwords.

## Reusable Components and Their Usage
- **PrivateRoutes:** A component used to protect routes that require authentication. It checks for a token in cookies and either renders the requested component or redirects to the login page.
- **Button:** A reusable button component that can be customized with different styles and text.
- **InputField:** A reusable input field component that can be customized with different styles and placeholder text.
- **Navbar:** A reusable navigation bar component that can be customized with different styles and links.
- **FormModal:** A reusable modal component for forms.
- **StickyFooterMobile:** A reusable sticky footer component that is displayed at the bottom of the page on mobile devices.

# Services and APIs

## API Service
The API service is used to make HTTP requests to the backend server. It includes methods for handling authentication, fetching data, and sending data to the server.

## AuthContext
Provides context and hooks for authentication within the application, managing user sessions and tokens.

## CommonRequest
The CommonRequest module includes common methods for making HTTP requests using axios. It includes methods for handling request headers, error handling, and response data.

## Helpers
The Helpers module includes helper functions for common tasks like parsing dates, generating random strings, and formatting data.

# Views and Components

## Login
The Login view is the main entry point for the web-app. It includes a form for users to enter their credentials and submit them for authentication.

## Dashboard
The Dashboard view displays an overview of the application data and provides links to other views.

## ParentVisit
View for managing parent visits.

## StudentRecords
- **Student:** View for displaying student information.
- **StudentRecordsList:** View for displaying a list of student records.

## Vehicle
- **VehicleList:** View for displaying the list of vehicles.
- **index.jsx:** Main entry point for vehicle-related components.

## ResetPassword
The ResetPassword view allows users to reset their passwords. It includes a form for entering a new password and submitting it for validation.

# Important Files and Code Sections

## Key Configuration Files and Their Purposes
- **package.json:** Contains the project dependencies, scripts, and metadata.
- **App.jsx:** The main entry point for the React web-app. It sets up routing and provides authentication context.
- **tailwind.config.js:** The configuration file for Tailwind CSS. It includes settings for customizing the design system.
- **vite.config.js:** The configuration file for Vite. It includes settings for customizing the build process.
- **postcss.config.js:** The configuration file for PostCSS. It includes settings for customizing the CSS processing.
- **.eslintrc.cjs:** The configuration file for ESLint. It includes settings for customizing the linting rules.

## Management and Definition of Environment Variables
**Helpers.js** in the Services directory includes environment variables and other common tasks.
