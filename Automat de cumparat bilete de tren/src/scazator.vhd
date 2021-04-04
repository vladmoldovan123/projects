library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_std.ALL;

entity scazator is
	port(A: in std_logic_vector (7 downto 0);
	B: in std_logic_vector (7 downto 0);
	rest: out std_logic_vector (7 downto 0));
end scazator;

architecture arh_scazator of scazator is
begin
	process(A,B)
	begin
		rest <= std_logic_vector(unsigned(A) - unsigned(B));
	end process;
end arh_scazator;