import curses
from curses  import panel

class Screen:
	"""Class to handle all screen stuff"""

	__terminated_key = ord('q')

	def __init__(self, stdscr):
		self.stdscr = stdscr;
		self.terminated = False
		stdscr.clear()
		stdscr.box()
		self.menu = Menu(self.stdscr.getmaxyx()[0] * .20,
			self.stdscr.getmaxyx()[1] * .10)
		self.__center(self.menu.win)
		panel.update_panels()
		self.stdscr.refresh()

	def show_menu(self):
		self.menu.top()
		self.menu.show()
		self.stdscr.refresh()

	def hide_menu(self):
		self.menu.hide()
		self.stdscr.refresh()

	def input_key(self, key):
		if key is None:
			return
		if self.__terminated_key == key:
			self.terminated = True
		else:
			panel.top_panel().userptr().input_key(key)
			self.__update()

	def __update(self):
		panel.update_panels()
		self.stdscr.refresh()


	def __center(self, win):
		"""Centers the win window """
		dimensions = self.stdscr.getmaxyx()
		win_dimension = win.getmaxyx()
		win.mvwin(int(dimensions[0]/2 - win_dimension[0]/2),
				int(dimensions[1]/2 - win_dimension[1]/2))

class Menu:
	def __init__(self, y, x):
		curses.init_pair(1, curses.COLOR_RED, curses.COLOR_WHITE)
		self.win = curses.newwin(int(y), int(x), 0, 0)
		self.win.box()
		self.__options = [MenuItem("User"), MenuItem("Devices")]
		self.__current_focus = 0
		self.__draw_options()
		self.panel = panel.new_panel(self.win)
		self.panel.set_userptr(self)
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
		self.__options[self.__current_focus].focus = False
		self.__options[index].focus = True
		self.__current_focus = index
		self.__draw_options()

	def input_key(self, key):
		if key is None:
			return
		if curses.KEY_UP == key:
			self.select(self.__current_focus+1)
		elif curses.KEY_DOWN == key:
			self.select(self.__current_focus-1)

class MenuItem:
	def __init__(self, text):
		self.text = text
		self.focus = False
