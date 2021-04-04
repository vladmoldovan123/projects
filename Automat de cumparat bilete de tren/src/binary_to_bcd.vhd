library	 IEEE;
use IEEE.std_logic_1164.all; 
use IEEE.NUMERIC_std.all;

entity Binary_BCD is
	port(DIN: in std_logic_vector(7 downto 0);
		Dout: out std_logic_vector(11 downto 0));
end Binary_BCD;

architecture Arch_Binary_BCD of Binary_BCD is 
begin
	process(DIN)
	variable Z:std_logic_vector(19 downto 0);  
	begin
	   for i in 0 to 17 loop
		   Z(i) := '0';
	   end loop;
	   Z(10 downto 3) := DIN;
	   for i in 0 to 4 loop
		   if Z(11 downto 8) > "0100" then 
			   Z(11 downto 8) := std_logic_vector(unsigned(Z(11 downto 8)) + "0011");
		   end if;
		   if Z(15 downto 12) > "0100" then 
			   Z(15 downto 12) := std_logic_vector(unsigned(Z(15 downto 12)) + "0011");
		   end if; 
		   Z(19 downto 1) := Z(18 downto 0);
	  end loop;
	 Dout <= Z(19 downto 8);
	end process;
end Arch_Binary_BCD;