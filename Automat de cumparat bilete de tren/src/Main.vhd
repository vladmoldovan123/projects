library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use ieee.std_logic_unsigned.all;

entity automat is
	port(clk: in std_logic;
	distanta: in std_logic_vector (7 downto 0);
	cond: in std_logic_vector(1 downto 0); 
	we,E,Eregistru,reset: in std_logic;
	address: in std_logic_vector (2 downto 0);
	a_to_g: out std_logic_vector (6 downto 0);
	an: out std_logic_vector (3 downto 0);
	led_err1 : out std_logic;
	led_err2 : out std_logic;
	led_err3 : out std_logic;
	led_bilet : out std_logic;
	led_rest : out std_logic);
end automat;

architecture arh_automat of automat is

component reg is
	port (data_in: in std_logic_vector (7 downto 0);
	reset: in std_logic;
	enable: in std_logic;
	clk: in std_logic;
	data_out: out std_logic_vector (7 downto 0));
end component;

component comparator is
	port(a: in std_logic_vector(7 downto 0);
	b: in std_logic_vector(7 downto 0);
	c:out std_logic_vector(1 downto 0));
end component;

component scazator is
	port(A: in std_logic_vector(7 downto 0);
		B: in std_logic_vector(7 downto 0);
		rest : out std_logic_vector(7 downto 0));
end component;

component sumator is
	port(A: in std_logic_vector (15 downto 0);
	B: in std_logic_vector (7 downto 0);
	total: out std_logic_vector (15 downto 0));
end component;

component memorie is
port (Clk : in std_logic;
		address : in std_logic_vector(2 downto 0);
		reset : in std_logic;
        we : in std_logic;
		  cs : in std_logic;
        data_i : in std_logic_vector(7 downto 0);
        data_o : out std_logic_vector(7 downto 0)
     );
end component;

component Convertor_Suma is
	port(E: in std_logic;
	reset :	in std_logic;
	M1: in std_logic_vector(7 downto 0);
	M2: in std_logic_vector(7 downto 0);
	B5: in std_logic_vector(7 downto 0); 
	B10: in std_logic_vector(7 downto 0);
	B20: in std_logic_vector(7 downto 0);
	B50: in std_logic_vector(7 downto 0);  
	SUMA: out std_logic_vector(7 downto 0));			   
end component;

component Display is
	port(DIN: in std_logic_vector(7 downto 0);
	CLK: in std_logic;
	ENABLE: in std_logic;
	LED_out: out std_logic_vector(6 downto 0);
	an: out std_logic_vector(3 downto 0));
end component;

component Debouncer is
	port(BUTin: in std_logic;
		 BUTout: out std_logic;
		 RST: in std_logic;
		 CLK: in std_logic);
end component;

signal afisare: std_logic_vector(7 downto 0);

signal data_o: std_logic_vector (7 downto 0);
signal ok: std_logic_vector (1 downto 0);
signal ram : std_logic_vector (7 downto 0);
signal cost: std_logic_vector (7 downto 0);
signal rest: std_logic_vector (7 downto 0);

signal M1: std_logic_vector(7 downto 0) := "00000000";
signal M2: std_logic_vector(7 downto 0) := "00000000";
signal B5: std_logic_vector(7 downto 0) := "00000000";
signal B10: std_logic_vector(7 downto 0) := "00000000";
signal B20: std_logic_vector(7 downto 0) := "00000000"; 
signal B50: std_logic_vector(7 downto 0) := "00000000";
signal SUMA: std_logic_vector(7 downto 0);
signal total: std_logic_vector(15 downto 0);	
signal dreset,RST: std_logic;
begin  
	c0: Debouncer port map (reset,dreset,RST,clk);
	c1: reg port map (distanta,dreset,Eregistru,clk,cost);
	c2: memorie port map (clk,address,dreset,we,'1',distanta,data_o);
	c3: Convertor_Suma port map(E,dreset,M1,M2,B5,B10,B20,B50,SUMA);
	c4: comparator port map (SUMA,cost,ok);
	c5: scazator port map (SUMA,cost,rest);
	c6: sumator port map("0001000111010000",SUMA,total);
	c7: display port map(afisare,clk,'1',a_to_g,an);
	
	process(cond)
	begin
		case cond is
			when "11" => afisare <= cost;
			when "01" => afisare <= suma;
			when "10" => afisare <= rest;
			when others => afisare <= "00000000";
		end case;
	end process;
	
	process(address)
	begin
		case address is
			when "111" => B50 <= distanta;
			when "110" => B20 <= distanta;
			when "101" => B10 <= distanta;
			when "100" => B5  <= distanta;
			when "011" => M2 <= distanta;
			when "010" => M1 <= distanta;
			when others => NULL;
		end case;
	end process;
	process(ok,data_o)
	begin
	if(data_o > "00000000") then
		led_err1 <= '0';
	else
		led_err1 <= '1';
	end if;
	if(ok="10") then
		led_err2<='1';
		led_rest<='0';
		led_bilet<='0';
	elsif (ok="01") then
		led_err2<='0';
		led_rest<='1';
		if(total - rest > "00000000") then
			led_err3 <='0';
		else
			led_err3 <='1';
		end if;
		led_bilet<='1';
	elsif	(ok="11") then
		led_err2<='0';
		led_rest<='0';
		if(SUMA > "00000000")  then
			led_bilet<='1';
		else
			led_bilet<='0';
		end if;
	end if;
	end process;
end arh_automat;