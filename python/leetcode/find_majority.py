
""" 

Code

Testcase
Testcase
Result

169. Majority Element
Solved
Easy
Topics
Companies
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

 

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2"""
# Push list elements onto the stack, and then count them.
# Far from the best algorithm, but close to average.

class Solution:
    def majorityElement(self, nums):
        hashmap = {}
        
        for i in nums:
            if i in hashmap:
                hashmap[i] += 1
            else:
                hashmap[i] = 1
                
        
        n = len(nums)
        for key, value in hashmap.items():
            #print(key,value)
            if value > n // 2:
               
                return key

        return None  
                
test = Solution()
print(test.majorityElement([1,1,2,2,3,4,4,3,3,3,3,3,3])) 