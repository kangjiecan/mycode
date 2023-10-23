""" 
58. Length of Last Word
Solved
Easy
Topics
Companies
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal 
substring
 consisting of non-space characters only.

 

Example 1:

Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
Example 2:

Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
Example 3:

Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6."""



class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        
        counting=0
        stop_counting=0
        length=0
        
        if " " not in s:
           return len(s) 
               
        for i in range(len(s)):
           if s[i-1]==" " and s[i]!=" ":
               counting=i
           if (s[i]!=" " and i==len(s)-1):
               stop_counting=i+1
               length=stop_counting-counting
           elif  s[i-1]!=" " and s[i]==" ":
               stop_counting=i
               length=stop_counting-counting
           
        return length  
        
                   
                   

                  
               
           
            

                
    
              
                     
             
              
                   
       
test="aalskdjfasd,asdlfkja;sdf,a sd "
solution=Solution()
result=solution.lengthOfLastWord(test)
print(result)           
                   



                
         