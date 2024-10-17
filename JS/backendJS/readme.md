# API Testing with cURL

The following cURL commands were used to test the API endpoints. Files such as `test.jpg` and `replace.jpg` are located in the project's root directory.

## Endpoints and cURL Commands




create:
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test.jpg" \
  -F "customName=MyCustomFileName" \
  http://localhost:3000/api/photo/create

upate:
curl -X PUT \
  -H "Content-Type: multipart/form-data" \
  -F "file=@replace.jpg" \
  -F "existingFileName=MyCustomFileName-1729119461224-453-test.jpg" \
  -f
  http://localhost:3000/api/photo/update

read all
curl -X GET http://localhost:3000/api/photo/all

read by ID
curl -X GET http://localhost:3000/api/photo/read \
  -H "Content-Type: application/json" \
  -d '{"id": 226}'

delete by ID
curl -X DELETE http://localhost:3000/api/photo/delete \
  -H "Content-Type: application/json" \
  -d '{"id": 226}'

Additional Information

Update Algorithm
After uploading a file, the following checks and operations are performed:
Check if the file name which will be updated in database exists in the database.

If the file name does not exist in the database, the uploaded file will be deleted. Update fails.
If it exists, the record in the database is updated accordingly.

JSON Validation
Ensure that the JSON is valid before passing the request to the appropriate route


 summary of the functions used in the code:
delfile(filePath):
Deletes a file from the specified path.
Logs success or error messages.

rename(oldPath, newName):
Renames a file by moving it to a new path with a new name.
Returns the new file path and name.

postImage(req, res):
Posts an image to the database using the imageRepo.
Requires name and path in the request body.
Returns success or error messages based on the database save operation.

getImage(req, res):
Retrieves an image by its ID from the database using imageRepo.
Validates the ID and returns the image information if found, or an error message if not.

getAllImages(req, res):
Retrieves all images from the database using imageRepo.
Returns the list of image IDs, names, and paths.

deleteImage(req, res):
Deletes an image by its ID.
Unlinks the image file and removes its database entry.

updateImage(req, res):
Updates the name of an image in the database by its ID.
Requires newName in the request body.
Returns success or error messages based on the update operation.

fileUpload(req, res):
Handles file uploading using multer.
Allows optional renaming via customName from the request body.
Saves file information to the database after upload and renaming.

fileUpdater(req, res):
Updates an existing file by replacing it with a new upload.
Uses existingFileName from the request body to identify the old file.
Deletes the old file and updates the database with the new file information.