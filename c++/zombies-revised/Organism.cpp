#include "Organism.h"
#include "City.h"

Organism::Organism() 
    : x(0), y(0), breed(0),size(0), flag(false), city(nullptr) {}

Organism::Organism(City* city, int size)
    : x(0), y(0), breed(0), size(size), flag(false), city(city) {}

Organism::~Organism() {}

int Organism::getX() const {
    return x;
}

int Organism::getY() const {
    return y;
}

bool Organism::getFlag() const {
    return flag;
}

void Organism::setFlag(bool move) {
    this->flag = move;
}



std::ostream& operator<<(std::ostream& output, const Organism* organism) {
    if (organism) {
        output << "Organism [" << organism->getType() << "] at (" 
               << organism->getX() << ", " << organism->getY() << ")";
    } else {
        output << "Null Organism";
    }
    return output;
}

