public class HelloJava {
    public enum WeekDay {
        MON, TUE, THRU
        
    }

    public static void main(String[] args) {
        String testday="tue";
        
        int indicator=0;

        // Iterate over the enum constants
        for (WeekDay everyday : WeekDay.values()) {
            // Compare the enum constant's name with the testday string
            if (everyday.name().equals(testday)) {
                System.out.println(everyday);
                indicator=1;
                break;
                

            }

        }
        System.out.println(indicator==1 ? "": "you got nothing match");
    }
} 