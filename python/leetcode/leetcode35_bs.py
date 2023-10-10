class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        left=0
        right=len(nums)-1
        while 