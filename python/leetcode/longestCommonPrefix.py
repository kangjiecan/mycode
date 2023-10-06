class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
     i=0
     p=""
     k=len(strs)
     index=0
     strs=sorted(strs,key=len)
     print(strs)
     if len(strs)==1:
        return strs[0]
     if not strs:
            return ""
     for index in range(len(strs[i])): 
        char=strs[0][index]  
        for i in strs:        
         if strs[index]!=char or index==len(strs[i])-1:
            return p
         elif strs[index]==char and i+1==k-1:
            p +=char
     return p
tryout=["flower","flow","flight"]
tryout1=Solution()
result=tryout1.longestCommonPrefix(tryout)
print(result)  