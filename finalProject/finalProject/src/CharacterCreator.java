/**
 * The CharacterCreator class is responsible for creating and initializing instances of
 * Character objects. It acts as a factory that encapsulates the logic for character creation,
 * ensuring that all Character objects are properly constructed with valid initial states.
 * <p>
 * This class may provide various methods for creating different types of characters, such as
 * warriors, mages, or archers, each with their unique attributes and abilities.
 * </p>
 *
 * @author kangjie
 * @version 1.0
 */

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;

public class CharacterCreator {
    // Class fields, constructors, and methods follow here
    private final Random rand = new Random();

    private int damage, health;
    private String name, weapon, namesFilePath, titlesFilePath;



    public CharacterCreator(String namesFilePath, String titlesFilePath) {
        this.namesFilePath = namesFilePath;
        this.titlesFilePath = titlesFilePath;
    }

    private String generateName() {
        return randomSelectionFromFile(namesFilePath)
                + " " + randomSelectionFromFile(titlesFilePath);
    }


    private String randomSelectionFromFile(String fileName) {
        ArrayList<String> fileData = new ArrayList<>();
        try {
            File file = new File(fileName);
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                fileData.add(scanner.nextLine().strip());
            }

        } catch (FileNotFoundException e) {
            System.out.println("File not found");
            throw new IllegalStateException(e);
        }
        return fileData.get(rand.nextInt(0, fileData.size()));
    }
    private Player generatePlayer(){
        Player newPlayer = new Player(generateName(), rand.nextInt(24, 41), "for freedom");
        return newPlayer;
    }


    public Player getNewPlayer(){
        return generatePlayer();
    }
}
