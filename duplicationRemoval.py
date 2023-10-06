class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
     counting=1
  
   
     for i in range(len(nums)-1):
             if nums[i]!=nums[i+1]:
                 nums[counting]=nums[i+1]
                 counting+=1
                 
     return counting               

                     
                
     print(nums)            
    


       
       
     

a=[1,1,2,2,3,4,5]        
test=Solution()
result=test.removeDuplicates(a) 
print(result)
      