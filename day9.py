
generation=["you are traditionalists.","you are baby boomers.","you are generation x. ","you are millenials.","you are generation Z.","i dont know"]
age=int(input("what's your birthyear "))
if 1925<=age<=1946:
    print(generation[0].capitalize())
elif 1947<=age<=1964:
    print(generation[1].capitalize())
elif 1965<=age<=1981:
    print(generation[2].capitalize())
elif 1982<=age<=1995:
    print(generation[3].capitalize())
elif 1996<=age<=2015:
    print(generation[4].capitalize())
else:
    print(generation[5].capitalize())


            

   






