
public class Main {
    public static void printAllCar(Car anycar) {
        System.out.println(anycar.getClass().getName());

    }

    public static void main(String[] args) {
        RacingCar mycivic = new RacingCar("black", "car", 1008, "honda");
        printAllCar(mycivic);
        mycivic.printingRacingCar();

        MyF150 fx4 = new MyF150("red", "truck", 110);
        printAllCar(fx4);
        fx4.printing();

    }

}
