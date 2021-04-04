package BusinessLayer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

/**
 *Interfata pentru clasa Restaurant.
 */
public interface IRestaurantProcessing {

    /**
     * Metoda pentru adaugarea unui item in meniul restaurantului.
     * @param item Item-ul adaugat.
     */
    public void addItem(MenuItem item);

    /**
     * Metoda care verica daca exista un produs are ca componenta un produs cu numele name.
     * @param menuItem Item-ul primit ca parametru.
     * @param name Numele produsului verificat
     * @return True daca exista , false daca nu exista.
     */
    public boolean hasIngredient(MenuItem menuItem, String name);

    /**
     * Metoda care gaseste un item in meniul restaurantului dupa nume.
     * @param item Stringul cautat
     * @return Returneaza item-ul daca a fost gasit sau null in caz contrar.
     */
    public MenuItem findItem(String item);

    /**
     * Metoda care cauta un order in lista map dupa cheia hashcode.
     * @param hashCode Cheia cautata.
     * @return Returneaza order-ul cautat daca a fost gasit sau null.
     */
    public Order findOrder(int hashCode);

    /**
     * Metoda care sterge un item din meniul restaurantului.
     * @param name Numele item-ului sters.
     */
    public void deleteItem(String name);

    /**
     * Metoda care modifica pretul unui item.
     * @param a Numele itemului.
     * @param c Noul pret al itemului.
     */
    public void modifyBaseProduct(String a,String c);

    /**
     * Metoda care sterge un produs din compozitia unui alt produs.
     * @param m Item-ul din care se va sterge
     * @param a Numele produsului sters.
     */
    public void deleteIngredient(MenuItem m,String a);

    /**
     * Metoda care adauga un produs in lista componentelor a altui produs.
     * @param a Numele produsului de unde se va sterge componenta.
     * @param b Numele prodsului sters.
     */
    public void addIngredient(String a,String b);

    /**
     * Un getter pentru lista de order-uri din lista map.
     * @return O lista de order-uri.
     */
    public ArrayList<Order> getOrders();

    /**
     * Metoda care genereaza lista de produse comandate pentru un order.
     * @param hashCode Chei dupa care se identifica order-ul.
     * @return Lista de produse comandate.
     */

    public Collection<MenuItem> getItemsFromOrder(int hashCode);

    /**
     * Metoda care seteaza produsele comandate pentru un order.
     * @param hashCode Cheia dupa care se identifica order-ul.
     * @param items Noua lista de produse.
     */

    public void setItemsFromOrder(int hashCode,Collection<MenuItem> items);

    /**
     * Metoda care genereaza un nou order pentru o masa.
     * @param table Masa pentru care se va genera order-ul.
     * @param items Lista de produse comandate.
     * @return Se va returna noul order.
     */
    public Order createOrder(String table,ArrayList<MenuItem> items);

    /**
     * Metoda pentru generarea notei de plata.
     * @param id Id-ul orderului.
     * @throws IOException Arunca exceptie de tipul IOException.
     */

    public void generateBill(String id) throws IOException;

    /**
     * Metoda care returneaza un item din meniu dupa numele cautat.
     * @param s Numele cautat.
     * @return Returneaza item-ul daca exista sau null in caz contrar.
     */
    public MenuItem getItem(String s);

    /**
     * Getter pentru meniul restaurantului.
     * @return Meniul restaurantului.
     */

    public ArrayList<MenuItem> getMenu();

    /**
     * Un setter pentru meniul restaurantului.
     * @param menu Noul meniu al restaurantului.
     */

    public void setMenu(ArrayList<MenuItem> menu);

    /**
     * Un setter pentru lista map.
     * @param map Noua lista map.
     */

    public void setMap(HashMap<Order, Collection<MenuItem>> map);


    /**
     * Un getter pentru lista map .
     * @return Noua lista map.
     */
    public HashMap<Order, Collection<MenuItem>> getMap();

}

