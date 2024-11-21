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
	int breed = 0;

	int size;
	bool flag = false;
	City *city;

public:
	Organism();
	Organism(City *city, int size);
	virtual ~Organism();
	virtual void turn() = 0;
	virtual std::string getType() const = 0;
	virtual int getBreed()=0;
	virtual void setBreed()=0;
	friend ostream &operator<<(ostream &output, Organism *organism);
	int getX() const;
	int getY() const;
	bool getFlag() const;
	void setFlag(bool move);
};

#endif
