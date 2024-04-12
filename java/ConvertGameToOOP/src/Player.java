public class Player extends Character {
    private final String favouriteSaying;

    public Player(String name, int baseHealth, String favouriteSaying) {
        super(name, baseHealth);
        this.favouriteSaying = favouriteSaying;
    }

    public void BattleCry() {
        System.out.println(favouriteSaying);
    }

}