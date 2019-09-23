using System;

namespace DatingApp.API.DTOs.Photo
{
    public class PhotoForReturnDTO
    {
        public Guid Id { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainPhoto { get; set; }
        public string PublicId { get; set; }
    }
}