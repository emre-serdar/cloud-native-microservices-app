# Step 1: Use an official Node.js runtime as a parent image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Expose the port your app runs on (5000 in this case)
EXPOSE 5000

# Step 7: Set environment variables (optional, if needed)
# ENV NODE_ENV=production

# Step 8: Define the command to run your app
CMD ["npm", "start"]
