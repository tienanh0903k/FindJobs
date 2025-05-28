FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the project
COPY . .

# Build app (Next.js sẽ tạo .next folder)
RUN npm run build

# Expose port 6000
EXPOSE 6000

# Start the app
CMD ["npm", "start"]