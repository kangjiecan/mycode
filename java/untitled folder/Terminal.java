import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Terminal {
    public static void main(String[] args) {

        // Creating Stream from Datasource: Array
      List<String> list=new ArrayList<>();

        Path path = Paths.get("test.txt");

        try {
            Files.lines(path).forEach(line ->list.add(line));
            

            }

        catch (IOException exception) {
            System.out.println(exception);
        }

        for(String s:list){
            System.out.println(s);
        }
        
    }
}