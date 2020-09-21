import sys
import pygame
import random
import time 
from datetime import datetime



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
       
        self.grids = []
        
        rows = []
        for row_num in range(self.num_rows):
            list_of_colums = [0] * self.num_cols
            rows.append(list_of_colums)
        
        
        
        
        self.grids.append(rows)
        self.active_grid = 0 
        
        
        self.set_grid()
        print(self.grids[0])
        
        #changes
        
            
        # self.game_grid_active = [
        #     [0,0,0],
        #     [0,0,0],
        #     [0,0,0],
        # ]
        # self.game_grid_inactive= []
        
    
        
    def set_grid(self):
        
        """
        Examples
        
            #set_grid(0) all dead
            #set_grid(1) all alive
            #set_grid() random 
            #set_grid(None) random
            
        """
        for r in range(self.num_rows):
            for c in range(self.num_cols):
                # if value is None:
                #     cell_value = random.choice([0,1])
                # else:
                #     cell_value = value 
                self.grids[self.active_grid][r][c] = random.randint(0,1)

    def clear_screen(self):
        self.screen.fill(DEAD_COLOR)
        
    def update_generation(self):
        #inspect the current active generation 
        #update the inactive grid to store next generation 
        #swap the active grid 
        self.set_grid()
    
    def draw_grid(self):
        self.clear_screen()
        for c in range(self.num_cols):
            for r in range(self.num_rows):
                if self.grids[self.active_grid][r][c] == 1:
                    color = ALIVE_COLOR
                elif self.grids[self.active_grid][r][c] == 0:
                    color = DEAD_COLOR 
                pygame.draw.circle(self.screen, 
                                   color, 
                                   (int(c * CELL_SIZE + (CELL_SIZE/2)),
                                    int(r * CELL_SIZE + (CELL_SIZE/2))), 
                                    int(CELL_SIZE/2) , 
                                    0)
        
        pygame.display.flip()
        
        
                
    def handle_events(self):
        for event in pygame.event.get():
                #if event is kepress of 's' then pause game 
                #if event is keypress 'r' randomize grid
                #if event keypress 'q' then quit
                if event.type == pygame.QUIT: sys.exit()
                
                
    def run(self):
        milliseconds_betweeen_updates = (1.0/60.0) * 1000.0
        while True:
            self.handle_events()
            #time checking 
            self.update_generation()
            self.draw_grid()
            
            time.sleep(.5)
            # now = pygame.time.get_ticks()
            # print(now)
            # if now - self.last_update_completed > milliseconds_betweeen_updates:
            #     pygame.time.wait(milliseconds_betweeen_updates - (now = self.last_update_completed))
            # self.last_update_completed = now
            
        
        
            



if __name__ == '__main__':
    game = LifeGame()
    game.run()
