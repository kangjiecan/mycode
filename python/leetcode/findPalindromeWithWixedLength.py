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




                
             
             
              
          
        
