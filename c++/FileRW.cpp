#include "FileRW.h"
#include <iostream>
#include <stdexcept>
#include <sys/stat.h>
#include <filesystem>
#include <sys/stat.h>
#include <unistd.h>




bool FileRW::openInputFile(const std::string &fileNameWithPath)
{
    inFile.open(fileNameWithPath);
    if (!inFile.is_open())
    {
        throw std::runtime_error("Cannot open input file: " + fileNameWithPath);
    }
    std::cout << "Input file opened: " << std::endl;
    return true;
}

bool FileRW::openOutputFile(const std::string &fileNameWithPath)
{
    outFile.open(fileNameWithPath);
    if (!outFile.is_open())
    {
        throw std::runtime_error("Cannot open output file: " + fileNameWithPath);
    }
    std::cout << "Output file opened: " << std::endl;
    return true;
}

void FileRW::conversion()
{
    outFile << beginning + "\n";

    lines.clear();
    while (std::getline(inFile, line))
    {
        std::string newLine;
        for (auto ch : line)
        {
            if (ch == left)
            {
                newLine += leftConvertion;
            }
            else if (ch == right)
            {
                newLine += rightConvertion;
            }
            else
            {
                newLine += ch;
            }
        }
        std::cout << newLine << std::endl;
        outFile << newLine << std::endl;
        lines.push_back(newLine);
    }
    outFile << ending;
    std::cout << "Conversion completed." << std::endl;
}

void FileRW::closeFiles()
{
    inFile.close();
    outFile.close();
    std::cout << "Files closed." << std::endl;
}

