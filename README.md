# 🌍 Wanderlust — Server API

Wanderlust is the **backend server** for a premium travel and tourism platform, built to power destination discovery, tour bookings, and admin management for modern explorers. It exposes a secure, RESTful API that connects the Wanderlust frontend to a MongoDB database, handling everything from destination listings to booking transactions and platform analytics.

---

## 📖 Project Description

This server acts as the core data and business-logic layer of the Wanderlust travel platform. It provides secure, token-protected endpoints for managing travel destinations and user bookings, along with dedicated admin routes for monitoring platform-wide statistics such as total destinations, bookings, and revenue. Authentication is handled via JWT verification against a remote JWKS endpoint, ensuring only verified users can access protected resources.

---

## ✨ Features

- **Destination Management (CRUD):** Create, read, update, and delete travel destinations with full MongoDB integration.
- **Featured Destinations:** Dedicated endpoint to fetch a curated, limited list of featured destinations for the homepage.
- **Secure Booking System:** Authenticated users can create bookings, view their personal booking history, and cancel bookings.
- **JWT Authentication Middleware:** Verifies incoming requests using `jose` and a remote JWKS set, protecting sensitive routes from unauthorized access.
- **Admin Dashboard Endpoints:** Aggregated statistics endpoint that calculates total destinations, total bookings, and total revenue using MongoDB aggregation pipelines.
- **Admin Booking Overview:** Allows administrators to view all bookings across the platform.
- **CORS-Enabled REST API:** Fully configured with CORS support for smooth communication with the frontend client.
- **Environment-Based Configuration:** Uses `.env` variables for sensitive configuration like database URI, port, and client URL.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Native Driver) |
| **Authentication** | JWT Verification via `jose-cjs` (Remote JWKS) |
| **Middleware** | CORS, express.json() |
| **Environment Management** | dotenv |

---

## 📂 API Endpoints

### Destinations
| Method | Endpoint | Protected | Description |
|---|---|---|---|
| `POST` | `/destination` | ✅ | Add a new destination |
| `GET` | `/destination` | ✅ | Get all destinations |
| `GET` | `/featured` | ✅ | Get top 10 featured destinations |
| `GET` | `/destination/:id` | ✅ | Get a single destination by ID |
| `PATCH` | `/destination/:id` | ✅ | Update a destination |
| `DELETE` | `/destination/:id` | ✅ | Delete a destination |

### Bookings
| Method | Endpoint | Protected | Description |
|---|---|---|---|
| `POST` | `/bookings` | ✅ | Create a new booking |
| `GET` | `/bookings/:userId` | ✅ | Get bookings for a specific user |
| `DELETE` | `/bookings/:id` | ✅ | Cancel/delete a booking |

### Admin
| Method | Endpoint | Protected | Description |
|---|---|---|---|
| `GET` | `/admin/bookings` | ✅ | Get all bookings (admin view) |
| `GET` | `/admin/stats` | ✅ | Get total destinations, bookings & revenue stats |

> ⚠️ **Note:** Admin routes currently use standard token verification. Role-based authorization should be added in production to restrict access strictly to admin users.

---

## 🔐 Authentication Flow

1. The client sends a request with a `Bearer` token in the `Authorization` header.
2. The `verifyToken` middleware extracts the token and verifies it against a remote JWKS endpoint (`/api/auth/jwks`) using the `jose-cjs` library.
3. If verification succeeds, the request proceeds to the route handler; otherwise, a `401 Unauthorized` or `403 Forbidden` response is returned.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_frontend_client_url
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/towfiq-dev/wandelust-server.git
   cd wandelust-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file as described above.

4. **Run the server**
   ```bash
   node index.js
   ```

5. The server will start at:
   ```
   http://localhost:5000
   ```

---

## 📌 Live & Related Links

- 🔗 **Live Frontend:** [wanderlust-express-js.vercel.app](https://wanderlust-express-js.vercel.app)
- 🔗 **Client Source Code:** [github.com/towfiq-dev/wanderlust-express-js](https://github.com/towfiq-dev/wanderlust-express-js)
- 🔗 **Server Source Code:** [github.com/towfiq-dev/wandelust-server](https://github.com/towfiq-dev/wandelust-server)

---

## 👨‍💻 Author

**Towfiqul Islam**
Junior Full Stack Web Developer | MERN Stack Specialist
📧 towfiqulislam017399@gmail.com
📍 Dhaka, Bangladesh
