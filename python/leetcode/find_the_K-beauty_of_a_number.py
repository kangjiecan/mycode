


"""The k-beauty of an integer num is defined as the number of substrings of num when it is read as a string that meet the following conditions:

It has a length of k.
It is a divisor of num.
Given integers num and k, return the k-beauty of num.

Note:

Leading zeros are allowed.
0 is not a divisor of any value.
A substring is a contiguous sequence of characters in a string.
"""





class Solution:
    def divisorSubstrings(self, num: int, k: int) -> int:
        num_str=str(num)
        count=0
        
        for i in range(len(num_str)):
            num_str_window=num_str[i:i+k]
            #print(num_str_window)
            if int(num_str_window)!=0 and len(num_str_window)==k:
                if num%int(num_str_window)==0:
                    count +=1
        
        return count        
            
            
            
            
            
            
run=Solution()
result=run.divisorSubstrings(30003,3)            
print(result)            
        