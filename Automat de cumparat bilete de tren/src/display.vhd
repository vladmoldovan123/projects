library	 IEEE;
use IEEE.std_logic_1164.all; 
use IEEE.NUMERIC_std.all;

entity Display is
	port(DIN: in std_logic_vector(7 downto 0);
	CLK: in std_logic;
	ENABLE: in std_logic;
	LED_out: out std_logic_vector(6 downto 0);
	an: out std_logic_vector(3 downto 0)
	);
end Display;

architecture arh_display of Display is
component Binary_BCD is
	port(DIN: in std_logic_vector(7 downto 0);
		Dout: out std_logic_vector(11 downto 0));
end component;

component divizor is 
	generic(N: NATURAL := 4);
	port(CLK: in std_logic;
	CE: in std_logic;
	RST: in std_logic;
	Q: out std_logic_vector(N-1 downto 0));
end component;

signal Numar: std_logic_vector(11 downto 0);
signal Countout: std_logic_vector(20 downto 0);
signal SEL: std_logic_vector(1 downto 0); 
signal RST: std_logic := not ENABLE;
signal Digit: std_logic_vector(3 downto 0);
begin 		
	C1: Binary_BCD port map(DIN,Numar);
	C2: divizor generic map(N => 21) port map(CLK,'1',RST,Countout); 
	SEL <= Countout(20 downto 19);
	process(SEL,ENABLE)
	begin
		if ENABLE = '1' then 
			case SEL is
				when "00" => Digit <= Numar(3 downto 0); an <= "1110";
				when "01" => Digit <= Numar(7 downto 4); an <= "1101";			  
				when "10" => Digit <= Numar(11 downto 8); an <= "1011";
				when others => an <= "1111";
			end case;
		else
			an <= "1111";
		end if;
	end process; 
	process(Digit)
	begin
		case Digit is
		    when "0000" => LED_out <= "0000001"; -- "0"     
		    when "0001" => LED_out <= "1001111"; -- "1" 
		    when "0010" => LED_out <= "0010010"; -- "2" 
		    when "0011" => LED_out <= "0000110"; -- "3" 
		    when "0100" => LED_out <= "1001100"; -- "4" 
		    when "0101" => LED_out <= "0100100"; -- "5" 
		    when "0110" => LED_out <= "0100000"; -- "6" 
		    when "0111" => LED_out <= "0001111"; -- "7" 
		    when "1000" => LED_out <= "0000000"; -- "8"     
		    when "1001" => LED_out <= "0000100"; -- "9" 
		    when others => LED_out <= "1111111";
		end case; 
	end process;
end arh_display;