class grading:
    #fool proof
    def input1(self)->list[str,int,float]:
       test_data=[]

       name_of_test=input("Hi, what test did you take? >") 
       test_data.append(name_of_test)  
       while True:
         try:
            max_score=int(input("what is the max_score of the test? >"))  
            break
         except:
                print("sorry, I did not get it, would you say it again? ")
       test_data.append(max_score)         
       while True:
         try:
            your_score=float(input("What's your score? >"))
            break
         except:
                print("Sorry, I dont get it")
       test_data.append(your_score) 
       return test_data       

    # grade caculation             
    def your_grade(self,test_data:list):
      grade=["A+","A","B","C","D","U"]

      if (100*test_data[2]/test_data[1])>=90<=100:
         print(f"your {test_data[0]} grade is {grade[0]}")
      elif (100*test_data[2]/test_data[1])>=80<=89:
         print(f"your {test_data[0]} grade is {grade[1]}") 
      elif (100*test_data[2]/test_data[1])>=70<=79:
         print(f"your {test_data[0]} grade is {grade[2]}")
      elif (100*test_data[2]/test_data[1])>=60<=69:
         print(f"your {test_data[0]} grade is {grade[3]}") 
      elif (100*test_data[2]/test_data[1])>=50<=59:
         print(f"your {test_data[0]} grade is {grade[4]}")
      else:
         print(f"your {test_data[0]} grade is out of stand!")



test=grading()
test.your_grade(test.input1())
         







