using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YK.Data.Model
{
    public class BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date { get; set; }
        public string Modified_By { get; set; }
        public DateTime Modified_Date { get; set; }
        public bool Deleted_Flag { get; set; }
    }
}