# Use the official Deno image from Docker Hub
FROM denoland/deno:latest

# Set the working directory inside the container
WORKDIR /app

# Copy all your project files into the container
COPY . .

# This command will be run when the server starts.
# It's the same as your old start command.
CMD ["run", "--allow-net", "--allow-env", "backend-server.ts"]