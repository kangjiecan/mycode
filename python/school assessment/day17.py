
""" rock paper scissor game , 3 wins will be the winner"""

import getpass
# # ensure valide input and capture the first letter of player's input as their bets.
def betinput():
    while True:
          output=getpass.getpass("rock/paper/scissors or R/P/S ").lower()
          output=output[0:1]
          if output=="r" or output=="p" or output=="s":
               return output
               
          else:
               print("Wronng entering, try again")
# game body               
class Game:
        def winner(self):
            player1_winning=0
            player2_winning=0
            firstplayerinput=""
            secondplayerinput=""
            firstplayername=input("please enter the first player's name >").title()
            secondplayername=input("please enter the second player's name >").title()
            
            while player2_winning<3 and player1_winning<3:
              print(f"{firstplayername} please enter your bet")
              firstplayerinput=betinput()
              print(f"{secondplayername} please enter your bet")
              secondplayerinput=betinput()
              
              #wins 3 times become the winner.
              if firstplayerinput==secondplayerinput:
               print(f"No winner here, it was a draw")
              elif firstplayerinput=="r" and secondplayerinput=="s":
               print(f"{firstplayername} won")
               player1_winning +=1
              elif firstplayerinput=="p" and secondplayerinput=="r":
               print(f"{firstplayername} won")
               player1_winning +=1
              elif firstplayerinput=="s" and secondplayerinput=="p":
               print(f"{firstplayername} won")
               player1_winning +=1
              else:
                print(f"{secondplayername} won")
                player2_winning +=1
                
                
            if player1_winning==3:
                print(firstplayername," is the final winter") 
            else:
                print(secondplayername,"is the final winer")       
game=Game()
game.winner()              
                
            
            
