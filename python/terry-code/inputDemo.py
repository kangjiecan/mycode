def inputDemo(conditon1, condition2,condition3):
    while(True):
     choice=input("Enter your choice you stupy: ").upper()
     if choice== conditon1 or choice== condition2 or choice== condition3:
        return choice





print("player 1 welcome to the game")
player1Choice=inputDemo('R','P','S')
print("You entered: ",player1Choice)

print("player 2 welcome to the game")
Player2Choice=inputDemo('y', 'N', 'MAYBE')     
print("You entered: ",Player2Choice)










