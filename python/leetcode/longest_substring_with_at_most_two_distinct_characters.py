"""159. Longest Substring with At Most Two Distinct Characters
Medium
Topics
Companies
Given a string s, return the length of the longest
substring
 that contains at most two distinct characters.



Example 1:

Input: s = "eceba"
Output: 3
Explanation: The substring is "ece" which its length is 3.
Example 2:

Input: s = "ccaabbb"
Output: 5
Explanation: The substring is "aabbb" which its length is 5.

"""


class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        left = 0
        right = 0
        temp = 0
        length = 0
        char = ""
        while right < len(s):
            char = set(s[left : right + 1])
            if len(char) <= 2:
                right += 1
                temp = right - left
                length = max(length, temp)
            else:
                left += 1
        return length


s = "aabbccc"
run = Solution()
result = run.lengthOfLongestSubstringTwoDistinct(s)
print(result)

