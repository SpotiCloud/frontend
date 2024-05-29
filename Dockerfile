# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --production --frozen-lockfile

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]