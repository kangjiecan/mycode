""" 
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'."""


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
             
        
             
        