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
     p=""
     k=len(strs)
     j=0
     strs=sorted(strs,key=len)
     if len(strs)==1:
        return strs[0]
     if not strs:
            return ""
     for index in range(len(strs[0])): 
        char=strs[0][index] 
        for i in strs: 
         j=j+1
         if i[index]!=char :
            return p   
         elif j==len(strs):
            p+=char
            j=0
     return p
  
tryout=["flower","flow","flight"]
tryout1=Solution()
result=tryout1.longestCommonPrefix(tryout)
print(result)  