# Microsoft FRT Internship Project Submission 

### README for MediConnect

## MediConnect

Welcome to MediConnect, a medical healthcare website aimed at providing seamless interaction between patients and healthcare providers.

### This project is developed by Deependra Kumar and Ritu Verma.

## Project Structure

The project repository contains the following primary directories:

-  Client Directory : Contains the files related to the user interface of the website.
-  Root Directory : Contains the server-side code and APIs for the website.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- Git

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Ritu29verma/MediConnect.git
    cd MediConnect
    ```

2. **Install dependencies**

    Navigate to the `root` and `client` directories and install the required dependencies.

    For the frontend:
    
    ```bash
    cd client
    npm install
    ```

    For the backend:
    
    ```bash
    npm install
    ```

### Running the Application

#### Frontend

To start the frontend server, navigate to the `client` directory and run:

```bash
npm start
```

The frontend server will start and you can access it at `http://localhost:3000`.

#### Backend

To start the backend server, navigate to the `root` directory and run:

```bash
npm start
```

The backend server will start and you can access it at `http://localhost:8000`.


## Why Install npm Dependencies Separately?

Each directory (frontend and backend) contains its own package.json file, which lists the dependencies specific to that part of the project. This separation is essential because:

**Dependency Management**: The frontend and backend have different sets of dependencies, which are managed independently. This ensures that each part of the project only installs the packages it requires, reducing potential conflicts and unnecessary bloat.

**Isolation**: By installing dependencies separately, we maintain a clear separation between the client-side and server-side codebases. This helps in debugging and ensures that changes in one part do not inadvertently affect the other.

**Microservices Architecture**: This approach aligns with best practices in microservices and modular application design, where different services or modules manage their dependencies independently.


## Functionalities

MediConnect provides the following functionalities:

### User Registration

- **Doctor Registration**: Doctors can register on the platform by providing their details, credentials, and areas of expertise.
- **Patient Registration**: Patients can create accounts by providing their personal details and medical history.

### Patient Appointment Booking

- Patients can book appointments with registered doctors based on their availability and specialization.

### Appointment Management

- **Doctor's Acceptance**: Doctors can view and accept or reject appointment requests from patients.
- **Moderator Approval**: A moderator reviews and approves the registration of doctors to ensure that only verified professionals are listed on the platform.

## Contributors

- Deependra Kumar
- Ritu Verma
