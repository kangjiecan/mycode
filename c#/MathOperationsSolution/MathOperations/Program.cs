using System;

public class MathOperations
{
    public int CalculateSquare(int number)
    {
        return number * number;
    }

    public void PrintSquare(int number)
    {
        int square = CalculateSquare(number);
        Console.WriteLine($"The square of {number} is {square}");
    }
}

// Example usage
public class Program
{
    public static void Main(string[] args)
    {
        var mathOps = new MathOperations();
        mathOps.PrintSquare(5);  // Prints: The square of 5 is 25
    }
}