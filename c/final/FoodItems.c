#include "FoodItems.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

FoodItem *createFoodItem(void)
{
    FoodItem *item = (FoodItem *)malloc(sizeof(FoodItem));
    if (item == NULL)
    {
        return NULL;
    }

    printf("Enter food item name (up to 127 characters): ");
    if (fgets(item->name, 128, stdin) == NULL)
    {
        free(item);
        return NULL;
    }
    int len = strlen(item->name);
    if (len > 0 && item->name[len - 1] == '\n')
    {
        item->name[len - 1] = '\0';
    }

    printf("Enter calorie count: ");
    if (scanf("%d", &item->calories) != 1)
    {
        free(item);
        return NULL;
    }

    int c;
    while ((c = getchar()) != '\n' && c != EOF)
    {
    }

    return item;
}

void displayFoodItem( FoodItem *item)
{
    if (item == NULL)
    {
        printf("Invalid FoodItem.\n");
    }
    else
    {
        printf("%s: %d calories\n", item->name, item->calories);
    }
}
