#include <stdint.h>
#include <stdio.h>

int main()
{
    int a = 10;
    int b = 20;
    int *c = &a;
    int *d = &b;
    int i = 39;
    int *j = &i;
    int *e[2] = {c, d};
    int **f = e;
    f[0] = j;

    printf("%p \n", (void *)e[0]);
    printf("%p \n", (void *)e[0]);
    printf("%p \n", (void *)f[0]);

    return 0;
}