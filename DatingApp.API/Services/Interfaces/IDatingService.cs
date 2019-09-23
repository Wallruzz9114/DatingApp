using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Services.Interfaces
{
    public interface IDatingService
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUser(Guid id);
        // Task<Photo> GetPhoto(int id);
        // Task<Photo> GetMainPhotoForUser(int userId);
    }
}