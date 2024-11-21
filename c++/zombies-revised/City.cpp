#include "City.h"
#include <iostream>
#include "Organism.h"
#include <iostream>

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

City::~City()
{
    for (int i = 0; i < gridsize; ++i)
    {
        delete[] grid[i];
    }
    delete[] grid;
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

int City::countType(char type)
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

void City::col(int c)
{
    // Cross-platform color setting is not straightforward.
    // This is a placeholder implementation.
    std::cout << "\033[" << c << "m";
}
