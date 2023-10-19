
"""Given two binary strings a and b, return their sum as a binary string."""
""" use bite to bite caculation, output carry and bite to bite caculation to c string"""
"""use zfile to make sure two strings are in the same length(fill with 0)"""

class Solution:
    def addBinary(self, a: str, b: str) -> str:
        
        n=max(len(a),len(b))
        a,b=a.zfill(n),b.zfill(n)
        carry=0
        len_a,len_b=len(a),len(b)
        c=""
        # caculation different conditons and output to C
        while len_a!=0 and len_b!=0:
            if a[len_a-1]=="1" and b[len_b-1]=="1" and carry==0:
                c +="0"
                carry=1
                len_a -=1
                len_b -=1
                continue
                
            elif a[len_a-1]=="0" and b[len_b-1]=="0" and carry==0:
                c +="0"
                len_a -=1
                len_b -=1
                continue    

            elif  a[len_a-1]!=b[len_b-1] and carry==0:
                c+="1"
                len_a -=1
                len_b -=1
                continue
            
            elif a[len_a-1]=="1" and b[len_b-1]=="1" and carry==1:
                c +="1"
                carry=1
                len_a -=1
                len_b -=1
                continue
            
            elif a[len_a-1]=="0" and b[len_b-1]=="0" and carry==1:
                c +="1"    
                len_a -=1
                len_b -=1
                carry=0
                continue
            
            elif  a[len_a-1]!=b[len_b-1] and carry==1:
                c+="0"
                carry=1
                len_a -=1
                len_b -=1
                continue
            
        # output the final carry to c if the string index=0 and carry =1      
        if len_a==len_b==0 and carry==1: 
            c +="1"
            return c[::-1]
        else:
            return c[::-1]
        
        """elif len_b==0:
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
        """
a="1110"
b="1001110"
solution=Solution()
restult=solution.addBinary(a,b)
print(restult)                  
