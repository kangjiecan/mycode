class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        counting=0
        stop_counting=0
        length=0
        #print(len(s))
        if " " not in s:
           return len(s) 
               
       
        for i in range(len(s)):
          
           #print(i,"*")
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
                   



                
         