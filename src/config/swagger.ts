import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express E-Store API",
      version: "1.0.0",
      description:
        "A robust NodeJS REST API for an e-commerce platform, providing endpoints to manage products, users, carts, orders, and comments with MongoDB database integration.",
      contact: {
        name: "API Support",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "http://localhost:3000",
        description: "Docker server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "User management and authentication",
      },
      {
        name: "Products",
        description: "Product catalog management",
      },
      {
        name: "Carts",
        description: "Shopping cart management",
      },
      {
        name: "Cart Items",
        description: "Cart item operations",
      },
      {
        name: "Orders",
        description: "Order processing and management",
      },
      {
        name: "Comments",
        description: "Product reviews and comments",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["FullName", "UserName", "Email", "Password", "Address"],
          properties: {
            FullName: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              description: "User's full name",
              example: "John Doe",
            },
            UserName: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              description: "Unique username",
              example: "johndoe",
            },
            Email: {
              type: "string",
              format: "email",
              minLength: 5,
              maxLength: 255,
              description: "User's email address (must be unique)",
              example: "john.doe@example.com",
            },
            Password: {
              type: "string",
              minLength: 5,
              maxLength: 1024,
              description: "User's password (will be hashed)",
              example: "SecurePassword123",
            },
            Address: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              description: "User's address",
              example: "123 Main St, City, State",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            Id: {
              type: "string",
              format: "uuid",
              description: "Unique user identifier",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            FullName: {
              type: "string",
              example: "John Doe",
            },
            UserName: {
              type: "string",
              example: "johndoe",
            },
            Email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            Address: {
              type: "string",
              example: "123 Main St, City, State",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["Email", "Password"],
          properties: {
            Email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            Password: {
              type: "string",
              example: "SecurePassword123",
            },
          },
        },
        EmailCheckRequest: {
          type: "object",
          required: ["Email"],
          properties: {
            Email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
          },
        },
        Product: {
          type: "object",
          required: ["Name", "Description", "Price", "Shipping"],
          properties: {
            Name: {
              type: "string",
              description: "Product name",
              example: "Wireless Headphones",
            },
            Description: {
              type: "string",
              description: "Product description",
              example:
                "High-quality wireless headphones with noise cancellation",
            },
            Price: {
              type: "number",
              format: "double",
              description: "Product price",
              example: 99.99,
            },
            Shipping: {
              type: "number",
              format: "double",
              description: "Shipping cost",
              example: 5.99,
            },
            Image: {
              type: "string",
              format: "binary",
              description: "Product image file (jpg, jpeg, or png)",
            },
          },
        },
        ProductResponse: {
          type: "object",
          properties: {
            Id: {
              type: "string",
              description: "Unique product identifier (UUID without hyphens)",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            Name: {
              type: "string",
              example: "Wireless Headphones",
            },
            Description: {
              type: "string",
              example:
                "High-quality wireless headphones with noise cancellation",
            },
            Price: {
              type: "number",
              format: "double",
              example: 99.99,
            },
            Shipping: {
              type: "number",
              format: "double",
              example: 5.99,
            },
            Image: {
              type: "string",
              description: "Image filename",
              example: "product-image.jpg",
            },
          },
        },
        Cart: {
          type: "object",
          required: ["UserId", "ProductQuantity", "Status"],
          properties: {
            UserId: {
              type: "number",
              description: "User identifier",
              example: 1,
            },
            ProductQuantity: {
              type: "number",
              description: "Total quantity of products in cart",
              example: 5,
            },
            Status: {
              type: "string",
              description: "Cart status",
              example: "active",
            },
          },
        },
        CartResponse: {
          type: "object",
          properties: {
            Id: {
              type: "string",
              format: "uuid",
              description: "Unique cart identifier",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            UserId: {
              type: "number",
              example: 1,
            },
            ProductQuantity: {
              type: "number",
              example: 5,
            },
            Status: {
              type: "string",
              example: "active",
            },
          },
        },
        CartItem: {
          type: "object",
          required: [
            "CartId",
            "ProductId",
            "ProductQuantity",
            "ProductPrice",
            "ProductShipping",
          ],
          properties: {
            CartId: {
              type: "string",
              description: "Cart identifier",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            ProductId: {
              type: "string",
              description: "Product identifier",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            ProductQuantity: {
              type: "number",
              description: "Quantity of this product",
              example: 2,
            },
            ProductPrice: {
              type: "number",
              format: "double",
              description: "Product price at time of adding",
              example: 99.99,
            },
            ProductShipping: {
              type: "number",
              format: "double",
              description: "Shipping cost for this product",
              example: 5.99,
            },
          },
        },
        CartItemResponse: {
          type: "object",
          properties: {
            Id: {
              type: "string",
              description: "Unique cart item identifier (UUID without hyphens)",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            CartId: {
              type: "string",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            ProductId: {
              type: "string",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            ProductQuantity: {
              type: "number",
              example: 2,
            },
            ProductPrice: {
              type: "number",
              format: "double",
              example: 99.99,
            },
            ProductShipping: {
              type: "number",
              format: "double",
              example: 5.99,
            },
          },
        },
        Order: {
          type: "object",
          required: [
            "UserId",
            "OrderCartOrigin",
            "OrderDate",
            "OrderTotalQuantity",
            "OrderTotalShipping",
            "OrderTotalProducts",
            "OrderTotalTaxes",
            "ShippingAddress",
          ],
          properties: {
            UserId: {
              type: "string",
              description: "User identifier",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            OrderCartOrigin: {
              type: "string",
              description: "Original cart identifier",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            OrderDate: {
              type: "string",
              format: "date-time",
              description: "Order date and time",
              example: "2025-11-16T12:00:00Z",
            },
            OrderTotalQuantity: {
              type: "number",
              description: "Total quantity of items",
              example: 5,
            },
            OrderTotalShipping: {
              type: "number",
              format: "double",
              description: "Total shipping cost",
              example: 15.99,
            },
            OrderTotalProducts: {
              type: "number",
              format: "double",
              description: "Total cost of products",
              example: 199.95,
            },
            OrderTotalTaxes: {
              type: "number",
              format: "double",
              description: "Total taxes",
              example: 18.0,
            },
            ShippingAddress: {
              type: "string",
              description: "Shipping address",
              example: "123 Main St, City, State, ZIP",
            },
          },
        },
        OrderResponse: {
          type: "object",
          properties: {
            Id: {
              type: "string",
              description: "Unique order identifier (UUID without hyphens)",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            UserId: {
              type: "string",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            OrderCartOrigin: {
              type: "string",
              example: "a1b2c3d4-e5f6-4789-0abc-def123456789",
            },
            OrderDate: {
              type: "string",
              format: "date-time",
              example: "2025-11-16T12:00:00Z",
            },
            OrderTotalQuantity: {
              type: "number",
              example: 5,
            },
            OrderTotalShipping: {
              type: "number",
              format: "double",
              example: 15.99,
            },
            OrderTotalProducts: {
              type: "number",
              format: "double",
              example: 199.95,
            },
            OrderTotalTaxes: {
              type: "number",
              format: "double",
              example: 18.0,
            },
            ShippingAddress: {
              type: "string",
              example: "123 Main St, City, State, ZIP",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["ProductId", "OrderId", "CommentText", "Rating"],
          properties: {
            ProductId: {
              type: "string",
              description: "Product identifier",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            OrderId: {
              type: "string",
              description: "Order identifier",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            CommentText: {
              type: "string",
              description: "Comment text",
              example: "Great product! Highly recommend.",
            },
            Image: {
              type: "string",
              format: "binary",
              description: "Optional image file (jpg, jpeg, or png)",
            },
            Rating: {
              type: "number",
              description: "Product rating (1-5)",
              example: 5,
              minimum: 1,
              maximum: 5,
            },
          },
        },
        CommentResponse: {
          type: "object",
          properties: {
            Id: {
              type: "string",
              description: "Unique comment identifier (UUID without hyphens)",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            ProductId: {
              type: "string",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            OrderId: {
              type: "string",
              example: "a1b2c3d4e5f647890abcdef123456789",
            },
            CommentText: {
              type: "string",
              example: "Great product! Highly recommend.",
            },
            Image: {
              type: "string",
              description: "Image filename",
              example: "comment-image.jpg",
            },
            Rating: {
              type: "number",
              example: 5,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
              example: "Resource not found",
            },
          },
        },
        Message: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "Operation successful",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT authentication (not yet implemented)",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
