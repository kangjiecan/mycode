import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.Random;

public class DrawPanel extends JPanel {

//    public void update() {
//        for (Shape shape : shapes) {
//            shape.move();
//        }
//        repaint();
//    }

    //region variables
    // 1. Array list of shapes
    // 2. The timer
    // Initiate click counter
    protected ArrayList<Shape> shapes;
    protected Timer timer;
    private int clickCount = 0;
    //endregion variables

    //region draw the panel

    /*
    add a shape and call repaint(), the paintComponent
    method will be called and all shapes are be drawn
    on the panel
     */
    public DrawPanel() {
        shapes = new ArrayList<>();
        timer = new Timer(10, e -> {
            for (Shape shape : shapes) {
                shape.move();
                shape.detectEdge(getWidth(), getHeight());
            }

            // Check for collisions between all pairs of shapes
            for (int i = 0; i < shapes.size(); i++) {
                for (int j = i + 1; j < shapes.size(); j++) {
                    shapes.get(i).shapeCollide(shapes.get(j));
                }
            }
            // Repaints after each iteration
            repaint();
        });

        timer.start();

        addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {

                // Add a new shape at the clicked location
                // Each click will give a different shape

                // Generate random width and height for the rectangle
                Random rand = new Random();
                int maxWidth = 100;  // Maximum width
                int maxHeight = 100;  // Maximum height
                int width = rand.nextInt(maxWidth) + 1;  // Random width between 1 and maxWidth
                int height = rand.nextInt(maxHeight) + 1;  // Random height between 1 and maxHeight

                switch (clickCount % 4) {   // 4 shapes total (NOTE: ensure you change this is you want to add shapes)
                    case 0:
                        shapes.add(new Circle(e.getX(), e.getY(), 50, 50, Color.ORANGE));
                        break;
                    case 1:
                        // Use the random width and height for the rectangle
                        shapes.add(new Rectangle(e.getX(), e.getY(), width, height, Color.RED));
                        break;
                    case 2:
                        shapes.add(new Triangle(e.getX(), e.getY(), 50, 50, Color.PINK));
                        break;
                    case 3:
                        shapes.add(new Polygon(e.getX(), e.getY(), 50, 50, Color.BLUE));
                        break;
                }
                clickCount++;
            }
        });
    } //constructor
//endregion draw the panel

    //region paint component
    // Calls super and calls draw method
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (Shape shape : shapes) {
            shape.draw(g, this);

        }
    }
    //endregion paint component

}
