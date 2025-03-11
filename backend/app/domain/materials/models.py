class Material:
        def __init__(self, id: int, course_id: int, material_type: str, number: int, content: str, url: str):
            self.id = id
            self.course_id = course_id
            self.material_type = material_type
            self.number = number
            self.content = content
            self.url = url

        def __repr__(self):
              return f"Material id={self.id} course_id={self.course_id} material_type={self.material_type} number = {self.number} content = {self.content} url = {self.url}"

