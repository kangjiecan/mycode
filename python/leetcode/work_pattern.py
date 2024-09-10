"""
Example 1:

Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Example 2:

Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false


Constraints:

1 <= pattern.length <= 300
pattern contains only lower-case English letters.
1 <= s.length <= 3000
s contains only lowercase English letters and spaces ' '.
s does not contain any leading or trailing spaces.
All the words in s are separated by a single space.
"""

# convert single string like "dog dog cat cat" to a spreate string list "dog","dog","cat","cat"
# if pattern[i] and s[i] are both not in hashtable, push them in hashtable.
# if only pattern[i] or s[i] in the hashtable, means they are not matched. Return False.


class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        s = s.split()  # convert single str to sperate string list.
        hashtable1 = {}
        i = 0

        if len(s) != len(
            pattern
        ):  # if the pattern length != converted s length, return False.
            return False

        while i < (len(s)):
            if pattern[i] not in hashtable1 and s[i] not in hashtable1.values():
                hashtable1[pattern[i]] = s[i]
            # print(hashtable1)
            if hashtable1.get(pattern[i]) != s[i]:
                return False
            i += 1

        return True


p = "aaaa"
Str = "aa aa aa aa"
test = Solution()
result = test.wordPattern(p, Str)
print(result)

