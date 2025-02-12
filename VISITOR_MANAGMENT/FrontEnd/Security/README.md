# FacultyAdminBlock Project Structure

## Directory and File Organization

### File Structure
```
└── 📁Security
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
            └── FaceDetection.jsx
            └── FormModal.jsx
            └── InputField.jsx
            └── Navbar.jsx
            └── QrCodeComponent.jsx
            └── QrStyles.css
            └── ReadQRComponent.jsx
            └── StickyFooterMobile.jsx
            └── VisitorPass.css
            └── VisitorPass.jsx
            └── VisitorPassForTwo.jsx
        └── 📁Services
            └── Api.js
            └── CommonRequest.js
            └── Helpers.js
        └── 📁Views
            └── Dashboard.jsx
            └── FaceScan.jsx
            └── Login.jsx
            └── QrCode.jsx
            └── QrScan.jsx
            └── 📁Records
                └── Parent.jsx
                └── ParentRecordsList.jsx
                └── Staff.jsx
                └── StaffRecordsList.jsx
                └── Student.jsx
                └── StudentRecordsList.jsx
                └── Visitors.jsx
                └── VisitorsRecordsList.jsx
                └── index.jsx
            └── ResetPassword.jsx
            └── 📁TodaysVisit
                └── OtherEntry.jsx
                └── OtherList.jsx
                └── OtherTmpPass.jsx
                └── ParentEntry.jsx
                └── ParentList.jsx
                └── ParentTempPass.jsx
                └── index.jsx
            └── 📁Visitors
                └── CurrentList.jsx
                └── TempPass.jsx
                └── index.jsx
        └── index.css
        └── main.jsx
    └── tailwind.config.js
    └── vite.config.js
```

### Directory Structure
- **public:** Contains public assets like `vite.svg`.
- **src:**
  - **Assets:** Contains static files like images (`LoginImg.png`, `Logo.png`, `qr-frame.svg`).
  - **Components:** Includes reusable UI components (`Button.jsx`, `FaceDetection.jsx`, `FormModal.jsx`, `InputField.jsx`, `Navbar.jsx`, `QrCodeComponent.jsx`, `QrStyles.css`, `ReadQRComponent.jsx`, `StickyFooterMobile.jsx`, `VisitorPass.css`, `VisitorPass.jsx`, `VisitorPassForTwo.jsx`).
  - **Services:** Includes service files for API handling and helper functions (`Api.js`, `CommonRequest.js`, `Helpers.js`).
  - **Views:** Contains main views of the application (`Dashboard.jsx`, `FaceScan.jsx`, `Login.jsx`, `QrCode.jsx`, `QrScan.jsx`, `ResetPassword.jsx`, `Records` subdirectory for various record-related views, `TodaysVisit` subdirectory for today's visit related views, `Visitors` subdirectory for visitor-related views).
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
**Bootstrap:** Used for styling components throughout the application.

### APIs and Services Used
- **axios:** HTTP client for making API requests.
- **js-cookie:** Library for managing cookies, used for authentication token storage.
- **qrcode.react:** Library for generating QR codes.
- **react-hook-form:** Library for form validation and management.
- **ag-grid-react:** Grid component for displaying data in tabular format.
- **react-tabs:** Component for creating tabbed interfaces.
- **react-webcam:** Webcam component for capturing images in web applications.

# Component Structure

## Component Hierarchy and Key Components

### App.jsx
Main component responsible for routing and authentication handling.

### Routes
- **Login:** Route for the login page.
- **PrivateRoutes:** Wrapper for routes that require authentication.
- **Dashboard:** Route for the main dashboard.
- **FaceScan:** Route for face scanning functionality.
- **QrCode:** Route for displaying QR codes.
- **QrScan:** Route for scanning QR codes.
- **Visitors:** Route for managing visitors.
- **RecordsDashBoard:** Route for viewing records dashboard.
- **TempPass:** Route for temporary visitor passes.
- **StudentRecords:** Route for student records.
- **VisitorRecords:** Route for visitor records.
- **StaffRecords:** Route for staff records.
- **VisitsForToday:** Route for today's visits.
- **ParentEntry:** Route for parent entry.
- **ParentTempPass:** Route for temporary parent passes.
- **ResetPasssword:** Route for resetting passwords.
- **ParentRecords:** Route for parent records.
- **OtherEntry:** Route for other visits entry.
- **OtherTempPass:** Route for temporary passes for other visits.

## Reusable Components and Their Usage
- **Button.jsx:** Reusable button component.
- **InputField.jsx:** Reusable input field component.
- **Navbar.jsx:** Reusable navigation bar component.
- **QrCodeComponent.jsx:** Component for displaying QR codes.
- **FaceDetection.jsx:** Component for face detection.
- **FormModal.jsx:** Modal component for forms.
- **StickyFooterMobile.jsx:** Reusable sticky footer component.
- **VisitorPass.jsx and VisitorPassForTwo.jsx:** Components for visitor passes.
- **CurrentList.jsx and TempPass.jsx:** Components related to visitor management.

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
**Dashboard.jsx** displays a summary of application data.

## FaceScan
**FaceScan.jsx** allows users to scan faces for identification.

## QrCode
**QrCode.jsx** displays QR codes.

## QrScan
**QrScan.jsx** allows users to scan QR codes.

## Records
Subdirectory containing various record-related views:
- **Parent.jsx, ParentRecordsList.jsx:** Parent related records.
- **Staff.jsx, StaffRecordsList.jsx:** Staff related records.
- **Student.jsx, StudentRecordsList.jsx:** Student related records.
- **Visitors.jsx, VisitorsRecordsList.jsx:** Visitor related records.

## ResetPasssword
**ResetPasssword.jsx** provides functionality for users to reset their passwords.

## TodaysVisit
Subdirectory containing today's visit related views:
- **OtherEntry.jsx, OtherList.jsx, OtherTmpPass.jsx:** Other visit related views.
- **ParentEntry.jsx, ParentList.jsx, ParentTempPass.jsx:** Parent visit related views.

## Visitors
Subdirectory containing visitor related views:
- **CurrentList.jsx:** Current visitor list.
- **TempPass.jsx:** Temporary visitor pass.

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

