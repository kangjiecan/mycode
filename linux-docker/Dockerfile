

# Use the official Apache HTTP Server image as a base image
FROM httpd:2.4

# Copy website files from the host's './my-website/' directory into the container's document root
COPY ./my-website/ /usr/local/apache2/htdocs/

# Expose port 80
# Note: Apache inside the container listens on port 80 by default.
EXPOSE 80