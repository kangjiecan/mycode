#include <stdio.h>
#include <stdlib.h>

struct linkedList{
int item;
struct linkedList *next;
};

struct linkedList * createNode (int val) {
    struct linkedList* headNote=(struct linkedList*)malloc(sizeof(struct linkedList));
    headNote->item=val;
    headNote->next=NULL;
    return headNote;
    }

struct linkedList* insertNode(struct linkedList *head,int val){
    struct linkedList *newNode=createNode(val);
    newNode ->next=head;
    return newNode;
}

void printingNote(struct linkedList * list)
{
while(list!=NULL){
printf("%d",list->item);
list=list->next;
printf("\n");}
}

void freeList(struct linkedList *list){
struct linkedList *temp;
while (list!=NULL){
    temp=list->next;
    free(list);
    list=temp;
}
}

int main() {
    struct linkedList *head = NULL;

    head = insertNode(head, 10);
    head = insertNode(head, 20);
    

    
    printf("The linked list: ");
    printingNote(head);
    freeList(head);

   

    return 0;
}

