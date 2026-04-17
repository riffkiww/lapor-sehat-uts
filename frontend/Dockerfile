FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Agar Vite bisa diakses secara publik di EC2
CMD ["npm", "run", "dev", "--", "--host"]