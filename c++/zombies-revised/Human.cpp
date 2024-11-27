#include "Human.h"
#include "City.h"
#include <algorithm>
#include <random>

Human::Human() : Organism()
{
    this->x = 0;
    this->y = 0;
    this->city = nullptr;
    this->gridsize = 0;
    this->flag = false;
    this->breed = 0;
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

void Human::turn()
{
    if (flag)
    {
        std::random_device rd;
        std::mt19937 g(rd());

        std::shuffle(moves.begin(), moves.end(), g);

        for (const auto &move : moves)
        {
            int nx = x + move.first;
            int ny = y + move.second;

            if (city->inBounderies(nx, ny) && city->getOrganism(nx, ny) == nullptr)
            {
                Organism *tager = city->getOrganism(nx, ny);
                if (tager == nullptr || tager->getType() == "Z")
                {
                    this->x = nx;
                    this->y = ny;
                    return;
                }
            }
        }
    }
}