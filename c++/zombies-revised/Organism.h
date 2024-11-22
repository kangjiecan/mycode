#ifndef _Organism_H
#define _Organism_H

#include <iostream>

using namespace std;

class City;

class Organism
{
protected:
	int x;
	int y;
	City *city;
	int gridsize;
	bool flag = false;
	int breed = 0;

public:
	Organism();
	Organism(int x, int y, City *city, int gridsize, bool flag = false, int breed = 0);

	virtual ~Organism();
	virtual void turn() = 0;
	virtual std::string getType() const = 0;
	virtual int getBreed() = 0;
	virtual void setBreed() = 0;
	friend ostream &operator<<(ostream &output, Organism *organism);
	int getX() const;
	int getY() const;
	bool getFlag() const;
	void setFlag(bool move);
};

#endif
