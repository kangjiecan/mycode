public class RacingCar extends Car {

    private String brand;

    public RacingCar(String color, String type, int year, String brand) {
        super(color, type, year);
        this.brand = brand;

    }

    public void printingRacingCar() {
        System.out.println(brand);
    };





}
