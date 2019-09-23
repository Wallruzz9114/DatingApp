using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.DTOs.User;
using DatingApp.API.Models;
using DatingApp.API.Services.Interfaces;
using DatingApp.API.Utils.v1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers.v1
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IConfiguration _configuration;

        public AuthenticationController(IAuthenticationService authenticationService, IConfiguration configuration)
        {
            _authenticationService = authenticationService;
            _configuration = configuration;
        }

        [HttpPost(APIRoutes.Auth.RegisterUserEndpoint)]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            userForRegisterDTO.Username = userForRegisterDTO.Username.ToLower();

            if (await _authenticationService.UserExists(userForRegisterDTO.Username))
                return BadRequest("Username already exists!");

            User userToCreate = new User { Username = userForRegisterDTO.Username };
            User createdUser = await _authenticationService.Register(userToCreate, userForRegisterDTO.Password);

            return StatusCode(201);
        }

        [HttpPost(APIRoutes.Auth.LoginUserEndpoint)]
        public async Task<IActionResult> Login(UserForLoginDTO userForLoginDTO)
        {
            // Check if user exists
            User userFromRepository = await _authenticationService.Login(
                userForLoginDTO.Username.ToLower(), userForLoginDTO.Password
            );

            if (userFromRepository == null) return Unauthorized();

            // Build token to return to the user
            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepository.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepository.Username)
            };
            
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value)
            );

            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            // UserForListDTO userForListDTO = _mapper.Map<UserForListDTO>(userFromRepository);

            return Ok(new
            { 
                token = tokenHandler.WriteToken(token)
                // user = userForListDTO
            });
        }
    }
}