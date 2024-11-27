#include "City.h"
#include <iostream>
#include "Organism.h"
#include <iostream>
#include <string>
#include <random>
#include "Zombie.h"
#include "Human.h"
#include "GameSpecs.h"
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
    generation = 0;
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
    generation = 0;
}

void City::setGeneration(int generation)
{
    this->generation = generation;
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
        std::cout << "Placed Zombie at (" << x << ", " << y << ")" << std::endl; // Debug
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
    int x = organism->getX();
    int y = organism->getY();
    grid[x][y] = organism;
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
            if (organism && organism->getFlag())
            {
                organism->turn();
                if (organism->getX() != i || organism->getY() != j)
                {
                    grid[i][j] = nullptr;
                    movingIn(organism, organism->getX(), organism->getY());
                    if (organism->getType() == "H")
                    {
                        humanRecruit(organism);
                    }
                    else
                    {
                        // zombieCovertToHuman(organism);
                        if (organism->getBreed() >= 8)
                        {
                            covertingHumanToZombie(organism);
                        }
                    }
                }
            }
        }
    }
}

void City::movingIn(Organism *organism, int X, int Y)
{
    Organism *existingOrganism = grid[X][Y];

    if (existingOrganism == nullptr)
    {

        organism->setBreed(organism->getBreed() + 1);

        setOrganism(organism);
        organism->setFlag(false);
        if (organism->getType() == "Z")
        {
            Zombie *zombie = dynamic_cast<Zombie *>(organism);
            zombie->setStarve(zombie->getStarve() - 1);
        }
    }
    else if (existingOrganism->getType() == "H" && organism->getType() == "Z")
    {
        delete existingOrganism;
        setOrganism(organism);
        organism->setFlag(false);
        Zombie *zombie = dynamic_cast<Zombie *>(organism);
        zombie->setStarve(3);
        zombie->setBreed(zombie->getBreed() + 1);
    }
    else if (existingOrganism->getType() == "Z" && organism->getType() == "H")
    {
        delete organism;
        existingOrganism->setFlag(false);
        Zombie *zombie = dynamic_cast<Zombie *>(existingOrganism);
        zombie->setStarve(3);
        zombie->setBreed(zombie->getBreed() + 1);
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

bool City::hasDiversity()
{
    if (countType("H") == 0 || countType("Z") == 0)
    {
        return false;
    }
    return true;
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
std::ostream &operator<<(std::ostream &output, City &city)
{
    for (int i = 0; i < city.gridsize; ++i)
    {
        for (int j = 0; j < city.gridsize; ++j)
        {
            Organism *organism = city.grid[i][j];
            if (organism != nullptr) // Check if there is an organism
            {
                // Apply color based on organism type
                if (organism->getType() == "H")
                {
                    output << "\033[" << HUMAN_COLOR << "m"; // Cyan for Humans
                }
                else if (organism->getType() == "Z")
                {
                    output << "\033[" << ZOMBIE_COLOR << "m"; // Yellow for Zombies
                }

                // Output the organism type
                output << organism->getType();

                // Reset color back to default after organism
                output << "\033[" << RESET_COLOR << "m";
            }
            else
            {
                // Output white dash for empty space
                output << "\033[" << DASH_COLOR << "m-";
                output << "\033[" << RESET_COLOR << "m"; // Reset after dash
            }
        }

        // Move to the next row
        output << std::endl;
    }
    return output;
}

void City::humanRecruit(Organism *organism)
{
    if (organism->getBreed() == 3 && organism->getType() == "H")
    {
        organism->breedReset();
        std::vector<std::pair<int, int>> moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        std::random_device rd;
        std::mt19937 gen(rd());
        std::shuffle(moves.begin(), moves.end(), gen);

        for (const auto &move : moves)
        {
            int nx = organism->getX() + move.first;
            int ny = organism->getY() + move.second;

            if (inBounderies(nx, ny) && grid[nx][ny] == nullptr)
            {
                Human *human = new Human(nx, ny, this, gridsize, false, 0);
                setOrganism(human);
                organism->breedReset();
                break;
            }
        }
    }
}

void City::zombieCovertToHuman(Organism *organism)
{
    if (organism->getType() == "Z" && dynamic_cast<Zombie *>(organism)->getStarve() < 0)
    {
        Human *human = new Human(organism->getX(), organism->getY(), this, gridsize, false, 0);
        setOrganism(human);
        delete organism;
    }
}

void City::covertingHumanToZombie(Organism *organism)
{

    std::vector<std::pair<int, int>> moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};
    std::random_device rd;
    std::mt19937 gen(rd());
    std::shuffle(moves.begin(), moves.end(), gen);

    for (const auto &move : moves)
    {
        int nx = organism->getX() + move.first;
        int ny = organism->getY() + move.second;

        if (inBounderies(nx, ny))
        {
            Organism *target = getOrganism(nx, ny);
            if (target && target->getType() == "H")
            {
                delete target;                                                 // Delete the Human
                Zombie *zombie = new Zombie(nx, ny, this, gridsize, false, 0); // Create a Zombie
                setOrganism(zombie);                                           // Place the Zombie in the grid
                organism->breedReset();                                        // Reset the breed counter for the original Zombie
                return;
            }
        }
    }
}
