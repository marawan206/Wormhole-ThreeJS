# Use official Node.js 18 image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port Vite will run on (default is 3000)
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
