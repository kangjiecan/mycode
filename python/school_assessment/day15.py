
# creat a class for using extenable dictionaries so the code can answer more questions if it needs.
class QA:
    def QA_Game(self,quest:str,dictionray:dict):
        
        answerout=""
        determination=""
        
        #dictionary matching
        while True:
         answer=input(quest).title()  
         answerout=dictionray.get(answer)
         if answer not in dictionray:
            print("sorry, out of my knownlege")
            exit
         print(answerout)

         #loop of answering
         while True:
           determination=input("would you like to continue? y/n: ").lower()
           if determination in ["y","n"]:
             break
           else:
              print("wrong answer, try again.")
         if determination=="n":
             break

question_answere={ "Cow":"A cow goes moo","Lesser Spotted lemur":"Ummm...the Lesser Spotter Lemur goes awooga."}
qagame=QA()
qagame.QA_Game("what animal do you want to hear?",question_answere)


