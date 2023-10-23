""" 
3. Longest Substring Without Repeating Characters
Solved
Medium
Topics
Companies
Given a string s, find the length of the longest 
substring
 without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
"""
#improve brute force by using a hash table stores the duplicate letter index. it reduces a track back loop compare to previous version
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        stack={}
        count=0
        length=0

        while count<len(s):
         if s[count] in stack:  
           if len(stack) > length:
            length=len(stack)
           count = stack[s[count]]+1
           stack = {}

         if s[count] not in stack:
             stack[s[count]]=count
                              
         count +=1

        if len(stack)>length:
           return len(stack)
        else:
           return length

    
       
                 


        

test=Solution()
result=test.lengthOfLongestSubstring("abcdef")   
print(result)             


