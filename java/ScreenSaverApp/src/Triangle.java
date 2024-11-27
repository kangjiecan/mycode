import java.awt.*;
import java.awt.geom.Ellipse2D;


public class Triangle extends Shape {

    public Triangle(int x, int y, int width, int height, Color color) {
        super(x, y, 50, 50, Color.GREEN);
    }

    //region draw
    @Override
    public void draw(Graphics g, DrawPanel drawPanel) {
        g.setColor(Color.ORANGE);
        int[] xPoints = {x, x + width / 2, x + width};
        int[] yPoints = {y + height, y, y + height};
        g.fillPolygon(xPoints, yPoints, 3);
    }
    //endregion draw

}