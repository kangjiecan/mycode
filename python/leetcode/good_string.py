"""A string is good if there are no repeated characters.

Given a string s​​​​​, return the number of good substrings of length three in s​​​​​​.

Note that if there are multiple occurrences of the same substring, every occurrence should be counted.

A substring is a contiguous sequence of characters in a string.

 

Example 1:

Input: s = "xyzzaz"
Output: 1
Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and "zaz". 
The only good substring of length 3 is "xyz".
Example 2:

Input: s = "aababcabc"
Output: 4
Explanation: There are 7 substrings of size 3: "aab", "aba", "bab", "abc", "bca", "cab", and "abc".
The good substrings are "abc", "bca", "cab", and "abc".
"""

class Solution:
    def countGoodSubstrings(self, s: str) -> int:
        hashmaping={}
        left=0
        right=0
        count=0
        while right<=len(s)-1:
            while s[right] in hashmaping.values():
                if left in hashmaping.keys():
                      del hashmaping[left]
                left +=1  

            if s[right] not in hashmaping.values():
                hashmaping[right]=s[right]
            right +=1 
            if len(hashmaping)>=3:
                count +=1
        return count    

s = "xyzzaz"
run=Solution()              
result=run.countGoodSubstrings(s)
print(result)

                
            

