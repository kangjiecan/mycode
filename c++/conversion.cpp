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
        std::cout << "enther the cpp file which needs to be translsated path with anme please" << std::endl;
        std::cout << "example: /home/username/Documents/example.cpp: " << std::endl;
        std::cin >> inputFilePath;
        fileRW.validFile(inputFilePath);
        std::cout << "enther the output file path please:" << std::endl;
        std::cin >> outputPath;
        std::cout << "enther the output file name please:" << std::endl;
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
        return 0;
    }

    return 0;
}
