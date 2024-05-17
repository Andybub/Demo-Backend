# Based on LTS version of Node.js
FROM node:lts-slim

# Additionally install openssl because of using slim version of node
RUN apt update -y && apt install -y openssl

# 指定container預設的工作目錄
WORKDIR /opt/node-server

# 複製server相關程式碼到container中 
# 第一個 .：這個Dockerfile在專案內存在的位置
# 第二個 .：想複製到哪的目標位置，可給定路徑/opt/node-server，或由WORKDIR指令後，直接給予.代表Docker container內的目前位置
# COPY . /opt/node-server
COPY . .

RUN npm install

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Expose the port
EXPOSE 3000

# Commands triggered when container is up
CMD ["/entrypoint.sh"]

# Build the image
# docker build . -f node-base.dockerfile -t node-server

# Run the container
# docker run --name demo-node-server -p 3000:3000 node-server
