class Solution:
    def maxProfit(self, prices: list[int]) -> int:
      minbuying=prices[0]
      maxprofit=0
      for i in range(len(prices)):
        if prices[i]<=minbuying:
           minbuying=prices[i]
        elif prices[i]-minbuying>maxprofit:
           maxprofit=prices[i]-minbuying   

       
      return(maxprofit)
        
test=Solution()
result=test.maxProfit([1,2])
print(result)