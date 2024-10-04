#include "PathAndNameValidate.h"
#include "FileRW.h"
#include <iostream>

int main()
{

    std::string inputFilePath;
    std::string outputPath;
    std::string outputFileName;

    FileRW fileRW;
    PathAndNameValidate PathAndNameValidate;
    try
    {
        std::cout << "enther the cpp file with path which needs to be translsated  to html" << std::endl;
        std::cout << "example: /home/username/Documents/example.cpp: " << std::endl;
        std::cin >> inputFilePath;
        PathAndNameValidate.validateInputPath(inputFilePath);
        std::cout << "enther the output file path, only input path without file name:" << std::endl;
        std::cin >> outputPath;
        PathAndNameValidate.validatePath(outputPath);
        std::cout << "enther the output file name:" << std::endl;
        std::cin >> outputFileName;
        PathAndNameValidate.validateOutputName(outputFileName);
        std::string outputPathWithName = outputPath + "/" + outputFileName;
        std::cout << "Output file path with name is: " << outputPathWithName << std::endl;
        fileRW.openInputFile(inputFilePath);
        fileRW.openOutputFile(outputPathWithName);
        fileRW.conversion();
        fileRW.closeFiles();
    }
    catch (const std::exception &e)
    {
        std::cerr << e.what() << '\n';
        return -1;
    }

    return 0;
}
