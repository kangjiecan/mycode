import random
targer_number=random.randint(0,1000000)
N=0
while True:
     while True:
         try:
             yournumber= int (input("Guess what my number it is. >"))
             break
         except:
             print("wrong enter, enter again")
     if yournumber==targer_number:
        print("well done")
        break
      
     elif yournumber>targer_number:
        N +=1
        print("too high, try again")

     elif yournumber<targer_number:
         N +=1
         print("too low,try again")
         

print(f"you are amazing, only took {N} time to catch my number")
