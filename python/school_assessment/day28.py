#use a class for differenct player's attibutes.
class Gamebattle:
  import random,os,time
  
  def __init__(self):
      self.name=""
      self.type=""
      self.strength=""
      self.health=""
      
  def role_creating(self):
      self.strength=(self.random.randint(1,6)*self.random.randint(1,12)/2)+10
      self.health=(self.random.randint(1,6)*self.random.randint(1,12)/2)+12  
      self.os.system('clear') 
      self.name=input("Name your legend ").title()
      print()
      self.type=input("Pick your character Type: Human, Elf, Wiard,Orc: ").title()
      print()
     
  def dice(self,i:int):
   return self.random.randint(1,i)   

#creat 2 instances     
player1=Gamebattle()
player1.role_creating()
player2=Gamebattle()
player2.role_creating()
player1.os.system('clear')
print("Who are in the batteling?\n")

print(player1.name,'\n',player1.type,'\n',player1.health,'\n',player1.strength,'\n')
print(player2.name,'\n',player2.type,'\n',player2.health,'\n',player2.strength,'\n')
player1.time.sleep(3)

count=0 # for battle rounds count

#2 instances battling by comparing dice reading.
while player1.health>=0 and player2.health>=0:
        dice_reading1=player1.dice(6)
        dice_reading2=player2.dice(6)
        strength_difference=abs(player1.strength-player2.strength)
        count +=1
        
        
        player1.os.system('clear')
        
        if count==1:  #the first round print 'begins' the next rounds print 'continues'
          print("BATTLE TIME \n The battle begins!")
          print()
        else:print("BATTLE TIME \n The battle continues!")  
        
        #dice reading comarisions, 3 conditions, > < and =.
        if dice_reading1>dice_reading2:
         player2.health=player2.health-strength_difference
         print(f"{player1.name} wins the round{count} \n {player2.name} takes a hit, with {strength_difference} damage")
         print()
         print(player1.name,'\n',player1.health)
         print(player2.name,'\n',player2.health)
          
        elif dice_reading2>dice_reading1:
         player1.health=player1.health-strength_difference
         print(f"{player2.name} wins the round{count} \n {player1.name} takes a hit, with {strength_difference} damage")
         print()
         print(player1.name,'\n',player1.health)
         print(player2.name,'\n',player2.health)
        
        elif dice_reading1==dice_reading2:
            print("It's a draw, keep going!") 
        
        player1.time.sleep(2)
        
if player1.health<0:
    print()
    print(player1.name, "has died! \n " ,player2.name,"destroyed",player1.name,"in",count,"rounds")        
else: print(f"\n {player2.name} has died! \n {player1.name} destroyed {player2.name} in {count} rounds")   
          
      
        
        
        
        




    


