using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using DatingApp.API.Helpers;
using DatingApp.API.DTOs.User;
using DatingApp.API.Services.Interfaces;
using DatingApp.API.Utils.v1;

namespace DatingApp.API.Controllers
{
    // [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    // [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly IDatingService _datingService;
        private readonly IMapper _mapper;

        public UsersController(IDatingService datingService, IMapper mapper)
        {
            _datingService = datingService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            // int currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            // User currentUser = await _datingRepository.GetUser(currentUserId);

            // userParameters.UserId = currentUserId;

            // if (string.IsNullOrEmpty(userParameters.Gender))
            //     userParameters.Gender = currentUser.Gender == "male" ? "female" : "male";

            // var users = await _datingRepository.GetAllUsers(userParameters);
            // var usersToReturn = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            // Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalItems, users.TotalPages);
            return Ok(await _datingService.GetAllUsers());
        }

        [HttpGet(APIRoutes.Users.GetUserEndpoint, Name = APIRoutes.Users.GetUserEndpointName)]
        public async Task<IActionResult> GetUser(Guid id)
        {
            User user = await _datingService.GetUser(id);
            UserForDetailsDTO userToReturn = _mapper.Map<UserForDetailsDTO>(user);
            return Ok(userToReturn);
        }

        // [HttpPut(APIRoutes.Users.GetUserEndpoint)]
        // public async Task<IActionResult> UpdateUser(Guid id, UserForUpdateDTO userForUpdateDTO)
        // {
        //     // Check user against database
        //     if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     User user = await _datingRepository.GetUser(id);
        //     _mapper.Map(userForUpdateDTO, user);

        //     if (await _datingRepository.SaveAll())
        //         return NoContent();
        //     else
        //         throw new Exception($"Updating user { id } failed on save");
        // }

        // [HttpPost("{id}/like/{recipientId}")]
        // public async Task<IActionResult> LikeUser(int id, int recipientId)
        // {
        //     if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();
            
        //     Like like = await _datingRepository.GetLike(id, recipientId);

        //     if (like != null)
        //         return BadRequest("You already like this user");
            
        //     if (await _datingRepository.GetUser(recipientId) == null)
        //         return NotFound();

        //     like = new Like
        //     {
        //         LikerId = id,
        //         LikeeId = recipientId
        //     };

        //     _datingRepository.Add<Like>(like);

        //     if (await _datingRepository.SaveAll())
        //         return Ok();

        //     return BadRequest("Failed to like user");
        // }
    }
}