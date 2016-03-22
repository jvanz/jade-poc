import curses
from curses import panel

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
			panel.top_panel().hide()
			self.__screen.form.show()
		elif self.__edit_key == key:
			pass
		elif self.__del_key == key:
			if len(self.__data) > 0:
				user = self.__get_selected_user()
				logging.debug("delete user: " + str(user[1]))
				if self.remove_function(user[1]):
					del self.__data[user[0]]
		if self.__selected_row >=  len(self.__data):
			self.__selected_row = len(self.__data) - 1


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


