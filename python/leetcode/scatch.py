class Solution:
    def countGoodSubstrings(self, s: str) -> int:
        hashmaping=[]
        left=0
        right=2
        count=0
        while right<=len(s)-1:
            for i in range(left,right+1):
                if s[i] in hashmaping:
                  break
                if s[i] not in hashmaping:
                    hashmaping.append(s[i])  
            if len(hashmaping)==3:
                count +=1
            hashmaping=[] 
            right+=1
            left +=1   
        return count




s = "xyzzaz"
run=Solution()              
result=run.countGoodSubstrings(s)
print(result)