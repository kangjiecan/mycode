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
	Human(Organism *organism);//recruit new human
	Human(Zombie *zombie);//covert zombie to human
	virtual ~Human();
	std::string getType() const override;
	int getBreed() override;
	void setBreed() override;
	void turn() override;

};
 
#endif

