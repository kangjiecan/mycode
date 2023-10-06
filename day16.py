N=0
while True:
    if input(f"Never going to ___ you up.")=="put":
        print("Never going to put you up")
        N +=1
        while True:
          if input(f"Never going to ___ you up.")=="let":
            N +=1
            print("Never going to let you up")
            while True:
               if input("Never going to__you.")=="give":
                 N +=1
                 print("Never going tto give you up")
                 print(f"Well done, you only took you {N} attemts")
                 break
               else:
                 print(F"Nope,try again")
            break
          else:
             print(f"Nope,try again")
        break
    else:
         print(f"Nope,try again ")
