""" Given two binary strings a and b, return their sum as a binary string.



Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
"""


# Given two binary strings a and b, return their sum as a binary string.
# convert Str to int, then convert the SUM of 2 str in int to binary str
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        def str_to_bin(Str: str) -> int:  # convert str to int
            output = 0
            count = 0
            for i in Str[::-1]:
                output += int(i) * 2**count
                count += 1
            return output

        int_a = str_to_bin(a)
        int_b = str_to_bin(b)
        return str(bin(int_a + int_b)[2:])  # return the sum in binary str


test = Solution()
result = test.addBinary("111", "10")
print(result)
