library	 IEEE;
use IEEE.std_logic_1164.all; 
use IEEE.NUMERIC_std.all;

entity divizor is 
	generic(N: NATURAL := 4);
	port(CLK: in std_logic;
	CE: in std_logic;
	RST: in std_logic;
	Q: out std_logic_vector(N-1 downto 0));
end divizor;

architecture arh_divizor of divizor is 
begin 
	process(CLK,RST,CE)
	variable count: std_logic_vector(N-1 downto 0) := (others => '1');
	begin 
		if CLK='1' and CLK'EVENT then 
			if RST='1' then
				count := (others => '0');
			elsif CE = '1' then 
				count := std_logic_vector(unsigned(count)+"1");
			end if;	 
		end if;
		
		Q <= count;
	end process;
end arh_divizor;