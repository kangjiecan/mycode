""" 

Topics
Companies
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters."""


class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
     i=0
     p=""
     k=len(strs)
     index=0
     strs=sorted(strs,key=len)
     print(strs)
     if len(strs)==1:
        return strs[0]
     if not strs:
            return ""
     for index in range(len(strs[i])): 
        char=strs[0][index]  
        for i in strs:        
         if strs[index]!=char or index==len(strs[i])-1:
            return p
         elif strs[index]==char and i+1==k-1:
            p +=char
     return p
tryout=["flower","flow","flight"]
tryout1=Solution()
result=tryout1.longestCommonPrefix(tryout)
print(result)  