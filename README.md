# Game Store

The backend of the game store.

## How to Run

Write the `yarn` command to download all packages.

Create a `.env` file with the following contents:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=mysql://user:password@url:port/db
```

Then run a few commands:

```
npx prisma generate
npx prisma db push
```

If there are no errors, then you can start the server.

This is done using the command: `npm start`.
