const FileService = require("../repos/FileUploadService");
const ImageRepo = require("../repos/ImageRepo");
const imageRepo = new ImageRepo();
const FileUploadService = require("../repos/FileUploadService");
const fileUpLoadService = new FileUploadService();
const FileManager = require("../repos/FileManager");

class FileUpLoadControler {
  constructor() {
    this.imageRepo = new ImageRepo();
    this.fileUploadService = new FileUploadService();
  }

  async fileUpload(req, res) {
    fileUpLoadService.upLoader().single("file")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const file = req.file;
      const fileName = file.filename;
      const filePath = fileUpLoadService.getFilePath();
      const newName = `${req.body.customName}-${fileName}`;
      try {
        if (!req.body.customName || req.body.customName === undefined) {
          message +=
            ". Please set fieldName in the request body next time in order to better manage the file name";
        }
        const reName = new FileManager(filePath, newName);
        reName.rename(filePath, newName);

        await imageRepo.postImage(reName.name, reName.path);

        let message = `File ${fileName} uploaded successfully`;

        return res.status(201).json({
          message: message,
          uploaded_fileName: reName.name,
          filePath: reName.path,
        });
      } catch (error) {
        console.error("Error saving file information:", error);
        return res
          .status(500)
          .json({ message: "Error saving file information" 
            
          });
      }
    });
  }

  async fileUpdater(req, res) {
    fileUpLoadService.updater().single("file")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      try {
        const file = req.file;
        const fileName = file.filename;
        const filePath = fileUpLoadService.getFilePath();
        const fileToReplace = await imageRepo.getImageByName(
          req.body.existingFileName
        );
        await imageRepo.updateImage(fileToReplace.name, fileName, filePath);
        const fileToDel = new FileManager(
          fileToReplace.name,
          fileToReplace.path
        );
        console.log(fileToReplace);
        fileToDel.delfile();
        return res.status(201).json({
          message: `New file ${fileName} update successfully`,
          fileName: fileName,
          filePath: filePath,
        });
      } catch (error) {
        if (error.message.includes("Image with name")) {
          const errorUpload = new FileManager(
            fileUpLoadService.getStoredFileName(),
            fileUpLoadService.getFilePath()
          );
          console.log(errorUpload);
          errorUpload.delfile();
          return res.status(404).json({ message: error.message });
        }
        console.error("Error updating file information:", error);
        return res
          .status(500)
          .json({ message: "Error updating file information" });
      }
    });
  }
}

module.exports = FileUpLoadControler;
