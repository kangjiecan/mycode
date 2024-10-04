#ifndef PATH_AND_NAME_VALIDATE_H
#define PATH_AND_NAME_VALIDATE_H

#include <string>
#include <vector>
#include <fstream>
#include <filesystem>
#include <sys/stat.h>
#include <stdexcept>  // For std::runtime_error
#include <iostream>  

class PathAndNameValidate
{
private:
    std::string inputPathWthName;
    std::string outputPath;
    std::string outputFileName;
    std::string inputFilePath;

public:
    bool validatePath(const std::string &path);
    bool validateInputPath(const std::string &path); 
    bool validateOutputName(const std::string &filename);  // Fixed typo here
};

#endif
