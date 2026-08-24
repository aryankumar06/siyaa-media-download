FROM node:18-alpine

# Install Python3, ffmpeg, and curl
RUN apk add --no-cache python3 py3-pip ffmpeg curl

# Download and install the latest yt-dlp binary
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Set up the Node.js app
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables for the Docker environment
ENV YT_DLP_PATH=/usr/local/bin/yt-dlp
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
