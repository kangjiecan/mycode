import java.awt.*;

public class Polygon extends Shape {

    public Polygon(int x, int y, int width, int height, Color color) {
        super(x, y, width, height, color);
    }

    // Override draw method
    @Override
    public void draw(Graphics g, DrawPanel drawPanel) {
        g.setColor(color);
        int[] xPoints = {
                x + width / 4, // Top left
                x + width * 3 / 4, // Top right
                x + width, // Right
                x + width * 3 / 4, // Bottom right
                x + width / 4, // Bottom left
                x // Left
        };
        int[] yPoints = {
                y, // Top
                y, // Top
                y + height / 2, // Mid-top
                y + height, // Bottom
                y + height, // Bottom
                y + height / 2 // Mid-top
        };
        g.fillPolygon(xPoints, yPoints, 6); // 6 points for hexagon
    }
}
