library IEEE;
use IEEE.STD_LOGIC_1164.all;
use IEEE.STD_LOGIC_UNSIGNED.all;

entity reg is
	port (data_in: in std_logic_vector (7 downto 0);
	reset: in std_logic;
	enable: in std_logic;
	clk: in std_logic;
	data_out: out std_logic_vector (7 downto 0));
end reg;

architecture arh_reg of reg is
begin
process (clk, reset)
begin
	if clk='1' and clk'event then
		if enable='1' then data_out <= data_in;
			end if;
		if reset='1' then
		 data_out<="00000000";
		end if;
	end if;	 
end process;
end arh_reg;   