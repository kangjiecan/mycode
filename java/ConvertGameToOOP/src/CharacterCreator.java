import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class CharacterCreator {
    private int damage, health;
    private String name, weapon, namesFilePath, titlesFilePath;
    private String taunts[];
    private String favouriteSaying;

    public CharacterCreator() {
        titlesFilePath = "src/titles.txt";
        namesFilePath = "src/names.txt";

        System.out.println("If you like to enter new paths for names.txt, titles.txt, please enter '1', if not please enter '2'");


        Scanner scanner = new Scanner(System.in);
        int choice = scanner.nextInt();
        scanner.nextLine();
        if (choice == 1) {
            System.out.println("Please enter a path for names.txt:");
            namesFilePath = scanner.nextLine();
            System.out.println("Please enter a path for titles.txt:");
            titlesFilePath = scanner.nextLine();
            System.out.println("Please enter a path for weapons.txt:");
        }
    }

    private Enemy generateEnemy(String[] taunts) {

        this.taunts = taunts;
        Random healthRandom = new Random();
        health = 25 + healthRandom.nextInt(16);
        ArrayList<String> names = new ArrayList<>();
        ArrayList<String> titles = new ArrayList<>();

        try {
            BufferedReader reader = new BufferedReader(new FileReader(namesFilePath));
            String line;
            while ((line = reader.readLine()) != null) {
                names.add(line);
            }
            reader.close();

            BufferedReader reader1 = new BufferedReader(new FileReader(titlesFilePath));
            String line1;
            while ((line1 = reader1.readLine()) != null) {
                titles.add(line1);
            }
            reader1.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Random randomIndex = new Random();
        String randomName = names.get(randomIndex.nextInt(names.size()));
        String randomTitle = titles.get(randomIndex.nextInt(titles.size()));
        name = randomName + " " + randomTitle;

        Enemy enemy = new Enemy(name, health, taunts);
        return enemy;
    }

    private Player generatePLayer(String favouriteSaying) {

        this.favouriteSaying = favouriteSaying;
        Random healthRandom = new Random();
        health = 25 + healthRandom.nextInt(16);
        ArrayList<String> names = new ArrayList<>();
        ArrayList<String> titles = new ArrayList<>();

        try {
            BufferedReader reader = new BufferedReader(new FileReader(namesFilePath));
            String line;
            while ((line = reader.readLine()) != null) {
                names.add(line);
            }
            reader.close();

            BufferedReader reader1 = new BufferedReader(new FileReader(titlesFilePath));
            String line1;
            while ((line1 = reader1.readLine()) != null) {
                titles.add(line1);
            }
            reader1.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Random randomIndex = new Random();
        String randomName = names.get(randomIndex.nextInt(names.size()));
        String randomTitle = titles.get(randomIndex.nextInt(titles.size()));
        name = randomName + " " + randomTitle;

        return new Player(name, health, favouriteSaying);


    }

    public Enemy getNewEnemy() {
        String[] taunts = {
                "You can't defeat me!",
                "Prepare to meet your doom!",
                "I'll crush you like a bug!",
                "Your defeat is inevitable!",
                "You're no match for me!",
                "I will conquer all!",
                "You're just a weakling!",
                "You're going down!",
                "I'm unstoppable!",
                "You're outmatched and outclassed!",
                "I'll make you regret challenging me!"
        };

        return generateEnemy(taunts);
    }

    public Player getNewPlayer() {
        return generatePLayer("For Freedom");
    }
}
