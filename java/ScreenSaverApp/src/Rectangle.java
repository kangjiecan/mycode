import java.awt.*;
import java.awt.geom.Rectangle2D;


public class Rectangle extends Shape {

    public Rectangle(int x, int y, int width, int height, Color color) {
        super(x, y, width, height, color);
    }

    //region draw
    @Override
    public void draw(Graphics g, DrawPanel drawPanel) {
        g.setColor(Color.pink);
        g.fillRect(x, y, width, height);
    }
    //endregion draw


}
