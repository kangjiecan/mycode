#include "Student.h"
#include <iostream>

Student::Student() : name(""), numCourses(0), courseList(nullptr) {
    std::cout << "Default constructor called" << std::endl;
}

Student::Student(const std::string &studentName) : name(studentName), numCourses(0), courseList(nullptr) {
    std::cout << "Constructor called and object created with a null list" << std::endl;
    std::cout << "Name: " << name << std::endl;
}

Student::Student(const Student &other) : name(other.name), numCourses(other.numCourses)
{
    std::cout << "Copy constructor called" << std::endl;
    std::cout << "Copying name " << name << std::endl;
    deepCopy(other);
}

Student::~Student()
{
    if (courseList != nullptr)
    {
        std::cout << "This courseList is going to be dealocated " << courseList << std::endl;

        delete[] courseList;
        courseList = nullptr;
    }
}

Student &Student::operator=(const Student &other)
{
    if (this != &other)
    {
        delete[] courseList;

        numCourses = other.numCourses;

        std::cout << "copying numCourses: " << numCourses << std::endl;

        deepCopy(other);
    }
    return *this;
}

void Student::deepCopy(const Student &other)
{
    if (other.numCourses > 0)
    {
        courseList = new std::string[other.numCourses];
        for (int i = 0; i < other.numCourses; ++i)
        {
            courseList[i] = other.courseList[i];
            std::cout << "Copying course: " << courseList[i] << std::endl; // Print each course as it is copied
        }
    }
    else
    {
        courseList = nullptr;
    }
}

void Student::courseInput()
{
    int courseCount = 0;
    while (true)
    {
        std::string course;
        std::cout << "Enter a course name (or press Enter to finish): ";
        std::getline(std::cin, course);

        if (course.empty())
        {
            std::cout << "Finished entering courses." << std::endl;
            break;
        }
        addCourse(course); 
        ++courseCount;     
    }
    numCourses = courseCount; 
}

void Student::addCourse(const std::string &courseName)
{
    std::string *newCourseList = new std::string[numCourses + 1];
    for (int i = 0; i < numCourses; ++i)
    {
        newCourseList[i] = courseList[i];
        std::cout << "copying course to new list: " << newCourseList[i] << std::endl; 
    }
    newCourseList[numCourses] = courseName;
    std::cout << "Adding course to new list: " << newCourseList[numCourses] << std::endl;
    delete[] courseList;
    courseList = newCourseList;
    ++numCourses;
}

void Student::resetCourses()
{
    delete[] courseList;
    courseList = nullptr;
    numCourses = 0;
}

void Student::print() const
{
    std::cout << "Name: " << name << ", Courses (" << numCourses << "): ";
    for (int i = 0; i < numCourses; ++i)
    {
        std::cout << courseList[i] << " ";
    }
    std::cout << " \n";
    std::cout << std::endl;
}

std::ostream &operator<<(std::ostream &os, const Student &student)
{
    os << "Name: " << student.name << ", Courses (" << student.numCourses << "): ";
    for (int i = 0; i < student.numCourses; ++i)
    {
        os << student.courseList[i] << " ";
    }
    return os;
}
