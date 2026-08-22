FROM node:20-alpine

WORKDIR /app

# 1. Pehle dependencies copy & install karein
COPY package*.json ./
RUN npm install

# 2. Baaki code copy karein
COPY . .

# 3. Port expose karein
EXPOSE 5173

# 4. --host 0.0.0.0 ke sath dev server start karein taaki browser connect ho sake
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

