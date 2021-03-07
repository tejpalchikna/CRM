using System.ComponentModel.DataAnnotations.Schema;

namespace YK.Data.Model
{
    public class SMSs : BaseModel
    {
        public string SMSTo { get; set; }
        public string MessageBody { get; set; }
        public string Body { get; set; }
        public string SMSFrom { get; set; }
        public string HasError { get; set; }
        public string SMSType { get; set; }
    }
}