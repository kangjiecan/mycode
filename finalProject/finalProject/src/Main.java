/**
 * The Main class serves as the entry point for the game application.
 * It is responsible for initializing the game environment, including the creation
 * of player characters and the execution of battles between them.
 * <p>
 * This class demonstrates a basic setup where a fixed number of players are created
 * using a CharacterCreator and then engaged in a series of battles managed by a Battle instance.
 * </p>
 */

public class Main {
    public static void main(String[] args) {
        CharacterCreator creator = new CharacterCreator(args[0],args[1]);
        Player[] playerGroup = new Player[5];
        for (int i = 0; i < playerGroup.length; i++) {
            playerGroup[i] = creator.getNewPlayer();
        }
        Battle newBattle = new Battle();
        newBattle.playBracket(playerGroup);
    }
}
