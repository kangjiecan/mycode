#include "RationalNumber.h"
#include <iostream>
#include <regex>

RationalNumber::RationalNumber()
{

    numeratorInt = 0;
    denominatorInt = 1;
    std::cout << "Default constructor called" << std::endl;
}

RationalNumber::RationalNumber(int numerator, int denominator)
{
    if (inputValidate(denominator))
    {
        numeratorInt = numerator;
        denominatorInt = denominator;
        normalize();
        std::cout << "Two-integer constructor called" << std::endl;
    }
}

RationalNumber::RationalNumber(int numerator)

{
    numeratorInt = numerator;
    denominatorInt = 1;
    std::cout << "Single integer constructor called" << std::endl;
}

RationalNumber::RationalNumber(std::string input)
{
    if (!inputvalidate(input))
    {
        throw std::invalid_argument("Invalid input format for rational number");
    }

    int numerator = 0;
    int denominator = 1;

    size_t slashPos = input.find('/');
    if (slashPos != std::string::npos)
    {
        std::string numeratorPart = input.substr(0, slashPos);
        std::string denominatorPart = input.substr(slashPos + 1);

        numerator = std::stoi(numeratorPart);
        denominator = std::stoi(denominatorPart);
    }
    else
    {
        numerator = std::stoi(input);
        denominator = 1;
    }

    this->numeratorInt = numerator;
    this->denominatorInt = denominator;
    normalize();
    std::cout << "String constructor called" << std::endl;
}

bool RationalNumber::operator>(const RationalNumber &rhs) const

{
    std::cout << "Greater than operator called" << std::endl;

    return (numeratorInt * rhs.denominatorInt) > (rhs.numeratorInt * denominatorInt);
}

bool RationalNumber::operator<(const RationalNumber &rhs) const
{
    std::cout << "Less than operator called" << std::endl;
    return (numeratorInt * rhs.denominatorInt) < (rhs.numeratorInt * denominatorInt);
}

bool RationalNumber::operator==(const RationalNumber &rhs) const
{
    std::cout << "Equal to operator called" << std::endl;
    return (numeratorInt * rhs.denominatorInt) == (rhs.numeratorInt * denominatorInt);
}

RationalNumber RationalNumber::operator+(const RationalNumber &rhs) const
{
    std::cout << "Addition operator called" << std::endl;
    int newNumerator = (numeratorInt * rhs.denominatorInt) + (rhs.numeratorInt * denominatorInt);
    int newDenominator = denominatorInt * rhs.denominatorInt;
    return RationalNumber(newNumerator, newDenominator);
}

RationalNumber RationalNumber::operator-(const RationalNumber &rhs) const
{
    std::cout << "Subtraction operator called" << std::endl;
    int newNumerator = (numeratorInt * rhs.denominatorInt) - (rhs.numeratorInt * denominatorInt);
    int newDenominator = denominatorInt * rhs.denominatorInt;
    return RationalNumber(newNumerator, newDenominator);
}

RationalNumber RationalNumber::operator*(const RationalNumber &rhs) const
{
    std::cout << "Multiplication operator called" << std::endl;
    int newNumerator = numeratorInt * rhs.numeratorInt;
    int newDenominator = denominatorInt * rhs.denominatorInt;
    return RationalNumber(newNumerator, newDenominator);
}

#include <stdexcept>
#include <iostream>

RationalNumber RationalNumber::operator/(const RationalNumber &rhs) const
{
    std::cout << "Division operator called" << std::endl;

    if (rhs.numeratorInt == 0)
    {
        throw std::runtime_error("Division by zero: the right-hand side is zero.");
    }

    int newNumerator = numeratorInt * rhs.denominatorInt;
    int newDenominator = denominatorInt * rhs.numeratorInt;

    return RationalNumber(newNumerator, newDenominator);
}

std::ostream &operator<<(std::ostream &out, const RationalNumber &rhs)
{
    if (rhs.denominatorInt == 1)
    {
        out << rhs.numeratorInt;
    }
    else
    {
        out << rhs.numeratorInt << "/" << rhs.denominatorInt;
    }
    std::cout << "\nOutput operator called" << std::endl;

    return out;
}

bool RationalNumber::inputValidate(int denominator)
{
    std::cout << "Input validate called" << std::endl;
    if (denominator == 0)
    {
        std::cout << "Denominator can't be zero." << std::endl;
        return false;
    }
    return true;
}

bool RationalNumber::inputvalidate(std::string input)
{
    std::regex pattern(R"(^-?\d+(/-?\d+)?$)");
    std::cout << "Input validate called" << std::endl;

    return std::regex_match(input, pattern);
}

void RationalNumber::normalize()
{
    if (denominatorInt < 0)
    {
        numeratorInt = -numeratorInt;
        denominatorInt = -denominatorInt;
    }

    int gcd = 1;
    int smaller = (numeratorInt < denominatorInt) ? numeratorInt : denominatorInt;
    for (int i = 1; i <= smaller; i++)
    {
        if (numeratorInt % i == 0 && denominatorInt % i == 0)
        {
            gcd = i;
        }
    }
    numeratorInt /= gcd;
    denominatorInt /= gcd;
    std::cout << "Normalize called" << std::endl;
}
