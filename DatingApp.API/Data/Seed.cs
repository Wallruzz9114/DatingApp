using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            // string seedUserData = File.ReadAllText("Data/UserSeedData.json");
            // List<User> users = JsonConvert.DeserializeObject<List<User>>(seedUserData);

            // foreach (User user in users)
            // {
            //     byte[] passwordhash;
            //     byte[] passwordSalt;

            //     CreatePasswordHash("password", out passwordhash, out passwordSalt);

            //     user.PasswordHash = passwordhash;
            //     user.PasswordSalt = passwordSalt;
            //     user.Username = user.Username.ToLower();

            //     _context.Users.Add(user);
            // }

            // _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (HMACSHA512 hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}