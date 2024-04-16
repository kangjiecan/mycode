#!/bin/bash

# Define a list of usernames
USERS=("Michael" "Dwight" "Jim" "Phyllis" "Andy" "Stanley" "Pam" "Kevin" "Oscar" "Angela" "Meredith" "Creed" "Kelly" "Toby")

# Loop through the USERS array and create each user with a home directory, then set their password to abcd
for user in "${USERS[@]}"; do
  echo "Creating user:$user"
  sudo useradd -m "$user"
  echo "$user:abcd" | sudo chpasswd 
done

# Create groups for different departments
sudo groupadd manager
sudo groupadd accounting
sudo groupadd sales
sudo groupadd support
sudo groupadd HR

# Add users to their respective groups
sudo usermod -aG manager Michael

sudo usermod -aG sales Dwight
sudo usermod -aG sales Jim
sudo usermod -aG sales Phyllis
sudo usermod -aG sales Andy
sudo usermod -aG sales Stanley

sudo usermod -aG accounting Kevin
sudo usermod -aG accounting Oscar
sudo usermod -aG accounting Angela

sudo usermod -aG support Pam
sudo usermod -aG support Meredith
sudo usermod -aG support Creed

sudo usermod -aG HR Kelly
sudo usermod -aG HR Toby

# Loop through the USERS array and display the groups each user belongs to
for user in "${USERS[@]}"; do
  echo "grouping user:$user"
  groups "$user"
done

# Create directories for each department
sudo mkdir -p /home/company/support/
sudo mkdir -p /home/company/HR/
sudo mkdir -p /home/company/sales/
sudo mkdir -p /home/company/manager/
sudo mkdir -p /home/company/accounting/

# Change the group ownership of each department directory to the respective group
sudo chown -R :manager /home/company/manager
sudo chown -R :HR /home/company/HR
sudo chown -R :sales /home/company/sales
sudo chown -R :support /home/company/support
sudo chown -R :accounting /home/company/accounting

# Set directory permissions so that only the group members and owner can read, write, and execute
sudo chmod -R 770 /home/company/HR
sudo chmod -R 770 /home/company/sales
sudo chmod -R 770 /home/company/support
sudo chmod -R 770 /home/company/manager
sudo chmod -R 770 /home/company/accounting

# Update the package lists for upgrades and new package installations
sudo apt-get update
# Install ACL for setting more granular permissions
sudo apt-get install acl

# Grant Michael recursive read, write, and execute permissions on /home/company and default permissions for new files
sudo setfacl -Rm u:Michael:rwx /home/company
sudo setfacl -Rdm u:Michael:rwx /home/company

# Grant Toby the same permissions as Michael
sudo setfacl -Rm u:Toby:rwx /home/company
sudo setfacl -Rdm u:Toby:rwx /home/company

# Update package lists again
sudo apt update
# Install Apache2 web server
sudo apt install -y apache2
# Start Apache2 and enable it to start at boot
sudo systemctl start apache2
sudo systemctl enable apache2
# Display the status of Apache2 without paging through results
sudo systemctl status apache2 --no-pager
echo "Apache2 is running"

# Install vsftpd FTP server
sudo apt-get update
sudo apt-get install -y vsftpd
# Start and enable vsftpd, then restart to apply any potential configuration changes
sudo systemctl start vsftpd
sudo systemctl enable vsftpd
sudo systemctl restart vsftpd
echo "FTP is running"

# Create a custom index.html for the Apache2 web server
apache_index="/var/www/html/index.html"
html_content='<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>kangjie</title>
</head>
<body>
    <h1>My name is Kangjie</h1>
</body>
</html>'
echo "$html_content" > "$apache_index"
# Restart Apache2 to apply the new index.html
sudo systemctl restart apache2
sudo systemctl status vsftpd
