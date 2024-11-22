#include "Human.h"
#include "City.h"
#include <algorithm>
#include <random>

Human::Human() : Organism()
{
}
Human::Human(int x, int y, City *city, int gridsize, bool flag, int breed) : Organism(x, y, city, gridsize, flag, breed)
{
}

Human::~Human()
{
}

std::string Human::getType() const
{
    return "H";
}

int Human::getBreed()
{
    return breed;
}

void Human::setBreed()
{
    this->breed = breed + 1;
}

void Human::turn()
{
    std::random_device rd;
    std::mt19937 g(rd());

    std::shuffle(moves.begin(), moves.end(), g);

    for (const auto &move : moves)
    {
        int nx = x + move.first;
        int ny = y + move.second;

        if (city->inBounderies(nx, ny) && (city->getOrganism(nx, ny) == nullptr || city->getOrganism(nx, ny)->getType() == "z") && flag)
        {
            this->x = nx;
            this->y = ny;
        }
    }
}