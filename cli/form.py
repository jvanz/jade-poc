import curses

class Form:
	"""Class to handle a form to add/edit data"""
	def __init__(self, screen, fields):
		self.__screen = screen
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
			self.win.addstr(line, 2, field)
			line += 1


	def __make_text_box(self, height, width, y, x):
		nw = curses.newwin(height,width,y,x)
		self.win.attron(0)
		txtbox = curses.textpad.Textbox(nw,insert_mode=True)
		self.win.attroff(0)
		curses.textpad.rectangle(self.win,y-1,x-1,y+height,x+width)
		return txtbox

class UserForm(Form):
	def __init__(self, screen):
		Form.__init__(self, screen, ["name", "profile"])

class DeviceForm(Form):
	def __init__(self, screen):
		Form.__init__(self, screen, ["type", "description", "ip"])
