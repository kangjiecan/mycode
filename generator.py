name=input("your name plaease")
birth_year=int(input("what's year were you bron"))

if 1925<birth_year<1946:
 print(F"{name}you are traditionalists {birth_year}")

if 1947<birth_year<1964:
 print(F"{name}you are baby boomers {birth_year}")

if 1965<birth_year<1981:
 print(F"{name}you are generation x {birth_year}")


if 1982<birth_year<1995:
 print(F"{name}you are millenials {birth_year}")

if 1996<birth_year<2015:
 print(F"{name}you are generation z {birth_year}")

if birth_year>2015 or birth_year<1925:
 print("out of range")