import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void calculating (String calculation)
    {
        String[] numbers = calculation.split("\\+|-|/|\\*|%");
        float[] operands = new float[numbers.length];

        for (int i = 0; i < numbers.length; i++)
        {
            operands[i] = Float.parseFloat(numbers[i]);
        }

        for (int j = 0; j < calculation.length(); j++)
        {
            switch (calculation.charAt(j))
            {
                case '+':
                    System.out.println(operands[0] + operands[1]);
                    break;
                case '-':
                    System.out.println(operands[0] - operands[1]);
                    break;
                case '*':
                    System.out.println(operands[0] * operands[1]);
                    break;
                case '/':
                    if (operands[1] == 0)
                    {
                        System.out.println("Division by zero is invalid. Please try again");
                        break;
                    }
                    else
                    {
                        System.out.println(operands[0] / operands[1]);
                        break;
                    }
                case '%':
                    if (operands[1] == 0)
                    {
                        System.out.println("Division by zero is invalid. Please try again");
                        break;
                    }
                    else
                    {
                        System.out.println(operands[0] % operands[1]);
                        break;
                    }
            }
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("The calculator should handle five different calculations: +, -, /, *, %");
        System.out.println("Input in the form of: operand operator operand");
        System.out.println("For example, \"Please enter your calculation:\" and the user enters \"10 + 20\"");
        System.out.println("Enter \"E/e\" for exit");

        while (true) {
            System.out.print("Please input your calculation : ");
            String calculation = "";
            calculation = scanner.next();
            if (calculation.equalsIgnoreCase("E")) {
                break;
            }
            String pattern = "^\\d*\\.?\\d+\\s*[-+*/%]\\s*\\d*\\.?\\d+$";
            Pattern inputPattern = Pattern.compile(pattern);
            Matcher matcher = inputPattern.matcher(calculation);
            if (!matcher.matches()) {
                System.out.println("invalid input, please try again");
                continue;
            }
            calculating(calculation);
        }
        scanner.close();
    }
}


