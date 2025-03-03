class Semester:
    def __init__(self, semester_number: int):
        if semester_number < 1 or semester_number > 8:
            raise ValueError("Invalid semester number.")
        self.semester_number = semester_number

    def __eq__(self, other):
        return self.semester_number == other.semester_number
    
    def __repr__(self):
        return f"{self.semester_number}"

