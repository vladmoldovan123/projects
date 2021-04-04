package businessLayer;

public class Validators {

    public Validators() {
    }

    public static boolean validateName(String name)
    {
        if(name.equals(""))
            return false;
        else
            return true;
    }

    public static boolean validateEmail(String email)
    {
        return email.matches("^[a-zA-Z0-9_+&*-]+(?:\\."+
            "[a-zA-Z0-9_+&*-]+)*@" +
            "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
            "A-Z]{2,7}$");
    }

    public static boolean validateUsername(String username)
    {
        if(username.equals(""))
            return false;
        else
            return true;
    }

    public static boolean validatePassowrd(String password)
    {
        if(password.equals(""))
            return false;
        else
            return true;
    }

    public static boolean validateIdentityCardNumber(String number)
    {
        if(number.length()!=6)
            return false;
        try{
            Integer.parseInt(number);
        }
        catch(NumberFormatException e){
            return false;
        }
        return true;
    }

    public static boolean validateAddress(String address)
    {
        if(address.equals(""))
        {
            return false;
        }
        else
            return true;
    }

    public static boolean validateCnp(String cnp)
    {
        if(cnp.length()!=13)
            return false;
        try{
            Long.parseLong(cnp);
        }
        catch(NumberFormatException e){
            return false;
        }
        return true;
    }

    public static boolean  validateType(String string)
    {
        if(string.equals(""))
        {
            return false;
        }
        else
            return true;
    }

    public static boolean validateIdentificationNumber(String identificationNumber)
    {
        if(identificationNumber.length()!=16)
            return false;
        try{
            Long.parseLong(identificationNumber);
        }
        catch(NumberFormatException e){
            return false;
        }
        return true;
    }

    public static boolean validateBalance(String balance)
    {
        try{
            Double.parseDouble(balance);
        }
        catch(NumberFormatException e){
            return false;
        }
        return true;
    }


}
