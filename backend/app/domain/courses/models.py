class Course:
    def __init__(self, name: str, description: str, semester: int, id: int):
            self.id = id  
            self.name = name
            self.description = description
            self.semester = semester

    def __repr__(self):
          return f"Course(id={self.id}, name={self.name}, description={self.description}, semester={self.semester})"