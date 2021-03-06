namespace DatingApp.API.Helpers
{
    public class MessageParameters
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
    }
}