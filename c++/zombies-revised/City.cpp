#include "City.h"
#include <iostream>
#include "Organism.h"
#include <iostream>
#include <string>
#include <random>
#include "Zombie.h"
#include "Human.h"
using namespace std;

City::City()
{
    grid = new Organism **[gridsize];
    for (int i = 0; i < gridsize; ++i)
    {
        grid[i] = new Organism *[gridsize];
        for (int j = 0; j < gridsize; ++j)
        {
            grid[i][j] = nullptr;
        }
    }
}

City::City(int gridsize)
{
    this->gridsize = gridsize;
    grid = new Organism **[gridsize];
    for (int i = 0; i < gridsize; ++i)
    {
        grid[i] = new Organism *[gridsize];
        for (int j = 0; j < gridsize; ++j)
        {
            grid[i][j] = nullptr;
        }
    }
}

City::~City()
{
    for (int i = 0; i < gridsize; ++i)
    {
        delete[] grid[i];
    }
    delete[] grid;
}

void City::generateOrganisms(int zombie_startcount, int human_startcount, int gridsize)
{
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(0, gridsize - 1);

    // Place zombies
    for (int i = 0; i < zombie_startcount; ++i)
    {
        int x, y;
        do
        {
            x = dis(gen);
            y = dis(gen);
        } while (grid[x][y] != nullptr);

        Zombie *zombie = new Zombie(x, y, this, gridsize, false, 0);
        setOrganism(zombie);
    }

    // Place humans
    for (int i = 0; i < human_startcount; ++i)
    {
        int x, y;
        do
        {
            x = dis(gen);
            y = dis(gen);
        } while (grid[x][y] != nullptr);

        Human *human = new Human(x, y, this, gridsize, false, 0);
        setOrganism(human);
    }
}

void City::setOrganism(Organism *organism)
{
    grid[organism->getX()][organism->getY()] = organism;
}

Organism *City::getOrganism(int x, int y)
{
    return grid[x][y];
}

bool City::inBounderies(int x, int y)
{
    return x >= 0 && x < gridsize && y >= 0 && y < gridsize;
}

void City::step()
{
    for (int i = 0; i < gridsize; ++i)
    {
        for (int j = 0; j < gridsize; ++j)
        {
            Organism *organism = grid[i][j];
            if (organism)
            {
                organism->turn();
            }
        }
    }
}

void City::movingIn(Organism *organism, int X, int Y)
{
    Organism *existingOrganism = grid[X][Y];

    if (existingOrganism == nullptr)
    {
        setOrganism(organism);
        organism->setFlag(false);
        //organism->setBreed();
        if (organism->getType() == "z")
        {

            Zombie *zombie = dynamic_cast<Zombie *>(organism);
            zombie->setStarve(zombie->getStarve() - 1);
        }
        else
        {
            Human *human = dynamic_cast<Human *>(organism);
            human->setBreed();
        }
    }
    else if (existingOrganism->getType() == "H" && organism->getType() == "Z")
    {
        delete existingOrganism;
        setOrganism(organism);
        organism->setFlag(false);
        Zombie *zombie = dynamic_cast<Zombie *>(organism);
        zombie->setStarve(3);
        Zombie->setBreed();
        
    }
    else if (existingOrganism->getType() == "Z" && organism->getType() == "H")
    {
        delete organism;
        existingOrganism->setFlag(false);
        Zombie *zombie = dynamic_cast<Zombie *>(existingOrganism);
        zombie->setStarve(3);
        zombie->setBreed();
        
    }
}

void City::reset()
{
    for (int i = 0; i < gridsize; ++i)
    {
        for (int j = 0; j < gridsize; ++j)
        {
            Organism *organism = grid[i][j];
            if (organism)
            {
                organism->setFlag(true);
            }
        }
    }
}

int City::countType(const std::string &type)
{
    int count = 0;
    for (int i = 0; i < gridsize; ++i)
    {
        for (int j = 0; j < gridsize; ++j)
        {
            Organism *organism = grid[i][j];
            if (organism && organism->getType() == type)
            {
                ++count;
            }
        }
    }
    return count;
}

std::ostream &operator<<(std::ostream &output, City &city)
{
    for (int i = 0; i < city.gridsize; ++i)
    {
        for (int j = 0; j < city.gridsize; ++j)
        {
            Organism *organism = city.grid[i][j];
            if (organism)
            {
                output << organism->getType();
            }
            else
            {
                output << '-';
            }
        }
        output << std::endl;
    }
    return output;
}

bool City::hasDiversity()
{
    bool hasHumans = false;
    bool hasZombies = false;
    for (int i = 0; i < gridsize; ++i)
    {
        for (int j = 0; j < gridsize; ++j)
        {
            Organism *organism = grid[i][j];
            if (organism)
            {
                if (organism->getType() == "H")
                {
                    hasHumans = true;
                }
                else if (organism->getType() == "Z")
                {
                    hasZombies = true;
                }
            }
        }
    }
    return hasHumans && hasZombies;
}

int City::countOrganisms(const std::string &type) const
{
    int count = 0;
    for (int i = 0; i < gridsize; ++i)
    {
        for (int j = 0; j < gridsize; ++j)
        {
            Organism *organism = grid[i][j];
            if (organism && organism->getType() == type)
            {
                ++count;
            }
        }
    }
    return count;
}

int City::getGeneration()
{
    return generation;
}

void City::col(int c)
{
    // Cross-platform color setting is not straightforward.
    // This is a placeholder implementation.
    std::cout << "\033[" << c << "m";
}
