#include <LiquidCrystal.h>

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
int pos = 0; //pozitia jucatorului
boolean enemyDead = true;
boolean control = true;
int score = 0;
int Joy_X;
int game_speed = 1;
int lives = 1;
boolean lifeDead = true;

int nrMaxLife=2;
int nrLivesReceived=0;
int maximScore=50;


const unsigned long eventInterval1 = 80; //intervalul de timp la care se updateaza miscarea jucatorului
unsigned long eventInterval2 = 600; // intervalul de timp la care se updateaza pozitia inamicilor
unsigned long eventInterval3 = 14000; // intervalul de timp la care apare o viata noua
unsigned long previousTime1 = 0;
unsigned long previousTime2 = 0;
unsigned long previousTime3 = 0;
struct enemy {
  int x;
  int y;
};

enemy E[3];//inamici
enemy L;//viata


byte armsDown[8] = {
  0b00100,
  0b01010,
  0b00100,
  0b00100,
  0b01110,
  0b10101,
  0b00100,
  0b01010
};

byte enemyChar[8] = {
  0b10101,
  0b01110,
  0b01010,
  0b01110,
  0b11111,
  0b01010,
  0b01110,
  0b10001
};

byte lifeChar[8] = {
  0b00000,
  0b01010,
  0b11111,
  0b11111,
  0b11111,
  0b01110,
  0b00100,
  0b00000
};

byte wallChar[8] = {
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111
};

void setup() {
  lcd.begin(20, 4);
  lcd.createChar(0, armsDown);
  lcd.createChar(1, enemyChar);
  lcd.createChar(2, lifeChar);
  lcd.createChar(3, wallChar);
}

void loop() {
  lcd.clear();
  gameScreen();
  unsigned long currentTime = millis();
  if (currentTime - previousTime1 >= eventInterval1)
  {
    Joy_X = analogRead(A1); //citeste data X de pe JoyStick
    if (Joy_X > 535 && pos > 0 && control == true) //verifica daca player-ul vrea sa se mute la stanga
    {
      pos--; 
      control = false;
    }
    else if (Joy_X < 500 && pos < 4 && control == true) //verifica daca player-ul vrea sa se mute la dreapta
    {
      pos++;  //Increment position of spaceship
      control = false;
    }
    else if (Joy_X > 500 && Joy_X < 535) //verifica daca JoyStick-ul revine in pozitia initiala
      control = true; 
    previousTime1 = currentTime;
  }
  drawPlayer(pos);
  if (enemyDead)
  {
    E[0].x = excludeNumber(random(0, 5),L.x);//obtine o valoare pentru coordonata x pentru primul inamic diferita fata de cea a vietii
    int p = excludeNumber(random(0, 5),L.x);//obtine o valoare pentru coordonata x pentru al doilea inamic diferita fata de cea a vietii
    while (p == E[0].x)//verifica daca coordonata x a primilor doi inamici este diferita
      p = excludeNumber(random(0, 5),L.x);
    E[1].x = p;
    E[0].y = 0;//initializam cu 0 pentru 
    E[1].y = 0;
    if (game_speed >= 3)//apare un al treilea inamic
    {
      int p2 = excludeNumber(random(0, 5),L.x);//obtine o valoare pentru coordonata x pentru cel de al treilea inamic diferita fata de cea a vietii
      while (p2 == E[0].x || p2 == E[1].x)//verifica daca valoarea coordonatei x a celui de al treilea inamic este diferita fata de cea a celorlalti doi inamici
        p2 = excludeNumber(random(0, 5),L.x);
      E[2].x = p2;
      E[2].y = 0;
    }

    enemyDead = false;
  }
  drawEnemy(E[0].x, E[0].y, E[1].x, E[1].y,E[2].x,E[2].y);
  //drawLife(6,2);
  if (currentTime - previousTime2 >= eventInterval2)
  {
    E[0].y++;//creste coordonata y a primului inamic
    E[1].y++;//creste coordonata y pentru cel de al doilea inamic
    if (game_speed >= 3)
      E[2].y++;//creste coordonata y pentru cel de al treilea inamic
      if (lifeDead == false)//verifica daca exista viata care poate fi luata
      {
        L.y++;//creste coordonata y a vietii
      }
    previousTime2 = currentTime;
  }
  if (game_speed < 3)
  {
    if (E[0].y > 3 && E[1].y > 3)//verifica daca un inamic a trecut de player fara sa il prinda
    {
      enemyDead = true;
      score++;
    }
    for (int i = 0; i <= 1; i++)
    {
      if (E[i].x == pos && E[i].y == 4)//verifica daca un inamic se afla pe aceeasi pozitie cu playerul 
      {
        lives--;
        score--;
        if (lives == 0)//daca ramane fara vieti se pierde jocul
          gameOver();
      }
    }
  }
  else
  {
    //pentru cazul cu 3 inamici
    if (E[0].y > 3 && E[1].y > 3 && E[2].y > 3)
    {
      enemyDead = true;
      score++;
    }
    for (int i = 0; i <= 2; i++)
    {
      if (E[i].x == pos && E[i].y == 4)
      {
        lives--;
        score--;
        if (lives == 0)
          gameOver();
      }
    }
  }


  if (currentTime - previousTime3 >= eventInterval3&&nrLivesReceived<nrMaxLife)//in plus fata de executia la un anumit interval de timp verifica daca s-a ajuns la numarul maxim de vieti care pot fi colectate pe parcursul unui joc
  {
    if (lifeDead == true)
    {
      int checkPosition = random(0, 5);
      if (game_speed < 3)
      {
        while (checkPosition == E[0].x || checkPosition == E[1].x)//asigura ca pozitia x a vietii este diferita de cea a inamicilor
        {
          checkPosition = random(0, 5);
        }
      }
      if(game_speed>=3)
      {
        while (checkPosition == E[0].x || checkPosition == E[1].x||checkPosition==E[2].x)//asigura ca pozitia x a vietii este diferita de cea a inamicilor
        {
          checkPosition = random(0, 5);
        }
      }
      L.x = checkPosition;
      L.y = 0;
      lifeDead = false;
    }
    previousTime3 = currentTime;
  }
  if (lifeDead == false)
    drawLife(L.x, L.y);
  if (L.y == 4)
  {
    if (L.x == pos && lifeDead == false)//verifica daca playerul poate lua viata
      {
        lives++;
        nrLivesReceived++;
      }
    lifeDead = true;
    L.x=-1;
  }
  if(score==maximScore)
    gameFinished();
  Level_Controller();
}

void gameOver()
{
  while (1)
  {
    delay(100);
    lcd.clear();
    lcd.setCursor(7, 1);
    lcd.print("GAME OVER!");
    lcd.setCursor(7,3);
    lcd.print("SCORE:");
    lcd.print(score);
  }
}

void gameFinished()
{
  while(1)
  {
    delay(100);
    lcd.clear();
    lcd.setCursor(7, 1);
    lcd.print("YOU WON!");
    lcd.setCursor(7,3);
    lcd.print("SCORE:");
    lcd.print(score);
  }
}

int excludeNumber(int x,int y)
{
  if(x==y)
  {
    if(x==0)
      x++;
    else
    {
      if(x==4)
        x--;
      else
        x++;
    }
  }
  return x;
}

//functie care controleaza nivelul in functie de scor
void   Level_Controller() 
{
  if (score >= 0 && score <= 3)
  {
    game_speed = 1; 
    eventInterval2 = 700; 
  }
  if (score > 3 && score <= 6) 
  {
    game_speed = 2; 
    eventInterval2 = 600; 
  }
  if (score > 6 && score <= 9) 
  {
    game_speed = 3; 
    eventInterval2 = 500; 
  }
  if (score > 9 && score <= 15)
  {
    game_speed = 4; 
    eventInterval2 = 400; 
  }
  if (score > 15)
  {
    game_speed = 5; 
    eventInterval2 = 300; 
  }
}
void drawPlayer(int POS)
{
  lcd.setCursor(POS, 4);
  lcd.write(byte(0));
}
void drawLife(int x, int y)
{
  lcd.setCursor(x, y);
  lcd.write(2);
  delay(60);
}

void drawEnemy(int x1, int y1, int x2, int y2,int x3,int y3)
{
  lcd.setCursor(x1, y1);
  lcd.write(1);
  lcd.setCursor(x2, y2);
  lcd.write(1);
  if(game_speed>=3)
  {
    lcd.setCursor(x3, y3);
    lcd.write(1);
  }
  delay(60);

}

void gameScreen()
{
  lcd.setCursor(10, 0);
  lcd.write("Score:");
  lcd.print(score);
  lcd.setCursor(10, 1);
  lcd.write("Level:");
  lcd.print(game_speed);
  lcd.setCursor(10, 2);
  lcd.write("Lives:");
  lcd.print(lives);

  lcd.setCursor(5,0);
  lcd.write(3);
  lcd.setCursor(5,1);
  lcd.write(3);
  lcd.setCursor(5,2);
  lcd.write(3);
  lcd.setCursor(5,3);
  lcd.write(3);
  
}
