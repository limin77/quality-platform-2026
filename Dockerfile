# Get the official Playwright image (includes Node.js + Browsers)
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies (Clean install for CI)
RUN npm ci

# Copy the rest of the project files
COPY . .

# Default command to run when the container starts
CMD ["npx", "playwright", "test"]