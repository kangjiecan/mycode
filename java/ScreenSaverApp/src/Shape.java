import java.awt.*;
import java.util.Random;


public abstract class Shape {

    //region Basic properties
    protected int x, y, width, height;
    protected Color color;

    protected int[] velocity = new int[2];

    // Add properties for the bounding box
    protected int bx, by, bwidth, bheight;

    //endregion Basic properties

    //region Constructor
    public Shape(int x, int y, int width, int height, Color color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        //speed
        initializeVelocity();

    }
    //endregion Constructor

    public abstract void draw(Graphics g, DrawPanel drawPanel);


    public void move() {
        // Implementation
        // RESEARCH: COLLISION DETECTION
        // Algorithm for Move method for balls so they stay in the frame
        y += velocity[1];
        x += velocity[0];

        bx = x;
        by = y;
        bwidth = width;
        bheight = height;
    }

    public boolean collidesWith(Shape other) {

        //Checks for collision between this shape's bounding box and the other shape's bounding box
        return this.bx < other.bx + other.bwidth &&
                this.bx + this.bwidth > other.bx &&
                this.by < other.by + other.bheight &&
                this.by + this.bheight > other.by;
    }

    public void shapeCollide(Shape other) {
        // Check for collisions with the other shapes
        if (this != other && this.collidesWith(other)) {
            // Detects collision and updates the movement of the shape
            this.velocity[0] = -this.velocity[0];
            this.velocity[1] = -this.velocity[1];
            other.velocity[0] = -other.velocity[0];
            other.velocity[1] = -other.velocity[1];
        }
    }

    public void initializeVelocity() {
        Random random = new Random();
        velocity[0] = random.nextInt(-3, 3);
        velocity[1] = random.nextInt(-3, 3);
    }

    public void detectEdge(int panelWidth, int panelHeight) {
        if (x <= 0 || x + width >= panelWidth) velocity[0] *= -1;
        if (y <= 0 || y + height >= panelHeight) velocity[1] *= -1;

    }


} //end Shape
