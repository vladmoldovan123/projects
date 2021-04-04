library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use ieee.std_logic_unsigned.all;

entity memorie is
port (Clk : in std_logic;
		address : in std_logic_vector(2 downto 0);
		reset : in std_logic;
        we : in std_logic;
		  cs : in std_logic;
        data_i : in std_logic_vector(7 downto 0);
        data_o : out std_logic_vector(7 downto 0)
     );
end memorie;

architecture arh_memorie of memorie is

type ram_t is array (7 downto 0) of std_logic_vector(7 downto 0);
signal ram : ram_t := ("00110111",   
"00110111",					
"00110111",					   
"00110111",
"00110111",					
"00110111",					   
"00000000",
"00110111");					   

begin

process(Clk)
begin
    if Clk = '1' and Clk'EVENT  then
		if (CS = '1') then
        if(we='1') then
            ram(conv_integer(address)) <= ram(conv_integer(address)) + data_i;
        else
        data_o <= ram(conv_integer(address));
    	end if;
		end if;
		if (reset = '1') then
			   ram <= ("00110111",   
						"00110111",					
						"00110111",					   
						"00110111",
						"00110111",					
						"00110111",					   
						"00000000",
						"00110111");
		end if;
	end if;
end process;
end arh_memorie;