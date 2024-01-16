#include <stdio.h>
#include <stdlib.h>

struct hashTable
{
    int key;
    int value;
    struct hashTable *next;
};

struct hashTable *hashTableCreate(int tableSize)
{
    struct hashTable *table = (struct hashTable *)malloc(sizeof(struct hashTable) * tableSize);
    for (int i = 0; i < tableSize; i++)
    {
        table[i].key = -1;
        table[i].value = 0;
        table[i].next = NULL;
    }
    return table;
}

struct hashTable *insertVal(struct hashTable *table, int key, int val, int tableSize)

{

    int hashkey = (key & 0x7fffffff) % tableSize;

    if (table[hashkey].key == -1)
    {
        table[hashkey].key = key;
        table[hashkey].value = val;
        table[hashkey].next = NULL;
    }
    else
    {
      
        while (table[hashkey].next!=NULL)
            {
                table = table[hashkey].next;
                
            }
        struct hashTable *current=
            
        struct hashTable *newNode = (struct hashTable *)malloc(sizeof(struct hashTable));
        newNode->key = key;
        newNode->value = val;
        newNode->next = NULL;
        
    };

    return table;
}
}