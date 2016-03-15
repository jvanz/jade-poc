import curses
from curses  import panel

class Screen:
	"""Class to handle all screen stuff"""

	def __init__(self, stdscr):
		self.stdscr = stdscr;
		stdscr.clear()
		stdscr.box()
		self.menu_win = curses.newwin(int(stdscr.getmaxyx()[0] * .20),
			int(stdscr.getmaxyx()[1] * .10),0,0)
		self.menu_win.box()
		self.menu_win = panel.new_panel(self.menu_win)
		self.hide_menu()

	def show_menu(self):
		self.menu_win.show()
		panel.update_panels()
		self.stdscr.refresh()

	def hide_menu(self):
		self.menu_win.hide()
		panel.update_panels()
		self.stdscr.refresh()
