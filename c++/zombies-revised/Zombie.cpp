#include "Zombie.h"
#include "City.h"
#include <algorithm>
#include <random>
#include "Organism.h"

Zombie::Zombie() : Organism()
{
}

Zombie::Zombie(int x, int y, City *city, int gridsize, bool flag, int breed, int starve)
    : Organism(x, y, city, gridsize, flag, breed), starve(starve) {}

Zombie::~Zombie()
{
}

std::string Zombie::getType() const
{
    return "Z";
}

int Zombie::getStarve()
{
    return starve;
}

void Zombie::setStarve(int starveSet)
{
    this->starve = starveSet;
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

        if (city->inBounderies(nx, ny) && flag && (city->getOrganism(nx, ny)->getType() == "H"))
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

        if (city->inBounderies(nx, ny) && flag && (city->getOrganism(nx, ny) == nullptr))
        {
            this->x = nx;
            this->y = ny;
        }
    }
}
