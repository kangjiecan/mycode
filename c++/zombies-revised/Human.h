#ifndef _Human_H
#define _Human_H

#include "Organism.h"
#include "Zombie.h"

class Human : public Organism
{
private:
	std::vector<std::pair<int, int>> moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

public:
	Human();
	Human(int x, int y, City *city, int gridsize, bool flag = false, int breed = 0);
	virtual ~Human();
	std::string getType() const override;
	void turn() override;
};

#endif
