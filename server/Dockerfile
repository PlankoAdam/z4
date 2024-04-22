FROM python:3.9

WORKDIR /app

# Assuming you have a requirements.txt file with dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy your application code
COPY . .

# Start the Flask app (assuming your entry point is app.py)
CMD ["python", "app.py"]
