
/**
 * The Character class is a foundational component of the game's character system,
 * serving as the base class for all character types within the game. It encapsulates
 * common attributes and functionalities that are shared across different kinds of characters,
 * such as health, name, and basic actions.
 * <p>
 * This class provides a common interface for character operations, such as receiving damage
 * or healing, which can be overridden by subclasses to implement character-specific behavior.
 * It is designed to be extended by more specific character classes, such as Player or Enemy,
 * allowing for polymorphic behavior across different types of characters.
 * </p>
 *
 * @author kangjie
 * @version 1.0
 */


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