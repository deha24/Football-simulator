class FootballerPositionsDomain:

    def __init__(self, gk: int, lb: int, cb: int, rb: int, lwb: int, 
                 cdm: int, rwb: int, lm: int, cm: int, rm: int, 
                 lw: int, cam: int, rw: int, st: int):
        self.gk = gk
        self.lb = lb
        self.cb = cb
        self.rb = rb
        self.lwb = lwb
        self.cdm = cdm
        self.rwb = rwb
        self.lm = lm
        self.cm = cm
        self.rm = rm
        self.lw = lw
        self.cam = cam
        self.rw = rw
        self.st = st

    def calculate_short_position(self):
        shortpostion = [6,10,2]
        shortpostion = [position for position in self if position >= 8]
        print(shortpostion)
        return shortpostion