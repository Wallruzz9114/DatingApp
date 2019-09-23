using System;
using System.Collections.Generic;
using DatingApp.API.DTOs.Photo;

namespace DatingApp.API.DTOs.User
{
    public class UserForDetailsDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Alias { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastActive { get; set; }
        public string About { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoURL { get; set; }
        public ICollection<PhotosForDetailsDTO> Photos { get; set; }
    }
}