
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
        self.player1_winning_count=0
        self.player2_winning_count=0
    def winer(self):
            
            if self.player1input==self.player2input:
               print(f"No winner here, it was a draw")
            elif self.player1input=="r" and self.player2input=="s":
               print(f"{self.player1} won")
               return "player1"
            elif self.player1input=="p" and self.player2input=="r":
               print(f"{self.player1} won")
               return "player1"
            elif self.player1input=="s" and self.player2input=="p":
               print(f"{self.player1} won")
               return "player1"
            else:
                print(f"{self.player2} won")
                self.player1_winning_count +=1
                return "player2"
# name input        
firstplayername=input("please enter the first player's name >").title()
secondplayername=input("please enter the second player's name >").title()

#cycling the game
player1_winning=0
player2_winning=0
while True:
 print(f"{firstplayername} please enter your bet")
 firstplayerinput=betinput()
 print(f"{secondplayername} please enter your bet")
 secondplayerinput=betinput()
 new_game=game(firstplayername,secondplayername,firstplayerinput,secondplayerinput)
 counting=new_game.winer()
 if counting=="player1" and player1_winning<2: #winning count
     player1_winning +=1
 elif counting=="player2" and player2_winning<2: #winning count
     player2_winning +=1 
 elif player1_winning==2:
     print(f"{firstplayername} is the final winner!")
     break
 elif player2_winning==2:
     print(f"{secondplayername}  is the final winer!")
     break

print("Bye, have a nice day.")