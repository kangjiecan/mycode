#ifndef _CITY_H
#define _CITY_H

#include <iostream>
#include "GameSpecs.h"
#include "Organism.h"

class City
{
protected:
	int gridsize;
	Organism ***grid;
	int generation;

public:
	City();
	City(int gridsize);
	virtual ~City();

	Organism *getOrganism(int x, int y);
	void setOrganism(Organism *organism);
	bool inBounderies(int x, int y);
	void step(); // includes all actions except reset, counting, and printing in this solution.
	void reset();
	int countType(const std::string &type);
	friend ostream &operator<<(ostream &output, City &city);
	bool hasDiversity();
	int countOrganisms(const std::string &type) const;
	int getGeneration();
	void generateOrganisms(int zombie_startcount, int human_startcount, int gridsize);
	void movingIn(Organism *organism1, int x, int y);
	void col(int c); // for color
};

#endif
