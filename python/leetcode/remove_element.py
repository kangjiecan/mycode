class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
     counting=0
     for i in range(len(nums)):
        if nums[i]!=val:
           nums[counting]=nums[i]
           counting+=1
        
     return counting  


a=[3,2,2,3]
b=3
test=Solution()
result=test.removeElement(a,b)
print(result)