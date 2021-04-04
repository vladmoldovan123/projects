package businessLogicLayer;

import com.itextpdf.text.DocumentException;
import dataAccesLayer.ClientDAO;
import dataAccesLayer.OrderClientDAO;
import dataAccesLayer.OrderItemDAO;
import dataAccesLayer.ProductDAO;
import modelLayer.Client;
import modelLayer.OrderClient;
import modelLayer.OrderItem;
import modelLayer.Product;
import presentationLayer.Bill;

import java.io.FileNotFoundException;

/**
 * Aceasta clasa contine comenzile care pot fi executate.
 */

public class Functions {
    /**
     * reprezinta id-ul clientului
     */
    private static int idp=0;
    /**
     * reprezinta id-ul produsului
     */
    private static int idpro=0;
    /**
     * reprezinta id-ul pentru OrderItem
     */
    private static int idOrderi=0;
    /**
     * reprezinta id-ul pentru OrderClient
     */
    private static int idOrder=0;
    private Bill bill;

    public Functions()
    {
        bill = new Bill();
    }

    /**
     * Metoda care introduce un client.
     * @param a Contine linia din fisier corespunzatoare inserarii unui client.
     */
    public void insertClient(String a)
    {
        String[] b =a.split(": ");
        String[] c =b[1].split(", ");
        idp++;
        Client client = new Client (idp,c[0],c[1]);
        ClientDAO.insert(client);
    }

    /**
     * Metoda care sterge un client si order-urile acestuia
     * @param a Contine linia din fisier corespunzatoare stergerii unui client.
     */
    public void deleteClient(String a)
    {
        String[] b =a.split(": ");
        String[] c =b[1].split(", ");

        int x = ClientDAO.findByName(c[0]);
        if(x!=0)
        {
            if(OrderClientDAO.findById(x)==true)
            {
                OrderItemDAO.delete(x);
                OrderClientDAO.delete(x);
            }
            ClientDAO.delete(c[0]);
        }
    }

    /**
     * Metoda care introduce un produs.
     * @param a Contine linia din fisier corespunzatoare inserarii unui produs.
     */
    public void insertProduct(String a)
    {
        String[] b =a.split(": ");
        String[] c =b[1].split(", ");
        int quantity=Integer.parseInt(c[1]);
        float price=Float.parseFloat(c[2]);
        idpro++;
        Product p = new Product(idpro,c[0],quantity,price);
        if(ProductDAO.findByName(p.getName())!=0)
            ProductDAO.updateQuantity(p.getName(),p.getQuantity());
        else
            ProductDAO.insert(p);
    }

    /**
     * Metoda care sterge un produs.
     * @param a Contine linia din fisier corespunzatoare stergerii unui produs.
     */
    public void deleteProduct(String a)
    {
        String[] b =a.split(": ");
        String[] c =b[1].split(", ");
        ProductDAO.delete(c[0]);
    }

    /**
     * Metoda care va genera reporturile pentru client,product si order.
     * @param a Contine linia din fisier corespunzatoare generarii unui report.
     * @throws FileNotFoundException Arunca exceptie de tipul FileNotFoundException.
     * @throws DocumentException Arunca exceptie de tipul DocumentException.
     */

    public void generateOrder(String a) throws FileNotFoundException, DocumentException {
        String mesaj=a;
        String[] b =a.split(": ");
        String[] c =b[1].split(", ");
        int id1 = ClientDAO.findByName(c[0]);
        int id2 = ProductDAO.findByName(c[1]);
        int quantity=Integer.parseInt(c[2]);
        if(ProductDAO.findQuantity(id2)<quantity)
        {
            mesaj="Cantitatea ceruta este prea mare";
            System.out.println(ProductDAO.findQuantity(id2));
            System.out.println(quantity);
            bill.generateBill(mesaj);
            return;
        }
        bill.generateBill(mesaj);
        idOrderi++;
        OrderItem i =new OrderItem(idOrderi,id1,id2,quantity);
        OrderItemDAO.insert(i);
        float price= ProductDAO.findById(id2);
        if(OrderClientDAO.findById(id1)==true)
        {
            float price2 = quantity*price;
            System.out.println("test");
            OrderClientDAO.updatePrice(id1,price2);
        }
        else
        {
            idOrder++;
            System.out.println("Price: "+price);
            float price2 = quantity*price;
            OrderClient o = new OrderClient(idOrder,id1,price2);
            System.out.println(o);
            OrderClientDAO.insert(o);
        }
        ProductDAO.updateQuantity(c[1],-quantity);
    }
}
