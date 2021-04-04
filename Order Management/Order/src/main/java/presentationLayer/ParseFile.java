package presentationLayer;

import businessLogicLayer.Functions;
import com.itextpdf.text.DocumentException;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * Clasa pentru parsarea fisierului.
 */
public class ParseFile {
    /**
     * obiect pentru efectuarea operatilor aferente fisierului
     */
    private Functions parse;
    /**
     * obiect pentru generarea facturii si reporturilor
     */
    private Bill bill;

    /**
     * Constructorul clasei.
     */
    public ParseFile()
    {
        parse = new Functions();
        bill = new Bill();

    }

    /**
     * Metoda pentru citirea si parsarea fisierului.
     * @throws FileNotFoundException Arunca exceptie de tipul FileNotFoundException
     * @throws DocumentException Arunca exceptie de tipul DocumentException
     */

    public void readFile(String input) throws FileNotFoundException, DocumentException {
        File f = new File(input);
        Scanner sc=new Scanner(f);
        while(sc.hasNextLine())
        {
            String a = sc.nextLine();
            System.out.println(a);
            if(a.contains("Insert client")==true)
                parse.insertClient(a);
            if(a.contains("Delete client")==true)
                parse.deleteClient(a);
            if(a.contains("Insert product")==true)
                parse.insertProduct(a);
            if(a.contains("Delete Product")==true)
                parse.deleteProduct(a);
            if(a.contains("Order")==true)
                parse.generateOrder(a);
            if(a.contains("Report")==true)
                bill.generateReport(a);
        }
        bill.generateFinalBill();
    }
}
