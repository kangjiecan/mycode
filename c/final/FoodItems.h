#ifndef FOODITEMS_H
#define FOODITEMS_H

#include <stdlib.h> 


typedef struct {
    char name[128];        
    int calories; 
} FoodItem;


FoodItem* createFoodItem(); 
void displayFoodItem( FoodItem* item); 

#endif 

