using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class Photo
    {
        [Key]
        public Guid Id { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainPhoto { get; set; }
        public string PublicId { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}