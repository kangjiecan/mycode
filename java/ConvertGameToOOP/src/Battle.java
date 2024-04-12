import java.util.ArrayList;
import java.util.Random;
import java.lang.String;

public class Battle {

    private String temp1;
    private Weapon player1Weapon = Weapon.getWeapon();
    private Weapon player2Weapon = Weapon.getWeapon();


    private void introduceCharacters(Player player1, Player player2) {
        System.out.println(player2.getName() + " Health is " + player2.getHealth() + ", " + player2Weapon.getName() + " Weapon damage is " + player2Weapon.getDamage());
        player2.BattleCry();

        System.out.println(player1.getName() + " Health is " + player1.getHealth() + ", " + player1Weapon.getName() + " Weapon damage is " + player1Weapon.getDamage());
        player1.BattleCry();

    }

    private void declareWinner(Player player) {
        System.out.println(player.getName() + " is victorious");
        System.out.println();
        System.out.println("-------------- Battle End -----------");
    }


    private Player runBattle(Player player1, Player player2) {
        int i = 0;
        System.out.println();
        System.out.println();
        player1.reset();
        player2.reset();

        introduceCharacters(player1, player2);
        System.out.println();
        System.out.println("------- Let the battle begin! ------------");
        while (player1.getHealth() > 0 && player2.getHealth() > 0) {
            Random random = new Random();
            if (i % 2 == 0) {
                int player1Attack = random.nextInt(player1Weapon.getDamage() + 1);
                player2.setHealth(player2.getHealth() - player1Attack);
                System.out.println(player1.getName() + " attacks " + player2.getName() + " with their " + player1Weapon.getName() + " for " + player1Attack + " damage ");
                System.out.println(player2.getName() + " HP =" + player2.getHealth());

            } else {
                int player2Attack = random.nextInt(player2Weapon.getDamage() + 1);
                player1.setHealth(player1.getHealth() - player2Attack);
                System.out.println(player2.getName() + " attack " + player1.getName() + " with their " + player2Weapon.getName() + " for " + player2Attack + " damage ");
                System.out.println(player1.getName() + " HP = " + player1.getHealth());
            }
            i++;
            if (player1.getHealth() <= 0) {
                System.out.println(player1.getName() + " is defeated.");
                System.out.println();
                return player2;
            }
            if
            (player2.getHealth() <= 0) {
                System.out.println(player2.getName() + " is defeated.");
                System.out.println();
                return player1;
            }
        }
        return null;
    }

    private Player playMatch(Player player1, Player player2) {
        Player winner;
        winner = runBattle(player1, player2);
        winner.addWin();
        declareWinner(winner);
        return winner;
    }


    public void playBracket(Player[] playerGroup) {
        ArrayList<Player> winningGroup = new ArrayList<>();
        Player temp;
        for (int i = 0; i < playerGroup.length - 1; i++) {
            for (int j = i + 1; j < playerGroup.length; j++) {
                playMatch(playerGroup[i], playerGroup[j]);
            }
        }

        for (int i = 0; i < playerGroup.length - 1; i++) {
            if (playerGroup[i].getWin() > playerGroup[i + 1].getWin()) {
                temp = playerGroup[i + 1];
                playerGroup[i + 1] = playerGroup[i];
                playerGroup[i] = temp;
            }
        }

        for (int i = playerGroup.length - 1; i > 0; i--) {
            if (playerGroup[i].getWin() == playerGroup[playerGroup.length - 1].getWin()) {
                winningGroup.add(playerGroup[i]);
            }
        }

        for (Player winner : winningGroup) {
            System.out.println(winner.getName() + " with wins: " + winner.getWin());
        }


    }


}



