#math game
j=0
multiples=int(input("name your multiples >"))
for i in range(11):
   print(f"{i} x {multiples} =  ")
   if int(input(" > "))==i*multiples:
       j+=1
       print(f" well done {i} x {multiples} = {i*multiples}")
   else: 
       print(f" Nope, the answer was {i*multiples},your score is {j*10/100}")  
       break
print(f"your score is {i} out of 10")