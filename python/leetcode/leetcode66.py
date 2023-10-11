class Solution:
    def plusOne(self, digits: list[int]) -> list[int]:
       
            if  digits[-1]!=9:
                digits[-1]=digits[-1]+1
                return digits
            if digits[-1]==9:
                for i in range(len(digits)-1,-1,-1):
                    if digits[i]!=9:
                       digits[i]=digits[i]+1
                       return digits
                    digits[i]=0
                    if i==0:
                         digits.insert(0,1)


                return digits    
                    
                         
                   
                      
                    




a=[1,2,3,4,9,9,9,9]
solution=Solution()
result=solution.plusOne(a)
print(result)
