#include "FoodItems.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_FOOD_ITEMS 550

FoodItem* foodItems[MAX_FOOD_ITEMS];
int foodItemCount = 0;

void printAllFoodItems() {
    if (foodItemCount == 0) {
        printf("No food items available.\n");
    } else {
        for (int i = 0; i < foodItemCount; i++) {
            displayFoodItem(foodItems[i]);
        }
    }
}

void addNewFoodItem() {
    if (foodItemCount >= MAX_FOOD_ITEMS) {
        printf("Maximum food item count reached.\n");
        return;
    }
    FoodItem* newItem = createFoodItem();
    if (newItem == NULL) {
        printf("Failed to add new food item.\n");
    } else {
        foodItems[foodItemCount++] = newItem;
        printf("Food item added.\n");
    }
}

int compareCalories(const void* a, const void* b) {
    FoodItem* itemA = *(FoodItem**)a;
    FoodItem* itemB = *(FoodItem**)b;
    return (itemA->calories > itemB->calories) - (itemA->calories < itemB->calories);
}

void sortItemsByCalories() {
    qsort(foodItems, foodItemCount, sizeof(FoodItem*), compareCalories);
    printf("Food items sorted by calories.\n");
}

void deleteItemByName(const char* name) {
    for (int i = 0; i < foodItemCount; i++) {
        if (strcmp(foodItems[i]->name, name) == 0) {
            free(foodItems[i]);
            foodItems[i] = foodItems[--foodItemCount];
            printf("Food item deleted.\n");
            return;
        }
    }
    printf("Food item not found.\n");
}

int main() {
    int choice;
    char itemName[128];

    while (1) {
        printf("\n1- Print all food items\n");
        printf("2- Add a new food item\n");
        printf("3- Sort the items by ascending calories\n");
        printf("4- Delete an item by name\n");
        printf("5- Exit the program\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        while (getchar() != '\n');

        switch (choice) {
            case 1:
                printAllFoodItems();
                break;
            case 2:
                addNewFoodItem();
                break;
            case 3:
                sortItemsByCalories();
                break;
            case 4:
                printf("Enter the name of the food item to delete: ");
                fgets(itemName, 128, stdin);
                itemName[strcspn(itemName, "\n")] = 0;
                deleteItemByName(itemName);
                break;
            case 5:
                for (int i = 0; i < foodItemCount; i++) {
                    free(foodItems[i]);
                }
                printf("Exiting the program.\n");
                return 0;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }
}
