# Based on LTS version of Node.js
FROM node:20.12.0

# Install the necessary packages
RUN apt update && apt upgrade -y

# 指定container預設的工作目錄
WORKDIR /opt/node-server

# 複製server相關程式碼到container中
COPY . /opt/node-server

RUN echo "DATABASE_URL=mysql://root:mypassword@db:3306/xxx?connect_timeout=300" > .env
RUN npm install
RUN npx prisma db push

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]

# Build the image
# docker build . -f node-base.dockerfile -t node-server

# Run the container
# docker run --name demo-node-server -p 3000:3000 node-server
