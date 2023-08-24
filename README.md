# Fullstack AirBnB Clone

This is a fullstack pet-project that I do in my free time. 

Main framework for this project is Next.js 13. The database for the backend is MongoDB, and querying is realised 
with Prisma.

Project is not completed and is subject to change.

**Production deployment on Vercel:** [Click to go](https://vercel.com/k0ndrateff/booking-app/jkT6Ps9nyLRUNzBuVEL5hZFY5FJW)

## Running Demo

You can run demo by cloning this repository and running:

```shell
npm run dev
```

You also should create a _.env_ file to store some environment variables. There are 7 of them:
```dotenv
DATABASE_URL= // URL to your MongoDB database.
NEXTAUTH_SECRET= // Any string to be secret for auth 

GITHUB_ID= // ID for Github OAuth
GITHUB_SECRET= // Secret for Github OAuth

GOOGLE_CLIENT_ID= // ID for Google OAuth
GOOGLE_CLIENT_SECRET= // Secret for Google OAuth

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= // Cloud name on Cloudinary service. Used as CDN to store images.
```