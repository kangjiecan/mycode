#ifndef FILERW_H
#define FILERW_H

#include <string>
#include <vector>
#include <fstream>

class FileRW {

private:
    std::ifstream inFile;
    std::ofstream outFile;
    std::string line;
    std::vector<std::string> lines;
    char left='<';
    char right='>';
    std::string beginning="<PRE>";
    std::string ending="</PRE>";

public:
    bool validFile(const std::string &filename);
    bool validatePath(const std::string &path);
    bool openInputFile(const std::string &filename);
    bool openOutputFile(const std::string &filename);
    std::string outputNaming(const std::string &fileNameWithPath);
    void conversion();
    void closeFiles();
    bool validatOutputName(const std::string &filename);    
};

#endif // FILERW_H