# Вказуємо базовий образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли в контейнер
COPY . .

# Будуємо Next.js додаток
RUN npm run build

# Вказуємо команду для запуску
CMD ["npm", "start"]
