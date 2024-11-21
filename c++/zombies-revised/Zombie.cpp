#include "Zombie.h"
#include "City.h"
#include <algorithm>
#include <random>
#include "Organism.h"

Zombie::Zombie() : Organism()
{
}

Zombie::Zombie(City *city, int size) : Organism(city, size)
{
}

Zombie::~Zombie()
{
}

std::string Zombie::getType() const
{
    return "Zombie";
}

int Zombie::getBreed()
{
    return breed;
}

void Zombie::setBreed()
{
    this->breed = breed + 1;
}

void Zombie::turn()
{
    std::random_device rd;
    std::mt19937 g(rd());

    std::shuffle(moves.begin(), moves.end(), g);

    for (const auto &move : moves)
    {
        int nx = x + move.first;
        int ny = y + move.second;

        if (city->inBounderies(nx, ny) && flag && (city->getOrganism(nx, ny)->getType() == "Human"))
        {
            this->x = nx;
            this->y = ny;
            return;
        }
        
    }
    for (const auto &move : moves)
    {
        int nx = x + move.first;
        int ny = y + move.second;

        if (city->inBounderies(nx, ny) && flag && (city->getOrganism(nx, ny) == nullptr ))
        {
            this->x = nx;
            this->y = ny;
        }
    }
}
