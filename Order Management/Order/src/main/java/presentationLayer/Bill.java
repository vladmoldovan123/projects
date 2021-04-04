package presentationLayer;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import dataAccesLayer.ClientDAO;
import dataAccesLayer.OrderClientDAO;
import dataAccesLayer.OrderItemDAO;
import dataAccesLayer.ProductDAO;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.stream.Stream;

/**
 * Aceasta clasa genereaza pdf-urile.
 */

public class Bill {

    /**
     * contor pentru numarul de "Report client"
     */
    private static int nrd=0;
    /**
     * contor pentru numarul de "Report order"
     */
    private static int nrd2=0;
    /**
     * contor pentru numarul de "Report product"
     */
    private static int nrd3=0;
    /**
     * contor pentru numarul de facturi
     */
    private static int nrb=0;
    /**
     * contor pentru numarul de facturi finale
     */
    private static int nrbf=0;

    /**
     * Constructorul clasei.
     */
    public Bill()
    {
    }

    /**
     * Metoda pentru denumirea header-ului pentru tabelul din pdf-ul pentru "Report Client".
     * @param table Pdf-ul in care sa va introduce header-ul
     */
    private void addTableHeader(PdfPTable table) {
        Stream.of("ID", "Name", "City")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    /**
     * Metoda care va genera report-urile sub format pdf.
     * @param a Contine linia din fisier corespunzatoare unui report.
     * @throws FileNotFoundException Arunca exceptie de tipul FileNotFoundException.
     * @throws DocumentException Arunca exceptie de tipul DocumentException.
     */
    public void generateReport(String a) throws FileNotFoundException, DocumentException {
        Document document = new Document();
        if(a.contains("Report client")==true) {
            nrd++;
            String str = Integer.toString(nrd);
            String doc="Report client"+ str+".pdf";
            PdfWriter.getInstance(document, new FileOutputStream(doc));
            document.open();
            PdfPTable table = new PdfPTable(3);
            addTableHeader(table);
            ClientDAO.findAll(table);
            document.add(table);
        }
        if(a.contains("Report product")==true) {
            nrd3++;
            String str = Integer.toString(nrd3);
            String doc="Report product"+ str+".pdf";
            PdfWriter.getInstance(document, new FileOutputStream(doc));
            document.open();
            PdfPTable table = new PdfPTable(4);
            addTableHeader2(table);
            ProductDAO.findAll(table);
            document.add(table);
        }
        if(a.contains("Report order")==true) {
            nrd2++;
            String str = Integer.toString(nrd2);
            String doc="Report order"+ str+".pdf";
            PdfWriter.getInstance(document, new FileOutputStream(doc));
            document.open();
            PdfPTable table = new PdfPTable(5);
            addTableHeader3(table);
            OrderItemDAO.findAll(table);
            document.add(table);
        }
        document.close();
    }

    /**
     * Metoda pentru denumirea header-ului pentru tabelul din pdf-ul pentru "Report Product.
     * @param table Pdf-ul in care sa va introduce header-ul
     */
    private void addTableHeader2(PdfPTable table) {
        Stream.of("ID", "Name", "Quantity","Price")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    /**
     * Metoda pentru denumirea header-ului pentru tabelul din pdf-ul pentru "Report Order".
     * @param table Pdf-ul in care sa va introduce header-ul
     */
    private void addTableHeader3(PdfPTable table) {
        Stream.of("ID", "Name", "Product","Quantity","Price")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    /**
     * Metoda care va genera factura pentru fiecare order.
     * @param msg Mesajul care va fi afisat in pdf.
     * @throws FileNotFoundException Arunca exceptie de tipul FileNotFoundException.
     * @throws DocumentException Arunca exceptie de tipul DocumentException.
     */

    public void generateBill(String msg) throws FileNotFoundException, DocumentException {
        Document document = new Document();
        nrb++;
        String doc ="bill"+nrb+".pdf";
        PdfWriter.getInstance(document, new FileOutputStream(doc));
        String m=null;
        if(msg.contains("Cantitatea ceruta este prea mare")==false)
        {
            String[] b =msg.split(": ");
            String[] c =b[1].split(", ");
            m="Bill: "+ "client "+c[0]+",product "+ c[1]+",quantity "+c[2]+".";
        }
        else
        {
            m=msg;
        }
        document.open();
        Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
        Chunk chunk = new Chunk(m, font);

        document.add(chunk);
        document.close();
    }

    /**
     * Metoda care genereaza factura finala a unui client.
     * @throws FileNotFoundException Arunca exceptie de tipul FileNotFoundException.
     * @throws DocumentException Arunca exceptie de tipul DocumentException.
     */
    public void generateFinalBill() throws FileNotFoundException, DocumentException {

        ArrayList<String> list = OrderClientDAO.getFinalBil();
        for (String l:list) {
            Document document = new Document();
            nrbf++;
            String doc ="FinalBill"+nrbf+".pdf";
            PdfWriter.getInstance(document, new FileOutputStream(doc));
            document.open();
            Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
            Chunk chunk = new Chunk(l, font);
            document.add(chunk);
            document.close();
        }
    }
}
