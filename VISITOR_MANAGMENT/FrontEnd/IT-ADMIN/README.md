
# Project Strucuture

## Directory and File Organization:
```
└── 📁IT-ADMIN
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
            └── 📁OtherUsers
                └── AddUser.jsx
                └── FacultyAdminBlock.jsx
                └── HostelWarden.jsx
                └── Registrar.jsx
                └── SecurityAdmin.jsx
                └── UsersData.js
                └── index.jsx
            └── ResetPassword.jsx
            └── 📁Staff
                └── AddStaff.jsx
                └── DepartmentData.js
                └── StaffList.jsx
                └── index.jsx
            └── 📁Student
                └── AddBatch.jsx
                └── AddStudent.jsx
                └── DeleteStudent.jsx
                └── Deletebatch.jsx
                └── index.jsx
            └── 📁StudentRecords
                └── Student.jsx
                └── StudentRecordsList.jsx
        └── index.css
        └── main.jsx
    └── tailwind.config.js
    └── vite.config.js
```

### Directory Structure:
- **Assets:** Contains static files like images.
- **Views:** Contains main views/components of the webApp such as Login, Dashboard, and categorized views for Staff, Student, OtherUsers, and StudentRecords.
- **Components:** Contains core reusable components like Button, FormModal, InputField, Navbar, StickyFooterMobile.
- **Services:** Includes service files like API for handling authentication and other common requests.

## Critical Directories and Files:
- **App.jsx:** The main entry point for the React web-app.
- **package.json:** Lists dependencies and scripts necessary for building and running the project.
- **Services Directory:** Contains key service files like API, AuthContext, CommonRequest, and Helpers.

## Main Entry Point of the Application:
**App.jsx** is the main entry point, setting up routing and providing authentication context.

# Key Technologies and Libraries:
## State Management Solution and Overview:

### Routing Mechanism:
**React Router:** `react-router-dom` is used for client-side routing. The main routes are defined in `App.jsx` using `Routes` and `Route` components.

### Styling Approach:
**Tailwind CSS:** Utilized for styling the web-app, as indicated by the dependency in `package.json`.

### APIs and Services Used:
- **axios:** For making HTTP requests.
- **js-cookie:** For handling cookies, specifically for storing authentication tokens.
- **react-hook-form:** For managing form state and validation.
- **ag-grid-react:** For displaying and managing data in a grid format.
- **react-tabs:** For implementing tabbed interfaces.

# Component Structure:
## Component Hierarchy and Key Components:

### App.jsx:
The root component.

### Routes:
- **Login:** Public route for the login page.
- **PrivateRoutes:** Wrapper for routes that require authentication.
- **Dashboard:** Protected route for displaying the dashboard.
- **Student:** Routes for adding, deleting students and batches.
- **OtherUsers:** Routes for managing other user types such as Registrar, Hostel Warden, Security Admin, Faculty Admin Block, and adding new users.
- **Staff:** Routes for managing staff and adding new staff.
- **ResetPassword:** Public route for resetting passwords.

## Reusable Components and Their Usage:
- **PrivateRoutes:** A component used to protect routes that require authentication. It checks for a token in cookies and either renders the requested component or redirects to the login page.
- **Button:** A reusable button component that can be customized with different styles and text.
- **InputField:** A reusable input field component that can be customized with different styles and placeholder text.
- **Navbar:** A reusable navigation bar component that can be customized with different styles and links.
- **FormModal:** A reusable modal component for forms.
- **StickyFooterMobile:** A reusable sticky footer component that is displayed at the bottom of the page on mobile devices.

# Services and APIs:
## API Service:
The API service is used to make HTTP requests to the backend server. It includes methods for handling authentication, fetching data, and sending data to the server.

## AuthContext:
Provides context and hooks for authentication within the application, managing user sessions and tokens.

## CommonRequest:
The CommonRequest module includes common methods for making HTTP requests using axios. It includes methods for handling request headers, error handling, and response data.

## Helpers:
The Helpers module includes helper functions for common tasks like parsing dates, generating random strings, and formatting data.

# Views and Components:
## Login:
The Login view is the main entry point for the web-app. It includes a form for users to enter their credentials and submit them for authentication.

## Dashboard:
The Dashboard view displays an overview of the application data and provides links to other views.

## Student:
- **AddBatch:** View for adding a new batch.
- **AddStudent:** View for adding a new student.
- **DeleteStudent:** View for deleting a student.
- **Deletebatch:** View for deleting a batch.

## OtherUsers:
- **AddUser:** View for adding a new user.
- **FacultyAdminBlock:** View for managing Faculty Admin Block.
- **HostelWarden:** View for managing Hostel Warden.
- **Registrar:** View for managing Registrar.
- **SecurityAdmin:** View for managing Security Admin.
- **UsersData:** JavaScript file for handling user data.

## Staff:
- **AddStaff:** View for adding a new staff member.
- **DepartmentData:** JavaScript file for handling department data.
- **StaffList:** View for displaying the list of staff members.

## StudentRecords:
- **Student:** View for displaying student information.
- **StudentRecordsList:** View for displaying a list of student records.

## ResetPassword:
The ResetPassword view allows users to reset their passwords. It includes a form for entering a new password and submitting it for validation.

# Important Files and Code Sections:

## Key Configuration Files and Their Purposes:
- **package.json:** Contains the project dependencies, scripts, and metadata.
- **App.jsx:** The main entry point for the React web-app. It sets up routing and provides authentication context.
- **tailwind.config.js:** The configuration file for Tailwind CSS. It includes settings for customizing the design system.
- **vite.config.js:** The configuration file for Vite. It includes settings for customizing the build process.
- **postcss.config.js:** The configuration file for PostCSS. It includes settings for customizing the CSS processing.
- **.eslintrc.cjs:** The configuration file for ESLint. It includes settings for customizing the linting rules.

## Management and Definition of Environment Variables:
**Helpers.js** in the Services directory includes environment variables and other common tasks.
