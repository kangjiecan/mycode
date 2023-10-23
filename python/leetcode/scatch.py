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
        current = self.head
        while current:  
            print(current.data)  
            current = current.next
        
           

test = Linkedlist()
test.insert("a")
test.insert("aa")
test.insert("aaa")
test.printlist()

