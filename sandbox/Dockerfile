# Use a Python base image
FROM python:3.10-alpine

# Set the working directory to /app
WORKDIR /usr

# Copy the requirements file and install dependencies
COPY requirements.txt .
COPY dummy.py .

RUN pip install --no-cache-dir -r requirements.txt

# Set the command to run the Python script
ENTRYPOINT [ "python3" ]
CMD [ "dummy.py" ]