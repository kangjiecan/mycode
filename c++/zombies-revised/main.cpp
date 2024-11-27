#include <iostream>
#include <chrono>
#include <thread>
#include "City.h"
#include "Organism.h"
#include "Human.h"
#include "Zombie.h"
#include "GameSpecs.h"

using namespace std;

const int stepInterval = ITERATIONS; // Time between steps (ms)

void ClearScreen()
{
    std::cout << "\033[2J\033[1;1H"; // Clears console screen (UNIX-like systems)
}

int main()
{
    City *city = new City(GRIDSIZE);

    city->generateOrganisms(ZOMBIE_STARTCOUNT, HUMAN_STARTCOUNT, GRIDSIZE);

    chrono::milliseconds interval(stepInterval);

    while (city->hasDiversity())
    {
        city->setGeneration(city->getGeneration() + 1);
        this_thread::sleep_for(interval);
        ClearScreen();
        city->reset();
        city->step();
        cout << *city;
        cout << "GENERATION " << city->getGeneration() << endl;
        cout << "HUMANS: " << city->countType("H") << endl;
        cout << "ZOMBIES: " << city->countType("Z") << endl;
    }

    cout << "Simulation ended. Final generation: " << city->getGeneration() << endl;
    delete city;
    return 0;
}