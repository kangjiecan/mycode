username = input("Your user_name please < ")
if username == "Alicy" or username == "May" or username == "Jack":
    counting = 4
    while counting > 1:
        password = input("password please <")
        if password == "passcode":
            print("Wellcome back", username)
            break
        else:
            counting -= 1
            print(f"Wrong password, last{counting-1}times entering{username}")
    else:
        print(f"You done {username}")
else:
    print("Bye", username, "You are not a registered user.")
