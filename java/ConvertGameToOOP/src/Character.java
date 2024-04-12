import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

public class Character {
    private String name;
    private int health, baseHealth;

    public Character(String name, int baseHealth) {
        this.name = name;
        this.health = baseHealth;
        this.baseHealth = baseHealth;
    }

    public void reset() {
        health = baseHealth;

    }

    public String getName() {
        return name;
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int setHealth) {
        this.health = setHealth;
    }

    public void BattleCry() {
        System.out.println("for Freedom!");
    }


}