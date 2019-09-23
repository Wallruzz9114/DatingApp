using System;

namespace DatingApp.API.DTOs.Photo
{
    public class PhotosForDetailsDTO
    {
        public Guid Id { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainPhoto { get; set; }
    }
}