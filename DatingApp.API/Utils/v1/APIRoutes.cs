namespace DatingApp.API.Utils.v1
{
    public static class APIRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";

        public const string Base = Root + "/" + Version + "/[controller]";

        public static class Auth
        {
            public const string RegisterUserEndpoint = Base + "/register";
            public const string LoginUserEndpoint = Base + "/login";
            public const string GetUserEndpoint = Base + "/users/{userId}";
            public const string UpdateUserEndpoint = Base + "/users/{userId}";
            public const string DeleteUserEndpoint = Base + "/users/{userId}";
        }

        public static class Users
        {
            public const string AllUsersEndpoint = Base + "/users";
            public const string CreateUserEndpoint = Base + "/users";
            public const string GetUserEndpoint = Base + "/users/{userId}";
            public const string UpdateUserEndpoint = Base + "/users/{userId}";
            public const string DeleteUserEndpoint = Base + "/users/{userId}";
        }
    }
}