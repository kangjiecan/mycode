
//Generates a random weapon with a randomly assigned name, type, and damage value.

import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
public enum Weapon {
    Axe("Axe", 15),
    Sword("Sword", 9),
    Hammer("Hammer", 7),
    Staff("Staff", 12),
    Scythe("Scythe", 17),
    Dagger("Dagger", 7),
    Gauntlets("Gauntlets", 8),
    Spear("Spear", 10),
    Bow("Bow", 11),
    Crossbow("Crossbow", 13),
    Mace("Mace", 14),
    Flail("Flail", 16);

    private String name;
    private int damage;

    Weapon(String name, int damage) {
        this.name = name;
        this.damage = damage;
    }

    private static Weapon getRandomWeapon() {
        Random rand = new Random();
        Weapon[] weapon = values();
        int randIndex = rand.nextInt(weapon.length);
        return weapon[randIndex];
    }

    public static Weapon getWeapon() {
        return getRandomWeapon();
    }

    public String getName() {
        return name;
    }

    public int getDamage() {
        return damage;
    }
}




