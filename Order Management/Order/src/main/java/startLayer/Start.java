package startLayer;

import com.itextpdf.text.*;
import presentationLayer.ParseFile;

import java.io.FileNotFoundException;

/**
 * Clasa de start a proiectului
 */
public class Start {

    /**
     * Metoda main a functiei
     * @param args argumentele
     */

    public static void main(String[] args) {
        String input = args[0];
        ParseFile p = new ParseFile();
        try {
            p.readFile(input);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }
}
