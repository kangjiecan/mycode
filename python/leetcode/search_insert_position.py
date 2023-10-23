""" 
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4
"""


class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        if len(nums)==1 and target>nums[0]:
          return 1
        elif len(nums)==1 and target<nums[0]:
           return 0 
        
        halflen=len(nums)//2
        
        if target>nums[halflen]:
           for i in range(halflen,len(nums)):
                if nums[i]>=target:
                 return i
                elif target>nums[len(nums)-1]:
                 return len(nums)
                 
        elif target <nums[halflen]:
             for i in range(0,halflen+1):
             
              if nums[i]>=target:
                   return i
              elif target<=nums[0]:
                 return 0 
             
               
        elif target==nums[halflen]:
            nums[halflen]=target
            return halflen

a=[1,3,5]
solustion=Solution()
result=solustion.searchInsert(a,5)
print(result)       
                       
        