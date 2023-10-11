#leetcode 28
#find the index of the first occurrence in a string

class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        
        k=0
        if len(haystack)<len(needle): #if needle longer than haystack, must be false
            return -1
        for i in range(len(haystack)): #slide windows
            k=i
            if needle[0]==haystack[i]:
                #print(haystack[i],"*",i)
                
                if len(needle)==1:
                    return i
                for j in range(1,len(needle)):
                    k+=1
                    #print(haystack[k],"!",needle[j])
                    
                    if needle[j]!=haystack[k]:
                        break  
                    if j==len(needle)-1:
                        return i
            if i>=len(haystack)-len(needle): 
             return -1    
            
haystackinput="mississippi"       
needleinput="p" 
test=Solution()
result=test.strStr(haystackinput,needleinput)
print(result)