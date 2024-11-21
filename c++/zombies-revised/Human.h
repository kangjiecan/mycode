#ifndef _Human_H
#define _Human_H

#include "Organism.h"

class Human : public Organism
{
private:
	std::vector<std::pair<int, int>> moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

public:
	Human();
	Human(City *city, int size);
	virtual ~Human();
	std::string getType() const override;
	int getBreed() override;
	void setBreed() override;
	void turn() override;
};

#endif