#ifndef STUDENT_H
#define STUDENT_H

#include <string>
#include <iostream>

class Student
{
private:
    std::string name;
    int numCourses;
    std::string *courseList;

    void deepCopy(const Student &other);

public:
    Student();
    Student(const std::string &studentName);
    Student(const Student &other);

    ~Student();

    Student &operator=(const Student &other);

    void addCourse(const std::string &courseName);

    void resetCourses();

    void print() const;

    friend std::ostream &operator<<(std::ostream &os, const Student &student);

    void courseInput();
};

#endif