class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        hashmap={}
        for i in range(len(nums)):
            if nums[i]in hashmap:
             return [(hashmap[nums[i]]),i]
            hashmap[target-nums[i]]=i
            
           
           
solution=Solution()
result=solution.twoSum([3,3],6)    
print(result)          






