""" Given an integer array queries and a positive integer intLength, return an array answer where answer[i] is either the queries[i]th smallest positive palindrome of length intLength or -1 if no such palindrome exists.

A palindrome is a number that reads the same backwards and forwards. Palindromes cannot have leading zeros.

 

Example 1:

Input: queries = [1,2,3,4,5,90], intLength = 3
Output: [101,111,121,131,141,999]
Explanation:
The first few palindromes of length 3 are:
101, 111, 121, 131, 141, 151, 161, 171, 181, 191, 202, ...
The 90th palindrome of length 3 is 999.
Example 2:

Input: queries = [2,4,6], intLength = 4
Output: [1111,1331,1551]
Explanation:
The first six palindromes of length 4 are:
1001, 1111, 1221, 1331, 1441, and 1551.
 

Constraints:

1 <= queries.length <= 5 * 104
1 <= queries[i] <= 109
1 <= intLength <= 15"""


class Solution:
   def kthPalindrome(self, queries: list[int], intlength: int) -> list[int]: 
    mylist=[]
    i=0
    
    if intlength%2!=0 and intlength!=1:
     for j in queries:
       i=0
       

       for m in range(10**(int(intlength/2-1)),10**int(intlength/2)):
          for k in range(0,10):
              output=int(str(m)+str(k)+str(m)[::-1])
              i +=1
              if i==j:
                mylist.append(output)
                break
              elif output==10**intlength-1 and i!=j:
                 mylist.append(-1)
              
    elif intlength%2==0:
       for j in queries:
        i=0
        if 10**(intlength-2)<j:
          mylist.append(-1) 
      
        for k in range(10**(int(intlength/2-1)),10**int(intlength/2)):
               
               output1=int(str(k)+str(k)[::-1])
               i +=1
               if i==j:
                   mylist.append(output1)
                   continue
               elif output1==10**intlength-1 and i!=j:
                 mylist.append(-1)
    elif intlength==1:
         
         for j in queries:
          if j>10**(intlength-1):
           mylist.append(-1)
           continue
          mylist.append(j)
                  
               
    return mylist            

solution=Solution()
result=solution.kthPalindrome([105848303,57,8,513489687,43,21,75,15,99517488,85,19,947419916,416364456],9)
print(result)




                
             
             
              
          
        
