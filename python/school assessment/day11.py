""" "Seconds in a year:
First, calculate the leap year, then do the common calculation."
"""


import os

# leap year caculation
def caculating(year:int): 
    if year%400==0 or year%4==0:
        return 366*24*60*60
    elif year%100==0 or year%4!=0:
        return 365*24*60*60  

# valid input
def interge_input():
  while True:
     try:
         a=int(input("please enter a year in interge >"))
         return a
     except :
         print("Wrong entering, try again please")

os.system('clear')
yearinput=interge_input()
print(caculating(yearinput),"seconds in",yearinput)





         
