using System.ComponentModel.DataAnnotations.Schema;

namespace YK.Data.Model
{
    public class Projects : BaseModel
    {
        public string ProjectName { get; set; }
        public string ProjectType { get; set; }
        public string ProjectDurationFrom { get; set; }
        public string ProjectDurationTo { get; set; }
        public string ProjectClientName { get; set; }
        public string ProjectContactPerson { get; set; }
        public string ProjectDescritption { get; set; }
        public string HasError { get; set; }
        public string EmailType { get; set; }
        public virtual Organizations Organization { get; set; }
    }
}