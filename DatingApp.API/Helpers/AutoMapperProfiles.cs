using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs.Photo;
using DatingApp.API.DTOs.User;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDTO>()
                .ForMember(destination => destination.PhotoURL, options => {
                    options.MapFrom(source => source.Photos.FirstOrDefault(p => p.IsMainPhoto).URL);
                })
                .ForMember(destination => destination.Age, options => {
                    options.MapFrom(d => d.DateOfBirth.GetAge());
                });
            CreateMap<User, UserForDetailsDTO>()
                .ForMember(destination => destination.PhotoURL, options => {
                    options.MapFrom(source => source.Photos.FirstOrDefault(p => p.IsMainPhoto).URL);
                })
                .ForMember(destination => destination.Age, options => {
                    options.MapFrom(d => d.DateOfBirth.GetAge());
                });
            CreateMap<Photo, PhotosForDetailsDTO>();
            CreateMap<UserForUpdateDTO, User>();
            CreateMap<Photo, PhotoForReturnDTO>();
            CreateMap<PhotoForCreationDTO, Photo>();
            CreateMap<UserForRegisterDTO, User>();
            // CreateMap<MessageForCreationDTO, Message>().ReverseMap();
            // CreateMap<Message, MessageToReturnDTO>()
            //     .ForMember(m => m.SenderPhotoURL, options => options.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMainPhoto).URL))
            //     .ForMember(m => m.RecipientPhotoURL, options => options.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMainPhoto).URL));
        }
    }
}