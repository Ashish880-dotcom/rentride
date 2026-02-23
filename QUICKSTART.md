# RentRide - Quick Start Guide

Get up and running with RentRide in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- Git (optional)

## Quick Setup (5 Steps)

### Step 1: Install Dependencies (1 min)

```bash
cd rentride
npm install
```

### Step 2: Configure Environment (1 min)

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/rentride"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 3: Setup Database (1 min)

```bash
npx prisma generate
npx prisma db push
```

### Step 4: Start Development Server (1 min)

```bash
npm run dev
```

### Step 5: Create Admin Account (1 min)

1. Open http://localhost:3000/register
2. Register with your email
3. Open PostgreSQL and run:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## You're Ready! 🎉

- **Landing Page**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Vehicles**: http://localhost:3000/vehicles
- **Bookings**: http://localhost:3000/bookings
- **Profile**: http://localhost:3000/profile
- **Admin**: http://localhost:3000/admin

## Quick Test Flow

1. **Register** a new user account
2. **Login** with your credentials
3. **Browse** vehicles at `/vehicles`
4. **View** your profile at `/profile`
5. **Access** admin panel at `/admin` (if admin)

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Regenerate Prisma client
npx prisma db push       # Update database schema

# Production
npm run build            # Build for production
npm start                # Start production server
```

## Troubleshooting

### Port 3000 in use?

The server will automatically use port 3001.

### Database connection error?

Check your DATABASE_URL in `.env` file.

### Prisma errors?

Run: `npx prisma generate`

### Can't login?

Clear browser cookies and try again.

## Next Steps

1. Add vehicles through admin panel
2. Test booking flow
3. Customize vehicle types
4. Add your branding
5. Deploy to production

## Need Help?

- Check `README.md` for detailed documentation
- Review `SETUP.md` for comprehensive setup guide
- See `PROJECT_SUMMARY.md` for feature overview
- Check `CHECKLIST.md` for implementation status

## Optional: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add to `.env`:

```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

1. Build: `npm run build`
2. Set environment variables
3. Run: `npm start`

## Database Seeding (Optional)

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add sample vehicles
  await prisma.vehicle.createMany({
    data: [
      {
        name: "Tesla Model S",
        brand: "Tesla",
        type: "CAR",
        pricePerDay: 149,
        status: "AVAILABLE",
        // ... more fields
      },
      // ... more vehicles
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run: `npx prisma db seed`

## Tips

- Use Prisma Studio for easy database management
- Check browser console for errors
- Use React DevTools for debugging
- Monitor Network tab for API calls
- Clear cache if styles don't update

## Support

For issues or questions:

- Review documentation files
- Check Prisma docs: https://www.prisma.io/docs
- Check NextAuth docs: https://next-auth.js.org
- Check Next.js docs: https://nextjs.org/docs

---

Happy coding! 🚗✨

**Time to get started**: ~5 minutes
**Time to first booking**: ~10 minutes
**Time to production**: ~30 minutes
