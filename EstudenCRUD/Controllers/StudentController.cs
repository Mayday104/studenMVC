using EstudenCRUD.Context;
using EstudenCRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace EstudenCRUD.Controllers
{
    public class StudentController : Controller
    {
        EstudentContext db = new EstudentContext();

        [HttpGet]
        public Response GetStudent()
        {
            try
            {
                var data = (from student in db.Estudents
                            select student).ToArray();

                Array.Reverse(data);

                return new Response { Data = data, Success = true };
            }
            catch (System.Exception e)
            {
                return new Response { Message = "Error, sonsulte con el administrador", Success = false };
            }
        }


        [HttpPost]
        public Response InserStudent([FromBody]Estudents student)
        {

            if (student.Apellido.Trim().Equals("") || student.Nombre.Trim().Equals(""))
            {
                return new Response { Success = false, Message = "No se suministraron todos los datos necesarios" };
            }

            try
            {
                db.Estudents.Add(student);

                db.SaveChanges();

                return new Response { Data=student, Message="Estudiante Registrado!", Success = true };
            }
            catch (System.Exception)
            {

                return new Response { Success = false, Message = "Error al ejecutar la tarea, consulte al administrador" };
            }
        }


        public IActionResult Index()
        {
            return View();
        }
    }
}
