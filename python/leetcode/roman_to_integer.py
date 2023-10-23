class Solution:
    
    def romanToInt(self, s: str) -> int:
    
        mydict = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
        mylist = []

        for char in s:
            mylist.append(mydict[char])

        b = 0
        c = 0

        while b < len(mylist) - 1:
            if mylist[b] < mylist[b + 1]:
                c -= mylist[b]
            else:
                c += mylist[b]
            b += 1

        c += mylist[b]

        return c


    
    


 
     

    
     
     
     
   

    