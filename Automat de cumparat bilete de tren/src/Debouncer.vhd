library	 IEEE;
use IEEE.std_logic_1164.all; 
use IEEE.NUMERIC_std.all;

entity Debouncer is
	port(BUTin: in std_logic;
		 BUTout: out std_logic;
		 RST: in std_logic;
		 CLK: in std_logic);
end Debouncer;

architecture arh_debouncer of Debouncer is 
component divizor is 
	generic(N: NATURAL := 4);
	port(CLK: in std_logic;
	CE: in std_logic;
	RST: in std_logic;
	Q: out std_logic_vector(N-1 downto 0));
end component; 
signal delay1,delay2,delay3: std_logic;
signal Q: std_logic_vector(21 downto 0);
signal BUT1,BUT2: std_logic;
begin 
	L1: divizor generic map (N => 22) port map (CLK,'1',RST,Q);
	process(Q(21),RST,BUTin,BUT2)
	begin			
		if RST = '1' or BUTin = '0' or BUT2 = '1' then
			delay1 <= '0';
			delay2 <= '0';
			delay3 <= '0';
		
		elsif Q(21) = '1' and Q(21)'event then 
			delay1 <= BUTin;
			delay2 <= delay1;
			delay3 <= delay2;
		end if;
	end process;
	BUT1 <= delay1 and delay2 and delay3;
	process(CLK)
	begin 
		if RST = '0' then
			if CLK = '1' and CLK'event then
				BUT2 <= BUT1; 
			end if;
		else
			BUT2 <= '0';
		end if;
	end process;
	BUTout <= BUT2;
end arh_debouncer;
			

		 