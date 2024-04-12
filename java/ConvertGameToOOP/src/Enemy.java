import java.util.Random;

public class Enemy extends Character{
    private final String taunts[];public Enemy (String name, int baseHealth, String[] taunts) {
        super(name, baseHealth);
        this.taunts = taunts;
    }
    public void BattleCry() {
        Random random = new Random();
        int index = random.nextInt(taunts.length);
        System.out.println(taunts[index]);
    }


}