 # E-commerce Backend API

## Overview
This is the backend API for the E-commerce application built using **Node.js**, **Express**, and **MongoDB**. The API provides functionality for user authentication, product management, order processing, and more.

## Features
- **User Registration and Authentication:** Secure user registration, login, and password management.
- **Product Management:** CRUD operations for products, including categories and reviews.
- **Cart Management:** Allow users to add, update, and remove items from their shopping cart.
- **Checkout Process:** Handle billing and shipping details, payment processing (e.g., with Razorpay), and order confirmation.
- **Order Management:** Users can track their orders, view order history, and manage returns.
- **Admin Dashboard:** Admin functionalities for user management, product management, and order tracking.

## Tech Stack
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (JSON Web Tokens) for authentication
  - Razorpay for payment processing

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v12 or higher)
- MongoDB (you can use MongoDB Atlas or a local instance)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/my-ecommerce-backend.git
   cd my-ecommerce-backend
1. **Install the dependencies::**
   ```bash 
   npm install

   
### 3. Create a .env file in the root directory to store environment variables:
 ``` bash
 PORT=5000

MONGODB_URI=mongodb://<username>:<password>@your_mongodb_host:port/database

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id

RAZORPAY_SECRET=your_razorpay_secret


```
#### 4.Start the server:
  ``` bash
npm run dev
```
5. test API: You can use tools like Postman or Swagger to test the API endpoints.



# API Endpoints

## User Endpoints
- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login an existing user
- **GET** `/api/users/profile` - Get user profile details (requires authentication)

## Product Endpoints
- **GET** `/api/products` - Get all products
- **POST** `/api/products` - Add a new product (Admin only)
- **PUT** `/api/products/:id` - Update a product (Admin only)
- **DELETE** `/api/products/:id` - Delete a product (Admin only)

## Cart Endpoints
- **POST** `/api/cart` - Add items to the cart
- **GET** `/api/cart` - Get cart items
- **PUT** `/api/cart/:id` - Update cart item quantity
- **DELETE** `/api/cart/:id` - Remove an item from the cart

## Order Endpoints
- **POST** `/api/orders` - Create a new order
- **GET** `/api/orders` - Get user orders
- **GET** `/api/orders/:id` - Get order details by ID
- **PUT** `/api/orders/:id/cancel` - Cancel an order




