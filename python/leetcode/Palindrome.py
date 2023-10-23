"""  

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 

Constraints:

-231 <= x <= 231 - 1"""



class Solution:
 
 def kthPalindrome(self, queries: list[int], intLength: int) -> list[int]:
  mylist=[]
  for number in queries:
   print(number)
   mylist.append(self.generator(intLength,number))
   print(mylist)
  return mylist
   
 
 
 def generator(self,intlength:int,number:int) -> int:
  mylist=[]
  
  if intlength %2!=0:
   firstnumber=10**(intlength//2)
   outputindex=number+firstnumber-1
   maxintlength=firstnumber
   if len(str(outputindex))>len(str(maxintlength)):
    return -1
   else:
    return int(str(outputindex)+str(outputindex)[:-1][::-1])
    
   
  if intlength %2==0:
   firstnumber=10**(intlength//2-1)
   outputindex=number+firstnumber-1
   maxintlength=firstnumber
   if len(str(outputindex))>len(str(maxintlength)):
    return -1
   else:
    return int(str(outputindex)+str(outputindex)[::-1])
   
    
solution=Solution()
result=solution.kthPalindrome([1,2,3,4,5,90],3)
print(result)
  


 