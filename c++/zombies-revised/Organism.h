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
	bool flag;
	int breed;

public:
	Organism();
	Organism(int x, int y, City *city, int gridsize, bool flag = false, int breed = 0);
	virtual ~Organism();
	virtual void turn() = 0;
	virtual std::string getType() const = 0;
	int getBreed();
	friend ostream &operator<<(ostream &output, Organism *organism);
	int getX() const;
	int getY() const;
	bool getFlag() const;
	void setFlag(bool move);
	City *getCity();
	int getGridSize();
	void breedReset();
	void setBreed(int breed);
};

#endif
