#include "Student.h"
#include <iostream>
#include <string>

int main()
{
    bool continueLoop = true;
    while (continueLoop)
    {   std::cout << "Create Student 1:\n";
        std::string studnet1Name;
        std::cout << "Enter the first student's name: ";
        std::getline(std::cin, studnet1Name);
        Student student1(studnet1Name);
        student1.courseInput();

        std::cout << "\nCreate Student 2 and copying course form student1:\n";
        std::string student2Name;
        std::cout << "Enter the student's name: ";
        std::getline(std::cin, student2Name);

        Student student2(student2Name);
        student2 = student1;

        std::cout << "\nStudent 2 details:\n"
                  << student2 << std::endl;

        std::cout << "\nAdd a course to Student 2:\n";
        student2.addCourse("C++");
        std::cout << "\nStudent 2 details after adding a course:\n"
                  << student2 << std::endl;

        std::cout << "\nStudent1 reset:\n";
        student1.resetCourses();
        std::cout << "\nStudent 1 after reset:\n";
        student1.print();
        std::cout << "\nStudent 2 (unchanged after Student 1 reset) details:\n";
        student2.print();

        std::cout << "\nCreate stuent3 by copy construtor\n";
        Student student3 = student2;
        std::cout << "\nStudent 3 details which created by copying student2(call copy construtor):\n";
        student3.print();

        std::string choice;
        std::cout << "Would you like to run the program again? (yes/no): ";
        std::getline(std::cin, choice);
        continueLoop = (choice == "yes");
    }

    return 0;
}