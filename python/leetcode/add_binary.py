class Solution:
    def addBinary(self, a: str, b: str) -> str:
        next=0
        len_a=len(a)
        len_b=len(b)
        c=""
        while len_a!=0 and len_b!=0:
            if a[len_a-1]=="1" and b[len_b-1]=="1" and next==0:
                c +="0"
                next=1
                len_a -=1
                len_b -=1
                continue
                
            elif a[len_a-1]=="0" and b[len_b-1]=="0" and next==0:
                c +="0"
                len_a -=1
                len_b -=1
                continue    

            elif  a[len_a-1]!=b[len_b-1] and next==0:
                c+="1"
                len_a -=1
                len_b -=1
                continue
            
            elif a[len_a-1]=="1" and b[len_b-1]=="1" and next==1:
                c +="1"
                next=1
                len_a -=1
                len_b -=1
                continue
            elif a[len_a-1]=="0" and b[len_b-1]=="0" and next==1:
                c +="1"    
                len_a -=1
                len_b -=1
                next=0
                continue
            elif  a[len_a-1]!=b[len_b-1] and next==1:
                c+="0"
                next=1
                len_a -=1
                len_b -=1
                continue
              
         
         
        if len_a==len_b==0 and next==1:
            c +="1"
            return c[::-1]
        
        elif len_b==0:
           while len_a!=0:
               if next==1 and a[len_a-1]=="1" and len_a-1==0:
                   c +="01"
                   break
               elif next==1 and a[len_a-1]=="0":
                   
                   c +="1"
                   next=0
                   len_a -=1
                   continue
               elif next==1 and a[len_a-1]=="1":
                   c +="0"
                   len_a-=1
                   continue
               elif next==0:
                   c +=a[len_a-1]
                   len_a -=1  
                   continue
            
        elif len_a==0:
           while len_b!=0:
               if next==1 and b[len_b-1]=="1" and len_b-1==0:
                   c +="01"
                   break
               elif next==1 and b[len_b-1]=="0":
                   
                   c +="1"
                   next=0
                   len_b -=1
                   continue
               elif next==1 and b[len_b-1]=="1":
                   c +="0"
                   len_b-=1
                   continue
               elif next==0:
                   c +=b[len_b-1]
                   len_b -=1  
                   continue
                  
               
        return c[::-1]

a="11"
b="1001"
solution=Solution()
restult=solution.addBinary(a,b)
print(restult)                  
