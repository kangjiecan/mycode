
player1-name = input("enter your name pls: ")
print(f"welcome {player1-name} to the game") 
player2-name = input("enter your name pls: ")


palyer1-choice = input(f"player {player1-name} what is your choice?: ")
player2-Name = input(f"player {player} what is your choice?: ")



p2_choice = input(" player 2 what is your choice?")


if p2_choice == "paper":
    print(f" player {player} choose {p1_choice}")
elif p2_choice == "scissor":
    print(f" player {player} choose {p1_choice}")
elif p2_choice == "rock":
    print(f" player {player} choose {p1_choice}")
else:
    print("")
if p2_choice == "scissor" and p1_choice == "rock":
    print("you lose")
elif p2_choice == "paper" and p1_choice == "paper":
    print("tie!")
elif p2_choice == "rock" and p1_choice == "paper":
    print("you win!")
elif p2_choice == "rock" and p1_choice == "rock":
    print("tie!")
elif p2_choice == "rock" and p1_choice == "scissor":
    print("you win!")

elif p2_choice == "scissor" and p1_choice == "paper":
    print("you win!")
elif p2_choice == "paper" and p1_choice == "scissor":
    print("tie!")
elif p2_choice == "scissor" and p1_choice == "scissor":
    print("tie!")
elif p2_choice == "paper" and p1_choice == "rock":
    print("you win!")
