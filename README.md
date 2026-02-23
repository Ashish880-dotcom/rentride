# RentRide - Premium Vehicle Rental System

A modern, full-stack vehicle rental platform built with Next.js 14, TypeScript, Prisma, and NextAuth.

## Features

- **Authentication & Authorization**
  - User registration and login with email/password
  - Google OAuth integration
  - Role-based access control (USER, ADMIN)
  - Protected routes and API endpoints

- **Vehicle Management**
  - Browse premium vehicle collection
  - Advanced filtering (type, price range, search)
  - Vehicle details with ratings and features
  - Admin vehicle CRUD operations

- **Booking System**
  - Create and manage bookings
  - Date conflict detection
  - Automatic price calculation
  - Booking status tracking (PENDING, CONFIRMED, CANCELLED, COMPLETED)

- **User Dashboard**
  - View booking history
  - Manage profile information
  - Payment methods
  - Notification preferences

- **Admin Dashboard**
  - Overview with statistics
  - Vehicle management
  - Booking management
  - User management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Design System

The application features a sophisticated coffee-inspired dark theme:

- **Background**: zinc-900, zinc-800
- **Accents**: amber-600, amber-700, amber-200
- **Typography**: font-light, font-medium with tracking-wide
- **Style**: Uppercase labels, premium aesthetic

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. Clone the repository:

```bash
cd rentride
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rentride"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
rentride/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── (dashboard)/
│   │   ├── admin/          # Admin dashboard
│   │   └── profile/        # User profile
│   ├── api/
│   │   ├── auth/           # NextAuth routes
│   │   ├── bookings/       # Booking API
│   │   └── vehicles/       # Vehicle API
│   ├── bookings/           # User bookings page
│   ├── vehicles/           # Vehicle listing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── providers/          # Context providers
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
└── types/
    └── index.ts            # TypeScript types
```

## Database Schema

### Models

- **User**: User accounts with authentication
- **Vehicle**: Vehicle inventory with details
- **Booking**: Rental bookings with dates and status
- **Account**: OAuth account linking
- **Session**: User sessions
- **VerificationToken**: Email verification

### Enums

- **Role**: USER, ADMIN
- **VehicleType**: CAR, MOTORCYCLE, BIKE, SCOOTER, VAN, TRUCK
- **VehicleStatus**: AVAILABLE, RENTED, MAINTENANCE
- **BookingStatus**: PENDING, CONFIRMED, CANCELLED, COMPLETED

## API Routes

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in user
- `GET /api/auth/session` - Get current session

### Vehicles

- `GET /api/vehicles` - List all vehicles (with filters)
- `POST /api/vehicles` - Create vehicle (admin only)
- `GET /api/vehicles/[id]` - Get vehicle details
- `PUT /api/vehicles/[id]` - Update vehicle (admin only)
- `DELETE /api/vehicles/[id]` - Delete vehicle (admin only)

### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking

## Key Features Implementation

### Authentication Flow

1. User registers via `/register` page
2. Credentials stored with bcrypt hashed password
3. Login via `/login` with NextAuth
4. Session managed with JWT strategy
5. Protected routes check authentication status

### Booking Flow

1. User selects vehicle and dates
2. System checks vehicle availability
3. Detects date conflicts with existing bookings
4. Calculates total price based on days
5. Creates booking with PENDING status
6. Updates vehicle status to RENTED

### Admin Features

- Dashboard with statistics and charts
- Vehicle CRUD operations
- Booking management and status updates
- User management and role assignment

## Development

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name
```

## Environment Variables

| Variable             | Description                  | Required |
| -------------------- | ---------------------------- | -------- |
| DATABASE_URL         | PostgreSQL connection string | Yes      |
| NEXTAUTH_URL         | Application URL              | Yes      |
| NEXTAUTH_SECRET      | Secret for JWT signing       | Yes      |
| GOOGLE_CLIENT_ID     | Google OAuth client ID       | No       |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret   | No       |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript
