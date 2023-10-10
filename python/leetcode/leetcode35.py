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
                       
        