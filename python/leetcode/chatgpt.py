class findspace:
    def __init__(self, Str: str):
        self.counting = 0
        self.Str = Str

    def spacefinder(self):
        if self.counting == len(self.Str):
            return None  # Return None if no space is found

        if self.Str[self.counting] == " ":
            return self.counting
        else:
            self.counting += 1
            return self.spacefinder()

test = findspace("hello how are you")
result = test.spacefinder()
print(result)
