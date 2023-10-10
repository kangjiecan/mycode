class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        minPrice, maxProfit = float("inf"), float("-inf")

        for price in prices:
            minPrice = min(minPrice, price)
            maxProfit = max(maxProfit, (price - minPrice))
        
        return maxProfit
test=Solution()
result=test.maxProfit([7,1,5,3,6,4])
print(result)