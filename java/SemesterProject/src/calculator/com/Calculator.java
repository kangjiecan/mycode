package calculator.com;

import java.util.Scanner;

public class Calculator
{


    public static int calculating(String calculation)
    {
        String[] numbers = calculation.split("\\+|-|/|\\*|%");
        int[] oprands = new int[numbers.length];
        for (int i = 0; i < numbers.length; i++)
        {
            try{
                oprands[i] = Integer.parseInt(numbers[i]);
            }
            catch(NumberFormatException e)
            {
                System.out.println("error, please input again");
                return -1;
            }
        }

        for (int j = 0; j < calculation.length(); j++)
        {
            switch (calculation.charAt(j))
            {
                case '+':
                    return oprands[0] + oprands[1];
                case '-':
                    return oprands[0] - oprands[1];
                case '*':
                    return oprands[0] * oprands[1];
                case '/':
                    if (oprands[1] == 0)
                    {
                        System.out.println("Division by zero. Input again");
                        return -1 ;
                    }
                    else
                    {
                        return oprands[0] / oprands[1];
                    }
                case '%':
                    if (oprands[1] == 0)
                    {
                        System.out.println("Division by zero. Input again");
                        return -1;
                    }
                    else
                    {
                        return oprands[0] % oprands[1];
                    }
            }

        }
        System.out.println("missing operator");
        return -1;
    }

    public static void main(String[] args)
    {   Scanner scanner=new Scanner(System.in);
        System.out.println("The calculator should handle five different calculations: +, -, /, *, %");
        System.out.println("Input in the form of: operand operator operand");
        System.out.println("For example, \"Please enter your calculation:\" and the user enters \"10 + 20\"");
        System.out.println("Enter \"E\" for exit");
        System.out.print("Please input your calculation : ");
        String calculation="";
        while(true)
        {
            calculation=scanner.next();
            if(calculation.equalsIgnoreCase("E"))
            {
                break;
            }
            int result=calculating(calculation);
            System.out.println(calculation +"="+result);
        }
        scanner.close();


    }
}



