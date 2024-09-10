"""Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.



Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.


Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters."""

# leetcode 28
# find the index of the first occurrence in a string""""""


class Solution:
    def strStr(self, haystack: str, needle: str) -> int:

        k = 0
        if len(haystack) < len(needle):  # if needle longer than haystack, must be false
            return -1
        for i in range(len(haystack)):  # slide windows
            k = i
            if needle[0] == haystack[i]:
                # print(haystack[i],"*",i)

                if len(needle) == 1:
                    return i
                for j in range(1, len(needle)):
                    k += 1
                    # print(haystack[k],"!",needle[j])
                    if needle[j] != haystack[k]:
                        break
                    if j == len(needle) - 1:
                        return i
            if i >= len(haystack) - len(needle):
                return -1


haystackinput = "mississippi"
needleinput = "p"
test = Solution()
result = test.strStr(haystackinput, needleinput)
print(result)

