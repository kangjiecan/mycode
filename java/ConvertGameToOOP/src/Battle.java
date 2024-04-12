import java.util.Random;
import java.lang.String;

public class Battle {
    private final Character player;
    private final Character enemy;

    private int battleCount = 0;
    private String winner;
    private String temp1;
    private Weapon playerWeapon=Weapon.getWeapon();
    private Weapon enemyWeapon=Weapon.getWeapon();



    public Battle(Player player, Enemy enemy) {
        this.player = player;
        this.enemy = enemy;

    }
    private void introduceCharacters() {
        System.out.println(player.getName() + " Health is " + player.getHealth() + ", " + playerWeapon.getName() + " Weapon damage is " + playerWeapon.getDamage() );
        player.BattleCry();

        System.out.println(enemy.getName() + " Health is " + enemy.getHealth() + ", " + enemyWeapon.getName() + " Weapon damage is " + enemyWeapon.getDamage());
        enemy.BattleCry();

    }
    private void declareWinner() {
        System.out.println(winner + " is victorious after " + (battleCount + 1) + " battles");
        System.out.println();
        System.out.println("-------------- Battle End -----------");
    }

    private boolean isWinnerDeclared(String winner) {
        boolean winnerDeclared = false;
        if (battleCount == 0) {
            temp1 = winner;
            battleCount += 1;
        } else if (battleCount == 1) {
            if (temp1.equals(winner)) {
                winnerDeclared = true;
            } else {
                battleCount += 1;
            }
        } else if (battleCount == 2) {
            winnerDeclared = true;
        }
        return winnerDeclared;
    }
    private String runBattle(Character player, Character enemy) {
        String winnerName="";
        int i = 0;
        System.out.println();
        System.out.println();
        player.reset();
        enemy.reset();
        introduceCharacters();
        System.out.println();
        System.out.println("------- Let the battle begin! ------------");
        while (player.getHealth() > 0 && enemy.getHealth() > 0) {
            Random random = new Random();
            if (i % 2 == 0) {
                int playerAttack = random.nextInt(playerWeapon.getDamage() + 1);
                enemy.setHealth(enemy.getHealth() - playerAttack);
                System.out.println(player.getName() + " attacks " + enemy.getName() + " with their " + playerWeapon.getName() + " for " + playerAttack + " damage ");
                System.out.println(enemy.getName() + " HP =" + enemy.getHealth());

            } else {
                int enemyAttack = random.nextInt(enemyWeapon.getDamage() + 1);
                player.setHealth(player.getHealth() - enemyAttack);
                System.out.println(enemy.getName() + " attack " + player.getName() + " with their " + enemyWeapon.getName() + " for " + enemyAttack + " damage ");
                System.out.println(player.getName() + " HP = " + player.getHealth());
            }
            i++;
            if (player.getHealth() <= 0) {
                System.out.println(player.getName() + " is defeated.");
                System.out.println();
                winnerName = enemy.getName();
            }
            if
            (enemy.getHealth() <= 0) {
                System.out.println(Battle.this.enemy.getName() + " is defeated.");
                System.out.println();
                winnerName = player.getName();
            }
        }
        return winnerName;
    }
    public void twoOutOfThree() {

            do{winner = runBattle(player, enemy);}
            while(!isWinnerDeclared(winner));


        declareWinner();
    }
}



