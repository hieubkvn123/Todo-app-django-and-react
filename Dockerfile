# Set base image
FROM python:3.8

# File author
MAINTAINER Esther

# Add the source files
ADD . ./app

# Set the working directory
WORKDIR /app

# COPY requirements.txt
COPY requirements.txt ./

# Install django dependency
RUN pip install --no-cache-dir -r ./requirements.txt

# Expose port
EXPOSE 8000

# Run the app with gunicorn
CMD exec gunicorn todo.wsgi:application --bind 0.0.0.0:8000 --workers 3 
