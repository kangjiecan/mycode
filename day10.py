# spliting_bill cacualtor

class caculating:
    def __init__(self,total_bill,total_people,tip):
        self.total_bill=total_bill
        self.total_people=total_people
        self.tip=tip

    def splitingammount(self):
        if self.total_people != 0 and self.tip > 0.18:
         print(f"You will owe {(self.total_bill+self.total_bill*self.tip/100)/self.total_people}") 
        else:
            print(f"people number can't be 0 or your tip is more than 18%")

billing=caculating(float(input("What's the bill amount? >")),int(input("how many people? >")),float(input("Please enter the ratio of the tip in integer. for an example, 15% should be ennter as 15. > ")))
billing.splitingammount()