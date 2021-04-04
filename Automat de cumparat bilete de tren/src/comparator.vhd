library IEEE;
use IEEE.STD_LOGIC_1164.all;
use IEEE.STD_LOGIC_UNSIGNED.all;

entity comparator is
	port(a: in std_logic_vector(7 downto 0);
	b: in std_logic_vector(7 downto 0);
	c:out std_logic_vector(1 downto 0));
end comparator;

architecture arh_comp of comparator is
begin
	process(a,b)
	begin													
	if (a>b) then c<="01"; 
		elsif(a<b) then c<="10";
	elsif (a=b) then c<="11"; 
	end if;
	end process;
end arh_comp;