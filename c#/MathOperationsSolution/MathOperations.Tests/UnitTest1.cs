using Xunit;

public class MathOperationsTests
{
    [Fact]
    public void CalculateSquare_ShouldReturnCorrectSquare()
    {
        // Arrange
        var mathOps = new MathOperations();
        int input = 5;
        int expected = 25;

        // Act
        int result = mathOps.CalculateSquare(input);

        // Assert
        Assert.Equal(expected, result);
    }
}
