public class Main {
    public static void main(String[] args) {

        CharacterCreator player=new CharacterCreator();
        Player newPlayer=player.getNewPlayer();
        Enemy newEnemy=player.getNewEnemy();
        Battle newBattle = new Battle(newPlayer,newEnemy);
        newBattle.twoOutOfThree();
    }
}