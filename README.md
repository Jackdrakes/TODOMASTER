## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

Setup a postgres server in local or create free on online platforms like cockroach db, supabase.

url format: ``` postgresql://<username>:<password>@<host>:<port>/<database>```

Use docker or podman for easy setup in your local

if using podman use the below commands
```
podman pull postgres

podman run -d \
  --name my_postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  postgres

podman ps

 
```

