


public class Main {
    public static void main(String[] args) {
        CharacterCreator newplayer = new CharacterCreator();
        Player[] playerGroup = new Player[5];
        for (int i = 0; i < playerGroup.length; i++) {
            playerGroup[i] = newplayer.getNewPlayer();
        }
        Battle newBattle = new Battle();
        newBattle.playBracket(playerGroup);
    }
}
