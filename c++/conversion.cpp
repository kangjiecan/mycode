#include "FileRW.h"
#include <iostream>

int main()
{

    std::string inputFilePath;
    std::string outputPath;
    std::string outputFileName;

    FileRW fileRW;
    try
    {
        std::cout << "enther the cpp file with path which needs to be translsated  to html" << std::endl;
        std::cout << "example: /home/username/Documents/example.cpp: " << std::endl;
        std::cin >> inputFilePath;
        fileRW.validFile(inputFilePath);
        std::cout << "enther the output file path, only input path without file name:" << std::endl;
        std::cin >> outputPath;
        std::cout << "enther the output file name:" << std::endl;
        std::cin >> outputFileName;
        fileRW.validatePath(outputPath);
        fileRW.validatOutputName(outputFileName);
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
