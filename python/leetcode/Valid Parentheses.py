class Solution:
    def isValid(self, s: str) -> bool:
       stack=[]
       dic={"(":")","[":"]","{":"}"}
       for char in s:
           if len(stack)==0 and char not in dic or char not in dic and char!=dic[stack[-1]]:
                return False
           elif char in dic:
               stack.append(char)      
           
           elif char==dic[stack[-1]]:
               stack.pop()
             
       if len(stack)==0:
            return True
       else:
            return False
             
        
             
        