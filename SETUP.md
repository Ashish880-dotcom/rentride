# RentRide - Quick Setup Guide

## Step-by-Step Setup

### 1. Database Setup

First, ensure PostgreSQL is installed and running on your system.

Create a new database:

```sql
CREATE DATABASE rentride;
```

### 2. Environment Configuration

Create a `.env` file in the `rentride` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rentride"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

To generate a secure NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### 3. Install Dependencies

```bash
cd rentride
npm install
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Seed Database (Optional)

You can manually add vehicles through the admin dashboard or create a seed script.

### 6. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## First Steps

### 1. Create Admin Account

1. Go to `http://localhost:3000/register`
2. Register a new account
3. Manually update the user role in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### 2. Add Vehicles

1. Login with your admin account
2. Navigate to `/admin`
3. Go to the "Vehicles" tab
4. Click "Add Vehicle" to create new vehicles

### 3. Test Booking Flow

1. Logout and register as a regular user
2. Browse vehicles at `/vehicles`
3. Select a vehicle and create a booking
4. View your bookings at `/bookings`

## Google OAuth Setup (Optional)

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env`

### 2. Test OAuth Login

1. Go to `/login`
2. Click "Sign in with Google"
3. Complete OAuth flow

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, the dev server will automatically use port 3001.

### Database Connection Issues

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Check user permissions

### Prisma Issues

If you encounter Prisma errors:

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma

# Regenerate client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

### NextAuth Issues

- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

## Production Deployment

### Environment Variables

Set these in your production environment:

- `DATABASE_URL` - Production database URL
- `NEXTAUTH_URL` - Production domain (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET` - Strong random secret
- `GOOGLE_CLIENT_ID` - Production OAuth credentials
- `GOOGLE_CLIENT_SECRET` - Production OAuth credentials

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Database Migration

For production, use migrations instead of db push:

```bash
npx prisma migrate deploy
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma studio        # Open Prisma Studio GUI
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema changes
npx prisma migrate dev   # Create migration

# Code Quality
npm run lint             # Run ESLint
```

## Next Steps

1. Customize the vehicle types and features
2. Add payment integration (Stripe, PayPal)
3. Implement email notifications
4. Add vehicle images upload
5. Create booking confirmation emails
6. Add reviews and ratings system
7. Implement advanced search filters
8. Add analytics dashboard

## Support

For issues or questions:

- Check the main README.md
- Review Prisma documentation
- Check NextAuth documentation
- Open an issue on GitHub

---

Happy coding! 🚗✨
