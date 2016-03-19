import curses
import logging
from curses  import panel
from api import get_user, get_device, delete_user, delete_device


class Screen:
	"""Class to handle all screen stuff"""

	__terminated_key = ord('q')
	__menu_key = ord('m')

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
		self.table = Table(self)
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
		else:
			panel.top_panel().userptr().input_key(key)
			self.__update()

	def show_table(self, data_function, remove_function):
		self.hide_menu()
		self.table.data_function = data_function
		self.table.remove_function = remove_function
		self.table.refresh_data()
		self.table.show()

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

class Menu:
	"""Class to handle the CLI menu"""

	def __init__(self, screen, y, x):
		self.__screen = screen
		self.win = curses.newwin(int(y), int(x), 0, 0)
		self.win.box()
		self.__options = [MenuItem("User", get_user, delete_user),
				MenuItem("Devices", get_device, delete_device)]
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
			self.__screen.show_table(option.data_function,
					option.remove_function)

class MenuItem:
	"""Class to store menu items data"""

	def __init__(self, text, fetch_data_function, remove_function):
		self.text = text
		self.focus = False
		self.data_function = fetch_data_function
		self.remove_function = remove_function

class Table:
	"""Class to handle a table to show data"""
	__rows_per_page = 50
	__add_key = ord("a")
	__edit_key = ord("e")
	__del_key = ord("d")

	def __init__(self, screen):
		self.__screen = screen
		self.__data = None
		self.__selected_row = 0
		self.__page = 0
		self.__total_pages = 0
		self.data_function = None
		self.remove_function = None
		self.win = curses.newwin(0, 0)
		self.win.box()
		self.panel = panel.new_panel(self.win)
		self.panel.set_userptr(self)

	def refresh_data(self):
		self.__data = self.data_function()
		self.__total_pages = len(self.__data) / self.__rows_per_page
		self.__page = 0

	def show(self):
		self.panel.top()
		self.panel.show()

	def hide(self):
		self.panel.hide()

	def input_key(self, key):
		"""Handles input keys while menu is the top panel in screen"""
		if key is None:
			return
		if curses.KEY_DOWN == key:
			if self.__selected_row + 1 < self.__rows_per_page:
				self.__selected_row +=  1
		elif curses.KEY_UP == key:
			if self.__selected_row - 1 >= 0:
				self.__selected_row -=  1
		if curses.KEY_LEFT == key:
			if self.__page - 1 >= 0:
				self.__page -= 1
		elif curses.KEY_RIGHT == key:
			if self.__page + 1 < self.__total_pages:
				self.__page += 1
		elif self.__add_key == key:
			pass
		elif self.__edit_key == key:
			pass
		elif self.__del_key == key:
			if len(self.__data) > 0:
				user = self.__get_selected_user()
				logging.debug("delete user: " + str(user[1]))
				if self.remove_function(user[1]):
					del self.__data[user[0]]


	def draw(self):
		self.win.clear()
		self.win.box()
		#add control line
		line = 1
		self.win.addstr(line, 2, "[a]dd\t[e]dit\t[d]elete")
		line += 2
		if self.__data is None or len(self.__data) == 0:
			return
		# adds header
		text = ""
		for header in self.__data[0].keys():
			text += header + "\t"
		self.win.addstr(line, 2, text, curses.color_pair(3))
		line += 1
		# add table rows
		first_line = self.__page * self.__rows_per_page
		last_line = first_line + self.__rows_per_page
		current_row = 0
		for row in self.__data[first_line: last_line]:
			text = ""
			for value in row.values():
				text += str(value) + "\t"
			if current_row == self.__selected_row:
				self.win.addstr(line, 2, text,
					curses.color_pair(1))
			elif line % 2 == 0:
				self.win.addstr(line, 2, text,
						curses.color_pair(2))
			else:
				self.win.addstr(line, 2, text)
			line += 1
			current_row += 1

	def __get_selected_user(self):
		index = (self.__page * self.__rows_per_page) + self.__selected_row
		return (index, self.__data[index])
