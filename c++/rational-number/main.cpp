#include <iostream>
#include <string>
#include "RationalNumber.h"

int main()
{
    std::string input1, input2;

    std::cout << "Enter the first rational number (e.g., \"3/4\" or \"5\"): ";
    std::cin >> input1;
    std::cout << "Enter the second rational number (e.g., \"3/4\" or \"5\"): ";
    std::cin >> input2;

    RationalNumber r1(input1);
    RationalNumber r2(input2);

    std::cout << "\nMathematical Operations:" << std::endl;
    std::cout << r1 << " + " << r2 << "\n= " << (r1 + r2) << std::endl;
    std::cout << std::endl;
    std::cout << r1 << " - " << r2 << "\n= " << (r1 - r2) << std::endl;
    std::cout << std::endl;
    std::cout << r1 << " * " << r2 << "\n= " << (r1 * r2) << std::endl;
    std::cout << std::endl;
    try
    {
        std::cout << r1 << " / " << r2 << "\n= " << (r1 / r2) << std::endl;
        std::cout << std::endl;
    }
    catch (std::runtime_error &e)
    {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    std::cout << "\nComparison Operations:" << std::endl;
    std::cout << r1 << "\n> " << r2 << " : " << (r1 > r2 ? "true" : "false") << std::endl;
    std::cout << std::endl;
    std::cout << r1 << "\n< " << r2 << " : " << (r1 < r2 ? "true" : "false") << std::endl;
    std::cout << std::endl;
    std::cout << r1 << "\n== " << r2 << " : " << (r1 == r2 ? "true" : "false") << std::endl;
    std::cout << std::endl;

    std::cout << "\nConstructor Demonstrations:" << std::endl;
    std::cout << "Default constructor: RationalNumber r3;" << std::endl;
    RationalNumber r3;
    std::cout << r3 << std::endl;
    std::cout << std::endl;

    std::cout << "Single integer constructor: RationalNumber r4(5);" << std::endl;
    RationalNumber r4(5);
    std::cout << r4 << std::endl;
    std::cout << std::endl;

    try
    {
        std::cout << "Two-integer constructor with zero denominator: RationalNumber r5(3, 0);" << std::endl;
        RationalNumber r5(3, 0);
        std::cout << r5 << std::endl;
        std::cout << std::endl;

        std::cout << "Two-integer constructor with valid denominator: RationalNumber r8(3, 4);" << std::endl;
        RationalNumber r8(3, 4);
        std::cout << r8 << std::endl;
    }
    catch (std::invalid_argument &e)
    {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    std::cout << "String constructor with fraction: RationalNumber r6(\"-2/3\");" << std::endl;
    RationalNumber r6("-2/3");
    std::cout << r6 << std::endl;
    std::cout << std::endl;

    std::cout << "String constructor with whole number: RationalNumber r7(\"6\");" << std::endl;
    RationalNumber r7("6");
    std::cout << r7 << std::endl;
    std::cout << std::endl;
    return 0;
}