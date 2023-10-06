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
  


 