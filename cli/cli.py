import curses
from screen import Screen

def main(stdscr):
	screen = Screen(stdscr)
	stdscr.getkey()

if __name__ == '__main__':
	curses.wrapper(main)

