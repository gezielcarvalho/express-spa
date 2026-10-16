# Architecture

```text
HTTP client
   |
   v
Express routes -> TypeScript controllers -> Mongoose models -> MongoDB
   |
   +--> Swagger UI and static/upload assets

Docker Compose provides a local API, MongoDB, and database-admin workflow.
```

The API uses controller/route/model separation for common e-commerce resource types. Application startup loads environment configuration, connects Mongoose to MongoDB, registers Swagger and middleware, and exposes the route groups.

## Boundary

The architecture is a historical learning API. It should not imply a tested storefront, secure production identity system, or operationally hardened MongoDB deployment.
