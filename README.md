# 🧾 Zatterstedt Server

A backend application built for managing operations of a **clothing retail business**, developed with **NestJS** and deployed via **Vercel**.  
It powers the **Zatterstedt Admin Panel**, handling **authentication**, **data processing**, and **inventory tracking**.

## ✨ Key Features

- **User Authentication** with Passport
- **CRUD operations** for managing products, prices, and related data
- **Advanced logging**: A dedicated logging table records all meaningful changes to other tables for audit and traceability
- **Transactional data handling**:
  - Initially implemented using **TypeORM**
  - Migrated to **Mongoose** due to lack of transaction support in TypeORM for NoSQL (MongoDB)
- **Email notifications** with **Nodemailer**
- **Environment-based configuration** (development, staging, production)
- **Hosted on Vercel** for fast and scalable deployments

## 🔧 Technologies Used

- **NestJS**
- **MongoDB**
- **Mongoose**
- **TypeORM** (initially used)
- **Passport (Authentication)**
- **Nodemailer**
- **Vercel (Deployment)**
- **Environment configuration (env files)**
- **TypeScript**
