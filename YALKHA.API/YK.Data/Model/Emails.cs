using System.ComponentModel.DataAnnotations.Schema;

namespace YK.Data.Model
{
    public class Emails : BaseModel
    {
        public string EmailTo { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string HasError { get; set; }
        public string EmailType { get; set; }
    }
}