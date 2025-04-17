# 📝 Blog System

A full-featured blog system built using **Laravel 12** (API) and **React** (Frontend). This project supports user registration, authentication, blog post CRUD, comment CRUD for the posts, and a clean UI built with Tailwind CSS. Authentication is handled using **Laravel Sanctum**.

---

## ✨ Key Features

### ✅ User Portal (React + Tailwind)
- User registration & login
- View all blog posts
- View individual blog details
- Create, edit your posts
- Search for a specific post
- Comment on the post
- View, edit, and delete the comments
- Download button inside the single post view will generates a post's pdf view
- Responsive UI using Tailwind CSS

### ✅ Backend API (Laravel)
- Laravel Sanctum for SPA authentication
- RESTful API with route protection
- Blog CRUD operations
- Comment on CRUD operations
- Form request validations
- Get an email (using observer) when creating a new post with a post image and the post content, PDF and create a new log inside the Logs table
- When a user viewed the post the viewed conut will increase and the log message also stored inside the log message.
- Eloquent ORM for database interaction
- JSON responses with proper status codes
- **Feature testing** for Post CRUD operations using Laravel's testing tools

---

## ⚙️ Tech Stack

- **Frontend:** React, Axios, Tailwind CSS, React Router, Redux
- **Backend:** Laravel 12, Sanctum, MySQL
- **Authentication:** Token-based using Sanctum
- **Dev Tools:** Composer, Artisan CLI, NPM, Vite
- **Testing:** Laravel Feature Testing 

---

## 📁 Project Structure

blog-system/ 
  ├── backend/ # Laravel 12 API │ 
          ├── app/ │ 
          ├── routes/api.php │  
  ├── frontend/ # React + Tailwind │ 
          ├── src/ │ 
          ├── public/ │ 
  └── ScreenShots
  └── README.md

---

## 🚀 Installation Guide

### 🔧 Backend (Laravel API)

```bash
cd backend
composer install
change .env.example to .env
php artisan key:generate
php artisan migrate --seed
composer run dev
```

### 🔧 Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Authentication Flow
User registers via /api/register
Logs in to receive the Sanctum token
Token is attached to all protected routes via Authorization: Bearer <token>
Laravel middleware ensures only authenticated users can create/update posts

## 📸 Screenshots

Homepage	Blog View	Create Post

## 📄 License
This project is open-source under the MIT License.

## 🙌 Acknowledgements
Made by Y. Hiriejhha Dharini

