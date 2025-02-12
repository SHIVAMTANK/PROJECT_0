
# Project Strucuture

## Directory and File Organization:


## File Structure
```
└── 📁FacultyAdminBlock
    └── .DS_Store
    └── .eslintrc.cjs
    └── .gitignore
    └── README.md
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── 📁public
        └── vite.svg
    └── 📁src
        └── App.css
        └── App.jsx
        └── 📁Assets
            └── LoginImg.png
            └── Logo.png
            └── qr-frame.svg
        └── 📁Components
            └── Button.jsx
            └── InputField.jsx
            └── Navbar.jsx
            └── ProfileCard.jsx
            └── QrCodeComponent.jsx
            └── QrStyles.css
            └── StickyFooterMobile.jsx
        └── 📁Services
            └── Api.js
            └── CommonRequest.js
            └── Helpers.js
        └── 📁Views
            └── Dashboard.jsx
            └── Login.jsx
            └── Profile.jsx
            └── ResetPasssword.jsx
            └── ScheduleVisit.jsx
            └── Visitors.jsx
            └── VisitorsRecordsList.jsx
            └── VisitsList.jsx
        └── index.css
        └── main.jsx
    └── tailwind.config.js
    └── vite.config.js
```

### Directory Structure
- **public:** Contains public assets like `vite.svg`.
- **src:**
  - **Assets:** Contains static files like images (`LoginImg.png`, `Logo.png`, `qr-frame.svg`).
  - **Components:** Includes reusable UI components (`Button.jsx`, `InputField.jsx`, `Navbar.jsx`, `ProfileCard.jsx`, `QrCodeComponent.jsx`, `QrStyles.css`, `StickyFooterMobile.jsx`).
  - **Services:** Includes service files for API handling and authentication (`Api.js`, `CommonRequest.js`, `Helpers.js`).
  - **Views:** Contains main views of the application (`Dashboard.jsx`, `Login.jsx`, `Profile.jsx`, `ResetPasssword.jsx`, `ScheduleVisit.jsx`, `Visitors.jsx`, `VisitorsRecordsList.jsx`).
  - **index.css:** CSS file for global styles.
  - **main.jsx:** Entry point for the React application.
- **Configuration Files:**
  - **tailwind.config.js:** Configuration file for Tailwind CSS.
  - **vite.config.js:** Configuration file for Vite.
  - **postcss.config.js:** Configuration file for PostCSS.
  - **.eslintrc.cjs:** Configuration file for ESLint.

## Main Entry Point of the Application
**App.jsx** is the main entry point where routing is defined and authentication is managed.

# Key Technologies and Libraries

## State Management Solution and Overview

### Routing Mechanism
**React Router:** Used for client-side routing. Routes are defined using `Routes` and `Route` components in `App.jsx`.

### Styling Approach
**Tailwind CSS:** Utilized for styling components throughout the application.

### APIs and Services Used
- **axios:** HTTP client for making API requests.
- **js-cookie:** Library for managing cookies, used for authentication token storage.
- **qrcode.react:** Library for generating QR codes.
- **react-hook-form:** Library for form validation and management.
- **ag-grid-react:** Grid component for displaying data in tabular format.
- **react-tabs:** Component for creating tabbed interfaces.

# Component Structure

## Component Hierarchy and Key Components

### App.jsx
Main component responsible for routing and authentication handling.

### Routes
- **Login:** Route for the login page.
- **PrivateRoutes:** Wrapper for routes that require authentication.
- **Dashboard:** Route for the main dashboard.
- **ScheduleVisit:** Route for scheduling visits.
- **Visitors:** Route for managing visitors.
- **VisitorsRecordsList:** Route for viewing visitor records.
- **Profile:** Route for user profile management.
- **ResetPasssword:** Route for resetting passwords.

## Reusable Components and Their Usage
- **Button.jsx:** Reusable button component.
- **InputField.jsx:** Reusable input field component.
- **Navbar.jsx:** Reusable navigation bar component.
- **ProfileCard.jsx:** Reusable profile card component.
- **QrCodeComponent.jsx:** Component for displaying QR codes.
- **StickyFooterMobile.jsx:** Reusable sticky footer component.

# Services and APIs

## API Service
**Api.js** handles API requests using axios for CRUD operations.

## CommonRequest
**CommonRequest.js** provides common methods for making HTTP requests using axios.

## Helpers
**Helpers.js** includes helper functions for tasks like date formatting and data manipulation.

# Views and Components

## Login
**Login.jsx** allows users to log in with their credentials.

## Dashboard
**Dashboard.jsx** displays a dashboard containing all buttons for functionalities.

## ScheduleVisit
**ScheduleVisit.jsx** allows users to schedule visits.

## Visitors
**Visitors.jsx** is the main component for List of Visitors.

## VisitorsRecordsList
**VisitorsRecordsList.jsx** is a component which contains a list of visitor records.

## Profile
**Profile.jsx** allows users to view and update their profile information.

## ResetPasssword
**ResetPasssword.jsx** provides functionality for users to reset their passwords.

# Important Files and Code Sections

## Key Configuration Files and Their Purposes
- **package.json:** Lists project dependencies and defines scripts for building and running the project.
- **App.jsx:** Main entry point for the React application, defining routing and authentication logic.
- **tailwind.config.js:** Configuration file for Tailwind CSS.
- **vite.config.js:** Configuration file for Vite.
- **postcss.config.js:** Configuration file for PostCSS.
- **.eslintrc.cjs:** Configuration file for ESLint.

## Management and Definition of Environment Variables
Environment variables are managed within the application, potentially in `Helpers.js` or through build scripts.
