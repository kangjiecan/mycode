#ifndef _Zombie_H
#define _Zombie_H

#include "Organism.h"

class Zombie : public Organism
{
private:
	std::vector<std::pair<int, int>> moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};
	int starve = 3;

public:
	Zombie();
	Zombie(int x, int y, City *city, int gridsize, bool flag = false, int breed = 0, int starve = 3);
	// Zombie(Organism *organism);//covert human to zombie
	virtual ~Zombie();
	std::string getType() const override;
	void turn() override;
	int getStarve();
	void setStarve(int starveSet);
};

#endif
