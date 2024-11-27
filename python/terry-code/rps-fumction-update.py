
def gameExit(counter,counterSet):
 if counter == counterSet or input("Do you want to exit the game: (yes or no)") == "yes":
    print("Thank you for playing the game")
    return False
 return True
def main():
   
    gameRound=int(input("Enter the number of rounds you want to play: ")  )
    player1_name = input("player 1 enter your name :")
    player2_name = input("player 2 enter your name :")
    print(f"hello {player1_name}")
    print(f"hello {player2_name}")

    gameLooping = True
    counter=0
    print(gameLooping,counter)
    while gameLooping:
      counter +=1   
      p1_choice = input(f"{player1_name} what is your choice? *type r for rock, p for paper, and s for scissor,* ")
      if p1_choice == "s":
        print(f"player {player2_name} its your turn")
       

      p2_choice = input(f" {player2_name} what is your choice? ")
      if p2_choice == "p":
          print(f" {player1_name} choose {p1_choice}")
      elif p2_choice == "s":
          print(f" {player1_name} choose {p1_choice}")
      elif p2_choice == "r":
          print(f" {player1_name} choose {p1_choice}")
      else:
          print("")
      if p2_choice == "s" and p1_choice == "r":
          print("you lose")
      elif p2_choice == "p" and p1_choice == "p":
          print("tie!")
      elif p2_choice == "r" and p1_choice == "p":
          print("you win!")
      elif p2_choice == "r" and p1_choice == "r":
          print("tie!")
      elif p2_choice == "r" and p1_choice == "s":
          print("you win!")

      elif p1_choice == "s" and p2_choice == "":
          print("you win!")
      elif p2_choice == "p" and p1_choice == "s":
          print("tie!")
      elif p2_choice == "s" and p1_choice == "s":
          print("tie!")
      elif p2_choice == "p" and p1_choice == "r":
          print("you win!")
    
    gameLooping=gameExit(counter,gameRound)  




if __name__ == "__main__":
    main()