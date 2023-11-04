
class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
      left = 0
      right = 0
      temp = 0
      length = 0
      char = ""
      
      
      
      while right < len(s):
        char = set(s[left:right + 1])
        if len(char) <= 2:
         right += 1
         temp = right - left
         length = max(length, temp)
        else: left += 1
      return length