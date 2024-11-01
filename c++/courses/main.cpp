#include "Student.h"
#include <iostream>
#include <string>

int main() {
    bool continueLoop = true;

    while (continueLoop) {
        std::string name;
        std::cout << "Enter the first student's name: ";
        std::getline(std::cin, name);
        while (name.empty()) {
            std::cout << "Student name cannot be blank. Please enter a valid name: ";
            std::getline(std::cin, name);
        }

        Student student1(name);

        int numCourses;
        std::cout << "Enter the number of courses " << name << " will take: ";
        while (!(std::cin >> numCourses) || numCourses <= 0) {
            std::cout << "Please enter a positive number for the number of courses: ";
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        }
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

        std::string course;
        for (int i = 0; i < numCourses; ++i) {
            do {
                std::cout << "Enter course " << (i + 1) << " for " << name << ": ";
                std::getline(std::cin, course);
                if (course.empty()) {
                    std::cout << "Course name cannot be blank. Please enter a valid course.\n";
                }
            } while (course.empty());

            student1.addCourse(course);
        }

        Student student2 = student1;
        do {
            std::cout << "Enter the name of the second student: ";
            std::getline(std::cin, name);
            if (name.empty()) {
                std::cout << "Student name cannot be blank. Please enter a valid name.\n";
            }
        } while (name.empty());
        student2 = name;

        std::cout << "\nStudent 2 details:\n" << student2 << std::endl;

        student2 = student1;
        std::cout << "\nStudent 2 details after copying student 1:\n" << student2 << std::endl;

        student2.addCourse("C++");
        std::cout << "\nStudent 2 details after adding a course:\n" << student2 << std::endl;

        student1.resetCourses();

        std::cout << "\nStudent 1 after reset:\n" << student1 << std::endl;
        std::cout << "\nStudent 2 (unchanged after Student 1 reset) details:\n" << student2 << std::endl;

        Student student3("Temporary");
        student3 = student2;
        std::cout << "\nStudent 3 details after assignment from Student 2:\n" << student3 << std::endl;

        std::string choice;
        std::cout << "Would you like to run the program again? (yes/no): ";
        std::getline(std::cin, choice);
        continueLoop = (choice == "yes");
    }

    return 0;
}