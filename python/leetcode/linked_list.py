class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Linkedlist:
    def __init__(self, head=None):
        self.head = head
    
    def insert(self, value):
        if self.head is None:
            self.head = Node(value)
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next= Node(value)  
            
    def printlist(self):
        a=[]
        current = self.head
        while current:  
            print(current.data) 
            a.append(current.data)
            
            current = current.next
        
        return a   

test = Linkedlist()
test.insert("a")
test.insert("aa")
test.insert("aaa")
result=test.printlist()
print(result)

test.insert("a;lsdkjf;asld")
result=test.printlist()
print(result)