
import getpass
# limit the imput
def betinput():
    while True:
          output=getpass.getpass("rock/paper/scissors or R/P/S ").lower()
          output=output[0:1]
          if output=="r" or output=="p" or output=="s":
               return output
               break
          else:
               print("Wronng entering, try again")
# game body               
class game:
    def __init__(self,player1,player2,player1input,player2input):
        self.player1=player1
        self.player2=player2
        self.player1input=player1input
        self.player2input=player2input
    def winer(self):
            if self.player1input==self.player2input:
               print(f"No winner here, it was a draw")
            elif self.player1input=="r" and self.player2input=="s":
               print(f"{self.player1} is the winner")
            elif self.player1input=="p" and self.player2input=="r":
               print(f"{self.player1} is the winner")
            elif self.player1input=="s" and self.player2input=="p":
               print(f"{self.player1} is the winner")
            else:
                print(f"{self.player2} is the winner")
# name input        
firstplayername=input("please enter the first player's name >").title()
secondplayername=input("please enter the second player's name >").title()

#cycling the game
while True:
 print(f"{firstplayername} please enter your bet")
 firstplayerinput=betinput()
 print(f"{secondplayername} please enter your bet")
 secondplayerinput=betinput()
 new_game=game(firstplayername,secondplayername,firstplayerinput,secondplayerinput)
 new_game.winer()
 if input("Do you want to continu? y/n ").lower()=="n":
   break
print("Bye, have a nice day.")