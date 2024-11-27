#include "Organism.h"
#include "City.h"

Organism::Organism() 
    : x(0), y(0), city(nullptr), gridsize(0), flag(false), breed(0) {}

Organism::Organism(int x, int y, City *city, int gridsize, bool flag, int breed)
    : x(x), y(y), city(city), gridsize(gridsize), flag(flag), breed(breed) {}

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

City* Organism::getCity() {
    return city;
}

int Organism::getGridSize() {
    return gridsize;
}

void Organism::breedReset() {
    this->breed = 0;
}

void Organism::setBreed(int breed) {
    this->breed = breed;
}

int Organism::getBreed() {
    return breed;
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

