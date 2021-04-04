package BusinessLayer;
import DataLayer.FileWritter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
/**
 * Clasa care contine metodele pentru implementarea operatiilor pentru waiter,administrator,chef
 */
public class Restaurant extends Observable implements IRestaurantProcessing  {
    /**
     * Lista de produse din meniul restaurantului.
     */
    private ArrayList<MenuItem> menu;
    /**
     * O lista care contine detalii despre comanda si produsele acesteia.
     */
    private HashMap<Order, Collection<MenuItem>> map;
    /**
     * Contor pentru numarul comenzii.
     */
    private static int nrOrder=0;
    /**
     * Constructorul clasei
     * @param menu Lista de produse.
     * @param map Lista care contine detalii despre comanda si produsele acesteia
     */
    public Restaurant(ArrayList<MenuItem> menu, HashMap<Order, Collection<MenuItem>> map) {
        this.menu=menu;
        this.map=map;
    }
    /**
     * Metoda pentru adaugarea unui item in meniul restaurantului.
     * @param item Item-ul adaugat.
     */
    public void addItem(MenuItem item) {
        if(menu==null)
        {
            ArrayList<MenuItem> items = new ArrayList<MenuItem>();
            items.add(item);
            setMenu(items);
        }
        else
            menu.add(item);
    }
    /**
     * Metoda care verica daca exista un produs are ca componenta un produs cu numele name.
     * @param menuItem Item-ul primit ca parametru.
     * @param name Numele produsului verificat
     * @return True daca exista , false daca nu exista.
     */
    public boolean hasIngredient(MenuItem menuItem, String name){
        for(MenuItem ingredient:menuItem.getItems()){
            if(ingredient.getName().equals(name))
                return true;
        }
        return false;
    }
    /**
     * Metoda care gaseste un item in meniul restaurantului dupa nume.
     * @param item Stringul cautat
     * @return Returneaza item-ul daca a fost gasit sau null in caz contrar.
     */
    public MenuItem findItem(String item)
    {
        for(MenuItem ingredient:menu){
            if(ingredient.getName().equals(item))
                return ingredient;
        }
        return null;
    }
    /**
     * Metoda care cauta un order in lista map dupa cheia hashcode.
     * @param hashCode Cheia cautata.
     * @return Returneaza order-ul cautat daca a fost gasit sau null.
     */
    public Order findOrder(int hashCode)
    {
        for (Map.Entry<Order,Collection<MenuItem>> a:map.entrySet()) {
            if(a.getKey().hashCode()==hashCode);
            {
                return a.getKey();
            }
        }
        return null;
    }
    /**
     * Metoda care sterge un item din meniul restaurantului.
     * @param name Numele item-ului sters.
     */
    public void deleteItem(String name){
        Iterator<MenuItem> i=menu.iterator();
        while(i.hasNext()){
            MenuItem item=i.next();
            if(item.getName().equals(name))
                i.remove();
            if(item instanceof CompositeProduct && hasIngredient(item,name))
                i.remove();
        }
    }
    /**
     * Metoda care modifica pretul unui item.
     * @param a Numele itemului.
     * @param c Noul pret al itemului.
     */
    public void modifyBaseProduct(String a,String c) {
        double p = Double.parseDouble(c);
        for (MenuItem m:menu) {
            if(a.equals(m.getName()))
            {
                MenuItem newItem = new BaseProduct(a,p);
                menu.set(menu.indexOf(m),newItem);
            }
        }
        for (MenuItem m:menu) {
            if(m instanceof CompositeProduct)
            {
                Iterator<MenuItem> itr =m.getItems().iterator();
                while(itr.hasNext()){
                    MenuItem i=itr.next();
                    if(i.getName().equals(a))
                        i.setPrice(p);
                }
                menu.set(menu.indexOf(m),m);
            }
        }
    }

    /**
     * Metoda care sterge un produs din compozitia unui alt produs.
     * @param m Item-ul din care se va sterge
     * @param a Numele produsului sters.
     */
    public void deleteIngredient(MenuItem m,String a)
    {
        for (MenuItem me:menu) {
            if(me.getName().equals(m.getName()))
            {
                Iterator<MenuItem> itr =me.getItems().iterator();
                while(itr.hasNext()){
                    MenuItem i=itr.next();
                    if(i.getName().equals(a))
                       itr.remove();
                }
                menu.set(menu.indexOf(me),me);
            }
        }
    }
    /**
     * Metoda care adauga un produs in lista componentelor a altui produs.
     * @param a Numele produsului de unde se va sterge componenta.
     * @param b Numele prodsului sters.
     */
    public void addIngredient(String a,String b)
    {
        MenuItem item = getItem(a);
        MenuItem item2 = getItem(b);
        for (MenuItem me:menu) {
            if (me.getName().equals(item.getName())) {
                ArrayList<MenuItem> m = me.getItems();
                m.add(item2);
                me.setItems(m);
                menu.set(menu.indexOf(me),me);
            }
        }
    }
    /**
     * Un getter pentru lista de order-uri din lista map.
     * @return O lista de order-uri.
     */
    public ArrayList<Order> getOrders()
    {
        ArrayList<Order> orders = new ArrayList<Order>();
        if(map==null)
            return null;
        for (Map.Entry<Order,Collection<MenuItem>> a:map.entrySet()) {
            orders.add(a.getKey());
        }
        if(orders==null)
            return null;
        return orders;
    }
    /**
     * Metoda care genereaza lista de produse comandate pentru un order.
     * @param hashCode Chei dupa care se identifica order-ul.
     * @return Lista de produse comandate.
     */
    public Collection<MenuItem> getItemsFromOrder(int hashCode)
    {
        Collection<MenuItem> items = new ArrayList<>();
        for (Map.Entry<Order,Collection<MenuItem>> a:map.entrySet()) {
            if(a.getKey().hashCode()==hashCode);
            {
                items = a.getValue();
            }
        }
        return items;
    }
    /**
     * Metoda care seteaza produsele comandate pentru un order.
     * @param hashCode Cheia dupa care se identifica order-ul.
     * @param items Noua lista de produse.
     */
    public void setItemsFromOrder(int hashCode,Collection<MenuItem> items)
    {
        for (Map.Entry<Order,Collection<MenuItem>> a:map.entrySet()) {
            if(a.getKey().hashCode()==hashCode);
            {
                a.setValue(items);
            }
        }
    }
    /**
     * Metoda care genereaza un nou order pentru o masa.
     * @param table Masa pentru care se va genera order-ul.
     * @param items Lista de produse comandate.
     * @return Se va returna noul order.
     */
    public Order createOrder(String table,ArrayList<MenuItem> items) {
        setChanged();
        int nrTable = Integer.parseInt(table);
        nrOrder++;
        StringBuffer stringBuffer = new StringBuffer();
        Date date = new Date();
        DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String testDateString = df2.format(date);
        Order order=new Order(nrOrder,date,nrTable);
        if(map==null)
        {
            HashMap<Order, Collection<MenuItem>> m = new HashMap<Order, Collection<MenuItem>>();
            m.put(order,items);
            setMap(m);
        }
        else
        {
            map.put(order,items);
        }
        ArrayList<Object> obj =new ArrayList<Object>();
        obj.add(order);
        obj.add(items);
        notifyObservers(obj);
        return order;
    }
    /**
     * Getter pentru meniul restaurantului.
     * @return Meniul restaurantului.
     */
    public ArrayList<MenuItem> getMenu() {
        return menu;
    }
    /**
     * Un setter pentru meniul restaurantului.
     * @param menu Noul meniu al restaurantului.
     */
    public void setMenu(ArrayList<MenuItem> menu) {
        this.menu = menu;
    }
    /**
     * Un getter pentru lista map .
     * @return Noua lista map.
     */
    public HashMap<Order, Collection<MenuItem>> getMap() {
        return map;
    }
    /**
     * Un setter pentru lista map.
     * @param map Noua lista map.
     */
    public void setMap(HashMap<Order, Collection<MenuItem>> map) {
        this.map = map;
    }
    /**
     * Metoda care returneaza un item din meniu dupa numele cautat.
     * @param s Numele cautat.
     * @return Returneaza item-ul daca exista sau null in caz contrar.
     */
    public MenuItem getItem(String s)
    {
        for (MenuItem m:menu) {
            if(s.equals(m.getName()))
                return m;
        }
        return null;
    }
    /**
     * Metoda pentru generarea notei de plata.
     * @param id Id-ul orderului.
     * @throws IOException Arunca exceptie de tipul IOException.
     */
    public void generateBill(String id) throws IOException {
        double price=0d;
        int hashcode = Integer.parseInt(id);
        Order order = findOrder(hashcode);
        String produse ="Produse: ";
        Collection<MenuItem> items = getItemsFromOrder(hashcode);
        for (MenuItem i:items) {
            price = price + i.computePrice();
            produse = produse + i.getName() + " - " + i.computePrice() + " lei,";
        }
        produse=produse.substring(0, produse.length() - 1);
        produse=produse+".";
        String comanda="";
        comanda =comanda+"Comanda numarul "+id+ " servita la masa "+order.getTable()+" este in valoare de "+price +" lei.";
        FileWritter f = new FileWritter(produse,comanda,id);
    }
    /**
     * Setter pentru numarl comenzii.
     * @param nrOrder Noul numar de comenzi.
     */
    public static void setNrOrder(int nrOrder) {
        Restaurant.nrOrder = nrOrder;
    }
}
