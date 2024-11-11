#ifndef RATIONALNUMBER_H
#define RATIONALNUMBER_H

#include <string>
#include <iostream>
#include <sstream>

class RationalNumber
{
public:
    RationalNumber();
    RationalNumber(int numerator, int denominator);
    RationalNumber(int numerator);
    RationalNumber(std::string input);

    RationalNumber operator+(const RationalNumber &rhs) const;
    RationalNumber operator-(const RationalNumber &rhs) const;
    RationalNumber operator*(const RationalNumber &rhs) const;
    RationalNumber operator/(const RationalNumber &rhs) const;

    bool operator>(const RationalNumber &rhs) const;
    bool operator<(const RationalNumber &rhs) const;
    bool operator==(const RationalNumber &rhs) const;

private:
    int numeratorInt;
    int denominatorInt;
    void normalize();
    bool inputValidate(int denominator);
    bool inputvalidate(std::string input);
    friend std::ostream &operator<<(std::ostream &out, const RationalNumber &rhs);
};

#endif // RATIONALNUMBER_H
