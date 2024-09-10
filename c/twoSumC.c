int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int hashtableSize=32768;
    int* remainder = (int*)malloc(hashtableSize * sizeof(int));
    memset(remainder,-1,hashtableSize*sizeof(int));
   
    
    for (int i = 0; i < numsSize; i++) {
        int difference=target-nums[i];
        int hashkey=(difference & 0x7fffffff) % hashtableSize;
        if (remainder[hashkey] >=0) {

           int * result = (int*)malloc(sizeof(int) * 2);
            result[0] = remainder[hashkey];
            result[1] = i;
            
            free(remainder);
            *returnSize =2;
            return result;
        }
        
        

        remainder[(nums[i] &0x7fffffff)%hashtableSize] = i;
    }
    free(remainder);
    *returnSize = 0;
    return NULl;
} 
