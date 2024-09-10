import java.security.KeyRep.Type;

public class Car {
    private enum Color {
        BLACK, RED, WHITE
    }

    private enum Type {
        SUV, CAR, TRUCK, MOTORCYCLE
    }

    private int year;
    private Color carColor;
    private Type carType;
    private String name;

    public Car(String carColor, String carType, int year) {
        this.carColor = Color.valueOf(carColor.toUpperCase());
        this.carType = Type.valueOf(carType.toUpperCase());
        this.year = year;
        
        
    }

    public void printing() {
        System.out.println(carColor + " " + carType + " " + year); // Print carColor and carType with a space between
    }

    public void printingClass() {
        System.out.println(getClass().getCanonicalName());

    }

}
