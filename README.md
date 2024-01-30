# File Categorization and Security App

This is a MERN (MongoDB, Express.js, React, Node.js) project designed for categorizing and securing files. The app utilizes an accordion format to display data related to different file categories.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [File Structure](#file-structure)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The File Categorization and Security App is built using the MERN stack and provides a user-friendly interface for categorizing and managing files securely.

## Features

- Accordion format for displaying file data.
- File upload functionality with category-specific counts.
- List and manage files within each category.

## File Structure

The project follows a modular file structure. Here's an overview of the main component:

- `src/components/AccordionData.js`: React component for displaying data in an accordion format.

## Setup

1. #### Clone the repository:
   ```bash
   git clone https://github.com/henkari/harjoitus_demo.git
   cd harjoitus_demo

2. #### Install dependencies:

   npm install

3. #### Configure the server:

   Ensure MongoDB is running.
   Set up environment variables (if necessary).

4. #### Start the development server:

   npm start

## Usage

1. Open your web browser and navigate to http://localhost:3000.
2. Explore different file categories in the accordion.
3. Upload files to specific categories.
4. View and manage uploaded files using the list.
5. Download files by clicking file link in the file list
6. edit files by pressing ctrl key+click the file you wanna edit

## API Endpoints

- GET /api/files/uploadCount/:category: Retrieve the file upload count for a specific category.
- GET /api/files/:category:Retrieve list of files for a specific category.
- GET /api/files/download/:category/:fileId: Download a file from specific category.
- POST /api/files/:category: Upload a file to specific category.
- PUT /api/files/update/:updatedFile.fileId Update file description.
- DELETE /api/files/delete/:fileId: Delete file.

## Contributing

Contributions are welcome! Please follow the contribution guidelines for details on how to contribute to this project.

## License
This project is licensed under the MIT License.
