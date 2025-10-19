#  E-commerce Site (Practice Project)

This is a **full-stack e-commerce application** I’m building to practice and apply everything I’ve learned so far in web development ,from backend APIs and databases to frontend design and integration.

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Fast Marquee (UI animation)

**Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- Cloudinary (for image uploads)
- Multer (file upload handling)

**Other Tools**
- Dotenv 
- Nodemon


## Project Structure

```bash
E-commerce-site/
│
├── backend/                # Node.js + Express + Prisma API
│   ├── controllers/        # Controllers (product logic, etc.)
│   ├── routes/             # Express routes
│   ├── config/             # Config (Cloudinary, etc.)
│   ├── prisma/             # Prisma schema + migrations
│   └── server.js           # Express server entry
│
├── frontend/               # React app (Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main pages (Home, Shop, etc.)
│   │   └── App.jsx         # App entry
│   └── index.html
│
└── README.md
```
🛠️ Setup & Installation
1. Clone the repo
   ```bash
   git clone https://github.com/Yuyi5la/E-commerce-site.git
   cd E-commerce-site
   ```

2. Backend Setup
   ```bash
   cd backend
   npm install
   ```
  Create a .env file inside backend/:
   ```bash
      DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db"
      CLOUDINARY_CLOUD_NAME=your_cloud_name
      CLOUDINARY_API_KEY=your_api_key
      CLOUDINARY_API_SECRET=your_api_secret
      PORT=3000
   ```

3. Frontend Setup
    ```bash
    cd frontend
   npm install
   npm run dev
   ```
