//
// Created by W0068332 on 11/21/2021.
//
//Example main.cpp
//This supposes that city->step() calls the move method of each organism in the city
//in a single pass causing each to perform all tasks that it can.

#include <iostream>
#include <chrono>
#include <thread>
#include "Organism.h"
#include "City.h"
#include "GameSpecs.h"
using namespace std;

const int intervalseting = 1000; // Define intervalseting with an appropriate value

void ClearScreen()
{
    cout << "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
}

int main() {
    City *city = new City();
    chrono:: milliseconds interval(intervalseting);

    while (city->hasDiversity()) { //while both humans and zombies exist
        this_thread::sleep_for(interval);
        ClearScreen();
        city->step(); 
        city->reset(); //resets moved flags
        city->countOrganisms("Z");
        city->countOrganisms("H");// run once for each type
        cout << *city; //prints city
        cout << "GENERATION " << city->getGeneration() << endl;
        cout << "HUMANS: " << city->countType("H") << endl;
        cout << "ZOMBIES: " << city->countType("Z") << endl;
    }//end while
}//end main

