class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        needle_len=len(needle)
        k=0
        if len(haystack)<needle_len:
            return -1
        
        for i in range(len(haystack)):
            k=i
            if needle[0]==haystack[i]:
                #print(haystack[i],"*",i)
                
                if needle_len==1:
                    return i
                
                for j in range(1,needle_len):
                    
                    k+=1
                    #print(haystack[k],"!",needle[j])
                    
                    if needle[j]!=haystack[k]:
                        break  
                    if j==needle_len-1:
                        return i
            if i>=len(haystack)-needle_len: 
             return -1    
            
haystackinput="mississippi"       
needleinput="p" 
test=Solution()
result=test.strStr(haystackinput,needleinput)
print(result)