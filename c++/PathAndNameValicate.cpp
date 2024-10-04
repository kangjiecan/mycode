#include "PathAndNameValidate.h"
#include <regex>
#include <unistd.h> // For access()

bool PathAndNameValidate::validateInputPath(const std::string &path)
{
    struct stat buffer;
    if (stat(path.c_str(), &buffer) != 0)
    {
        throw std::runtime_error("File does not exist: " + path);
    }
    if (!S_ISREG(buffer.st_mode))
    {
        throw std::runtime_error("Not a regular file: " + path);
    }
    size_t dot_pos = path.find_last_of('.');
    if (dot_pos == std::string::npos || (path.substr(dot_pos) != ".cpp" && path.substr(dot_pos) != ".h"))
    {
        throw std::runtime_error("File is not a .cpp or .h file: " + path);
    }
    std::cout << "File is valid." << std::endl;
    return true;
}

bool PathAndNameValidate::validateOutputName(const std::string &filename)
{
    std::regex filename_regex(R"(^[^\\/:*?"<>|]{1,255}$)");
    std::regex html_regex(R"(\.html$)", std::regex::icase);

    if (!std::regex_match(filename, filename_regex))
    {
        throw std::runtime_error("Filename is invalid: " + filename);
    }
    if (!std::regex_search(filename, html_regex))
    {
        throw std::runtime_error("Output file is not a .html file: " + filename);
    }

    std::cout << "Output file name is valid: " << filename << std::endl;
    return true;
}

bool PathAndNameValidate::validatePath(const std::string &path)
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
