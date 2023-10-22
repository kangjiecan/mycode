def str_to_bin(Str:str)->int:
      output=0 
      count=0  
      for i in Str[::-1]:
          output +=int(i)*2**count
          count +=1
          
          
      return output 
  
print(str_to_bin("111"))  
  