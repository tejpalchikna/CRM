using System;

namespace YALKHA.Core.ViewModels
{
    public class BaseViewModel
    {
        public int Id { get; set; }
        public string Created_By { get; set; }
        public string Created_Date { get; set; }
        public string Modified_By { get; set; }
        public string Modified_Date { get; set; }
        public bool Deleted_Flag { get; set; }
    }
}