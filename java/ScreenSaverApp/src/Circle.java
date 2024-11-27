import javax.swing.*;
import java.awt.*;
import java.util.Random;


public class Circle extends Shape {

    // Timer for controlling color change frequency
    private Timer colorChangeTimer;
    private Color currentColor;

    public Circle(int x, int y, int width, int height, Color color) {
        super(x, y, 50, 50, Color.BLUE);
        // Initialize the current color
        currentColor = color;
        // Create a timer that changes color every 0.5 seconds (500 milliseconds)
        colorChangeTimer = new Timer(500, e -> changeColor());
        colorChangeTimer.start();
    }

    // Method to change the color randomly
    private void changeColor() {
        Random random = new Random();
        // Generate a new random color
        currentColor = new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
    }

    @Override
    public void draw(Graphics g, DrawPanel drawPanel) {
        // Use the current color for the gradient
        g.setColor(currentColor);
        g.fillOval(x, y, width, height);
    }

}

