import curses
import logging
from curses  import panel, textpad
from table import Table
from menu import Menu
from form import Form

class Screen:
	"""Class to handle all screen stuff"""

	__terminated_key = ord('q')
	__menu_key = curses.KEY_HOME

	def __init__(self, stdscr):
		curses.init_pair(1, curses.COLOR_RED, curses.COLOR_WHITE)
		curses.init_pair(2, curses.COLOR_BLACK, curses.COLOR_CYAN)
		curses.init_pair(3, curses.COLOR_BLACK, curses.COLOR_BLUE)
		self.stdscr = stdscr;
		self.stdscr.box()
		self.terminated = False
		self.menu = Menu(self, self.stdscr.getmaxyx()[0] * .20,
			self.stdscr.getmaxyx()[1] * .10)
		self.__center(self.menu.win)
		self.show_menu()
		self.__update()

	def show_menu(self):
		self.menu.show()

	def hide_menu(self):
		self.menu.hide()

	def input_key(self, key):
		if key is None:
			return
		if self.__terminated_key == key:
			self.terminated = True
		elif self.__menu_key == key:
			self.show_menu()
		else:
			panel.top_panel().userptr().input_key(key)
		self.__update()

	def __update(self):
		self.stdscr.clear()
		panel.top_panel().userptr().draw()
		panel.update_panels()
		self.stdscr.refresh()


	def __center(self, win):
		"""Centers the win window """
		dimensions = self.stdscr.getmaxyx()
		win_dimension = win.getmaxyx()
		win.mvwin(int(dimensions[0]/2 - win_dimension[0]/2),
				int(dimensions[1]/2 - win_dimension[1]/2))

