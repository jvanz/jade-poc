import curses
from screen import Screen

def main(stdscr):
	screen = Screen(stdscr)
	while not screen.terminated:
		key = stdscr.getch()
		screen.input_key(key)

if __name__ == '__main__':
	curses.wrapper(main)

