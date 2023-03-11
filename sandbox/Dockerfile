# Use a Python base image
FROM python:3.10-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code into the container
COPY . .

# Set the command to run the Python script
CMD [ "python", "main.py" ]
