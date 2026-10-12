# ThriftHive

A 3-page secondhand/thrift store e-commerce app, built for a cloud computing
lab assignment: **React (Vite)** frontend + **Node.js/Express** backend +
**MongoDB (Atlas)** database.

Each listing is a unique, one-off item — there are no size/quantity variants,
just `available` or `sold`.

## Pages

1. **Browse (`/`)** — grid of items with search, category filter, and sort.
2. **Item Detail (`/items/:id`)** — full description, price, condition,
   lister name, and Add to Cart / Buy Now actions (disabled once sold).
3. **Cart & Checkout (`/cart`)** — cart list with remove, running total, a
   checkout form, and an order confirmation screen. On successful checkout,
   purchased items are atomically marked `sold`.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite, React Router, Context + `useReducer` for cart state |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (cloud, free tier) via Mongoose |
| Validation | Zod |
| Logging | Pino |
| Tests | Jest + `mongodb-memory-server` (replica set) |

## Setup

### Prerequisites
- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### 1. Create your MongoDB Atlas cluster
1. Sign up / log in at MongoDB Atlas and create a free (M0) cluster.
2. Under **Database Access**, add a database user with a password.
3. Under **Network Access**, allow your current IP (or `0.0.0.0/0` for lab
   convenience — not recommended beyond coursework).
4. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@<cluster>/?retryWrites=true&w=majority`
   Add a database name to the path, e.g. `.../thrifthive?retryWrites=true...`

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
# paste your Atlas connection string into MONGODB_URI in .env
npm run seed   # populates ~18 sample thrift items
npm run dev    # starts the API on http://localhost:5000
```

### 3. Frontend

```bash
cd client
npm install
cp .env.example .env   # defaults already point at http://localhost:5000/api/v1
npm run dev             # starts the app on http://localhost:5173
```

### 4. Run backend tests

```bash
cd server
npm test
```

Tests spin up an in-memory MongoDB **replica set** (via
`mongodb-memory-server`) so the checkout transaction logic is exercised the
same way it runs against Atlas. The first run downloads a `mongod` binary —
this requires outbound network access to `fastdl.mongodb.org`; if your
network blocks that, use a machine/sandbox with fewer network restrictions.

## API reference

Base URL: `/api/v1`. All responses are shaped as
`{ success: true, data, message? }` or `{ success: false, error: { code, message } }`.

| Method | Path | Description | Body / Query |
|---|---|---|---|
| GET | `/items` | List items | Query: `category`, `search`, `sort` (`newest`\|`price_asc`\|`price_desc`) |
| GET | `/items/:id` | Get one item | — |
| POST | `/items` | List a new item (stretch feature) | `{ title, description, price, category, condition, imageUrl, listedBy }` |
| POST | `/orders/checkout` | Place an order | `{ buyerName, buyerEmail, shippingAddress, paymentMethod, itemIds: [] }` |
| GET | `/health` | Liveness check | — |

## Architecture

The backend follows a strict layered architecture so each layer has exactly
one job and no layer can bypass another:

```
routes        → wire up endpoints + validation middleware, nothing else
controllers   → parse req, call a service, shape the HTTP response
services      → business logic (checkout, listing rules) — no Express or
                Mongoose imports, so this layer is framework-agnostic
repositories  → the ONLY layer that imports Mongoose models
models        → Mongoose schemas only, no business logic
```

This means, for example, that `orderService.checkout()` can be unit-tested
without spinning up Express at all, and the persistence layer
(`itemRepository`/`orderRepository`) could be swapped for a different
database without touching a single line of business logic.

**Centralized cross-cutting concerns:**
- `config/env.js` is the only module that reads `process.env`, and it fails
  fast at startup if `MONGODB_URI` is missing.
- `middleware/errorHandler.js` is the single place HTTP error responses are
  produced — every thrown `AppError` becomes a clean JSON error; anything
  else is logged as a bug and hidden from the client.
- `middleware/validate.js` + Zod schemas in `validations/` keep input
  validation declarative and out of controllers entirely.

**Checkout atomicity:** placing an order and marking items `sold` happens
inside a single MongoDB transaction (`session.withTransaction`), so a failure
partway through can't leave an order without its items being marked sold, or
vice versa. This requires the database to be a replica set — MongoDB Atlas
provisions every cluster (including the free tier) as a replica set by
default, which is the whole reason this project uses Atlas rather than a bare
standalone `mongod`.

The frontend mirrors this separation: `api/` is the only place that knows how
to call `fetch`, `hooks/` hold all data-fetching and cart logic, `context/`
holds shared cart state (Context + reducer — no Redux needed at this scale),
and `pages`/`components` stay thin and presentational.

## Known limitations (deliberate scope decisions, not bugs)

- **No authentication.** Buyer/lister names are plain strings with no
  accounts, sessions, or passwords.
- **No real payment processing.** The payment method field is a UI-only mock;
  no payment provider is integrated.
- **No image upload pipeline.** Items store an `imageUrl` string; seed data
  uses placeholder images from picsum.photos. Uploading/storing binary images
  (e.g. to S3/Blob storage) was intentionally left out of this pass.
- **No admin dashboard.** The only write endpoint is `POST /items` (listing a
  new item), used as the stretch-feature demonstration of full CRUD.
- **Deployment/CI is out of scope for this repository** and will be handled
  separately.
