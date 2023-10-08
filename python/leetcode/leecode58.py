#58. Length of Last Word

#Given a string s consisting of words and spaces, return the length of the last word in the string.



class findspace:
    def __init__(self,Str:str):
        self.counting=0
        self.Str=Str
        self.a=0
        

    def spacefinder(self):
       
        
        if self.counting==len(self.Str):
           return len(self.Str)-self.a-1
        if  self.Str[self.counting]!=" ":
            self.counting +=1

            return self.spacefinder()
        elif self.Str[self.counting]==" ":
             self.a=self.counting
             self.counting+=1
             return self.spacefinder()
           
         


test=findspace("hello alskdfj asdklfja sdf asdf d") 
result=test.spacefinder()
print(result)    
        

    
    
       
    
