class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        hassmap={}
        for i in range(len(nums)):
            if nums[i]in hassmap:
             return [(hassmap[nums[i]]),i]
            hassmap[target-nums[i]]=i
            
           
           
solution=Solution()
result=solution.twoSum([3,3],6)    
print(result)          






