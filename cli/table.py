import curses
import logging
from curses import panel
from api import get_user, get_device, delete_user, delete_device

class Table:
	"""Class to handle a table to show data"""
	rows_per_page = 50
	del_key = ord("d")

	def __init__(self):
		self.data = None
		self.selected_row = 0
		self.page = 0
		self.total_pages = 0
		self.win = curses.newwin(0, 0)
		self.win.box()
		self.panel = panel.new_panel(self.win)
		self.panel.set_userptr(self)
		self.refresh_data()

	def show(self):
		self.panel.top()
		self.panel.show()

	def input_key(self, key):
		"""Handles input keys while menu is the top panel in screen"""
		if key is None:
			return
		if curses.KEY_DOWN == key:
			if self.selected_row + 1 < self.get_row_current_page():
				self.selected_row +=  1
		elif curses.KEY_UP == key:
			if self.selected_row - 1 >= 0:
				self.selected_row -=  1
		if curses.KEY_LEFT == key:
			if self.page - 1 >= 0:
				self.page -= 1
				self.selected_row = 0
		elif curses.KEY_RIGHT == key:
			if self.page + 1 < self.total_pages:
				self.page += 1
				self.selected_row = 0
		elif Table.del_key == key:
			if self.delete():
				if self.selected_row >= self.get_row_current_page():
					self.selected_row -= 1
				if self.get_row_current_page() == 0 and self.page -1 >= 0:
					self.page -= 1
					self.selected_row = 0

	def get_row_current_page(self):
		first_line = self.page * Table.rows_per_page
		last_line = first_line + Table.rows_per_page
		return len(self.data[first_line: last_line])

	def draw(self):
		self.win.clear()
		self.win.box()
		#add control line
		line = 1
		self.win.addstr(line, 2, "[d]elete")
		line += 2
		if self.data is None or len(self.data) == 0:
			return
		# adds header
		text = ""
		for header in self.data[0].keys():
			text += header + "\t"
		self.win.addstr(line, 2, text, curses.color_pair(3))
		line += 1
		# add table rows
		first_line = self.page * Table.rows_per_page
		last_line = first_line + Table.rows_per_page
		current_row = 0
		for row in self.data[first_line: last_line]:
			text = ""
			for value in row.values():
				text += str(value) + "\t"
			if current_row == self.selected_row:
				self.win.addstr(line, 2, text,
					curses.color_pair(1))
			elif line % 2 == 0:
				self.win.addstr(line, 2, text,
						curses.color_pair(2))
			else:
				self.win.addstr(line, 2, text)
			line += 1
			current_row += 1

	def get_selected_row(self):
		index = (self.page * Table.rows_per_page) + self.selected_row
		return (index, self.data[index])


class UserTable(Table):

	def __init__(self):
		Table.__init__(self)

	def refresh_data(self):
		self.data = get_user()
		self.total_pages = len(self.data) / Table.rows_per_page
		self.page = 0

	def delete(self):
		if len(self.data) > 0:
			user = Table.get_selected_row(self)
			if delete_user(user[1]):
				del self.data[user[0]]
				return True

	def draw(self):
		Table.draw(self)

	def input_key(self, key):
		Table.input_key(self, key)

class DeviceTable(Table):

	def __init__(self):
		Table.__init__(self)

	def refresh_data(self):
		self.data = get_device()
		self.total_pages = len(self.data) / Table.rows_per_page
		self.page = 0

	def delete(self):
		if len(self.data) > 0:
			user = Table.get_selected_row(self)
			if delete_device(user[1]):
				del self.data[user[0]]
				return True

	def draw(self):
		Table.draw(self)

	def input_key(self, key):
		Table.input_key(self, key)
