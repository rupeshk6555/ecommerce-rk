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
  - Nodemailer for verify email
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

NODE_ENV=development
PORT=3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=demo@gmail.com
EMAIL_FROM=demo@gmail.com
EMAIL_PASS=password
RAZORPAY_KEY_ID=razorpay_key_id
RAZORPAY_SECRET=razorpay_secret


```
#### 4.Start the server:
  ``` bash
npm run dev
```
5. test API: You can use tools like Postman or Swagger to test the API endpoints.



# API Endpoints

## User Auth Endpoints
- **POST** `/api/auth/register` - Register a new user
- **GET** `/api/auth/verify-email/:token` - Verify email
- **POST** `/api/auth/login` - Login an existing user
- **POST** `/api/auth/forgot-password` - Forgot password
- **POST** `/api/auth/reset-password/:token` - Reset password , token - you received on your email
- **POST** `/api/auth/logout` - Logout user

## user Profile Endpoints
- **GET** `/api/auth/profile` - Get user profile details
- **PUT** `/api/auth/profile` - Get user profile details
 

## Product Endpoints
- **GET** `/api/product` - Get all products
- **POST** `/api/product` - Add a new product (Admin only)
- **PUT** `/api/product/:id` - Update a product (Admin only)
- **DELETE** `/api/product/:id` - Delete a product (Admin only)
- **GET** `/api/product/:id` - Delete a product 
- **POST** `/api/product/:id/review` - Delete a product
  
 ## Categories
- **POST** `/api/categories` - create a new category
- **GET** `/api/categories` - Get all products
- **GET** `/api/categories/:id` - get a single category
- **PUT** `/api/categories/:id` - update a category
- **DELETE** `/api/categories/:id` - Get all products

  
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

  




