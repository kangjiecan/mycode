"""
Museum Entry Fee Calculator
Children (age 0-12): Free
Students (age 13-17): $5
Adults (age 18-64): $10
Seniors (age 65 and above): $7
!! Of note, museum members receive a 20% discount on their entry fee.
"""

#receive a valid input.
def info_input():
    while True:
     try:
        return float(input())
     except ValueError:
        print ("wrong input, please try again")
# use a class for the futurn updates
class Ticket_caculator:
   def __init__ (self,Str1:str,Str2:str,Str3:str,Str4:str,Str5:str,Str6:str,Str7:str,children_rate:int,student_rate:int,adults_rate:int,senior_rate:int,discount:float):
      self.Str1=Str1
      self.Str2=Str2
      self.Str3=Str3
      self.Str4=Str4
      self.Str5=Str5
      self.Str6=Str6
      self.Str7=Str7
      self.children_rate=children_rate
      self.adults_rate=adults_rate
      self.senior_rate=senior_rate
      self.discount=discount
      self.student_rate=student_rate

   def caculation(self)-> str:
    # looping forvervifing group member counting and avoid total musum members > total group members.  
    while True:  
      print(self.Str1)
      total=info_input()
      print(self.Str2)
      children=info_input()
      print(self.Str5)
      childrenMember=info_input()
      print(self.Str7)
      students=info_input()
      print(self.Str5)
      studentMember=info_input()
      print(self.Str3)
      adults=info_input()
      print(self.Str5)
      adultsMember=info_input()
      print(self.Str4)
      seniors=info_input()
      print(self.Str5)
      seniorsMember=info_input()
    
      if (children+adults+seniors+students)==total and (studentMember+childrenMember+adultsMember+seniorsMember<=total):
         student_charge=students*self.student_rate-studentMember*self.student_rate*self.discount
         adults_charge=adults*self.adults_rate-adultsMember*self.discount*self.adults_rate
         seniors_charge=seniors*self.senior_rate-seniorsMember*self.discount*self.senior_rate
         ouput_total_fee=student_charge+adults_charge+seniors_charge
         return (f"{self.Str6} {ouput_total_fee}")
         
      else:
         print("goup memebers counting error, please input again")
      

welcome="Welcome to the Museum, how many people in your group today?"
children="Great, please let me know how many children in your group (0-12)"
discount_member="Perfect, how many are they members,if non, please enter 0"
adult="Awesome,how many adults in your group (18-64?)"
senior="Thank you for your patient, how many seniors in your group (avove 65 includ 65?)"
output="Thank you, the total tick fee is $"
student="Awesome, how many students are in the group"
children_price=0
student_price=5
adult_price=10
senior_price=7
member_discount=0.2

museumHalifax=Ticket_caculator(welcome,children,adult,senior,discount_member,output,student,children_price,student_price,adult_price,senior_price,member_discount)
result=museumHalifax.caculation()
print(result)      
       







