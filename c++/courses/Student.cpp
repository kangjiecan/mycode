#include "Student.h"
#include <iostream>

Student::Student() : name(""), numCourses(0), courseList(nullptr) {}

Student::Student(const std::string &studentName) : name(studentName), numCourses(0), courseList(nullptr) {}

Student::Student(const Student &other) : name(other.name), numCourses(other.numCourses)
{
    deepCopy(other);
}

Student::~Student()
{
    if (courseList != nullptr)
    {                        // Not-null test
        delete[] courseList; // Delete only if it's not null
        courseList = nullptr;
    }
}

Student &Student::operator=(const Student &other)
{
    if (this != &other)
    {
        delete[] courseList;
        name = other.name;
        numCourses = other.numCourses;
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
        }
    }
    else
    {
        courseList = nullptr;
    }
}

void Student::addCourse(const std::string &courseName)
{
    std::string *newCourseList = new std::string[numCourses + 1];
    for (int i = 0; i < numCourses; ++i)
    {
        newCourseList[i] = courseList[i];
    }
    newCourseList[numCourses] = courseName;
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
