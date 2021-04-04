library	 IEEE;
use IEEE.std_logic_1164.all; 
use IEEE.NUMERIC_std.all;

entity Convertor_Suma is
	port(E: in std_logic;
	reset: in std_logic;
	M1: in std_logic_vector(7 downto 0);
	M2: in std_logic_vector(7 downto 0);
	B5: in std_logic_vector(7 downto 0); 
	B10: in std_logic_vector(7 downto 0);
	B20: in std_logic_vector(7 downto 0);
	B50: in std_logic_vector(7 downto 0);  
	SUMA: out std_logic_vector(7 downto 0));			   
end Convertor_Suma;

architecture Arch_Convertor_Suma of Convertor_Suma is 
begin
	process(E,M1,M2,B5,B10,B20,B50)
	variable P0,P1,P2,P3,P4,P5,S: std_logic_vector(15 downto 0);
	begin 
		if E = '1' then
		P0 := std_logic_vector(unsigned(M1) * "00000001"); 
		P1 := std_logic_vector(unsigned(M2) * "00000010");
		P2 := std_logic_vector(unsigned(B5) * "00000101"); 
		P3 := std_logic_vector(unsigned(B10) * "00001010"); 
		P4 := std_logic_vector(unsigned(B20) * "00010100"); 
		P5 := std_logic_vector(unsigned(B50) * "00110010");
		S :=  std_logic_vector(unsigned(P0) + unsigned(P1) + unsigned(P2) + unsigned(P3) + unsigned(P4) + unsigned(P5));
		end if;
		if reset = '1' then
			P0 := "0000000000000000";
			P1 := "0000000000000000";
			P2 := "0000000000000000";
			P3 := "0000000000000000";
			P4 := "0000000000000000";
			P5 := "0000000000000000";
			S :=  std_logic_vector(unsigned(P0) + unsigned(P1) + unsigned(P2) + unsigned(P3) + unsigned(P4) + unsigned(P5));
		end if;
		SUMA <= S(7 downto 0); 
	end process;
end Arch_Convertor_Suma;