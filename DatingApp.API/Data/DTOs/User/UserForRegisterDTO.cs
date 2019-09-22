using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Data.DTOs.User
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "Password must be between 4 and 10 characters")]
        public string Password { get; set; }
        // [Required]
        // public string Gender { get; set; }
        // [Required]
        // public string Alias { get; set; }
        // [Required]
        // public DateTime DateOfBirth { get; set; }
        // [Required]
        // public string City { get; set; }
        // [Required]
        // public string Country { get; set; }
        // public DateTime DateCreated { get; set; }
        // public DateTime LastActive { get; set; }

        // public UserForRegisterDTO()
        // {
        //     DateCreated = DateTime.Now;
        //     LastActive = DateTime.Now;
        // }
    }
}