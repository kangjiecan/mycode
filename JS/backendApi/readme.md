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
  -F "existingFileName=MyCustomFileName-1727564017519-397-test.jpg" \
  http://localhost:3000/api/photo/update

read all
curl -X GET http://localhost:3000/api/photo/all

read by ID
curl -X GET http://localhost:3000/api/photo/read \
  -H "Content-Type: application/json" \
  -d '{"id": 223}'

delete by ID
curl -X DELETE http://localhost:3000/api/photo/delete \
  -H "Content-Type: application/json" \
  -d '{"id": 223}'

Additional Information

Update Algorithm
After uploading a file, the following checks and operations are performed:
Check if the file name which will be updated in database exists in the database.

If the file name does not exist in the database, the uploaded file will be deleted. Update fails.
If it exists, the record in the database is updated accordingly.

JSON Validation
Ensure that the JSON is valid before passing the request to the appropriate route