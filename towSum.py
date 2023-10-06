class Solution:
    def twoSum(self, nums:list[int], target: int) -> list[int]:
        listlen=len(nums)-1
        counting=listlen-1
        while True:
             if nums[listlen]+nums[counting]==target:
               return [listlen,counting]
               break
             elif counting==-0:
                listlen -=1
                counting=listlen
             elif listlen==1 and counting==0:
                break
             counting -=1
              
a=[2,4,11,3]
c=6
solution = Solution()
result = solution.twoSum(a, c)
print(result)





