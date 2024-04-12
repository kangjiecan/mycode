#ifndef FOODITEMS_H
#define FOODITEMS_H

#include <stdlib.h> // For size_t definition

// Structure declaration for a FoodItem
typedef struct {
    char name[128];         // Name of the food item, character array of up to 128 characters
    unsigned long calories; // Calorie count, using an unsigned long integer
} FoodItem;

// Declaration of public API functions
FoodItem* createFoodItem(); // Function to create a new FoodItem, dynamically allocated
void displayFoodItem( FoodItem* item); // Function to display a FoodItem's details

#endif // FOODITEMS_H

