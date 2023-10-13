class Node:
    def __init__(self, note):
        self.note = note
        self.next = None

class OneLinkNoteList:
    def __init__(self):
        self.head = None
    
    def append(self, note):
        if not self.head:
            self.head = Node(note)
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = Node(note)
    
    def display(self):
        notes = []
        current = self.head
        while current:
            notes.append(current.note)
            current = current.next
        return " -> ".join(notes)

# Example Usage
notes = OneLinkNoteList()
notes.append("Note 1")
notes.append("Note 2")
notes.append("Note 3")

print(notes.display())  # Output: Note 1 -> Note 2 -> Note 3
