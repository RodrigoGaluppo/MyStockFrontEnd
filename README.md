# MyStock Project

![logo512](https://github.com/RodrigoGaluppo/MyStockBackend/assets/68329584/d0927718-da2c-4088-9069-f602f575c63a)

MyStock is a stock management system designed specifically for minibars in hotel rooms. It provides a comprehensive solution for managing stock inventory, sales, losses, and acquisitions. The system is built using ReactJS with TypeScript for the frontend, Node.js with TypeScript for the backend, and Airtables as the database.

## Demo
https://youtu.be/8e2jlMWoOZI

## Overview

The system caters to the needs of hotel property owners, allowing them to efficiently manage stock across their various properties and individual rooms. MyStock offers the following key features:

- **Property and Room Management**: Users can choose from a list of properties they own and then navigate to specific rooms within each property.

- **Global Stock Management**: Each property has a global stock representing the physical stock available for that hotel property.

- **Movement Types**: The system supports four types of stock movements:
  - **MovedToRoom**: Transfer items from the global stock to individual rooms.
  - **Sold**: Register sales of items from the stock.
  - **Loss**: Record losses, such as stolen items.
  - **Reposition**: Add new items to the global stock.

- **Administrator Control**: Administrators can easily update stock items using Airtables, providing a user-friendly interface similar to Excel spreadsheets.

- **Dashboard Analytics**: Each property has a built-in dashboard on Airtables, offering statistical insights such as:
  - Items sold (%)
  - Best-selling rooms
  - Profit/loss relationship

## Architecture

The MyStock project comprises three layers:

1. **Frontend (PWA)**:
   - The frontend application is built using ReactJS with TypeScript.
   - It is a Progressive Web App (PWA) that users can install for enhanced accessibility.
   - Users interact with the frontend to manage properties, rooms, stock movements, and view analytics.

2. **Node.js API**:
   - The backend API is developed with Node.js and TypeScript.
   - It provides endpoints for performing CRUD operations on stock items, properties, rooms, and stock movements.
   - The API facilitates communication between the frontend and Airtables.

3. **Airtables**:
   - Airtables serve as the database for storing all data related to the MyStock system.
   - Data is organized in a structure similar to datasheets, offering easy access and management.
   - Additionally, Airtables includes a built-in dashboard for data analysis, enabling users to gain insights into stock performance and profitability.

## Repository Structure

The MyStock project consists of two repositories:

1. **Frontend Repository**:
   - Contains the source code for the frontend application built with ReactJS.
   - Includes components, styles, and logic for managing properties, rooms, stock movements, and analytics.

2. **Backend Repository**:
   - Houses the codebase for the Node.js backend API.
   - Provides endpoints for interacting with Airtables, handling CRUD operations, and managing data flow between the frontend and database.

## Contributors

- Rodrigo Russo

## License

This project is licensed under the [MIT License](link-to-license).
