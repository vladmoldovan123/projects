 library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_std.ALL;

entity sumator is
	port(A: in std_logic_vector (15 downto 0);
	B: in std_logic_vector (7 downto 0);
	total: out std_logic_vector (15 downto 0));
end sumator;

architecture arh_sumator of sumator is
begin
	process(A,B)
	begin
		total <= std_logic_vector(unsigned(A) + unsigned(B));
	end process;
end arh_sumator;