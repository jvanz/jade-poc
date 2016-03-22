import curses
from curses  import panel
from table import UserTable, DeviceTable

class Menu:
	"""Class to handle the CLI menu"""

	def __init__(self, screen, y, x):
		self.__screen = screen
		self.win = curses.newwin(int(y), int(x), 0, 0)
		self.win.box()
		self.__options = [MenuItem("User", UserTable()),
				MenuItem("Devices", DeviceTable())]
		self.__current_focus = 0
		self.panel = panel.new_panel(self.win)
		self.panel.set_userptr(self)
		self.select()

	def draw(self):
		index = 1
		for opt in self.__options:
			if opt.focus:
				self.win.addstr(index, 1, opt.text,
						curses.color_pair(1))
			else:
				self.win.addstr(index, 1, opt.text)
			index += 1

	def show(self):
		self.panel.top()
		self.panel.show()

	def hide(self):
		self.panel.hide()

	def select(self, index=0):
		if index > len(self.__options) - 1:
			index = 0
		self.__options[self.__current_focus].focus = False
		self.__options[index].focus = True
		self.__current_focus = index


	def input_key(self, key):
		"""Handles input keys while menu is the top panel in screen"""
		if key is None:
			return
		if curses.KEY_UP == key:
			self.select(self.__current_focus+1)
		elif curses.KEY_DOWN == key:
			self.select(self.__current_focus-1)
		elif curses.KEY_ENTER == key or 10 == key or 13 == key:
			option = self.__options[self.__current_focus]
			self.hide()
			option.table.show()

class MenuItem:
	"""Class to store menu items data"""
	def __init__(self, text, table):
		self.text = text
		self.focus = False
		self.table = table

