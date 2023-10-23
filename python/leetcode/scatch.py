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