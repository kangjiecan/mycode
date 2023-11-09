class Solution:
    def countGoodSubstrings(self, s: str) -> int:
        if len(s) < 3:
            return 0  # Early return if it's impossible to have a good substring
        
        count = 0
        # Initialize the set with the first 3 characters if possible
        char_set = set(s[:3])
        
        # If the first 3 characters are unique, count it as a good substring
        if len(char_set) == 3:
            count += 1
        
        for i in range(3, len(s)):
            # Remove the leftmost character
            char_set.discard(s[i-3])
            # Add the new character
            char_set.add(s[i])
            # If there are 3 unique characters, it's a good substring
            if len(char_set) == 3:
                count += 1
            else:
                # This is necessary to ensure that the set size does not exceed 3
                char_set.discard(s[i])
        
        return count


s = "aababcabc"
run=Solution()              
result=run.countGoodSubstrings(s)
print(result)
