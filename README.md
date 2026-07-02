# 🍔 Food Delivery MERN

A full-stack **Food Delivery Web Application** built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to browse food items, add them to a shopping cart, place orders securely using **Stripe Payment Gateway**, and track their orders. It also includes a powerful **Admin Dashboard** for managing food items and customer orders.

---

## 📌 Features

### 👤 User Features

- User Registration & Login
- Secure JWT Authentication
- Browse Food Items
- Search Food Items
- Add Items to Cart
- Update Cart Quantity
- Place Orders
- Stripe Payment Integration
- Order History
- Responsive User Interface

### 👨‍💼 Admin Features

- Admin Dashboard
- Add New Food Items
- Upload Food Images
- Delete Food Items
- Manage Customer Orders
- Update Order Status
- Easy Food Management

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## Database

- MongoDB Atlas

## Payment Gateway

- Stripe

## Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```
Food-Delivery-MERN
│
├── admin
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── screenshots
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Hassoo-000/Food-Delivery-MERN.git
```

## Open Project

```bash
cd Food-Delivery-MERN
```

---

## Install Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Install Backend

```bash
cd backend
npm install
npm start
```

---

## Install Admin Panel

```bash
cd admin
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

PORT=4000
```

> ⚠️ Never upload your `.env` file to GitHub.

---

# 📸 Screenshots

## Home Page

![Home](screenshots/home.png)

---

## Menu

![Menu](screenshots/menu.png)

---

## Cart

![Cart](screenshots/cart.png)

---

## Login

![Login](screenshots/login.png)

---

## Place Order

![Place Order](screenshots/place-order.png)

---

## My Orders

![Orders](screenshots/my-orders.png)

---

## Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

---

## Add Food

![Add Food](screenshots/add-food.png)

---

## Orders Management

![Orders](screenshots/orders.png)

---

# 🚀 Future Improvements

- Email Notifications
- Product Reviews
- Wishlist
- Coupon System
- Multiple Payment Methods
- Real-time Order Tracking
- User Profile Management
- Dark Mode
- Mobile Application

---

# 👨‍💻 Author

**Muhammad Hassan**

GitHub

https://github.com/Hassoo-000

LinkedIn

(Add your LinkedIn profile here)

---

# 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.