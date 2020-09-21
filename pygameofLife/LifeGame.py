import sys
import pygame
import random




BOARD_SIZE = WIDTH, HEIGHT = 640,480
CELL_SIZE = 10
DEAD_COLOR = 0, 0, 0
ALIVE_COLOR = 0, 255, 255

class LifeGame:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode(BOARD_SIZE)
        self.clear_screen()
        pygame.display.flip()
        self.init_grids()
        
        
        
    def init_grids(self):
        self.num_cols = int(WIDTH / CELL_SIZE)
        self.num_rows = int(HEIGHT / CELL_SIZE)
        print("Columns: %d \n Rows: %d" % (self.num_cols, self.num_rows))
        self.grids = [ [[0] * self.num_rows] * self.num_cols,  [[0] * self.num_rows] * self.num_cols]
        self.active_grid = 0 
        self.randomize_grid()
        print(self.grids[0])
            
        # self.game_grid_active = [
        #     [0,0,0],
        #     [0,0,0],
        #     [0,0,0],
        # ]
        # self.game_grid_inactive= []
        
        
    def randomize_grid(self):
        
        for c in range(self.num_cols):
            for r in range(self.num_rows):
                self.grids[self.active_grid][c][r] = random.choice([0,1])

    def clear_screen(self):
        self.screen.fill(DEAD_COLOR)
        
    def update_generation(self):
        #inspect the current active generation 
        #update the inactive grid to store next generation 
        #swap the active grid 
        pass
    def draw_grid(self):
        #circle_rect = pygame.draw.circle(self.screen, ALIVE_COLOR, (50,50), 5 , 0)
        pygame.display.flip()
        
        
                
    def handle_events(self):
        for event in pygame.event.get():
                #if event is kepress of 's' then pause game 
                #if event is keypress 'r' randomize grid
                #if event keypress 'q' then quit
                if event.type == pygame.QUIT: sys.exit()
                
                
    def run(self):
        while True:
            self.handle_events()
            #time checking 
            self.update_generation()
            self.draw_grid()
        
        
            



if __name__ == '__main__':
    game = LifeGame()
    game.run()
