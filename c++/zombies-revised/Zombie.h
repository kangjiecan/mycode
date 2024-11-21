#ifndef _Zombie_H
#define _Zombie_H

#include "Organism.h"

class Zombie : public Organism
{
private:
	std::vector<std::pair<int, int>> moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};

public:
	Zombie();
	Zombie(City *city, int size);
	virtual ~Zombie();
	std::string getType() const override;
	int getBreed() override;
	void setBreed() override;
	void turn() override;
};

#endif
