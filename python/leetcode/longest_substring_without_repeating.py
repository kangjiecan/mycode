#slid windows solution
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
     hashtable=set() #hashtable
     left=0 #pointer
     right=0#pointer
     output=0
        
     while right<len(s):
         while s[right] in hashtable: #if found a duplicated letter on the right, remove the duplicated letter on the left.
             hashtable.remove(s[left]) 
             left +=1
         hashtable.add(s[right])
         output=max(output,right-left+1) # output the MAX value of the non repeated substring
         right +=1
     return output
 
 
test=Solution()
result=test.lengthOfLongestSubstring("acdeyf")   
print(result)            