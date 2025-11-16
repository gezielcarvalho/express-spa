# Use official Node.js LTS (Long Term Support) image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy application files
COPY . .

# Build TypeScript
RUN npm run build

# Remove devDependencies
RUN npm prune --production

# Create directory for uploads if needed
RUN mkdir -p /app/uploads

# Expose the application port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
