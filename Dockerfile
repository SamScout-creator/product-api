# Sử dụng Node.js phiên bản gọn nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file khai báo thư viện vào trước để cài đặt
COPY package*.json ./
RUN npm install

# Copy toàn bộ code vào thư mục làm việc
COPY . .

# Khai báo cổng 3000
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["node", "server.js"]