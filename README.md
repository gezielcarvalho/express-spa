# Express E-Store API

A robust NodeJS REST API implementation for an e-commerce platform, providing server components to manage products, users, carts, orders, and comments with MongoDB database integration.

## Features

- 🛍️ Product management with image upload support
- 👤 User authentication and management
- 🛒 Shopping cart functionality
- 📦 Order processing
- 💬 Product comments and reviews
- 🔒 Authentication middleware
- 🐳 Docker support for easy deployment
- 📊 MongoDB database integration
- 📚 Interactive API documentation with Swagger UI
- 📘 Full TypeScript support with strict type checking

## Tech Stack

- **Language:** TypeScript 5.x
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** bcrypt for password hashing
- **File Upload:** express-fileupload
- **CORS:** Enabled for cross-origin requests
- **API Docs:** Swagger/OpenAPI 3.0
- **Dev Tools:** ts-node, nodemon for hot reload

## Prerequisites

Choose one of the following options:

### Option 1: Docker (Recommended)

- Docker Desktop installed
- Docker Compose

### Option 2: Local Development

- Node.js 18.x or higher
- MongoDB 7.0 or higher
- npm or yarn

## Quick Start with Docker 🐳

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd express-spa

# Start all services (MongoDB + Mongo Express + API)
npm run docker:up

# Check logs
npm run docker:logs

# Stop all services
npm run docker:down
```

**Access Points:**

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`
- Mongo Express (Database UI): `http://localhost:8081` (admin/admin123)

### Docker Commands Reference

```bash
# Using npm scripts (recommended)
npm run docker:up          # Start all containers
npm run docker:down        # Stop all containers
npm run docker:logs        # View app logs
npm run docker:restart     # Restart app container

# Using docker compose directly
docker compose up -d                # Start all services
docker compose down                 # Stop all services
docker compose down -v              # Stop and remove volumes (deletes data)
docker compose logs -f app          # View app logs
docker compose logs -f mongodb      # View database logs

# Access MongoDB shell
docker exec -it express-spa-mongodb mongosh e-store
```

### Mongo Express - Database Management UI

A web-based MongoDB admin interface is included:

- **URL:** `http://localhost:8081`
- **Username:** `admin`
- **Password:** `admin123`

Use Mongo Express to:

- Browse collections and documents
- Execute queries
- Add/edit/delete data
- Monitor database performance

## Local Development Setup

### Recommended: Local App with Dockerized Database

This approach gives you the best of both worlds - containerized database services with local app debugging:

```bash
# 1. Install dependencies
npm install

# 2. Start MongoDB and Mongo Express in Docker
npm run dev:db

# 3. Run the app locally with hot-reload
npm run dev
```

**Or use the combined command:**

```bash
npm run dev:local  # Starts DB containers + runs app in watch mode
```

**Access Points:**

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`
- Mongo Express: `http://localhost:8081` (admin/admin123)

### Alternative: Fully Local Setup

If you prefer to run everything locally without Docker:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and update values:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/e-store
```

### 3. Start MongoDB Locally

```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

### 4. Run the Application

**Development mode** (with auto-reload, runs TypeScript directly):

```bash
npm run dev        # Uses nodemon + ts-node
npm run dev:ts     # Direct ts-node execution
```

**Production mode** (compile and run):

```bash
npm run build      # Compile TypeScript to JavaScript
npm start          # Run compiled code
```

## API Documentation

Interactive API documentation is available via Swagger UI:

**Access Swagger UI:** `http://localhost:3000/api-docs`

The Swagger interface provides:

- Complete API endpoint documentation
- Interactive request testing
- Request/response schemas
- Example payloads
- Authentication information

You can test all API endpoints directly from the Swagger UI without needing external tools like Postman.

## API Endpoints

### Users

- `POST /users` - Register a new user
- `POST /users/login` - User login
- `POST /users/checkemailexists` - Check if email is already in use
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Carts

- `GET /carts` - Get all carts
- `GET /carts/:id` - Get cart by ID
- `POST /carts` - Create new cart
- `PUT /carts/:id` - Update cart
- `DELETE /carts/:id` - Delete cart

### Cart Items

- `GET /cartitems` - Get all cart items
- `POST /cartitems` - Add item to cart
- `PUT /cartitems/:id` - Update cart item
- `DELETE /cartitems/:id` - Remove cart item

### Orders

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Comments

- `GET /comments` - Get all comments
- `GET /comments/:id` - Get comment by ID
- `POST /comments` - Create new comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

## Environment Variables

| Variable      | Description                   | Default                     | Required |
| ------------- | ----------------------------- | --------------------------- | -------- |
| `PORT`        | Port for the server to listen | `3000`                      | No       |
| `NODE_ENV`    | Environment mode              | `development`               | No       |
| `MONGODB_URI` | MongoDB connection string     | `mongodb://localhost:27017` | Yes      |

## Project Structure

```
express-spa/
├── public/                 # Static files and HTML pages
│   └── images/            # Image assets
├── src/                   # TypeScript source files
│   ├── app.ts             # Application entry point
│   ├── config/            # Configuration files
│   │   ├── database.ts    # Database configuration
│   │   ├── express.ts     # Express configuration
│   │   └── swagger.ts     # Swagger/OpenAPI configuration
│   ├── controllers/       # Route controllers (TypeScript)
│   │   ├── CartController.ts
│   │   ├── CartItemController.ts
│   │   ├── CommentController.ts
│   │   ├── OrderController.ts
│   │   ├── ProductController.ts
│   │   └── UserController.ts
│   ├── middlewares/       # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/            # Mongoose models (TypeScript)
│   │   ├── Cart.ts
│   │   ├── CartItem.ts
│   │   ├── Comment.ts
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── routes/            # Route definitions (TypeScript)
│   │   ├── cartRoutes.ts
│   │   ├── cartItemRoutes.ts
│   │   ├── commentRoutes.ts
│   │   ├── orderRoutes.ts
│   │   ├── productRoutes.ts
│   │   └── userRoutes.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts       # Shared interfaces and types
├── dist/                  # Compiled JavaScript (generated)
├── tsconfig.json          # TypeScript configuration
├── nodemon.json           # Nodemon configuration
├── .env.example           # Example environment variables
├── .dockerignore          # Docker ignore file
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Development

## TypeScript Implementation

This project is written in **TypeScript** for improved type safety, better developer experience, and maintainable code.

### Why TypeScript?

- ✅ **Type Safety**: Catch errors at compile-time instead of runtime
- ✅ **Better IDE Support**: Enhanced autocomplete, refactoring, and navigation
- ✅ **Self-Documenting**: Types serve as inline documentation
- ✅ **Maintainability**: Easier to refactor and scale the codebase
- ✅ **Modern Features**: Latest ECMAScript features with backwards compatibility

### TypeScript Workflow

**Development** (no build required):

```bash
npm run dev        # Nodemon watches .ts files, runs with ts-node
npm run dev:ts     # Direct TypeScript execution
```

**Production** (compile first):

```bash
npm run build      # Compiles src/*.ts → dist/*.js
npm start          # Runs compiled JavaScript
```

**Docker** (builds automatically):

```bash
npm run docker:up  # Dockerfile compiles TypeScript during build
```

### Type Definitions

All TypeScript interfaces are defined in `src/types/index.ts`:

- `IUser`, `IProduct`, `ICart`, `ICartItem`, `IOrder`, `IComment`
- Mongoose models extend these interfaces for full type safety
- Express Request/Response types for all controllers

### Available Scripts

#### TypeScript Development

- `npm run build` - Compile TypeScript to JavaScript (output to `dist/`)
- `npm run dev` - Development server with nodemon + ts-node (auto-reload)
- `npm run dev:ts` - Direct TypeScript execution with ts-node
- `npm start` - Run compiled production build from `dist/`
- `npm test` - Run tests (to be implemented)

#### Docker - Full Stack

- `npm run docker:up` - Build and start all containers (MongoDB + Mongo Express + App)
- `npm run docker:down` - Stop and remove all containers
- `npm run docker:logs` - View app container logs in real-time
- `npm run docker:restart` - Restart the app container

#### Development - Local App with Dockerized Database

- `npm run dev:local` - Start DB containers + run app locally in watch mode
- `npm run dev:db` - Start only MongoDB and Mongo Express containers

### Adding New Features

1. Define TypeScript interfaces in `src/types/index.ts`
2. Create Mongoose model in `src/models/` (extends interface)
3. Create controller in `src/controllers/` (use Request/Response types)
4. Define routes in `src/routes/` with Swagger JSDoc comments
5. Register routes in `src/app.ts`
6. TypeScript will validate types during development
7. Build with `npm run build` before deploying

## Troubleshooting

### MongoDB Connection Issues

**Local Development:**

```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list             # macOS
```

**Docker:**

```bash
# Check if MongoDB container is healthy
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb
```

### Port Already in Use

If port 3000 is already in use:

1. Change `PORT` in `.env` file
2. Update port mapping in `docker-compose.yml` if using Docker

### Permission Issues with Docker

```bash
# On Linux, you may need to add your user to docker group
sudo usermod -aG docker $USER

# Or run with sudo
sudo docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Node.js and Express**
