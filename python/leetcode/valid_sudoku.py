""" 
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'."""

class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
       hashtable={} 
       stack1=[]
       k=0
       
       for i in range(len(board)):
        for j in range(len(board[i])):
         if board[i][j] in hashtable.values():
          return False
         elif board[i][j]!="." and board[i][j] not in hashtable.values():
           hashtable[k]=board[i][j]
           k+=1
        hashtable={}  
  
       for j in range(len(board[i])):
        for i in range(len(board)):
         if board[i][j] in hashtable.values():
          return False
         elif board[i][j]!="." and board[i][j] not in hashtable.values():
          hashtable[k]=board[i][j]
          k+=1
        hashtable={} 
        
       m=0
       l=3
       
       for k in range(0,3):
        for i in range(0,9):
          for j in range(m,l):
            #print(i,"!",j)
            if board[i][j] in stack1:
            # print(board[j][i],"*",j,i)
             return False
            if board[i][j]!="." and board[i][j] not in stack1:
             stack1.append(board[i][j])
             #print(stack1,"@")
          if (i+1)%3==0:
            #print(stack1)
            stack1=[]
        m +=3
        l +=3   
             
       return True    
          
        
s=[[".",".","4",".",".",".","6","3","."],
   [".",".",".",".",".",".",".",".","."],
   ["5",".",".",".",".",".",".","9","."],
   [".",".",".","5","6",".",".",".","."],
   ["4",".","3",".",".",".",".",".","1"],
   [".",".",".","7",".",".",".",".","."],
   [".",".",".","5",".",".",".",".","."],
   [".",".",".",".",".",".",".",".","."],
   [".",".",".",".",".",".",".",".","."]]
     
testcase=Solution()
result=testcase.isValidSudoku(s)
print(result)
       
       
          
          
        
        