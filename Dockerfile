# Use a lightweight Node.js image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# sqlite3 gotta be installed in the context of the arch....
RUN npm install sqlite3@5.1.7

COPY ./dist/backend ./backend
COPY ./dist/frontend ./frontend

EXPOSE 4000

CMD ["node", "./backend/main.cjs"]
