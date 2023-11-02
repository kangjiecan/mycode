""" loan caculation
use recirsion
"""

class loan_caculator():
    def __init__(self,loan,increament,year):
        self.loan=loan
        self.increament=increament
        self.year=year

    def you_debt(self):
        if self.year==0:
          return self.loan
        else:
             self.year -=1
             self.loan *=1+self.increament
             return self.you_debt()

while True:
    try: 
        loan_total=float(input("How much are you going to loan? >"))
        loan_interest=float(input("What's the interest? please enter in decimal, for an example, 15% should enter as 0.015>"))
        loan_term=int(input("How many years do you like to pay off? >"))
        break
    except:
        print("wrong data entering, please try agin")
myloan=loan_caculator(loan_total,loan_interest,loan_term)
print(myloan.you_debt())    

  
 
