import curses
from curses  import panel

class Screen:
	"""Class to handle all screen stuff"""

	def __init__(self, stdscr):
		self.stdscr = stdscr;
		stdscr.clear()
		stdscr.box()
		self.menu = Menu(self.stdscr.getmaxyx()[0] * .20,
			self.stdscr.getmaxyx()[1] * .10)
		self.__center(self.menu.win)
		panel.update_panels()
		self.stdscr.refresh()

	def show_menu(self):
		self.menu.show()
		self.stdscr.refresh()

	def hide_menu(self):
		self.menu.hide()
		self.stdscr.refresh()

	def __center(self, win):
		"""Centers the win window """
		dimensions = self.stdscr.getmaxyx()
		win_dimension = win.getmaxyx()
		win.mvwin(dimensions[0]/2 - win_dimension[0]/2,
				dimensions[1]/2 - win_dimension[1]/2)

class Menu:
	def __init__(self, y, x):
		curses.init_pair(1, curses.COLOR_RED, curses.COLOR_WHITE)
		self.win = curses.newwin(int(y), int(x), 0, 0)
		self.win.box()
		self.__options = [MenuItem("User"), MenuItem("Devices")]
		self.__draw_options()
		self.panel = panel.new_panel(self.win)
		self.select()

	def __draw_options(self):
		index = 1
		for opt in self.__options:
			if opt.focus:
				self.win.addstr(index, 1, opt.text,
						curses.color_pair(1))
			else:
				self.win.addstr(index, 1, opt.text)
			index += 1

	def show(self):
		self.panel.show()
		panel.update_panels()

	def hide(self):
		self.panel.hide()
		panel.update_panels()

	def select(self, index=0):
		if index > len(self.__options) - 1:
			index = 0
		self.__options[index].focus = True
		self.__draw_options()

class MenuItem:
	def __init__(self, text):
		self.text = text
		self.focus = False
