import curses
from curses import panel

class Form:
	"""Class to handle a form to add/edit data"""

	edit_text_x = 30
	def __init__(self, fields):
		self.win = curses.newwin(0, 0)
		self.panel = panel.new_panel(self.win)
		self.panel.set_userptr(self)
		self.__fields = fields

	def input_key(self, key):
		pass

	def show(self):
		self.panel.top()
		self.panel.show()

	def draw(self):
		self.win.clear()
		self.win.box()
		line = 2
		for field in self.__fields:
			self.win.addstr(line, 2, field + ":")
			self.__make_text_box(1, 20, line, self.edit_text_x)
			line += 4


	def __make_text_box(self, height, width, y, x):
		nw = curses.newwin(height,width,y,x)
		self.win.attron(0)
		txtbox = curses.textpad.Textbox(nw,insert_mode=True)
		self.win.attroff(0)
		curses.textpad.rectangle(self.win,y-1,x-1,y+height,x+width)
		return txtbox

class UserForm(Form):
	def __init__(self):
		Form.__init__(self, ["name", "profile"])

class DeviceForm(Form):
	def __init__(self):
		Form.__init__(self, ["type", "description", "ip"])
