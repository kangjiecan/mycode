#include "FileRW.h"
#include <iostream>
#include <stdexcept>
#include <sys/stat.h>
#include <filesystem>
#include <sys/stat.h> // for stat
#include <unistd.h>   // for access()

std::string FileRW::outputNaming(const std::string &fileNameWithPath)
{
    size_t dot_pos = fileNameWithPath.find_last_of('.');
    std::string outputFileNameWithPath = fileNameWithPath.substr(0, dot_pos) + "-converted.html";
    return outputFileNameWithPath;
}

bool FileRW::validFile(const std::string &fileNameWithPath)
{
    struct stat buffer;
    if (stat(fileNameWithPath.c_str(), &buffer) != 0)
    {
        throw std::runtime_error("File does not exist: " + fileNameWithPath);
    }
    if (!S_ISREG(buffer.st_mode))
    {
        throw std::runtime_error("Not a regular file: " + fileNameWithPath);
    }
    size_t dot_pos = fileNameWithPath.find_last_of('.');
    if (dot_pos == std::string::npos || (fileNameWithPath.substr(dot_pos) != ".cpp" && fileNameWithPath.substr(dot_pos) != ".h"))
    {
        throw std::runtime_error("File is not a .cpp or .h file: " + fileNameWithPath);
    }
    std::cout << "File is valid. " << std::endl;
    return true;
}

bool FileRW::openInputFile(const std::string &fileNameWithPath)
{
    inFile.open(fileNameWithPath);
    if (!inFile.is_open())
    {
        throw std::runtime_error("Cannot open input file: " + fileNameWithPath);
        return false;
    }
    std::cout << "Input file opened: " << std::endl;
    std::cout << "File is being read" << std::endl;
    return true;
}

bool FileRW::openOutputFile(const std::string &fileNameWithPath)
{
    outFile.open(fileNameWithPath);
    if (!outFile.is_open())
    {
        throw std::runtime_error("Cannot open output file: " + fileNameWithPath);
        return false;
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
            if (ch == '<')
            {
                newLine += "&lt";
            }
            else if (ch == '>')
            {
                newLine += "&gt";
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

bool FileRW::validatePath(const std::string &path)
{
    if (path.empty())
    {
        std::cerr << "Error: Path is empty." << std::endl;
        return false;
    }

    struct stat buffer;

    if (stat(path.c_str(), &buffer) != 0)
    {
        std::cerr << "Error: Path does not exist." << std::endl;
        return false;
    }

    if (!S_ISDIR(buffer.st_mode))
    {
        std::cerr << "Error: Path is not a directory." << std::endl;
        return false;
    }

    if (access(path.c_str(), R_OK) != 0)
    {
        std::cerr << "Error: Directory is not readable." << std::endl;
        return false;
    }

    std::cout << "Path is valid." << std::endl;
    return true;
}

bool FileRW::validatOutputName(const std::string &filename)
{
    size_t dot_pos = filename.find_last_of('.');
    if (dot_pos == std::string::npos || filename.substr(dot_pos) != ".html")
    {
        throw std::runtime_error("Output file is not a .html file: " + filename);
    }
    if (filename.length() > 255)
    {
        throw std::runtime_error("Filename is too long: " + filename);
    }

    std::cout << "Output file name is valid: " << std::endl;
    return true;
}