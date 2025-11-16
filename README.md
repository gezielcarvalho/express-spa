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

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** bcrypt for password hashing
- **File Upload:** express-fileupload
- **CORS:** Enabled for cross-origin requests

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

# Start the application and MongoDB
docker-compose up -d

# Check logs
docker-compose logs -f app

# Stop the application
docker-compose down
```

The API will be available at `http://localhost:3000`

### Docker Commands Reference

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v

# Rebuild containers
docker-compose up -d --build

# Access MongoDB shell
docker exec -it express-spa-mongodb mongosh e-store
```

## Local Development Setup

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

### 3. Start MongoDB

Make sure MongoDB is running locally on port 27017.

### 4. Run the Application

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The API will be available at `http://localhost:3000`

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
├── src/
│   ├── app.js             # Application entry point
│   ├── config/            # Configuration files
│   │   ├── database.js    # Database configuration
│   │   └── express.js     # Express configuration
│   ├── controllers/       # Route controllers
│   │   ├── CartController.js
│   │   ├── CartItemController.js
│   │   ├── CommentController.js
│   │   ├── OrderController.js
│   │   ├── ProductController.js
│   │   └── UserController.js
│   ├── middlewares/       # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/            # Mongoose models
│   │   ├── Cart.js
│   │   ├── CartItem.js
│   │   ├── Comment.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   └── routes/            # Route definitions
│       ├── cartRoutes.js
│       ├── cartItemRoutes.js
│       ├── commentRoutes.js
│       ├── orderRoutes.js
│       ├── productRoutes.js
│       └── userRoutes.js
├── .env.example           # Example environment variables
├── .dockerignore          # Docker ignore file
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (to be implemented)

### Adding New Features

1. Create model in `src/models/`
2. Create controller in `src/controllers/`
3. Define routes in `src/routes/`
4. Register routes in `src/app.js`

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
